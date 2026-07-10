# Self Mental 개발 환경 설정

## 백엔드 설정 (Hono + TypeScript + Prisma + MySQL)

### 1. 패키지 설치
```bash
cd backend
npm install
```

### 2. 환경 변수 설정
`.env.example` 복사 후 `.env` 생성:
```bash
cp .env.example .env
```

`.env` 파일에 MySQL 정보 입력:
```
DATABASE_URL=mysql://user:password@localhost:3306/self_mental
JWT_SECRET=your-jwt-secret
PORT=3000
NODE_ENV=development
```

### 3. 데이터베이스 설정
로컬 MySQL에 `self_mental` 데이터베이스 생성:
```bash
mysql -u root -p -e "CREATE DATABASE self_mental;"
```

### 4. Prisma 마이그레이션
```bash
npx prisma migrate dev --name init
```

이 명령은 Prisma 스키마에 따라 MySQL 테이블을 자동으로 생성합니다.

### 5. 개발 서버 시작
```bash
npm run dev
```

서버 실행: `http://localhost:3000`

### 6. 회원가입 API 테스트
```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"SecurePass123"}'
```

### 7. 로그인 API 테스트
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"SecurePass123"}'
```

---

## 프론트엔드 설정 (React + Vite)

### 1. 패키지 설치
```bash
cd frontend
npm install
```

### 2. 개발 서버 시작
```bash
npm run dev
```

---

## 데이터베이스 스키마

### Users 테이블
- `id` (UUID, 기본키)
- `email` (문자열, 고유)
- `password` (문자열, bcrypt 해시)
- `createdAt` (타임스탐프)

### Sessions 테이블
- `id` (정수, 기본키)
- `userId` (UUID, users 테이블 외래키)
- `token` (문자열, 고유)
- `expiresAt` (타임스탐프)
- `createdAt` (타임스탐프)

## 주요 기술 스택

- **백엔드 프레임워크**: Hono (경량 웹 프레임워크)
- **언어**: TypeScript
- **데이터베이스**: MySQL
- **ORM**: Prisma (타입 안전성 및 자동 마이그레이션)
- **비밀번호**: bcryptjs (bcrypt 해싱)
- **검증**: Zod (런타임 스키마 검증)
