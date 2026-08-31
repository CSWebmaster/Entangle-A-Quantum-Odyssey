import { NextResponse } from "next/server";

// In a real application, this would check a database
// For the purpose of this demonstration, we use a mock verification system.
const MOCK_VOLUNTEER_CODES: Record<string, { valid: boolean, name: string }> = {
  "V-12345": { valid: true, name: "Alice Quantum" },
  "V-98765": { valid: true, name: "Bob Entanglement" }
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { accessCode } = body;

    if (!accessCode) {
      return NextResponse.json({ error: "Access code is required" }, { status: 400 });
    }

    const volunteer = MOCK_VOLUNTEER_CODES[accessCode];

    if (volunteer && volunteer.valid) {
      return NextResponse.json({ 
        verified: true, 
        name: volunteer.name 
      });
    } else {
      return NextResponse.json({ 
        verified: false, 
        error: "Invalid or inactive volunteer access code" 
      }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
