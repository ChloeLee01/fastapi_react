// front/src/components/Precedent/PrecedentDetail.jsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCaseDetail } from "./precedentAPI";

const PrecedentDetail = () => {
  const { caseNumber } = useParams();

  const { data: caseDetail, isLoading, error } = useQuery(
    ["case", caseNumber], 
    () => fetchCaseDetail(caseNumber)
  );

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error.message}</p>;

  return (
    <div>
      <h1>{caseDetail.c_name}</h1>
      <p>{caseDetail.content}</p>
    </div>
  );
};

export default PrecedentDetail;
