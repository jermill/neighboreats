import { NextRequest, NextResponse } from 'next/server'
import { requireRole, createServerClient } from '@/lib/supabase-server'
import { RtcTokenBuilder, RtcRole } from 'agora-access-token'

/**
 * API Contract: Agora Live Streaming Integration
 * 
 * POST /api/integrations/agora?action=start
 * - Auth: Required (chef)
 * - Response: { channelName, token, uid, appId, streamId, mock? }
 * 
 * POST /api/integrations/agora?action=end
 * - Auth: Required (chef)
 * - Body: { streamId: string }
 * - Response: { success: boolean }
 * 
 * GET /api/integrations/agora/token?channelName=:channel
 * - Auth: Required (customer - viewers)
 * - Response: { token, uid, appId, mock? }
 */

const buildUidFromUserId = (userId: string) => {
  const numeric = parseInt(userId.replace(/\D/g, '').slice(0, 8)) || 0
  return numeric
}

const buildToken = (
  channelName: string,
  userId: string,
  role: number,
  expirationSeconds = 3600
) => {
  if (!process.env.AGORA_APP_ID || !process.env.AGORA_APP_CERTIFICATE) {
    return {
      token: `mock_${role === RtcRole.PUBLISHER ? 'publisher' : 'viewer'}_token_${channelName}`,
      uid: userId,
      appId: 'MOCK_APP_ID',
      mock: true,
      message: 'Configure AGORA_APP_ID and AGORA_APP_CERTIFICATE in .env.local'
    }
  }

  const uid = buildUidFromUserId(userId)
  const now = Math.floor(Date.now() / 1000)
  const privilegeExpiredTs = now + expirationSeconds

  const token = RtcTokenBuilder.buildTokenWithUid(
    process.env.AGORA_APP_ID,
    process.env.AGORA_APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  )

  return {
    token,
    uid,
    appId: process.env.AGORA_APP_ID,
    mock: false
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireRole(['chef'])
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action') || 'start'

    if (action === 'start') {
      // Start a new live stream
      const channelName = `chef_${user.id}_${Date.now()}`

      // Create live stream record (works for both real and mock)
      const { data: stream } = await supabase
        .from('live_streams')
        .insert({
          chef_id: user.id,
          channel_name: channelName,
          status: 'live',
          viewer_count: 0
        })
        .select()
        .single()

      // Update chef status to live
      await supabase
        .from('chefs')
        .update({ is_live: true })
        .eq('id', user.id)

      const tokenPayload = buildToken(channelName, user.id, RtcRole.PUBLISHER)

      return NextResponse.json({
        channelName,
        streamId: stream?.id,
        ...tokenPayload
      })

    } else if (action === 'end') {
      // End live stream
      const body = await request.json()
      const { streamId } = body

      if (!streamId) {
        return NextResponse.json(
          { error: 'Missing streamId' },
          { status: 400 }
        )
      }

      await supabase
        .from('live_streams')
        .update({
          status: 'ended',
          ended_at: new Date().toISOString()
        })
        .eq('id', streamId)
        .eq('chef_id', user.id)

      await supabase
        .from('chefs')
        .update({ is_live: false })
        .eq('id', user.id)

      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )

  } catch (error: any) {
    console.error('Agora API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message?.includes('Unauthorized') ? 401 : 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await requireRole(['customer'])
    const { searchParams } = new URL(request.url)
    const channelName = searchParams.get('channelName')

    if (!channelName) {
      return NextResponse.json(
        { error: 'Missing channelName' },
        { status: 400 }
      )
    }

    const tokenPayload = buildToken(channelName, user.id, RtcRole.SUBSCRIBER)

    return NextResponse.json(tokenPayload)

  } catch (error: any) {
    console.error('Get Agora token API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message?.includes('Unauthorized') ? 401 : 500 }
    )
  }
}
