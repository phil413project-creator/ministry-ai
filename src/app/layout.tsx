import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '목회자 AI 도우미',
  description: '소형교회 사역자를 위한 AI 설교 연구 및 주일학교 이미지 생성 도구',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
