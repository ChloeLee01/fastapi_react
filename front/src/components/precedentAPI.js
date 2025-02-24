export async function fetchCases(query) {
  if (!query) return [];

  const apiUrl = `/api/search/precedents/${query}`;
  console.log("🔹 API 요청 URL:", apiUrl);

  try {
    const response = await fetch(apiUrl);
    console.log("🔹 API 응답 상태 코드:", response.status);

    // ✅ HTTP 응답이 실패한 경우 오류 출력
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API 오류: ${response.status} - ${response.statusText}\n${errorText}`);
    }

    const contentType = response.headers.get("content-type");
    console.log("🔹 응답 Content-Type:", contentType);

    // ✅ JSON이 아닐 경우 오류 방지
    if (!contentType || !contentType.includes("application/json")) {
      const errorText = await response.text(); // 응답 본문 출력
      console.error("⚠️ API 응답이 JSON 형식이 아님:", errorText);
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

