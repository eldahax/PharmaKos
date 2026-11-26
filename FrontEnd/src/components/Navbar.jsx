
import { Link } from "react-router-dom";
import { Pill } from "lucide-react";

function Navbar() {
    return (
        <nav className="border-b border-slate-100 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                <Link to="/" className="flex items-center gap-2">
                    <div className="rounded-lg bg-teal-600 p-2 text-white">
                        <Pill size={22} />
                    </div>
                    <span className="text-xl font-bold">PharmaKos</span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    <Link to="/home" className="font-medium text-teal-700">
                        Home
                    </Link>

                    <Link to="/pharmacies" className="text-slate-600 hover:text-teal-700">
                        Pharmacies
                    </Link>

                    <Link to="/about" className="text-slate-600 hover:text-teal-700">
                        About
                    </Link>

                    <Link to="/contact" className="text-slate-600 hover:text-teal-700">
                        Contact
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        to="/landing"
                        className="hidden text-sm font-medium text-slate-600 hover:text-teal-700 sm:block"
                    >
                        Login
                    </Link>

                    <Link
                        to="/landing"
                        className="rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-700"
                    >
                        Get Started
                    </Link>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
