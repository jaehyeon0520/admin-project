export default function Pagination({ total, perPage, current, onChange }) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <nav className="flex items-center justify-center gap-2 p-4">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        className="px-3 py-1 rounded-md border"
      >
        이전
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1 rounded-md border ${
            p === current ? "bg-sky-500 text-white" : ""
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(totalPages, current + 1))}
        className="px-3 py-1 rounded-md border"
      >
        다음
      </button>
    </nav>
  );
}
