// front/src/pages/Home.jsx
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>환영합니다!</h1>
      <p style={styles.subtitle}>판례 검색 시스템을 이용해 보세요.</p>
      
      {/* 판례 검색 페이지로 이동 */}
      <Link to="/precedents/search" style={styles.button}>
        판례 검색하기
      </Link>
    </div>
  );
};

// ✅ 간단한 스타일 추가
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    textDecoration: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    transition: "background 0.3s",
  },
};

export default Home;
