# 목회자 AI 도우미 — Vercel 배포 가이드

## 🚀 배포 순서

### 1단계: GitHub에 업로드

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_ID/ministry-ai.git
git push -u origin main
```

### 2단계: Vercel 연결

1. https://vercel.com 에서 **"New Project"** 클릭
2. GitHub 저장소 선택
3. **Import** 클릭 (설정은 기본값으로 두세요)

### 3단계: 환경변수 등록 ← 핵심!

Vercel 프로젝트 → **Settings → Environment Variables** 에서:

| 변수명 | 값 | 필요 메뉴 |
|--------|-----|---------|
| `GEMINI_API_KEY` | Gemini API 키 (AIzaSy...) | 설교 연구 지원 |
| `OPENAI_API_KEY` | OpenAI API 키 (sk-...) | 주일학교 이미지 생성 |

### 4단계: 배포

- **Deploy** 버튼 클릭
- 약 1-2분 후 배포 완료
- `https://your-project.vercel.app` 주소로 접속!

---

## 💻 로컬 개발

```bash
npm install

# .env.local 파일 생성
cp .env.local.example .env.local
# .env.local 파일을 열어 API 키 입력

npm run dev
# http://localhost:3000 접속
```

---

## 🔑 API 키 발급 방법

### Google Gemini (무료)
1. https://aistudio.google.com 접속
2. **"Get API key"** 클릭
3. **"Create API key"** → 복사

### OpenAI (유료, DALL-E 3)
1. https://platform.openai.com 접속
2. **API Keys** → **"Create new secret key"**
3. 이미지 1장당 약 $0.04 (약 60원)

---

## 📁 프로젝트 구조

```
src/app/
├── page.tsx                    # 메인 대시보드
├── layout.tsx                  # 루트 레이아웃
├── globals.css                 # 전역 스타일
├── sermon/
│   └── page.tsx                # 설교 연구 페이지
├── sunday-school/
│   └── page.tsx                # 주일학교 이미지 페이지
└── api/
    ├── sermon/route.ts         # Gemini API 서버 라우트
    └── generate-image/route.ts # DALL-E API 서버 라우트
```
