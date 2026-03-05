'use client'
import { useState } from 'react'
import Link from 'next/link'

const IMAGE_STYLES = [
  { id:'storybook', label:'📖 어린이 성경 동화 스타일', en:"children's bible storybook illustration, soft watercolor, gentle pastel colors, Sunday school art, warm and inviting, hand-drawn feel" },
  { id:'3d',        label:'🧸 귀여운 3D 캐릭터 스타일',  en:"cute 3D cartoon character style, Pixar-inspired, soft lighting, cheerful vibrant colors, child-friendly, high quality 3D render, adorable" },
  { id:'pastel',    label:'🎨 파스텔 수채화 스타일',      en:"soft pastel watercolor illustration, delicate brush strokes, dreamy soft colors, gentle impressionistic bible art for children, serene" },
  { id:'flat',      label:'✨ 귀여운 플랫 일러스트',      en:"cute flat vector illustration, bold clean outlines, vibrant friendly colors, simple shapes, kawaii style, modern children's book art" },
]

const EXAMPLES = ['노아와 방주, 귀여운 동물들','예수님과 어린이들','다윗과 골리앗','선한 사마리아인','오병이어 기적']

export default function SundaySchoolPage() {
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('storybook')
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')
  const [revised, setRevised] = useState('')

  async function generateImage() {
    if (!prompt.trim()) return
    setLoading(true); setImageUrl(''); setError(''); setRevised('')
    const style = IMAGE_STYLES.find(s => s.id === selectedStyle)!
    try {
      const resp = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, styleEn: style.en }),
      })
      const data = await resp.json()
      if (data.error) throw new Error(data.error)
      setImageUrl(data.url)
      setRevised(data.revised_prompt || '')
    } catch (e: any) {
      setError(`오류: ${e.message}`)
    }
    setLoading(false)
  }

  async function downloadImage() {
    if (!imageUrl) return
    try {
      const resp = await fetch(imageUrl)
      const blob = await resp.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = `sunday-school-${Date.now()}.png`; a.click()
      URL.revokeObjectURL(url)
    } catch {
      window.open(imageUrl, '_blank')
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(150deg,#f0faf4 0%,#e8f6f0 50%,#f0f4ff 100%)' }}>

      <header style={{ position:'sticky', top:0, zIndex:20, background:'rgba(255,255,255,.72)', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(80,171,120,.15)', padding:'1rem 2rem', display:'flex', alignItems:'center', gap:'1rem' }}>
        <Link href="/" className="btn-press" style={{ display:'flex', alignItems:'center', gap:'.5rem', background:'rgba(80,171,120,.1)', border:'none', borderRadius:'10px', padding:'.5rem .9rem', cursor:'pointer', color:'#3a8a5a', fontSize:'.84rem', textDecoration:'none' }}>
          ← 대시보드
        </Link>
        <div style={{ color:'#5aab7e' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <rect x="2" y="4" width="24" height="20" rx="3"/><circle cx="9" cy="11" r="2.5"/>
            <path d="M2 20l7-7 5 5 3-3 6 5"/><path d="M20 4v6M17 7h6" strokeWidth="1.6"/>
          </svg>
        </div>
        <div>
          <div style={{ fontFamily:"'Noto Serif KR',serif", fontWeight:700, color:'#2a6a44', fontSize:'1.1rem' }}>주일학교 이미지 생성</div>
          <div style={{ color:'#6aab80', fontSize:'.72rem' }}>Powered by OpenAI DALL-E 3</div>
        </div>
      </header>

      <main style={{ maxWidth:'820px', margin:'0 auto', padding:'2.5rem 1.5rem 5rem' }}>

        {/* Style Selector */}
        <div style={{ background:'rgba(255,255,255,.82)', borderRadius:'22px', padding:'1.8rem', boxShadow:'0 6px 40px rgba(80,171,120,.1)', border:'1px solid rgba(80,171,120,.15)', marginBottom:'1.2rem', animation:'fadeUp .55s ease both' }}>
          <label style={{ display:'block', color:'#3a7a50', fontSize:'.85rem', fontWeight:600, marginBottom:'1rem' }}>🎨 이미지 스타일 선택</label>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'.65rem' }}>
            {IMAGE_STYLES.map(s => (
              <button key={s.id} onClick={() => setSelectedStyle(s.id)} className="btn-press"
                style={{ padding:'.85rem 1rem', borderRadius:'14px', border:`2px solid ${selectedStyle===s.id?'#5aab7e':'rgba(80,171,120,.2)'}`, background:selectedStyle===s.id?'linear-gradient(135deg,#5aab7e,#3a8a5e)':'rgba(255,255,255,.6)', color:selectedStyle===s.id?'#fff':'#3a7a50', fontSize:'.84rem', fontWeight:selectedStyle===s.id?700:400, cursor:'pointer', fontFamily:"'Noto Sans KR',sans-serif", textAlign:'left', boxShadow:selectedStyle===s.id?'0 3px 12px rgba(80,171,120,.25)':'none', lineHeight:1.4 }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Input */}
        <div style={{ background:'rgba(255,255,255,.82)', borderRadius:'22px', padding:'1.8rem', boxShadow:'0 6px 40px rgba(80,171,120,.1)', border:'1px solid rgba(80,171,120,.15)', marginBottom:'1.4rem', animation:'fadeUp .6s ease both' }}>
          <label style={{ display:'block', color:'#3a7a50', fontSize:'.85rem', fontWeight:600, marginBottom:'.8rem' }}>🌟 이미지 설명 입력</label>
          <div style={{ display:'flex', gap:'.45rem', flexWrap:'wrap', marginBottom:'.8rem' }}>
            {EXAMPLES.map(ex => (
              <button key={ex} onClick={() => setPrompt(ex)} className="btn-press"
                style={{ padding:'.32rem .7rem', borderRadius:'20px', border:'1px solid rgba(80,171,120,.3)', background:'rgba(80,171,120,.06)', color:'#3a8a5a', fontSize:'.75rem', cursor:'pointer', fontFamily:"'Noto Sans KR',sans-serif" }}>
                {ex}
              </button>
            ))}
          </div>
          <textarea value={prompt} onChange={e => setPrompt(e.target.value)}
            placeholder={'예시:\n• 예수님이 물 위를 걷고, 베드로가 손을 내밀고 있는 장면\n• 노아의 방주에 코끼리, 기린이 줄 서서 올라가는 귀여운 장면\n• 어린 다윗이 거대한 골리앗 앞에 당당히 서 있는 장면'}
            style={{ width:'100%', minHeight:'130px', padding:'1rem 1.1rem', borderRadius:'14px', border:'1.5px solid rgba(80,171,120,.22)', background:'rgba(248,255,252,.95)', color:'#3a5c4a', fontSize:'.95rem', lineHeight:1.85, fontFamily:"'Noto Sans KR',sans-serif", resize:'vertical', transition:'border-color .2s' }}
            onFocus={e => e.currentTarget.style.borderColor='#5aab7e'}
            onBlur={e => e.currentTarget.style.borderColor='rgba(80,171,120,.22)'}
          />
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'1.1rem', flexWrap:'wrap', gap:'.8rem' }}>
            <div style={{ fontSize:'.78rem', color:'#7ab888' }}>한국어로 자유롭게 입력 — 자동으로 AI 프롬프트 변환</div>
            <button onClick={generateImage} disabled={loading || !prompt.trim()} className="btn-press"
              style={{ display:'flex', alignItems:'center', gap:'.5rem', padding:'.85rem 2rem', background:(!prompt.trim()||loading)?'rgba(80,171,120,.3)':'linear-gradient(135deg,#7ac898,#5aab7e,#3a8a5e)', color:'#fff', border:'none', borderRadius:'14px', fontSize:'.95rem', fontWeight:700, cursor:(!prompt.trim()||loading)?'not-allowed':'pointer', fontFamily:"'Noto Sans KR',sans-serif", boxShadow:loading?'none':'0 4px 16px rgba(80,171,120,.3)' }}>
              {loading
                ? <><span style={{ animation:'spin 1s linear infinite', display:'inline-block' }}>⟳</span> 생성 중 (15-30초)...</>
                : <>★ 이미지 생성</>}
            </button>
          </div>
        </div>

        {error && <div style={{ background:'#fff5f5', border:'1px solid #f5c6cb', borderRadius:'14px', padding:'1rem 1.5rem', color:'#c0392b', marginBottom:'1.4rem', fontSize:'.88rem' }}>{error}</div>}

        {/* Loading skeleton */}
        {loading && (
          <div style={{ background:'rgba(255,255,255,.8)', borderRadius:'22px', padding:'2rem', border:'1px solid rgba(80,171,120,.15)', textAlign:'center' }}>
            <div style={{ width:'100%', aspectRatio:'1/1', borderRadius:'16px', background:'linear-gradient(90deg,#f0f9f4 25%,#e0f4ea 50%,#f0f9f4 75%)', backgroundSize:'200% 100%', animation:'shimmer 1.5s infinite', marginBottom:'1.2rem', maxHeight:'360px' }}/>
            <div style={{ color:'#5a9a6a', fontSize:'.9rem', animation:'pulse 1.5s infinite' }}>🎨 DALL-E 3가 이미지를 그리고 있습니다...</div>
          </div>
        )}

        {/* Result */}
        {imageUrl && !loading && (
          <div style={{ background:'rgba(255,255,255,.88)', borderRadius:'22px', padding:'1.8rem', boxShadow:'0 8px 40px rgba(80,171,120,.15)', border:'1px solid rgba(80,171,120,.18)', animation:'fadeUp .5s ease both' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.2rem', flexWrap:'wrap', gap:'.8rem' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'.7rem' }}>
                <span style={{ fontSize:'1.3rem' }}>🎉</span>
                <h3 style={{ fontFamily:"'Noto Serif KR',serif", color:'#2a6a44', fontSize:'1.05rem', fontWeight:700 }}>생성된 이미지</h3>
              </div>
              <button onClick={downloadImage} className="btn-press"
                style={{ display:'flex', alignItems:'center', gap:'.5rem', padding:'.65rem 1.3rem', background:'linear-gradient(135deg,#5aab7e,#3a8a5e)', color:'#fff', border:'none', borderRadius:'12px', cursor:'pointer', fontSize:'.85rem', fontWeight:600, fontFamily:"'Noto Sans KR',sans-serif", boxShadow:'0 3px 12px rgba(80,171,120,.25)' }}>
                ↓ 이미지 다운로드
              </button>
            </div>
            <div style={{ borderRadius:'16px', overflow:'hidden', boxShadow:'0 6px 30px rgba(0,0,0,.1)' }}>
              <img src={imageUrl} alt="Generated Sunday school illustration" style={{ width:'100%', display:'block' }}/>
            </div>
            {revised && (
              <details style={{ marginTop:'1rem' }}>
                <summary style={{ color:'#7ab888', fontSize:'.78rem', cursor:'pointer', fontWeight:500 }}>🔍 실제 사용된 AI 프롬프트 보기</summary>
                <p style={{ color:'#5a7a60', fontSize:'.78rem', lineHeight:1.65, marginTop:'.5rem', padding:'.8rem', background:'rgba(80,171,120,.06)', borderRadius:'10px' }}>{revised}</p>
              </details>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
