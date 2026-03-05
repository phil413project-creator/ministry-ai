'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function SermonPage() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  async function runResearch() {
    if (!input.trim()) return
    setLoading(true); setResult(null); setError('')
    try {
      const resp = await fetch('/api/sermon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      })
      const data = await resp.json()
      if (data.error) throw new Error(data.error)
      setResult(data)
    } catch (e: any) {
      setError(`오류: ${e.message}`)
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(150deg,#fdf8f0 0%,#fef3e8 60%,#fdf0eb 100%)' }}>

      <header style={{ position:'sticky', top:0, zIndex:20, background:'rgba(255,255,255,.72)', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(200,149,106,.15)', padding:'1rem 2rem', display:'flex', alignItems:'center', gap:'1rem' }}>
        <Link href="/" className="btn-press" style={{ display:'flex', alignItems:'center', gap:'.5rem', background:'rgba(200,149,106,.1)', border:'none', borderRadius:'10px', padding:'.5rem .9rem', cursor:'pointer', color:'#a07050', fontSize:'.84rem', textDecoration:'none' }}>
          ← 대시보드
        </Link>
        <div style={{ color:'#c8956a' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M14 6C14 6 10 4 4 4v18c6 0 10 2 10 2s4-2 10-2V4c-6 0-10 2-10 2z"/>
            <line x1="14" y1="6" x2="14" y2="26"/><line x1="7" y1="10" x2="12" y2="10"/><line x1="7" y1="14" x2="12" y2="14"/>
          </svg>
        </div>
        <div>
          <div style={{ fontFamily:"'Noto Serif KR',serif", fontWeight:700, color:'#7c5c3e', fontSize:'1.1rem' }}>설교 연구 지원</div>
          <div style={{ color:'#c0956a', fontSize:'.72rem' }}>Powered by Google Gemini</div>
        </div>
      </header>

      <main style={{ maxWidth:'820px', margin:'0 auto', padding:'2.5rem 1.5rem 5rem' }}>

        {/* Input Card */}
        <div style={{ background:'rgba(255,255,255,.82)', borderRadius:'22px', padding:'2rem', boxShadow:'0 6px 40px rgba(200,149,106,.12)', border:'1px solid rgba(200,149,106,.18)', marginBottom:'1.6rem', animation:'fadeUp .6s ease both' }}>
          <label style={{ display:'block', color:'#9b7a5a', fontSize:'.85rem', fontWeight:600, marginBottom:'.8rem' }}>
            📖 성경 본문 또는 설교 주제 입력
          </label>
          <textarea
            value={input} onChange={e => setInput(e.target.value)}
            placeholder={'예시:\n• 요한복음 3:16 — 하나님이 세상을 이처럼 사랑하사...\n• 시편 23편 전체\n• 주제: 고난 중의 소망\n• 마태복음 5:1-12 팔복'}
            style={{ width:'100%', minHeight:'170px', padding:'1.1rem 1.2rem', borderRadius:'14px', border:'1.5px solid rgba(200,149,106,.22)', background:'rgba(255,252,248,.95)', color:'#5c4a3a', fontSize:'1rem', lineHeight:1.85, fontFamily:"'Noto Sans KR',sans-serif", resize:'vertical', transition:'border-color .2s' }}
            onFocus={e => e.currentTarget.style.borderColor='#c8956a'}
            onBlur={e => e.currentTarget.style.borderColor='rgba(200,149,106,.22)'}
          />
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'1.2rem', flexWrap:'wrap', gap:'.8rem' }}>
            <div style={{ fontSize:'.78rem', color:'#c0a080' }}>본문, 주제, 단어 모두 입력 가능합니다</div>
            <button onClick={runResearch} disabled={loading || !input.trim()} className="btn-press"
              style={{ display:'flex', alignItems:'center', gap:'.5rem', padding:'.85rem 2rem', background:(!input.trim()||loading)?'rgba(200,149,106,.3)':'linear-gradient(135deg,#d4a574,#c8956a,#a86840)', color:'#fff', border:'none', borderRadius:'14px', fontSize:'.95rem', fontWeight:700, cursor:(!input.trim()||loading)?'not-allowed':'pointer', fontFamily:"'Noto Sans KR',sans-serif", boxShadow:loading?'none':'0 4px 16px rgba(200,149,106,.35)' }}>
              {loading
                ? <><span style={{ animation:'spin 1s linear infinite', display:'inline-block' }}>⟳</span> 연구 중...</>
                : <>★ 연구 시작</>}
            </button>
          </div>
        </div>

        {error && <div style={{ background:'#fff5f5', border:'1px solid #f5c6cb', borderRadius:'14px', padding:'1rem 1.5rem', color:'#c0392b', marginBottom:'1.4rem', fontSize:'.88rem' }}>{error}</div>}

        {result && (
          <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem', animation:'fadeUp .5s ease both' }}>

            {/* Background */}
            <div style={{ background:'linear-gradient(135deg,rgba(255,248,238,.95),rgba(255,255,255,.9))', borderRadius:'20px', padding:'1.8rem', border:'1px solid rgba(200,149,106,.18)', boxShadow:'0 4px 24px rgba(200,149,106,.08)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'.7rem', marginBottom:'1rem' }}>
                <div style={{ width:'38px', height:'38px', borderRadius:'12px', background:'linear-gradient(135deg,#f5dfc0,#f0cfa0)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem' }}>📜</div>
                <h3 style={{ fontFamily:"'Noto Serif KR',serif", color:'#7c5c3e', fontSize:'1.05rem', fontWeight:700 }}>본문 배경 설명</h3>
              </div>
              <p style={{ color:'#6a4f3a', lineHeight:2, fontSize:'.93rem' }}>{result.background}</p>
            </div>

            {/* Keywords */}
            <div style={{ background:'linear-gradient(135deg,rgba(255,245,225,.95),rgba(255,255,255,.9))', borderRadius:'20px', padding:'1.8rem', border:'1px solid rgba(200,149,106,.18)', boxShadow:'0 4px 24px rgba(200,149,106,.08)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'.7rem', marginBottom:'1.2rem' }}>
                <div style={{ width:'38px', height:'38px', borderRadius:'12px', background:'linear-gradient(135deg,#e8d0a0,#d8c080)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem' }}>🔤</div>
                <h3 style={{ fontFamily:"'Noto Serif KR',serif", color:'#7c5c3e', fontSize:'1.05rem', fontWeight:700 }}>핵심 단어 뜻풀이</h3>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'.8rem' }}>
                {result.keywords?.map((kw: any, i: number) => (
                  <div key={i} style={{ background:'rgba(255,255,255,.7)', borderRadius:'12px', padding:'1rem 1.2rem', border:'1px solid rgba(200,149,106,.12)', animation:`slideIn .4s ${i*.08}s ease both` }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'.8rem', marginBottom:'.4rem', flexWrap:'wrap' }}>
                      <span style={{ fontFamily:"'Noto Serif KR',serif", fontWeight:700, color:'#a06840', fontSize:'1rem' }}>{kw.word}</span>
                      <span style={{ background:'rgba(200,149,106,.12)', color:'#c8956a', fontSize:'.75rem', padding:'.2rem .6rem', borderRadius:'8px', fontStyle:'italic' }}>{kw.original}</span>
                    </div>
                    <p style={{ color:'#7a5a40', fontSize:'.88rem', lineHeight:1.7 }}>{kw.meaning}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Outline */}
            <div style={{ background:'linear-gradient(135deg,rgba(248,240,255,.9),rgba(255,255,255,.9))', borderRadius:'20px', padding:'1.8rem', border:'1px solid rgba(160,100,200,.15)', boxShadow:'0 4px 24px rgba(160,100,180,.06)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'.7rem', marginBottom:'1.3rem' }}>
                <div style={{ width:'38px', height:'38px', borderRadius:'12px', background:'linear-gradient(135deg,#e0c8f8,#d0b0f0)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem' }}>🏛️</div>
                <div>
                  <h3 style={{ fontFamily:"'Noto Serif KR',serif", color:'#6a3a8c', fontSize:'1.05rem', fontWeight:700 }}>3대지 설교 개요</h3>
                  {result.outline?.title && <div style={{ color:'#a080c0', fontSize:'.8rem', marginTop:'.15rem' }}>{result.outline.title}</div>}
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'.7rem' }}>
                <div style={{ background:'rgba(255,255,255,.6)', borderRadius:'12px', padding:'1rem 1.2rem', borderLeft:'3px solid #c0a0e0' }}>
                  <div style={{ fontSize:'.73rem', color:'#a080c0', fontWeight:600, marginBottom:'.3rem' }}>서론</div>
                  <p style={{ color:'#5a4070', fontSize:'.88rem', lineHeight:1.75 }}>{result.outline?.intro}</p>
                </div>
                {([1,2,3] as const).map(n => {
                  const pt = result.outline?.[`point${n}`]
                  const colors = ['#d4a0e8','#b890d8','#a080c8']
                  return pt ? (
                    <div key={n} style={{ background:'rgba(255,255,255,.6)', borderRadius:'12px', padding:'1rem 1.2rem', borderLeft:`3px solid ${colors[n-1]}`, animation:`slideIn .4s ${n*.08}s ease both` }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'.5rem', marginBottom:'.4rem' }}>
                        <span style={{ width:'22px', height:'22px', borderRadius:'50%', background:colors[n-1], color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:'.74rem', fontWeight:700, flexShrink:0 }}>{n}</span>
                        <span style={{ fontFamily:"'Noto Serif KR',serif", fontWeight:700, color:'#5a3070', fontSize:'.95rem' }}>{pt.heading}</span>
                      </div>
                      <p style={{ color:'#5a4070', fontSize:'.88rem', lineHeight:1.75, paddingLeft:'1.7rem' }}>{pt.content}</p>
                    </div>
                  ) : null
                })}
                <div style={{ background:'rgba(255,255,255,.6)', borderRadius:'12px', padding:'1rem 1.2rem', borderLeft:'3px solid #9070b8' }}>
                  <div style={{ fontSize:'.73rem', color:'#a080c0', fontWeight:600, marginBottom:'.3rem' }}>결론</div>
                  <p style={{ color:'#5a4070', fontSize:'.88rem', lineHeight:1.75 }}>{result.outline?.conclusion}</p>
                </div>
              </div>
            </div>

            {/* Applications */}
            <div style={{ background:'linear-gradient(135deg,rgba(232,248,240,.95),rgba(255,255,255,.9))', borderRadius:'20px', padding:'1.8rem', border:'1px solid rgba(80,160,120,.15)', boxShadow:'0 4px 24px rgba(80,160,100,.07)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'.7rem', marginBottom:'1.2rem' }}>
                <div style={{ width:'38px', height:'38px', borderRadius:'12px', background:'linear-gradient(135deg,#b8e8c8,#90d8a8)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem' }}>🌱</div>
                <h3 style={{ fontFamily:"'Noto Serif KR',serif", color:'#2a6a4a', fontSize:'1.05rem', fontWeight:700 }}>삶의 적용점 3가지</h3>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'.8rem' }}>
                {result.applications?.map((ap: any, i: number) => (
                  <div key={i} style={{ background:'rgba(255,255,255,.7)', borderRadius:'12px', padding:'1rem 1.2rem', border:'1px solid rgba(80,160,120,.12)', display:'flex', gap:'1rem', alignItems:'flex-start', animation:`slideIn .4s ${i*.08}s ease both` }}>
                    <div style={{ width:'28px', height:'28px', borderRadius:'8px', background:['#90d8b8','#70c8a0','#50b888'][i], color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.8rem', fontWeight:700, flexShrink:0, marginTop:'.1rem' }}>{i+1}</div>
                    <div>
                      <div style={{ fontWeight:700, color:'#2a6a4a', fontSize:'.92rem', marginBottom:'.3rem' }}>{ap.title}</div>
                      <p style={{ color:'#4a7a5a', fontSize:'.87rem', lineHeight:1.75 }}>{ap.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  )
}
