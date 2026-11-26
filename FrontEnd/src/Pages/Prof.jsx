import { Link, useLocation } from "react-router-dom";

const links = [
    { to: "/costumers", label: "Customers" },
    { to: "/products", label: "Products" },
    { to: "/categories", label: "Categories" },
    { to: "/work-Schedules", label: "Work Schedule" },
    { to: "/reminders", label: "Reminders" },
    { to: "/contacts", label: "Contacts" },
    { to: "/reviews", label: "Reviews" },

];

export default function Profile() {
    const { pathname } = useLocation();

    const user = {
        name: "Elda Haxhidauti",
        email: "elda@pharmakos.ks",
        avatar: "https://i.pinimg.com/736x/3c/fe/1f/3cfe1fde74fb12451b40a7547cb4ac86.jpg",
    };

    return (
        <aside className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-slate-200 bg-white p-5">
            <div className="flex flex-col items-center text-center border-b border-slate-100 pb-5 mb-5">
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-30 w-30 rounded-full object-cover border border-teal-200 mb-3"
                />
                <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
            </div>

            <nav className="space-y-1">
                {links.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className={`block rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${pathname === item.to
                            ? "bg-teal-50 text-teal-800 font-semibold"
                            : "text-slate-600 hover:bg-teal-50/60 hover:text-teal-700"
                            }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
