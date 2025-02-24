export async function fetchCases(query) {
  if (!query) return [];

  const apiUrl = `/api/search/precedents/${query}`;
  console.log("🔹 API 요청 URL:", apiUrl);

  try {
    const response = await fetch(apiUrl);
    console.log("🔹 API 응답 상태 코드:", response.status);

    if (!response.ok) {
      throw new Error(`API 오류: ${response.status} - ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    console.log("🔹 응답 Content-Type:", contentType);

    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("⚠️ API 응답이 JSON 형식이 아닙니다.");
    }

    const data = await response.json();
    console.log("✅ API 응답 데이터:", data);
    return data;
  } catch (error) {
    console.error("❌ fetchCases 오류:", error.message);
    return []; // 오류 발생 시 빈 배열 반환
  }
}


export async function fetchCaseDetail(caseNumber) {
  const response = await fetch(`/api/precedents/detail/${caseNumber}`);
  if (!response.ok)
    throw new Error("판례 상세 정보를 가져오는 데 실패했습니다.");
  return response.json();
}

