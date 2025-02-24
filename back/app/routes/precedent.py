from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.precedent_service import search_precedents
from app.schemas.precedent import PrecedentResponse

router = APIRouter()

@router.get("/precedents/{keyword}")
def fetch_precedents(keyword: str, db: Session = Depends(get_db)):
    try:
        results = search_precedents(keyword)

        if not results:
            return JSONResponse(
                content={"message": "검색 결과 없음"}, 
                status_code=404, 
                headers={"Content-Type": "application/json; charset=utf-8"}
            )

        return JSONResponse(
            content=[PrecedentResponse(**row).dict() for row in results], 
            status_code=200,
            headers={"Content-Type": "application/json; charset=utf-8"}
        )

    except HTTPException as http_ex:
        return JSONResponse(
            content={"error": str(http_ex.detail)}, 
            status_code=http_ex.status_code, 
            headers={"Content-Type": "application/json; charset=utf-8"}
        )

    except Exception as e:
        return JSONResponse(
            content={"error": str(e)}, 
            status_code=500, 
            headers={"Content-Type": "application/json; charset=utf-8"}
        )
