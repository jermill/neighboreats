/**
 * Email Helper
 * 
 * Server-side helper for sending emails via SendGrid API
 */

export async function sendEmail(
  to: string,
  template: string,
  data: Record<string, any>
) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const response = await fetch(
      `${baseUrl}/api/integrations/sendgrid/send`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, template, data })
      }
    )
    return await response.json()
  } catch (error) {
    console.error('Send email helper error:', error)
    return { success: false, error }
  }
}
