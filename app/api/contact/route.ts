import { NextRequest, NextResponse } from 'next/server'
import { sendContactFormEmail } from '@/lib/email'

interface ContactData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  contactType: 'buyer' | 'seller' | 'investor' | 'general'
  toEmail: string
}

function isValidContactData(obj: unknown): obj is ContactData {
  return (
    !!obj &&
    typeof obj === 'object' &&
    typeof (obj as ContactData).name === 'string' &&
    typeof (obj as ContactData).email === 'string' &&
    typeof (obj as ContactData).phone === 'string' &&
    typeof (obj as ContactData).subject === 'string' &&
    typeof (obj as ContactData).message === 'string' &&
    typeof (obj as ContactData).contactType === 'string' &&
    typeof (obj as ContactData).toEmail === 'string' &&
    ['buyer', 'seller', 'investor', 'general'].includes((obj as ContactData).contactType)
  )
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!isValidContactData(data)) {
      return NextResponse.json({ error: 'Invalid contact data format' }, { status: 400 })
    }

    const { name, email, phone, subject, message, contactType, toEmail } = data

    const emailResult = await sendContactFormEmail(
      { name, email, phone, subject, message, contactType },
      toEmail
    )

    if (!emailResult.success) {
      console.error('Contact form email failed:', emailResult.error)
      return NextResponse.json({ error: 'Failed to send contact message' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Contact message sent successfully',
      toEmail,
    })
  } catch (error) {
    console.error('Error processing contact:', error)
    return NextResponse.json({ error: 'Failed to send contact message' }, { status: 500 })
  }
}
