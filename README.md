# Claude Role Command Tool

Claude용 개발 persona 커스텀 커맨드를 생성하는 CLI 도구입니다.

## 설치

npm을 통해 글로벌로 설치할 수 있습니다:

```bash
npm install -g claude-role-command-tool
```

## 사용법

### Init 커맨드

현재 디렉토리에 `.claude/commands/` 디렉토리를 생성하고, 7개의 개발 persona별 MD 파일을 생성합니다:

```bash
claude-role-command-tool init
```

### 생성되는 Persona 파일들

- `architect.md` - 시스템 아키텍트, 확장성 전문가
- `frontend.md` - UX 전문가, 접근성 옹호자  
- `backend.md` - 신뢰성 엔지니어, 성능 전문가
- `analyzer.md` - 근본 원인 분석 전문가
- `mentor.md` - 기술 교육자, 지식 전달 전문가
- `refactorer.md` - 코드 품질 전문가, 기술 부채 관리자
- `qa.md` - 품질 옹호자, 테스팅 전문가

## 개발

### 프로젝트 구조

```
claude-role-command-tool/
├── package.json
├── bin/
│   └── claude-role-command-tool    # CLI 실행 파일
├── src/
│   ├── index.js                    # 메인 CLI 엔트리포인트
│   ├── commands/
│   │   └── init.js                 # init 커맨드 구현
│   ├── templates/                  # persona MD 템플릿들
│   │   ├── architect.md
│   │   ├── frontend.md
│   │   ├── backend.md
│   │   ├── analyzer.md
│   │   ├── mentor.md
│   │   ├── refactorer.md
│   │   └── qa.md
│   └── utils/
│       ├── fileSystem.js           # 파일 시스템 유틸리티
│       └── logger.js               # 로깅 시스템
└── test/                           # 테스트 코드
```

### 개발 환경 설정

```bash
# 의존성 설치
npm install

# 테스트 실행
npm test

# 로컬에서 CLI 테스트
node src/index.js init
```

### 테스트

Jest를 사용하여 단위 테스트를 작성했습니다:

```bash
npm test
```

## 기능

- ✅ `.claude/commands/` 디렉토리 자동 생성
- ✅ 7개 persona별 MD 파일 템플릿 복사
- ✅ 기존 파일 덮어쓰기 방지
- ✅ 사용자 친화적 피드백 메시지
- ✅ 에러 처리 및 로깅

## 라이선스

MIT

## 기여

이슈나 풀 리퀘스트를 통해 기여해 주세요.# claude-role-command-tool
