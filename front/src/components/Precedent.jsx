// front/src/components/Precedent/PrecedentSearch.jsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCases } from "./precedentAPI";
import { Link } from "react-router-dom";

const PrecedentSearch = () => {
  const [query, setQuery] = useState("");

  const { data: searchResults = [], isLoading, error, refetch } = useQuery({
    queryKey: ["cases", query],  // ✅ v5에서 queryKey는 객체 형태로 전달해야 함
    queryFn: () => fetchCases(query),
    enabled: false, // ✅ 초기 실행 방지
  });

  return (
    <div>
      <h2>판례 검색</h2>
      <input
        type="text"
        placeholder="검색어 입력"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => refetch()}>검색</button>

      {isLoading && <p>검색 중...</p>}
      {error && <p>오류 발생: {error.message}</p>}

      <ul>
        {searchResults.map((item) => (
          <li key={item.c_number}>
            <Link to={`/precedents/${item.c_number}`}>{item.c_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrecedentSearch;
