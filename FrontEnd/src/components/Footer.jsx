
import { Link } from "react-router-dom";
import { Pill, ArrowRight } from "lucide-react";

function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white">

            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">

                <div className="lg:col-span-2">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="rounded-lg bg-teal-600 p-2 text-white">
                            <Pill size={22} />
                        </div>
                        <span className="text-xl font-bold">PharmaKos</span>
                    </Link>

                    <p className="mt-4 max-w-sm text-sm leading-7 text-slate-500">
                        Helping people across Kosovo find medicines and discover
                        pharmacies more easily. A simple way to connect people
                        with pharmacy information.
                    </p>

                    <Link
                        to="/about"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
                    >
                        Learn more about us
                        <ArrowRight size={16} />
                    </Link>
                </div>

                <div>
                    <h3 className="font-semibold text-slate-900">
                        Explore
                    </h3>

                    <div className="mt-5 flex flex-col gap-3 text-sm text-slate-500">
                        <Link to="/home" className="hover:text-teal-700">
                            Home
                        </Link>

                        <Link to="/pharmacies" className="hover:text-teal-700">
                            Find Pharmacies
                        </Link>

                        <Link to="/about" className="hover:text-teal-700">
                            About Us
                        </Link>

                        <Link to="/contact" className="hover:text-teal-700">
                            Contact
                        </Link>
                    </div>
                </div>

        
                <div>
                    <h3 className="font-semibold text-slate-900">
                        Your Account
                    </h3>

                    <div className="mt-5 flex flex-col gap-3 text-sm text-slate-500">
                        <Link to="/login" className="hover:text-teal-700">
                            Patient Login
                        </Link>

                        <Link to="/register" className="hover:text-teal-700">
                            Create Account
                        </Link>

                        <Link to="/pharmacy-login" className="hover:text-teal-700">
                            Pharmacy Login
                        </Link>

                        <Link to="/pharmacy-register" className="hover:text-teal-700">
                            Register Pharmacy
                        </Link>
                    </div>
                </div>

            </div>

            <div className="border-t border-slate-100">
                <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-5 text-sm text-slate-400 sm:flex-row">

                    <p>
                        © {new Date().getFullYear()} PharmaKos. All rights reserved.
                    </p>

                    <p>
                        Making medicine search easier across Kosovo.
                    </p>

                </div>
            </div>

        </footer>
    );
}

export default Footer;
