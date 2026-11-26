import { useState } from "react";
import { Pill, Mail, Phone, MapPin, Check, } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const name_regex = /^[A-Za-zÀ-ÿ\s'-]{2,80}$/;
const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const pharmacy_regex = /^[A-Za-z0-9À-ÿ\s&.,-]{2,120}$/;

function Contact() {
    const [role, setRole] = useState("patient");
    const [form, setForm] = useState({ name: "", email: "", pharmacyName: "", message: "" });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const e = {};
        if (!name_regex.test(form.name.trim())) e.name = "Enter a valid name (letters only, min 2).";
        if (!email_regex.test(form.email.trim())) e.email = "Enter a valid email address.";
        if (role === "pharmacy" && !pharmacy_regex.test(form.pharmacyName.trim()))
            e.pharmacyName = "Enter a valid pharmacy name.";
        if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (!Object.keys(errs).length) setSubmitted(true);
    };

    const resetForm = () => {
        setSubmitted(false);
        setErrors({});
        setForm({ name: "", email: "", pharmacyName: "", message: "" });
    };

    const inputClass = (err) =>
        `w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition ${err ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-teal-600"
        }`;

    return (
        <div className="min-h-screen text-slate-800 flex flex-col justify-between">
            <Navbar />

            <main className="max-w-6xl w-full mx-auto px-5 sm:px-8 py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                <div className="lg:col-span-5 space-y-6">

                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">
                            Contact &amp; Support
                        </p>
                        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-[1.15]">
                            Questions about stock or pharmacy onboarding?
                        </h1>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                            Whether you are having trouble finding a medication nearby or want
                            to connect your pharmacy branches to PharmaKos, send us a note.
                        </p>
                    </div>

                    <div className="pt-4 border-t border-teal-900/10 space-y-4 text-sm">
                        <div className="flex items-start gap-3">
                            <Mail size={17} className="text-teal-700 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-slate-900">Email</p>
                                <a href="mailto:support@pharmakos.ks" className="text-slate-600 hover:text-teal-700 transition">
                                    support@pharmakos.ks
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Phone size={17} className="text-teal-700 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-slate-900">Pharmacy Onboarding Desk</p>
                                <p className="text-slate-600">+383 44 000 000</p>
                                <p className="text-xs text-slate-400 mt-0.5">Mon–Fri, 08:30 – 17:00</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <MapPin size={17} className="text-teal-700 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-slate-900">Office</p>
                                <p className="text-slate-600">Prishtinë, Kosovë</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7">
                    <div className="bg-white rounded-2xl border border-teal-100 p-6 sm:p-8">
                        {submitted ? (
                            <div className="py-10 text-center space-y-4">
                                <div className="h-11 w-11 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mx-auto">
                                    <Check size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">Message received</h2>
                                <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                                    Thanks, {form.name.trim()}. We will reply to{" "}
                                    <span className="font-medium text-slate-900">{form.email.trim()}</span> within one business day.
                                </p>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="text-xs font-semibold text-teal-700 hover:text-teal-800 hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                                        I am reaching out as a
                                    </label>
                                    <div className="grid grid-cols-2 gap-2.5 p-1 bg-slate-50 rounded-xl border border-slate-200/70">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setRole("patient");
                                                setErrors((prev) => ({ ...prev, pharmacyName: "" }));
                                            }}
                                            className={`py-2 px-3 rounded-lg text-sm font-semibold transition ${role === "patient"
                                                ? "bg-white text-teal-700 shadow-xs border border-teal-100"
                                                : "text-slate-600 hover:text-slate-900"
                                                }`}
                                        >
                                            Patient
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setRole("pharmacy")}
                                            className={`py-2 px-3 rounded-lg text-sm font-semibold transition ${role === "pharmacy"
                                                ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                                                : "text-slate-600 hover:text-slate-900"
                                                }`}
                                        >
                                            Pharmacy / Chain
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                                            Full name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Arben Krasniqi"
                                            className={inputClass(errors.name)}
                                        />
                                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                                            Email address
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="arben@example.com"
                                            className={inputClass(errors.email)}
                                        />
                                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                                    </div>
                                </div>

                                {role === "pharmacy" && (
                                    <div>
                                        <label htmlFor="pharmacyName" className="block text-sm font-medium text-slate-700 mb-1.5">
                                            Pharmacy name &amp; number of branches
                                        </label>
                                        <input
                                            id="pharmacyName"
                                            name="pharmacyName"
                                            value={form.pharmacyName}
                                            onChange={handleChange}
                                            placeholder="e.g. Barnatore Alba — 3 branches"
                                            className={inputClass(errors.pharmacyName)}
                                        />
                                        {errors.pharmacyName && (
                                            <p className="mt-1 text-xs text-red-600">{errors.pharmacyName}</p>
                                        )}
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
                                        How can we help?
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder={
                                            role === "patient"
                                                ? "Let us know if a pharmacy listing looks outdated or if you need help with your account..."
                                                : "Tell us about your pharmacy setup or any questions about managing stock..."
                                        }
                                        className={`${inputClass(errors.message)} resize-none`}
                                    />
                                    {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                                </div>

                                <div className="pt-1 flex items-center justify-between gap-4">
                                    <p className="text-xs text-slate-400">
                                        For medical emergencies, contact emergency services directly.
                                    </p>
                                    <button
                                        type="submit"
                                        className={`shrink-0 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition cursor-pointer ${role === "patient"
                                            ? "bg-teal-600 hover:bg-teal-700"
                                            : "bg-slate-900 hover:bg-slate-800"
                                            }`}
                                    >
                                        Send message
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Contact;