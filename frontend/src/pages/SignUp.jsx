import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, Link } from "react-router-dom";

const signupImg = "/assets/login/customer-login.jpg";
const ADMIN_SECRET = "ADMIN123"; // change this to your own code

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("customer");
  const [adminCode, setAdminCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const cleanedEmail = email.trim().toLowerCase();

    if (role === "admin" && adminCode.trim() !== ADMIN_SECRET) {
      setErrorMessage("Invalid admin code.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: cleanedEmail,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    const userId = data?.user?.id;

    if (userId) {
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: userId,
        full_name: fullName,
        role: role,
      });

      if (profileError) {
        setErrorMessage(profileError.message);
        setLoading(false);
        return;
      }
    }

    setSuccessMessage(
      role === "admin"
        ? "Designer account created successfully. Please sign in through Designer Login."
        : "Customer account created successfully. Please sign in.",
    );

    setTimeout(() => {
      navigate(role === "admin" ? "/designer-login" : "/login");
    }, 1500);

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-white font-sans">
      {/* LEFT SIDE */}
      <div className="relative hidden lg:flex lg:w-1/2">
        <img
          src={signupImg}
          alt="Interior"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="relative z-10 p-16 text-white">
          <Link
            to="/"
            className="mb-20 block text-xl font-semibold uppercase tracking-tight"
          >
            Visionary<span className="font-light">Interiors</span>
          </Link>
          <h1 className="text-5xl font-medium italic leading-tight">
            Join the future of interior design.
          </h1>
          <p className="mt-6 max-w-sm text-slate-300">
            Create your account and start building your dream space in 2D and 3D
            instantly.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full items-center justify-center bg-[#FDFCFB] p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="mb-3 text-4xl font-semibold tracking-tight text-slate-800">
              Create Account
            </h2>
            <p className="text-sm text-slate-500">
              Register as a customer or designer.
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-500">
                Account type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("customer")}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    role === "customer"
                      ? "border-orange-500 bg-orange-50 text-orange-600"
                      : "border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    role === "admin"
                      ? "border-orange-500 bg-orange-50 text-orange-600"
                      : "border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  Designer/Admin
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-500">
                Full name
              </label>
              <input
                type="text"
                required
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-500">
                Email address
              </label>
              <input
                type="email"
                required
                placeholder="architect@visionary.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-500">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            {role === "admin" && (
              <div>
                <label className="mb-2 block text-xs font-medium text-slate-500">
                  Admin code
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter admin code"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
            )}

            {errorMessage && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-slate-900 py-4 text-sm font-semibold text-white shadow-xl transition hover:bg-orange-600 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Register now"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to={role === "admin" ? "/designer-login" : "/login"}
              className="font-semibold text-orange-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
