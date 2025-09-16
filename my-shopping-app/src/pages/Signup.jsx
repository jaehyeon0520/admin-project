import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/signup.css"; // 다크모드 스타일 따로 추가 가능

export default function Signup() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};
    if (formData.username.length < 4)
      newErrors.username = "아이디는 4자 이상이어야 합니다.";
    if (formData.password.length < 6)
      newErrors.password = "비밀번호는 6자 이상이어야 합니다.";
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(formData.email))
      newErrors.email = "올바른 이메일 형식을 입력하세요.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert(
        `회원가입 완료!\n아이디: ${formData.username}\n이메일: ${formData.email}`
      );
      window.location.href = "/success.html"; // public 폴더의 success.html로 이동
    }
  };

  return (
    <div className={darkMode ? "dark-mode min-vh-100" : "bg-light min-vh-100"}>
      <div className="container py-5">
        <h2 className="text-center mb-4">회원가입</h2>
        <form
          onSubmit={handleSubmit}
          className="card p-4 shadow mx-auto"
          style={{ maxWidth: "400px" }}
        >
          {/* 아이디 */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              아이디
            </label>
            <input
              type="text"
              id="username"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              placeholder="아이디를 입력하세요"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          {/* 이메일 */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              이메일
            </label>
            <input
              type="email"
              id="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              회원가입
            </button>
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="btn btn-secondary"
            >
              다크모드
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
