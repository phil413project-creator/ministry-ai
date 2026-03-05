import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { prompt, styleEn } = await req.json()
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'OpenAI API 키가 서버에 설정되지 않았습니다. Vercel 환경변수에 OPENAI_API_KEY를 추가해주세요.' }, { status: 500 })
  }

  const fullPrompt = `${prompt}, ${styleEn}, no text overlay, no watermark, safe for children, bible scene`

  try {
    const resp = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: fullPrompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard'
      }),
    })
    const data = await resp.json()
    if (data.error) throw new Error(data.error.message)
    return NextResponse.json({
      url: data.data[0].url,
      revised_prompt: data.data[0].revised_prompt || ''
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
