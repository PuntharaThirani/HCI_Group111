import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

const customerImg = '/assets/login/customer-login.jpg';
const adminImg = '/assets/login/admin-login.jpg';

const AuthPage = ({ isAdmin = false }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Dynamic content based on whether it's Admin/Customer and Login/Signup
  const config = {
    title: isAdmin
      ? (isSignUp ? 'Designer Registration' : 'Designer Login')
      : (isSignUp ? 'Create Account' : 'Customer Login'),
    subtitle: isAdmin
      ? (isSignUp ? 'Join our design team and start managing projects.' : 'Access the design workspace and tools.')
      : (isSignUp ? 'Start your design journey with us today.' : 'Welcome back to your curated space.'),
    image: isAdmin ? adminImg : customerImg,
    tag: isAdmin ? 'Designer Portal' : 'Client Portal',
  };

  const resetMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    resetMessages();
    setLoading(true);

    const cleanedEmail = email.trim().toLowerCase();
    const assignedRole = isAdmin ? 'admin' : 'customer';

    try {
      if (isSignUp) {
        // --- SIGN UP LOGIC ---
        const { data, error: authError } = await supabase.auth.signUp({
          email: cleanedEmail,
          password,
          options: {
            data: { 
              full_name: fullName,
              role: assignedRole 
            },
          },
        });

        if (authError) throw authError;

        if (data?.user) {
          // Create the profile entry in your custom 'profiles' table
          const { error: profileError } = await supabase.from('profiles').upsert({
            id: data.user.id,
            full_name: fullName,
            role: assignedRole,
          });

          if (profileError) throw profileError;
        }

        setSuccessMessage('Account created! Please check your email for verification.');
        setIsSignUp(false);
      } else {
        // --- SIGN IN LOGIC ---
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: cleanedEmail,
          password,
        });

        if (signInError) throw signInError;

        // Fetch user profile to verify role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profileError) throw new Error('Could not retrieve user profile.');

        // Role-based routing and protection
        if (isAdmin) {
          if (profile?.role === 'admin') {
            navigate('/admin');
          } else {
            await supabase.auth.signOut();
            throw new Error('This account does not have Designer permissions.');
          }
        } else {
          navigate('/customer-dashboard');
        }
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-white font-sans">
      {/* LEFT SIDE: VISUALS */}
      <div className="relative hidden lg:flex lg:w-1/2">
        <img
          src={config.image}
          alt="Interior Design"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />

        <div className="relative z-10 flex w-full flex-col justify-between p-16 text-white">
          <Link to="/" className="group flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-orange-500 font-bold text-orange-500 transition-all group-hover:bg-orange-500 group-hover:text-white">
              V
            </div>
            <span className="text-lg font-semibold tracking-tight uppercase">
              Visionary<span className="font-light text-slate-200">Interiors</span>
            </span>
          </Link>

          <div className="max-w-md">
            <h1 className="mb-6 text-4xl font-medium italic leading-tight drop-shadow-lg">
              “Design is thinking made visual.”
            </h1>
            <p className="mt-4 border-l-2 border-orange-600 pl-4 text-xs font-medium uppercase tracking-wider opacity-80">
              Est. 2014 • {config.tag}
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: FORM */}
      <div className="flex w-full items-center justify-center bg-[#FDFCFB] p-8 lg:w-1/2 lg:p-24">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="mb-3 text-4xl font-semibold tracking-tight text-slate-800">
              {config.title}
            </h2>
            <p className="text-sm text-slate-500">{config.subtitle}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isSignUp && (
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
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-500">
                Email address
              </label>
              <input
                type="email"
                required
                placeholder="name@visionary.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-medium text-slate-500">
                  Password
                </label>
                {!isSignUp && (
                  <button
                    type="button"
                    className="text-xs font-medium text-orange-600 hover:underline"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

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
              className="w-full rounded-xl bg-[#D9631C] py-4 text-sm font-semibold text-white shadow-lg shadow-orange-100 transition hover:bg-[#bf5418] active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? 'Processing...' : isSignUp ? 'Create account' : 'Sign in'}
            </button>
          </form>

          {/* Toggle between Login and Sign Up - Now visible for both Admin and Customer */}
          <p className="mt-8 text-center text-sm text-slate-500">
            {isSignUp ? 'Already have an account?' : 'Need an account?'}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                resetMessages();
              }}
              className="ml-2 font-semibold text-orange-600 hover:underline"
            >
              {isSignUp ? 'Sign in' : 'Create account'}
            </button>
          </p>

          <div className="mt-12 border-t border-slate-100 pt-6">
            <Link
              to="/"
              className="text-xs font-medium text-slate-400 transition-colors hover:text-orange-600"
            >
              ← Back to site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;