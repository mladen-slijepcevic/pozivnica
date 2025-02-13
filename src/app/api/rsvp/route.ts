import { NextResponse } from 'next/server'
import { z } from 'zod'
import emailjs from '@emailjs/browser'

const rsvpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  attending: z.boolean(),
  guests: z.number().min(0).max(4),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = rsvpSchema.parse(body)

    // Send email notification
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!,
      {
        to_name: "Jovanka & Mladen",
        from_name: validated.name,
        message: `RSVP from ${validated.name}
          Email: ${validated.email}
          Attending: ${validated.attending ? 'Yes' : 'No'}
          Number of guests: ${validated.guests}`,
      },
      process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred'
    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    )
  }
}
