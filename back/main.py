from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.endpoints import users  # 추가된 라우터 파일

# FastAPI 애플리케이션 생성
app = FastAPI()

# CORS 설정 (React와 연결할 경우 필수)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React 개발 서버 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(users.router , prefix="/api", tags=["users"])

# 기본 엔드포인트 (테스트용)
@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

# 서버 실행 명령:
# uvicorn main:app --reload
