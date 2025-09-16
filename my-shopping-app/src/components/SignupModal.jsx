export default function SignupModal({ signup, setSignup, onClose, onSubmit }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-3">회원가입</h2>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">이름</label>
            <input
              required
              value={signup.name}
              onChange={(e) => setSignup((s) => ({ ...s, name: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">이메일</label>
            <input
              required
              type="email"
              value={signup.email}
              onChange={(e) => setSignup((s) => ({ ...s, email: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">비밀번호</label>
            <input
              required
              type="password"
              value={signup.pw}
              onChange={(e) => setSignup((s) => ({ ...s, pw: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">성별</label>
            <select
              value={signup.gender}
              onChange={(e) => setSignup((s) => ({ ...s, gender: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">선택</option>
              <option value="남성">남성</option>
              <option value="여성">여성</option>
              <option value="공용">공용</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded-md">
              닫기
            </button>
            <button type="submit" className="px-4 py-1 bg-sky-500 text-white rounded-md">
              가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
