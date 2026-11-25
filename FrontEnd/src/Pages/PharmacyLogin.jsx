import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, Eye, EyeOff } from "lucide-react";
import api from "../services/api";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{8,}$/;

const initialFormData = {
  email: "",
  password: ""
};

function PharmacyLogin() {
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
      newErrors.email = "Enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      newErrors.password = "Minimum 8 characters";
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
      const { token, user } = res.data;

      if (!user?.roles?.includes("pharmacy")) {
        setError("This account does not have pharmacy access.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/pharmacy/dashboard");
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

  const inputClass = (field) =>
    `w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 outline-none transition ${
      errors[field]
        ? "border-red-400"
        : "border-slate-300 focus:border-teal-600"
    }`;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 sm:p-8 w-full max-w-md"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-teal-50 text-teal-700 p-2.5 rounded-lg border border-teal-100">
            <Building2 size={22} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Pharmacy Portal
            </h1>
            <p className="text-sm text-slate-500">
              Sign in to manage your inventory
            </p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Work email
          </label>
          <input
            type="email"
            name="email"
            placeholder="pharmacy@example.com"
            value={formData.email}
            onChange={handleChange}
            className={inputClass("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <div
            className={`flex items-center border rounded-lg ${
              errors.password
                ? "border-red-400"
                : "border-slate-300 focus-within:border-teal-600"
            }`}
          >
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm text-slate-800 outline-none rounded-lg"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="px-3 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium py-2.5 rounded-lg transition disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
          <span>
            New pharmacy?{" "}
            <Link
              to="/pharmacy-register"
              className="text-teal-700 font-medium hover:underline"
            >
              Register here
            </Link>
          </span>
          <Link to="/login" className="text-slate-500 hover:text-slate-700">
            Patient login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default PharmacyLogin;