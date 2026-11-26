import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import {
    Pill,
    MapPin,
    Building2,
    Search,
    ArrowUpRight,
    PackageCheck
} from "lucide-react";

function About() {
    return (
        <div className="min-h-screen bg-white text-slate-800">

            <Navbar />
            <main className="max-w-6xl mx-auto px-5 sm:px-8">

                <section className="py-16 sm:py-24 border-b border-teal-900/10 ">
                    <div className="max-w-3xl">
                        <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-5">
                            About PharmaKos
                        </p>

                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
                            Finding medicine should be simple.
                        </h1>

                        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                            PharmaKos is a platform that connects patients with pharmacies
                            across Kosovo. It helps people find nearby pharmacies and check
                            medicine availability before making a visit.
                        </p>
                    </div>
                </section>

                <section className="py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-4">
                            What we do
                        </p>

                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-5">
                            Connecting patients with local pharmacies.
                        </h2>

                        <p className="text-slate-600 leading-relaxed mb-4">
                            Searching for a specific medicine can take time, especially
                            when you do not know which pharmacy has it available.
                            PharmaKos brings this information together in one place.
                        </p>

                        <p className="text-slate-600 leading-relaxed">
                            Patients can search for medicines, compare nearby pharmacy
                            locations and check stock status. Pharmacies can manage
                            their branches and keep their stock information updated.
                        </p>
                    </div>

                    <div className="bg-teal-50/70 rounded-2xl p-6 sm:p-8 border border-teal-100">
                        <h3 className="font-bold text-slate-900 text-lg mb-6">
                            What you can do with PharmaKos
                        </h3>

                        <div className="space-y-6">

                            <div className="flex gap-4">
                                <div className="h-10 w-10 shrink-0 rounded-lg bg-white text-teal-700 flex items-center justify-center">
                                    <Search size={19} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900">
                                        Search for medicines
                                    </h4>
                                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                                        Find medicines and check their availability at pharmacies.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="h-10 w-10 shrink-0 rounded-lg bg-white text-teal-700 flex items-center justify-center">
                                    <MapPin size={19} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900">
                                        Find nearby pharmacies
                                    </h4>
                                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                                        Discover pharmacy locations and choose the closest option.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="h-10 w-10 shrink-0 rounded-lg bg-white text-teal-700 flex items-center justify-center">
                                    <PackageCheck size={19} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900">
                                        Check stock status
                                    </h4>
                                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                                        See which medicines are marked as available or out of stock.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <section className="py-16 border-t border-teal-900/10">
                    <div className="mb-10">
                        <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-3">
                            Who is it for?
                        </p>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                            Made for patients and pharmacies.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="border border-teal-100 rounded-2xl p-7">
                            <div className="h-11 w-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-5">
                                <Pill size={22} />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                For patients
                            </h3>

                            <p className="text-sm text-slate-600 leading-relaxed mb-5">
                                PharmaKos makes it easier to find medicines without having
                                to visit multiple pharmacies just to check availability.
                            </p>

                            <ul className="space-y-2.5 text-sm text-slate-600">
                                <li className="flex items-center gap-2">
                                    <span className="text-teal-600">✓</span>
                                    Search for medicines
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-teal-600">✓</span>
                                    Check pharmacy stock
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-teal-600">✓</span>
                                    Find nearby locations
                                </li>
                            </ul>
                        </div>

                        <div className="border border-teal-100 rounded-2xl p-7">
                            <div className="h-11 w-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-5">
                                <Building2 size={22} />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                For pharmacies
                            </h3>

                            <p className="text-sm text-slate-600 leading-relaxed mb-5">
                                Pharmacies get a digital space to manage their information,
                                update medicine stock and organize multiple branches.
                            </p>

                            <ul className="space-y-2.5 text-sm text-slate-600">
                                <li className="flex items-center gap-2">
                                    <span className="text-teal-600">✓</span>
                                    Manage pharmacy information
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-teal-600">✓</span>
                                    Update medicine availability
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-teal-600">✓</span>
                                    Manage multiple branches
                                </li>
                            </ul>
                        </div>

                    </div>
                </section>

                <section className="py-12 mb-16 shadow-xl  rounded-2xl px-7 sm:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-10 mt-20">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">
                            Find what you need, closer to you.
                        </h2>
                        <p className="text-slate-900 text-sm leading-relaxed">
                            Start exploring pharmacies and medicine availability with PharmaKos.
                        </p>
                    </div>

                    <Link
                        to="/login"
                        className="shrink-0 inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-xl text-sm font-semibold transition"
                    >
                        Get started
                        <ArrowUpRight size={17} />
                    </Link>
                </section>

            </main>

            <Footer />

        </div>
    );
}

export default About;
