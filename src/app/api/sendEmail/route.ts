import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(1, { message: 'Phone is required' }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const lead = leadSchema.parse(body);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'mattheus.l08@gmail.com',
      subject: 'Novo Lead Capturado',
      text: `Nome: ${lead.name}\nEmail: ${lead.email}\nTelefone: ${lead.phone}`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Lead captured and email sent successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
