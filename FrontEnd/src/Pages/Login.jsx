
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pill, Eye, EyeOff } from "lucide-react";
import api from "../services/api";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{8,}$/;

const initialFormData = {
  email: "",
  password: ""
};

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setError("");
  };

  const validate = () => {
    const newErrors = {};
    const email = formData.email.trim();
    const password = formData.password;

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await api.post("/users/login", {
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/profile");
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-teal-100 shadow-lg p-8 sm:p-10 rounded-2xl w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-teal-50 text-teal-600 p-4 rounded-2xl">
            <Pill size={20} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-800 text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-slate-500 text-center mb-8">
          Login to your PharmaKos account
        </p>

        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email address
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border outline-none text-slate-700 transition ${
              errors.email
                ? "border-red-400"
                : "border-slate-200 focus:border-teal-500"
            }`}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Password
          </label>

          <div
            className={`flex items-center border rounded-lg ${
              errors.password
                ? "border-red-400"
                : "border-slate-200 focus-within:border-teal-500"
            }`}
          >
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 outline-none rounded-lg text-slate-700"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="px-3 text-slate-400 hover:text-teal-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold p-3 rounded-lg transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-slate-500 text-center mt-6 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-teal-600 font-semibold hover:text-teal-700">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
