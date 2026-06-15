# 영어 수능 문제 코인 앱 🎓💰

영어 수능 문제를 풀고 정답할 때마다 코인을 획득하는 학습 앱입니다.

## 🎯 주요 기능

- ✅ 영어 수능 기출 문제 출제
- 💰 정답 시 코인 획득
- 🛍️ 코인으로 힌트 및 프리미엄 콘텐츠 구매
- 📊 학습 통계 및 진행도 확인
- 👤 사용자 프로필 관리
- 🎁 레벨업 시스템

## 🛠️ 기술 스택

### 프론트엔드
- React 18
- Axios (API 통신)
- CSS/Tailwind CSS
- Vite

### 백엔드
- Node.js + Express
- MongoDB
- JWT (인증)
- Cors

## 📁 프로젝트 구조

```
english-quiz-coin-app/
├── client/              # 프론트엔드
│   ├── src/
│   ├── public/
│   └── package.json
├── server/              # 백엔드
│   ├── models/          # DB 스키마
│   ├── routes/          # API 라우트
│   ├── controllers/      # 컨트롤러
│   ├── middleware/      # 미들웨어
│   └── server.js        # 메인 서버
└── README.md
```

## 🚀 설치 및 실행

### 백엔드 실행
```bash
cd server
npm install
npm start
```

### 프론트엔드 실행
```bash
cd client
npm install
npm run dev
```

## 📝 환경 설정

`.env` 파일 생성 (server/)
```
MONGO_URI=mongodb://localhost:27017/english-quiz
JWT_SECRET=your_secret_key
PORT=5000
```

## 📖 API 명세

- POST `/api/auth/register` - 회원가입
- POST `/api/auth/login` - 로그인
- GET `/api/quiz/problems` - 문제 조회
- POST `/api/quiz/submit` - 답안 제출
- GET `/api/user/profile` - 사용자 프로필
- POST `/api/shop/purchase` - 상점 구매

## 📄 라이선스

MIT
