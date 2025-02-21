from sqlalchemy.orm import Session
from fastapi import HTTPException

# 🔎 통합 검색 (사건명, 법원명, 사건번호)
def search_precedents(db: Session, keyword: str):
    try:
        query = """
            SELECT id, c_number, c_type, j_date, court, d_link, c_name
            FROM precedent
            WHERE c_name ILIKE :keyword
               OR court ILIKE :keyword
               OR c_number ILIKE :keyword  -- ✅ 사건번호도 검색에 포함!
            ORDER BY j_date DESC;
        """
        results = db.execute(query, {"keyword": f"%{keyword}%"}).scalars().all()

        if not results:
            return {"message": f"No precedents found for keyword '{keyword}'"}

        return [
            {
                "id": row.id,
                "c_number": row.c_number,
                "c_type": row.c_type,
                "j_date": row.j_date,
                "court": row.court,
                "d_link": row.d_link,
                "c_name": row.c_name,
            }
            for row in results
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
