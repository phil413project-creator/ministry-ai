'use client'
import Link from 'next/link'

export default function Home() {
  const today = new Date()
  const dayNames = ['일','월','화','수','목','금','토']
  const dateStr = `${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일 ${dayNames[today.getDay()]}요일`

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(160deg,#fdf8f0 0%,#fef5ea 40%,#fef0e8 70%,#fdf4f0 100%)', position:'relative', overflow:'hidden' }}>

      {/* BG orbs */}
      <div style={{ position:'fixed', top:'-100px', right:'-100px', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle,rgba(200,149,106,.08) 0%,transparent 70%)', pointerEvents:'none', zIndex:0 }}/>
      <div style={{ position:'fixed', bottom:'-80px', left:'-80px', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle,rgba(90,171,120,.07) 0%,transparent 70%)', pointerEvents:'none', zIndex:0 }}/>

      {/* Header */}
      <header style={{ position:'relative', zIndex:10, background:'rgba(255,255,255,.65)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(200,149,106,.12)', padding:'1rem 2.5rem', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'.9rem' }}>
          <div style={{ color:'#c8956a', animation:'float 3.5s ease-in-out infinite' }}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <rect x="10" y="1" width="6" height="24" rx="3" fill="currentColor"/>
              <rect x="1" y="8" width="24" height="6" rx="3" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily:"'Noto Serif KR',serif", fontWeight:900, color:'#7c5c3e', fontSize:'1.15rem', letterSpacing:'-.3px' }}>목회자 AI 도우미</div>
            <div style={{ color:'#c0a070', fontSize:'.7rem', letterSpacing:'.08em', fontWeight:300 }}>MINISTRY AI ASSISTANT</div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'.5rem', background:'rgba(255,255,255,.5)', borderRadius:'20px', padding:'.45rem 1rem', border:'1px solid rgba(200,149,106,.15)' }}>
          <span>☀️</span>
          <span style={{ color:'#b89a7a', fontSize:'.78rem', fontWeight:500 }}>{dateStr}</span>
        </div>
      </header>

      <main style={{ position:'relative', zIndex:1, maxWidth:'960px', margin:'0 auto', padding:'4rem 1.5rem 5rem' }}>

        {/* Hero */}
        <div style={{ textAlign:'center', marginBottom:'4rem', animation:'fadeUp .7s ease both' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', background:'linear-gradient(135deg,rgba(200,149,106,.12),rgba(200,149,106,.06))', border:'1px solid rgba(200,149,106,.25)', borderRadius:'20px', padding:'.45rem 1.1rem', marginBottom:'1.8rem', color:'#c8956a', fontSize:'.78rem', fontWeight:600 }}>
            ✦ 소형교회 사역자를 위한 AI 도구
          </div>
          <h1 style={{ fontFamily:"'Noto Serif KR',serif", fontSize:'clamp(2rem,5vw,3rem)', fontWeight:900, color:'#4c3020', lineHeight:1.25, marginBottom:'1.2rem', letterSpacing:'-.5px' }}>
            말씀을 더 깊이,<br/>
            <span style={{ background:'linear-gradient(135deg,#c8956a 0%,#e8b890 45%,#c8956a 90%)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:'shimmer 4s linear infinite' }}>사역을 더 풍성하게</span>
          </h1>
          <p style={{ color:'#9b7a5a', fontSize:'1.02rem', lineHeight:1.85, maxWidth:'500px', margin:'0 auto', fontWeight:300 }}>
            AI의 도움으로 설교 준비와 주일학교 교육을<br/>더 깊고 창의적으로 만들어드립니다
          </p>
        </div>

        {/* Cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(360px,1fr))', gap:'1.8rem', marginBottom:'3.5rem' }}>

          {/* Sermon Card */}
          <Link href="/sermon" style={{ textDecoration:'none' }}>
            <div className="card-hover" style={{ background:'linear-gradient(145deg,rgba(255,255,255,.92),rgba(255,245,230,.85))', borderRadius:'28px', padding:'2.2rem', border:'1px solid rgba(200,149,106,.18)', boxShadow:'0 10px 50px rgba(200,149,106,.1),inset 0 1px 0 rgba(255,255,255,.9)', cursor:'pointer', animation:'fadeUp .7s .1s ease both', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg,transparent,rgba(200,149,106,.35),transparent)' }}/>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'1.8rem' }}>
                <div style={{ width:'64px', height:'64px', borderRadius:'20px', background:'linear-gradient(135deg,#f5dec8,#edcc98)', display:'flex', alignItems:'center', justifyContent:'center', color:'#c8956a', boxShadow:'0 6px 20px rgba(200,149,106,.2)' }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M14 6C14 6 10 4 4 4v18c6 0 10 2 10 2s4-2 10-2V4c-6 0-10 2-10 2z"/>
                    <line x1="14" y1="6" x2="14" y2="26"/><line x1="7" y1="10" x2="12" y2="10"/><line x1="7" y1="14" x2="12" y2="14"/>
                  </svg>
                </div>
                <div style={{ background:'rgba(200,149,106,.1)', border:'1px solid rgba(200,149,106,.2)', borderRadius:'20px', padding:'.3rem .8rem', color:'#c8956a', fontSize:'.72rem', fontWeight:600 }}>✦ Gemini AI</div>
              </div>
              <h2 style={{ fontFamily:"'Noto Serif KR',serif", fontSize:'1.4rem', fontWeight:700, color:'#5c3d2a', marginBottom:'.7rem' }}>설교 연구 지원</h2>
              <p style={{ color:'#9b7a5a', fontSize:'.88rem', lineHeight:1.75, marginBottom:'1.6rem' }}>성경 본문이나 주제를 입력하면 배경 설명, 원어 풀이, 3대지 설교 구조, 삶의 적용점을 AI가 체계적으로 분석해드립니다.</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'.45rem', marginBottom:'1.8rem' }}>
                {['📜 본문 배경','🔤 원어 풀이','🏛️ 3대지 설교','🌱 적용점 3가지'].map(t=>(
                  <span key={t} style={{ background:'rgba(200,149,106,.08)', color:'#b87850', fontSize:'.74rem', padding:'.28rem .65rem', borderRadius:'10px', border:'1px solid rgba(200,149,106,.15)' }}>{t}</span>
                ))}
              </div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ color:'#c8956a', fontSize:'.9rem', fontWeight:700 }}>연구 시작하기</span>
                <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'linear-gradient(135deg,#c8956a,#a86840)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 3px 12px rgba(200,149,106,.3)' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Sunday School Card */}
          <Link href="/sunday-school" style={{ textDecoration:'none' }}>
            <div className="card-hover" style={{ background:'linear-gradient(145deg,rgba(255,255,255,.92),rgba(235,252,244,.85))', borderRadius:'28px', padding:'2.2rem', border:'1px solid rgba(80,171,120,.18)', boxShadow:'0 10px 50px rgba(80,171,120,.09),inset 0 1px 0 rgba(255,255,255,.9)', cursor:'pointer', animation:'fadeUp .7s .2s ease both', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg,transparent,rgba(80,171,120,.35),transparent)' }}/>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'1.8rem' }}>
                <div style={{ width:'64px', height:'64px', borderRadius:'20px', background:'linear-gradient(135deg,#c0ead8,#90d8b0)', display:'flex', alignItems:'center', justifyContent:'center', color:'#3a9a6a', boxShadow:'0 6px 20px rgba(80,171,120,.2)' }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <rect x="2" y="4" width="24" height="20" rx="3"/><circle cx="9" cy="11" r="2.5"/>
                    <path d="M2 20l7-7 5 5 3-3 6 5"/><path d="M20 4v6M17 7h6" strokeWidth="1.6"/>
                  </svg>
                </div>
                <div style={{ background:'rgba(80,171,120,.1)', border:'1px solid rgba(80,171,120,.2)', borderRadius:'20px', padding:'.3rem .8rem', color:'#5aab7e', fontSize:'.72rem', fontWeight:600 }}>✦ DALL-E 3</div>
              </div>
              <h2 style={{ fontFamily:"'Noto Serif KR',serif", fontSize:'1.4rem', fontWeight:700, color:'#1a5c34', marginBottom:'.7rem' }}>주일학교 이미지 생성</h2>
              <p style={{ color:'#4a8a5a', fontSize:'.88rem', lineHeight:1.75, marginBottom:'1.6rem' }}>성경 이야기를 입력하고 원하는 스타일을 고르면 아이들이 좋아할 일러스트를 즉시 생성하고 다운로드할 수 있습니다.</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'.45rem', marginBottom:'1.8rem' }}>
                {['📖 동화 스타일','🧸 3D 캐릭터','🎨 수채화','✨ 플랫 일러스트'].map(t=>(
                  <span key={t} style={{ background:'rgba(80,171,120,.08)', color:'#3a8a5a', fontSize:'.74rem', padding:'.28rem .65rem', borderRadius:'10px', border:'1px solid rgba(80,171,120,.15)' }}>{t}</span>
                ))}
              </div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ color:'#5aab7e', fontSize:'.9rem', fontWeight:700 }}>이미지 만들기</span>
                <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'linear-gradient(135deg,#5aab7e,#3a8a5e)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 3px 12px rgba(80,171,120,.3)' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Info Banner */}
        <div style={{ background:'linear-gradient(135deg,rgba(255,255,255,.65),rgba(255,248,238,.6))', borderRadius:'20px', padding:'1.6rem 2rem', border:'1px solid rgba(200,149,106,.15)', animation:'fadeUp .7s .35s ease both', display:'flex', gap:'1.2rem', alignItems:'flex-start' }}>
          <div style={{ fontSize:'2rem', flexShrink:0 }}>🔑</div>
          <div>
            <div style={{ fontFamily:"'Noto Serif KR',serif", fontWeight:600, color:'#7c5c3e', marginBottom:'.35rem' }}>API 키 설정 안내</div>
            <div style={{ color:'#b89a7a', fontSize:'.83rem', lineHeight:1.75 }}>
              Vercel 프로젝트 설정 → <strong>Environment Variables</strong>에서<br/>
              <code style={{ background:'rgba(200,149,106,.1)', padding:'.1rem .4rem', borderRadius:'4px', fontSize:'.8rem' }}>GEMINI_API_KEY</code> 와 <code style={{ background:'rgba(80,171,120,.1)', padding:'.1rem .4rem', borderRadius:'4px', fontSize:'.8rem' }}>OPENAI_API_KEY</code> 를 등록하세요.
            </div>
          </div>
        </div>

        <div style={{ textAlign:'center', marginTop:'3rem', animation:'fadeUp .7s .45s ease both' }}>
          <div style={{ display:'inline-block', padding:'1rem 2rem', borderRadius:'16px', background:'rgba(255,255,255,.4)', border:'1px solid rgba(200,149,106,.1)' }}>
            <div style={{ color:'#c8b090', fontSize:'.82rem', fontStyle:'italic', lineHeight:1.8, fontFamily:"'Noto Serif KR',serif" }}>
              "내가 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라"
            </div>
            <div style={{ color:'#c8a070', fontSize:'.72rem', marginTop:'.3rem', fontWeight:500 }}>빌립보서 4:13</div>
          </div>
        </div>
      </main>
    </div>
  )
}
