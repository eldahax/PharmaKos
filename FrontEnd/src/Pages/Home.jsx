import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import {
    Search,
    Pill,
    MapPin,
    ArrowRight,
    Phone,
    Clock,
    Store,
    ShieldCheck,
    Heart,
    CheckCircle,
    Thermometer,
    Sparkles,
    Baby,
    Activity
} from "lucide-react";

const categories = [
    { name: "Pain Relief", icon: Heart },
    { name: "Cold & Flu", icon: Thermometer },
    { name: "Vitamins", icon: ShieldCheck },
    { name: "Skin Care", icon: Sparkles },
    { name: "Baby Care", icon: Baby },
    { name: "Diabetes", icon: Activity }
];

const pharmacies = [
    {
        name: "Farmacia Dardania",
        city: "Prishtine",
        address: "Dardania, Prishtine",
        phone: "+383 44 123 456",
        hours: "08:00 - 22:00"
    },
    {
        name: "Farmacia Vita",
        city: "Prizren",
        address: "Qender, Prizren",
        phone: "+383 49 234 567",
        hours: "08:00 - 21:00"
    },
    {
        name: "Farmacia Shendeti",
        city: "Peje",
        address: "Rr. Adem Jashari, Peje",
        phone: "+383 45 345 678",
        hours: "07:30 - 22:00"
    },
    {
        name: "Farmacia Nova",
        city: "Ferizaj",
        address: "Qender, Ferizaj",
        phone: "+383 44 456 789",
        hours: "08:00 - 21:00"
    },
    {
        name: "Farmacia Qendra",
        city: "Mitrovice",
        address: "Qender, Mitrovice",
        phone: "+383 49 567 890",
        hours: "08:00 - 22:00"
    },
    {
        name: "Farmacia Lumi",
        city: "Gjakove",
        address: "Qender, Gjakove",
        phone: "+383 45 678 901",
        hours: "07:00 - 21:00"
    }
];

function Home() {
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();

        if (!search.trim()) return;

        window.location.href = `/pharmacies?search=${encodeURIComponent(search)}`;
    };

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <Navbar />

            <main>
                <section className="bg-teal-50">
                    <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
                        <div>
                            <span className="mb-5 inline-block rounded-full bg-white px-4 py-2 text-sm font-medium text-teal-700">
                                Find pharmacies across Kosovo
                            </span>

                            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                                Find the medicine you need,{" "}
                                <span className="text-teal-700">closer to you.</span>
                            </h1>

                            <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
                                Search for medicines and discover pharmacies near you. PharmaKos makes finding the right pharmacy easier.
                            </p>

                            <form onSubmit={handleSearch} className="mt-8 flex max-w-xl rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                                <Search className="ml-2 mt-2.5 shrink-0 text-slate-400" size={21} />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search for a medicine or pharmacy..."
                                    className="min-w-0 flex-1 px-3 py-2 outline-none"
                                />
                                <button className="rounded-lg bg-teal-600 px-5 py-2.5 font-medium text-white hover:bg-teal-700">
                                    Search
                                </button>
                            </form>

                            <p className="mt-3 text-sm text-slate-500">
                                Find pharmacies and explore available medicines.
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <div className="flex h-72 w-72 items-center justify-center rounded-full bg-white shadow-sm md:h-96 md:w-96">
                                <div className="flex h-52 w-52 items-center justify-center rounded-full bg-teal-50 md:h-72 md:w-72">
                                    <Pill size={110} strokeWidth={1.2} className="text-teal-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 py-16">
                    <div className="mb-8 flex items-end justify-between">
                        <div>
                            <p className="font-medium text-teal-700">Browse medicines</p>
                            <h2 className="mt-2 text-3xl font-bold">Explore categories</h2>
                            <p className="mt-2 text-slate-500">
                                Find medicines by category.
                            </p>
                        </div>

                        <Link to="/pharmacies" className="hidden items-center gap-2 font-medium text-teal-700 hover:text-teal-800 sm:flex">
                            View all <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <Link
                                    key={category.name}
                                    to={`/pharmacies?category=${encodeURIComponent(category.name)}`}
                                    className="rounded-xl border border-slate-200 bg-white p-5 text-center transition hover:border-teal-300 hover:bg-teal-50"
                                >
                                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                                        <Icon size={23} />
                                    </div>
                                    <span className="font-medium text-slate-700">{category.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                <section className="border-y border-slate-100 bg-white py-16">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center">
                            <p className="font-medium text-teal-700">Simple and convenient</p>
                            <h2 className="mt-2 text-3xl font-bold">How PharmaKos Works</h2>
                            <p className="mx-auto mt-3 max-w-xl text-slate-500">
                                Finding the medicine you need takes only a few simple steps.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-8 md:grid-cols-3">
                            {[
                                {
                                    number: "01",
                                    icon: Search,
                                    title: "Search for medicine",
                                    description: "Enter the name of the medicine you are looking for."
                                },
                                {
                                    number: "02",
                                    icon: MapPin,
                                    title: "Explore pharmacies",
                                    description: "Discover pharmacies and check their available information."
                                },
                                {
                                    number: "03",
                                    icon: Store,
                                    title: "Find your pharmacy",
                                    description: "Choose a pharmacy and find its location and contact details."
                                }
                            ].map((step) => (
                                <div key={step.number} className="rounded-xl border border-slate-200 p-7">
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                                            <step.icon size={24} />
                                        </div>
                                        <span className="text-3xl font-bold text-teal-100">
                                            {step.number}
                                        </span>
                                    </div>
                                    <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                                    <p className="mt-2 leading-7 text-slate-500">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50 py-16">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-8 flex items-end justify-between">
                            <div>
                                <p className="font-medium text-teal-700">Discover local pharmacies</p>
                                <h2 className="mt-2 text-3xl font-bold">Pharmacies to explore</h2>
                                <p className="mt-2 text-slate-500">
                                    A preview of how pharmacy information is displayed on PharmaKos.
                                </p>
                            </div>

                            <Link to="/pharmacies" className="hidden items-center gap-2 font-medium text-teal-700 hover:text-teal-800 sm:flex">
                                All pharmacies <ArrowRight size={18} />
                            </Link>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {pharmacies.map((pharmacy) => (
                                <div key={pharmacy.name} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                                    <div className="mb-5 flex items-center justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                                            <Store size={25} />
                                        </div>
                                        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
                                            Sample
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-semibold">{pharmacy.name}</h3>

                                    <div className="mt-4 space-y-3 text-sm text-slate-500">
                                        <p className="flex items-center gap-2">
                                            <MapPin size={17} className="text-teal-600" />
                                            {pharmacy.address}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Phone size={17} className="text-teal-600" />
                                            {pharmacy.phone}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Clock size={17} className="text-teal-600" />
                                            {pharmacy.hours}
                                        </p>
                                    </div>

                                    <Link
                                        to="/pharmacies"
                                        className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-semibold text-teal-700 hover:text-teal-800"
                                    >
                                        Explore pharmacies <ArrowRight size={17} />
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <p className="mt-5 text-xs text-slate-400">
                            Pharmacy names, addresses, phone numbers and opening hours are sample data for demonstration purposes.
                        </p>

                        <div className="mt-8 text-center">
                            <Link to="/pharmacies" className="inline-flex items-center gap-2 rounded-lg border border-teal-200 bg-white px-6 py-3 font-medium text-teal-700 hover:bg-teal-50">
                                Browse all pharmacies <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="bg-teal-50 py-16">
                    <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
                        <div>
                            <p className="font-medium text-teal-700">Why PharmaKos?</p>
                            <h2 className="mt-2 text-3xl font-bold leading-tight">
                                Everything you need to find a pharmacy in one place.
                            </h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                PharmaKos connects people with pharmacies through one simple platform, making it easier to search for medicines and discover pharmacy information.
                            </p>

                            <div className="mt-8 space-y-5">
                                {[
                                    {
                                        icon: Search,
                                        title: "Easy medicine search",
                                        description: "Search for medicines without visiting multiple pharmacies."
                                    },
                                    {
                                        icon: MapPin,
                                        title: "Pharmacy locations",
                                        description: "Discover pharmacies in different cities across Kosovo."
                                    },
                                    {
                                        icon: ShieldCheck,
                                        title: "Organized information",
                                        description: "Access pharmacy details and available medicine information in one place."
                                    }
                                ].map((item) => (
                                    <div key={item.title} className="flex gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-teal-700">
                                            <item.icon size={22} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{item.title}</h3>
                                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-teal-100 bg-white p-8 shadow-sm">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                                <div className="rounded-lg bg-teal-50 p-3 text-teal-700">
                                    <Pill size={27} />
                                </div>
                                <div>
                                    <h3 className="font-semibold">PharmaKos</h3>
                                    <p className="text-sm text-slate-500">
                                        Your pharmacy search platform
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                {[
                                    "Search medicines by name",
                                    "Explore pharmacy information",
                                    "Discover pharmacies by city",
                                    "Contact pharmacies directly"
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-3 text-slate-600">
                                        <CheckCircle size={19} className="shrink-0 text-teal-600" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                to="/pharmacies"
                                className="mt-8 flex items-center justify-center gap-2 rounded-lg bg-teal-600 py-3 font-medium text-white hover:bg-teal-700"
                            >
                                Explore pharmacies <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 pb-16">
                    <div className="rounded-2xl bg-teal-50 px-8 py-12 text-center md:px-16">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-teal-700">
                            <Store size={27} />
                        </div>
                        <h2 className="mt-5 text-3xl font-bold">
                            Do you own a pharmacy?
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-slate-600">
                            Join PharmaKos and manage your pharmacy information and medicine availability through one platform.
                        </p>
                        <div className="mt-7 flex flex-wrap justify-center gap-3">
                            <Link
                                to="/pharmacy-register"
                                className="rounded-lg bg-teal-600 px-6 py-3 font-medium text-white hover:bg-teal-700"
                            >
                                Register your pharmacy
                            </Link>
                            <Link
                                to="/pharmacy-login"
                                className="rounded-lg border border-teal-200 bg-white px-6 py-3 font-medium text-teal-700 hover:bg-teal-50"
                            >
                                Pharmacy login
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Home;
