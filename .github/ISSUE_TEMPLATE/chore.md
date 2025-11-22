---
name: '🧹 Chore / Refactor'
about: 리팩터링, 환경 설정, 빌드/의존성/CI 작업
title: '[Chore] '
labels: ['chore']
assignees:
---

### 🏷️ Type

- [ ] 리팩터링 (코드 구조 개선, 역할 분리 등)
- [ ] 의존성 정리 (패키지 추가/업데이트/삭제)
- [ ] 빌드/번들 설정 (Vite, TS, ESLint 등)
- [ ] CI/CD 설정 (GitHub Actions, Vercel 등)
- [ ] 기타

### 🎯 목적/배경

> 왜 이 작업이 필요한지, 어떤 문제를 줄이기 위한 건지

- 예시: React Query 훅과 API 호출 로직이 섞여 있어서 재사용이 어려움
- 예시: ESLint/Prettier 규칙이 맞지 않아 팀 코딩 스타일이 제각각임

### 📋 작업 내용

- [ ] Vite/TS 설정 정리 (`tsconfig`, `vite.config` 등)
- [ ] ESLint/Prettier 규칙 정리 및 적용
- [ ] React Query 훅 / API 도메인 함수 분리
- [ ] 공통 UI 컴포넌트 폴더 구조 정리

### ✅ 수용조건 (AC)

- [ ] `npm run lint` / `npm run build`가 모두 통과한다.
- [ ] 수정된 코드 스타일이 팀 규칙에 맞게 일관성 있게 적용된다.
- [ ] 주요 도메인 로직(API, 상태 관리)가 명시된 위치(예: `src/api`, `src/store`)에 정리되어 있다.
