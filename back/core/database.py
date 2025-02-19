from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import DATABASE_URL  # ✅ config.py에서 DB 설정 가져오기

# ✅ SQLAlchemy 엔진 생성
engine = create_engine(DATABASE_URL)

# ✅ ORM을 위한 세션 팩토리 (유저 관리용)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ✅ ORM 모델을 위한 베이스 클래스
Base = declarative_base()

# ✅ ORM 세션을 제공하는 함수
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ SQL 직접 실행을 위한 함수 (판례 검색, 법률 목록 조회용)
def execute_sql(query: str, params: dict = {}):
    """
    SQL 쿼리를 직접 실행하고 결과를 반환하는 함수.
    ORM이 필요하지 않은 판례 및 법률 데이터 조회에 사용.
    """
    with engine.connect() as connection:
        result = connection.execute(text(query), params)
        return result.fetchall()
