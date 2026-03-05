import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { input } = await req.json()
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'Gemini API 키가 서버에 설정되지 않았습니다. Vercel 환경변수에 GEMINI_API_KEY를 추가해주세요.' }, { status: 500 })
  }

  const prompt = `당신은 한국 목회자를 돕는 성경 연구 전문가입니다.
아래 성경 본문 또는 주제를 깊이 연구하여, 반드시 아래 JSON 형식으로만 응답하세요.
다른 텍스트나 마크다운 코드블록 없이 순수 JSON만 출력하세요.

입력: ${input}

{
  "background": "본문의 역사적·문화적·신학적 배경 설명 200자 이상",
  "keywords": [
    {"word": "핵심단어1", "original": "히브리어/헬라어 원어", "meaning": "깊은 의미 설명"},
    {"word": "핵심단어2", "original": "원어", "meaning": "의미"},
    {"word": "핵심단어3", "original": "원어", "meaning": "의미"}
  ],
  "outline": {
    "title": "설교 제목",
    "intro": "서론 내용 2-3문장",
    "point1": {"heading": "대지 1 제목", "content": "내용 3-4문장"},
    "point2": {"heading": "대지 2 제목", "content": "내용 3-4문장"},
    "point3": {"heading": "대지 3 제목", "content": "내용 3-4문장"},
    "conclusion": "결론 내용 2-3문장"
  },
  "applications": [
    {"title": "적용점 1 제목", "desc": "구체적 적용 방법"},
    {"title": "적용점 2 제목", "desc": "구체적 적용 방법"},
    {"title": "적용점 3 제목", "desc": "구체적 적용 방법"}
  ]
}`

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 2000 }
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
