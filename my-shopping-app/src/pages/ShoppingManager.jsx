import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import SignupModal from "../components/SignupModal";
import useClock from "../hooks/useClock";

const categories = [
  { id: "top", label: "상의" },
  { id: "bottom", label: "하의" },
  { id: "shoes", label: "신발" },
  { id: "accessory", label: "패션잡화" },
];

const mockData = Array.from({ length: 37 }).map((_, i) => ({
  id: i + 1,
  제품명: `상품 ${i + 1}`,
  카테고리: categories[i % categories.length].label,
  가격: `${(i + 1) * 1000}원`,
  재고: Math.floor(Math.random() * 50),
  성별: ["남성", "여성", "공용"][i % 3],
}));

export default function ShoppingManager() {
  const now = useClock();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [gender, setGender] = useState("");
  const [dark, setDark] = useState(false);
  const [data] = useState(mockData);
  const [page, setPage] = useState(1);
  const perPage = 8;

  const [showSignup, setShowSignup] = useState(false);
  const [signup, setSignup] = useState({ email: "", pw: "", name: "", gender: "" });

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  const filtered = data.filter((row) => {
    if (selectedCategory && row.카테고리 !== selectedCategory) return false;
    if (gender && row.성별 !== gender) return false;
    if (query && !row.제품명.includes(query)) return false;
    return true;
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const visible = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  function handleSignupSubmit(e) {
    e.preventDefault();
    console.log("회원가입 데이터:", signup);
    alert(`${signup.name}님, 회원가입이 완료되었습니다! (모의)`);
    setShowSignup(false);
    setSignup({ email: "", pw: "", name: "", gender: "" });
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">쇼핑 관리 대시보드</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <div>오늘 날짜: {now.toLocaleDateString()}</div>
            <div>현재 시간: {now.toLocaleTimeString()}</div>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm">다크모드</label>
            <button
              onClick={() => setDark((d) => !d)}
              className="px-2 py-1 border rounded-md"
            >
              {dark ? "켜짐" : "꺼짐"}
            </button>
          </div>
          <button
            onClick={() => setShowSignup(true)}
            className="px-3 py-1 rounded-md bg-green-600 text-white"
          >
            회원 가입
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: categories */}
        <aside className="col-span-1 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <h2 className="font-semibold mb-3">카테고리</h2>
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === c.label ? null : c.label
                    )
                  }
                  className={`w-full text-left px-3 py-2 rounded-md border ${
                    selectedCategory === c.label ? "bg-sky-500 text-white" : ""
                  }`}
                >
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Right: controls + table */}
        <section className="col-span-1 lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="제품명을 입력해주세요"
                className="flex-1 md:flex-initial px-3 py-2 rounded-l-md border w-full md:w-80"
              />
              <button
                onClick={() => setPage(1)}
                className="px-4 py-2 rounded-r-md border bg-sky-500 text-white"
              >
                조회
              </button>
              <select
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  setPage(1);
                }}
                className="ml-3 px-3 py-2 border rounded-md"
              >
                <option value="">성별 전체</option>
                <option value="남성">남성</option>
                <option value="여성">여성</option>
                <option value="공용">공용</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500 dark:text-gray-300">
                총 결과: {total}건
              </div>
              <div>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setGender("");
                    setQuery("");
                  }}
                  className="px-3 py-1 border rounded-md"
                >
                  초기화
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">제품명</th>
                  <th className="px-4 py-2 text-left">카테고리</th>
                  <th className="px-4 py-2 text-left">가격</th>
                  <th className="px-4 py-2 text-left">재고</th>
                  <th className="px-4 py-2 text-left">성별</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                {visible.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-2">{row.id}</td>
                    <td className="px-4 py-2">{row.제품명}</td>
                    <td className="px-4 py-2">{row.카테고리}</td>
                    <td className="px-4 py-2">{row.가격}</td>
                    <td className="px-4 py-2">{row.재고}</td>
                    <td className="px-4 py-2">{row.성별}</td>
                  </tr>
                ))}
                {visible.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      결과가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination total={total} perPage={perPage} current={page} onChange={setPage} />
        </section>
      </main>

      {showSignup && (
        <SignupModal
          signup={signup}
          setSignup={setSignup}
          onClose={() => setShowSignup(false)}
          onSubmit={handleSignupSubmit}
        />
      )}

      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        © 2025 쇼핑관리 예제
      </footer>
    </div>
  );
}
