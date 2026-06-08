import { NextResponse } from "next/server";

import { addToWaitlist, getWaitlist } from "@/lib/waitlist";

export async function GET() {
  const data = await getWaitlist();
  return NextResponse.json({ count: data.count });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      fullName?: string;
      email?: string;
      country?: string;
      skillInterest?: string;
      skillLevel?: string;
      commitmentPeriod?: string;
    };
    const fullName = body.fullName?.trim();
    const email = body.email?.trim();
    const country = body.country?.trim();
    const skillInterest = body.skillInterest?.trim();
    const skillLevel = body.skillLevel?.trim();
    const commitmentPeriod = body.commitmentPeriod?.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (!fullName || !country || !skillInterest || !skillLevel || !commitmentPeriod) {
      return NextResponse.json(
        { error: "Please complete every field before applying." },
        { status: 400 },
      );
    }

    const registration = {
      fullName,
      email,
      country,
      skillInterest,
      skillLevel,
      commitmentPeriod,
    };

    const data = await addToWaitlist({
      ...registration,
    });

    return NextResponse.json({
      count: data.count,
      message:
        "You're on the list. We'll reach out personally when your team is ready.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
