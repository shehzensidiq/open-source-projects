import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    if (!BREVO_API_KEY) {
      console.error('Brevo API key not found in environment variables.');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const brevoApiUrl = 'https://api.brevo.com/v3/contacts';

    const response = await fetch(brevoApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        emailBlacklisted: false,
        smsBlacklisted: false,
        listIds: [2], // Assuming a default list ID, you might need to change this
        updateEnabled: true, // Allow updating existing contacts
      }),
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Subscription successful!' }, { status: 200 });
    } else {
      const errorData = await response.json();
      console.error('Brevo API error:', errorData);
      return NextResponse.json({ error: errorData.message || 'Subscription failed' }, { status: response.status });
    }
  } catch (error) {
    console.error('Subscription API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
