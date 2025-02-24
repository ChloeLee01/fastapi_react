// front/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrecedentSearch from "./components/Precedent";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 홈 페이지 */}
        <Route path="/" element={<Home />} />

        {/* 판례 검색 페이지 */}
        <Route path="/precedents/search" element={<PrecedentSearch />} />

      </Routes>
    </Router>
  );
};

export default App;
