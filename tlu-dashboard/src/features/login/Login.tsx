import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { loginAdmin } from "../../repository/AuthApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext";
import bgImage from "../../image/bg.jpg";
import logoImage from "../../image/logo.svg";

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // 2. LẤY HÀM LOGIN TỪ CONTEXT RA

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setUsernameError("");
    setPasswordError("");

    let isValid = true;

    if (!username.trim()) {
      setUsernameError("Tên đăng nhập là bắt buộc");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Mật khẩu là bắt buộc");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setLoading(true);
    try {
      const res = await loginAdmin(username, password);

      if (res.success && res.data) {
        // 3. QUAN TRỌNG NHẤT: Gọi hàm login của Context
        // để nó set isAuthenticated = true và lưu storage cho bạn
        login(res.data.access_token, res.data.refresh_token, res.data.user);
        toast.success("Đăng nhập thành công!");

        // 4. Lúc này chuyển hướng mới có tác dụng
        navigate("/dashboard");
      }
    } catch (err: any) {
      const errorMessage = "Tài khoản và mật khẩu không hợp lệ";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex overflow-hidden">
      {/* Cột trái: Hình ảnh tòa nhà */}
      <div className="hidden md:block md:w-[65%] h-screen relative">
        <img
          src={bgImage}
          alt="Thang Long University Campus"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Cột phải: Form đăng nhập */}
      <div className="w-full md:w-[35%] min-h-screen bg-[#f4f6f9] flex flex-col justify-between py-12 px-6 md:px-8 overflow-y-auto">
        {/* Header thương hiệu */}
        <div className="flex flex-col items-center mt-4">
          <img
            src={logoImage}
            alt="Thang Long University Logo"
            className="h-14 w-auto mb-4 object-contain"
          />
          <h1 className="text-[#002f6c] font-bold text-center tracking-wider text-sm md:text-base">
            TRƯỜNG ĐẠI HỌC THĂNG LONG
          </h1>
        </div>

        {/* Khung form đăng nhập */}
        <div className="w-full max-w-[360px] mx-auto bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 md:p-8 border border-gray-100 my-8">
          <h2 className="text-[#800000] font-bold text-xl md:text-2xl mb-6 text-center">
            ĐĂNG NHẬP
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 text-red-700 text-xs rounded">
                {error}
              </div>
            )}

            <div>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded border text-sm transition-colors outline-none ${
                  usernameError
                    ? "border-red-500 text-red-500 placeholder-red-400 focus:border-red-500"
                    : "border-gray-300 focus:border-[#800000]"
                }`}
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (usernameError) setUsernameError("");
                }}
              />
              {usernameError && (
                <p className="text-red-500 text-xs mt-1 text-left font-medium">
                  {usernameError}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                className={`w-full px-4 py-3 rounded border text-sm transition-colors outline-none ${
                  passwordError
                    ? "border-red-500 text-red-500 placeholder-red-400 focus:border-red-500"
                    : "border-gray-300 focus:border-[#800000]"
                }`}
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError("");
                }}
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-1 text-left font-medium">
                  {passwordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded font-semibold text-sm text-white transition-colors bg-[#800000] hover:bg-[#660000] active:scale-[0.98] transform ${
                loading ? "opacity-75 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? "Đang xác thực..." : "Đăng nhập"}
            </button>
          </form>
        </div>

        {/* Footer bản quyền */}
        <div className="text-center text-[10px] text-gray-400 leading-relaxed max-w-[320px] mx-auto">
          @Copyright © 2026 NGUYEN MANH KHA THOR
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

