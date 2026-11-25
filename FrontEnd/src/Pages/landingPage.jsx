import { Link } from "react-router-dom";
import { Pill, Building2, ArrowUpRight } from "lucide-react";

function Landing() {
  return (
    <div className="min-h-screen  text-slate-800 flex flex-col justify-between">
      <header className="max-w-6xl w-full mx-auto px-5 sm:px-8 pt-6 pb-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="h-9 w-9 rounded-lg bg-teal-600 text-white flex items-center justify-center">
            <Pill size={18} />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            PharmaKos
          </span>
        </Link>

        <div className="flex items-center gap-5 text-sm font-medium">
          <Link
            to="/login"
            className="text-slate-600 hover:text-slate-900 transition"
          >
            Patient login
          </Link>
          <Link
            to="/pharmacy-login"
            className="text-teal-700 hover:text-teal-800 transition"
          >
            Pharmacy login
          </Link>
        </div>
      </header>

      <main className="max-w-6xl w-full mx-auto px-5 sm:px-8 py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">
            Local pharmacy availability
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.12]">
            Check stock at nearby pharmacies before you go.
          </h1>

          <p className="text-base text-slate-600 leading-relaxed max-w-lg">
            See which pharmacies are closest to you and what medications are in
            stock right now, or manage branch stock under one pharmacy owner
            account.
          </p>

          <div className="pt-2 border-t border-teal-900/10 grid grid-cols-2 gap-6 max-w-md text-sm">
            <div>
              <p className="font-semibold text-slate-900">Distance first</p>
              <p className="text-slate-500 mt-0.5">
                Nearest branches shown with live stock status.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Multi-branch ready</p>
              <p className="text-slate-500 mt-0.5">
                One owner login for single or multiple locations.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl border border-teal-100 p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 mb-1">
                  <Pill size={14} />
                  Patient
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  Find medicine nearby
                </h2>
              </div>
              <Link
                to="/login"
                className="shrink-0 inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition"
              >
                <span>Log in</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <p className="text-sm text-slate-500 mb-4">
              Sign in to check nearby pharmacies and see what they have in
              stock.
            </p>

            <div className="text-xs text-slate-500">
              No account yet?{" "}
              <Link
                to="/register"
                className="text-teal-700 font-semibold hover:underline"
              >
                Create patient account
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-teal-100 p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1">
                  <Building2 size={14} />
                  Pharmacy
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  Manage pharmacy &amp; stock
                </h2>
              </div>
              <Link
                to="/pharmacy-login"
                className="shrink-0 inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition"
              >
                <span>Log in</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <p className="text-sm text-slate-500 mb-5">
              Update what is in stock or out of stock across one or more
              branches.
            </p>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                New pharmacy or chain?
              </span>
              <Link
                to="/pharmacy-register"
                className="text-xs font-semibold text-teal-700 hover:text-teal-800 hover:underline"
              >
                Sign up as a pharmacy →
              </Link>
            </div>
          </div>
        </div>
      </main>

   
    </div>
  );
}

export default Landing;