import { NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function POST(req: Request) {
  try {
    const { prompt, services, bookedTimes = [] } = await req.json();

    const systemPrompt = `
      You are a clinical booking assistant. Your job is to extract booking information from the user's message.
      Available services: ${JSON.stringify(services)}
      
      IMPORTANT: The following slots are ALREADY BOOKED and cannot be suggested:
      ${JSON.stringify(bookedTimes)}
      
      Respond ONLY with a JSON object in this format:
      {
        "intent": "BOOKING" | "QUERY" | "UNKNOWN",
        "service_id": "the_id_of_the_service_if_found",
        "date": "YYYY-MM-DD",
        "time": "HH:MM",
        "notes": "any other details"
      }
      If you can't find a service, suggest the most likely one. Do not suggest a time that is in the ALREADY BOOKED list.
    `;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    return NextResponse.json(JSON.parse(data.choices[0].message.content));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
