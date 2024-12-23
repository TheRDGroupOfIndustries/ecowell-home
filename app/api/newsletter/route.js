import { NextResponse } from 'next/server';
import { connectToMongoDB } from '@/utils/db';
import Newsletter from '@/models/Newsletter';
import User from '@/models/User';
import { transporter } from '@/app/api/core';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Check for disposable email domains
    const disposableDomains = ['yopmail.com', 'tempmail.com', 'guerrillamail.com']; // Add more as needed
    const emailDomain = email.split('@')[1];
    if (disposableDomains.includes(emailDomain)) {
      return NextResponse.json({ error: 'Disposable email addresses are not allowed' }, { status: 400 });
    }

    await connectToMongoDB();

    // Check if the email already exists in the Newsletter collection
    const existingSubscription = await Newsletter.findOne({ emails: email });
    if (existingSubscription) {
      return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 });
    }

    // Create a new user or get existing user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, role: 'user' });
    }

    // Add email to Newsletter collection
    await Newsletter.findOneAndUpdate(
      { userId: user._id },
      { $addToSet: { emails: email } },
      { upsert: true, new: true }
    );

    // Send confirmation email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Welcome to Our Newsletter',
      text: `Hello,

Thank you for subscribing to our newsletter! We're excited to have you on board.

Best regards,
Your Team`,
    });

    return NextResponse.json({ message: 'Subscription successful' }, { status: 200 });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}