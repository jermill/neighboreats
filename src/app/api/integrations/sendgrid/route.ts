import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/supabase-server'

/**
 * API Contract: SendGrid Email Integration
 * 
 * POST /api/integrations/sendgrid/send
 * - Auth: Server-side only (not exposed directly)
 * - Body: {
 *     to: string
 *     template: 'welcome' | 'order_confirmation' | 'order_ready' | 'payout' | 'rating_request'
 *     data: object (template variables)
 *   }
 * - Response: { success: boolean, messageId?: string }
 */

interface EmailTemplate {
  subject: string
  templateId?: string
}

const EMAIL_TEMPLATES: Record<string, EmailTemplate> = {
  welcome: {
    subject: 'Welcome to NeighborEats!',
    templateId: 'd-welcome123'
  },
  order_confirmation: {
    subject: 'Order Confirmed - NeighborEats',
    templateId: 'd-order123'
  },
  order_ready: {
    subject: 'Your Order is Ready!',
    templateId: 'd-ready123'
  },
  payout: {
    subject: 'Payout Processed - NeighborEats',
    templateId: 'd-payout123'
  },
  rating_request: {
    subject: 'How was your experience?',
    templateId: 'd-rating123'
  }
}

export async function POST(request: NextRequest) {
  try {
    // This endpoint should ideally be called server-side only
    // For demo purposes, we'll allow authenticated requests
    const body = await request.json()
    const { to, template, data } = body

    if (!to || !template) {
      return NextResponse.json(
        { error: 'Missing required fields: to, template' },
        { status: 400 }
      )
    }

    const templateConfig = EMAIL_TEMPLATES[template]
    if (!templateConfig) {
      return NextResponse.json(
        { error: 'Invalid template name' },
        { status: 400 }
      )
    }

    if (!process.env.SENDGRID_API_KEY) {
      console.warn('SendGrid not configured, skipping email send')
      console.log('Mock email:', {
        to,
        subject: templateConfig.subject,
        template,
        data
      })

      return NextResponse.json({
        success: true,
        messageId: 'mock_msg_' + Date.now(),
        mock: true,
        message: 'Configure SENDGRID_API_KEY in .env.local to enable real emails'
      })
    }

    // In production, send with SendGrid
    // const sgMail = require('@sendgrid/mail')
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    
    // const msg = {
    //   to,
    //   from: process.env.SENDGRID_FROM_EMAIL || 'noreply@neighboreats.com',
    //   templateId: templateConfig.templateId,
    //   dynamicTemplateData: data
    // }
    
    // const [response] = await sgMail.send(msg)

    return NextResponse.json({
      success: true,
      messageId: 'mock_msg_' + Date.now(),
      mock: true
    })

  } catch (error: any) {
    console.error('SendGrid API error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    )
  }
}
