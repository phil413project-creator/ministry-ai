import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { input } = await req.json()
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'Gemini API 키가 서버에 설정되지 않았습니다. Vercel 환경변수에 GEMINI_API_KEY를 추가해주세요.' }, { status: 500 })
  }

  const prompt = `당신은 한국 목회자를 돕는 성경 연구 전문가입니다.
아래 성경 본문 또는 주제를 연구하여, 반드시 아래 JSON 형식으로만 응답하세요.
마크다운 코드블록 없이 순수 JSON만 출력하세요. 각 텍스트는 간결하게 작성하세요.

입력: ${input}

{"background":"배경설명(100자)","keywords":[{"word":"단어1","original":"원어1","meaning":"의미1"},{"word":"단어2","original":"원어2","meaning":"의미2"},{"word":"단어3","original":"원어3","meaning":"의미3"}],"outline":{"title":"설교제목","intro":"서론 2문장","point1":{"heading":"대지1제목","content":"내용 2문장"},"point2":{"heading":"대지2제목","content":"내용 2문장"},"point3":{"heading":"대지3제목","content":"내용 2문장"},"conclusion":"결론 2문장"},"applications":[{"title":"적용1제목","desc":"적용1내용"},{"title":"적용2제목","desc":"적용2내용"},{"title":"적용3제목","desc":"적용3내용"}]}`

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192,
            responseMimeType: 'application/json'
          }
        }),
      }
    )
    const data = await resp.json()
    if (data.error) throw new Error(data.error.message)
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const clean = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const parsed = JSON.parse(clean)
    return NextResponse.json(parsed)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
