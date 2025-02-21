from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.precedent_service import search_precedents
from app.core.database import get_db

router = APIRouter()

# 🔎 통합 검색 API (사건명, 법원명, 사건번호 포함)
@router.get("/precedents/search/{keyword}")
def fetch_precedents(keyword: str, db: Session = Depends(get_db)):
    return search_precedents(db, keyword)
