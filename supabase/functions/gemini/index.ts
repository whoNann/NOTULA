// Supabase Edge Function: gemini
// Deno TypeScript untuk memproses Summarize & Fix Grammar secara aman

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get("GEMINI_API_KEY")
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY is not configured in Supabase Edge Secrets" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const { text, task } = await req.json()
    if (!text || !text.trim()) {
      return new Response(
        JSON.stringify({ error: "No text content provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    let prompt = ""
    if (task === 'summarize') {
      prompt = "Summarize the following note content concisely. Focus on key points, action items, and main ideas. Return the summary formatted with clean markdown bullet points. Do not include markdown outer wrappers or introductory chat remarks."
    } else if (task === 'grammar') {
      prompt = "Correct any grammar, punctuation, and spelling mistakes in the following text. Preserve the original Markdown styling, paragraphs, and structure exactly. Return ONLY the corrected text without any extra chat dialog, labels, or intros."
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid task parameter. Choose 'summarize' or 'grammar'" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // Call Google Gemini API
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${prompt}\n\n[Note Content]\n${text}`
              }
            ]
          }
        ]
      })
    })

    if (!response.ok) {
      const errText = await response.text()
      return new Response(
        JSON.stringify({ error: `Gemini API returned error: ${response.status}`, details: errText }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const data = await response.json()
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || ""

    return new Response(
      JSON.stringify({ result: generatedText }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
