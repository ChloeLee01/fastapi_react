// front/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrecedentSearch from "./components/Precedent";
import PrecedentDetail from "./components/Detail";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 홈 페이지 */}
        <Route path="/" element={<Home />} />

        {/* 판례 검색 페이지 */}
        <Route path="/precedents/search" element={<PrecedentSearch />} />

        {/* 판례 상세 페이지 (판례 번호 기반) */}
        <Route path="/precedents/:caseNumber" element={<PrecedentDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
