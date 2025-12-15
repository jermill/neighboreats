import { NextRequest, NextResponse } from 'next/server'
import { requireRole, createServerClient } from '@/lib/supabase-server'

/**
 * API Contract: Checkr Background Check Integration
 * 
 * POST /api/integrations/checkr
 * - Auth: Required (chef, driver)
 * - Body: {
 *     firstName: string
 *     lastName: string
 *     dateOfBirth: string
 *     ssn: string
 *     licenseNumber?: string (required for drivers)
 *   }
 * - Response: {
 *     candidateId: string
 *     reportId: string
 *     status: 'pending' | 'clear' | 'consider'
 *   }
 * 
 * GET /api/integrations/checkr
 * - Auth: Required (chef, driver)
 * - Response: {
 *     status: 'pending' | 'clear' | 'consider' | 'not_started'
 *     reportId?: string
 *   }
 */

export async function POST(request: NextRequest) {
  try {
    const user = await requireRole(['chef', 'driver'])
    const body = await request.json()
    const { firstName, lastName, dateOfBirth, ssn, licenseNumber } = body

    if (!firstName || !lastName || !dateOfBirth || !ssn) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, lastName, dateOfBirth, ssn' },
        { status: 400 }
      )
    }

    if (user.role === 'driver' && !licenseNumber) {
      return NextResponse.json(
        { error: 'Driver license number is required for drivers' },
        { status: 400 }
      )
    }

    if (!process.env.CHECKR_API_KEY) {
      console.warn('Checkr not configured, returning mock background check')
      
      // Store mock data
      const supabase = createServerClient()
      const table = user.role === 'chef' ? 'chefs' : 'drivers'
      
      await supabase
        .from(table)
        .update({
          background_check_status: 'pending',
          background_check_id: 'mock_report_' + user.id
        })
        .eq('id', user.id)

      return NextResponse.json({
        candidateId: 'mock_candidate_' + user.id,
        reportId: 'mock_report_' + user.id,
        status: 'pending',
        mock: true,
        message: 'Configure CHECKR_API_KEY in .env.local to enable real background checks'
      })
    }

    // In production, integrate with Checkr API
    // const checkr = require('checkr')
    // checkr.setApiKey(process.env.CHECKR_API_KEY)
    
    // const candidate = await checkr.Candidate.create({
    //   email: user.email,
    //   first_name: firstName,
    //   last_name: lastName,
    //   dob: dateOfBirth,
    //   ssn: ssn,
    //   driver_license_number: licenseNumber,
    //   driver_license_state: 'DE'
    // })
    
    // const report = await checkr.Report.create({
    //   candidate_id: candidate.id,
    //   package: user.role === 'driver' ? 'driver_pro' : 'basic_criminal'
    // })

    return NextResponse.json({
      candidateId: 'mock_candidate_' + user.id,
      reportId: 'mock_report_' + user.id,
      status: 'pending',
      mock: true
    })

  } catch (error: any) {
    console.error('Checkr API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message?.includes('Unauthorized') ? 401 : 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await requireRole(['chef', 'driver'])
    const supabase = createServerClient()
    const table = user.role === 'chef' ? 'chefs' : 'drivers'

    const { data: profileData } = await supabase
      .from(table)
      .select('background_check_status, background_check_id')
      .eq('id', user.id)
      .single()

    return NextResponse.json({
      status: profileData?.background_check_status || 'not_started',
      reportId: profileData?.background_check_id || null,
      mock: !process.env.CHECKR_API_KEY
    })

  } catch (error: any) {
    console.error('Get Checkr status API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message?.includes('Unauthorized') ? 401 : 500 }
    )
  }
}
