from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response
from api.endpoints import users  # 추가된 라우터 파일
from sqlalchemy.orm import Session
from sqlalchemy import text
import os
from back.app.core import *
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


@app.get("/favicon.ico")
async def favicon():
    # React가 실행되지 않을 때 기본 favicon 제공 : 404 오류 방지
    favicon_path = "front/public/favicon.ico"
    if os.path.exists(favicon_path):
        return FileResponse(favicon_path)
    return Response(status_code=204)  # No Content

# 기본 엔드포인트 (테스트용)
@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}


@app.get("/healthcheck")
def healthcheck(db: Session = Depends(get_db)):
    try:
        # 간단한 쿼리를 실행하여 DB 연결 확인
        db.execute(text("SELECT 1"))
        return {"status": "DB 연결 성공!"}
    except Exception as e:
        return {"status": "DB 연결 실패", "error": str(e)}

# 서버 실행 명령:
# uvicorn main:app
