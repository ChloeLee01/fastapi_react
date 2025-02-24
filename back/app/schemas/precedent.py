from pydantic import BaseModel
from datetime import date

class PrecedentResponse(BaseModel):
    id: int
    c_number: str
    c_type: str
    j_date: date  # ✅ Pydantic이 자동으로 날짜를 문자열로 변환
    pre_number: int
    court: str | None  # ✅ NULL 값을 허용
    d_link: str
    c_name: str

    class Config:
        from_attributes = True  # ✅ SQLAlchemy 모델을 Pydantic으로 변환 가능하게 설정
