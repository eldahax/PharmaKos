import { useMemo, useState } from "react";
import Profile from "./Prof";

const nameRegex = /^[A-Za-zÀ-ÿ\s'-]{2,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const initialUsers = [
    { user_id: 1, first_name: "Elda", last_name: "Haxhidauti", email: "elda@example.com" },
    { user_id: 2, first_name: "Edra", last_name: "Shala", email: "edra@example.com" },

    { user_id: 3, first_name: "Aurela", last_name: "Domniku", email: "aurela@example.com" },
];

export default function UserTable() {
    const [users, setUsers] = useState(initialUsers);
    const [editingUser, setEditingUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const filteredUsers = useMemo(() => {
        const q = searchTerm.toLowerCase();
        return users.filter((u) =>
            `${u.first_name} ${u.last_name} ${u.email}`.toLowerCase().includes(q)
        );
    }, [users, searchTerm]);

    const paginatedUsers = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredUsers.slice(start, start + itemsPerPage);
    }, [filteredUsers, currentPage]);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const handleDelete = (id) => {
        setUsers((prev) => prev.filter((u) => u.user_id !== id));
    };

    const handleUpdate = (id, data) => {
        setUsers((prev) => prev.map((u) => (u.user_id === id ? { ...u, ...data } : u)));
        setEditingUser(null);
    };

    return (
        <div className="flex min-h-screen flex-col md:flex-row bg-slate-50 text-slate-900">
            <Profile />

            <main className="flex-1 p-6 sm:p-10">
                <header className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-teal-700">Administration</p>
                        <h2 className="mt-1 text-2xl sm:text-3xl font-bold">
                            Customer Management
                        </h2>
                    </div>

                    <input
                        value={searchTerm}
                        placeholder="Search customers..."
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full sm:w-64 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-teal-600 focus:outline-none"
                    />
                </header>

                {editingUser ? (
                    <EditUserForm
                        user={editingUser}
                        onCancel={() => setEditingUser(null)}
                        onUpdate={handleUpdate}
                    />
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-slate-100 bg-teal-50 text-xs font-semibold text-teal-800">
                                <tr>
                                    <th className="px-6 py-4">First Name</th>
                                    <th className="px-6 py-4">Last Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {paginatedUsers.map((user) => (
                                    <tr
                                        key={user.user_id}
                                        className="transition hover:bg-teal-50/60"
                                    >
                                        <td className="px-6 py-4 font-semibold text-slate-900">
                                            {user.first_name}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {user.last_name}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{user.email}</td>
                                        <td className="px-6 py-4 text-right space-x-4">
                                            <button
                                                type="button"
                                                onClick={() => setEditingUser(user)}
                                                className="text-xs font-semibold text-teal-700 hover:text-teal-800 hover:underline cursor-pointer"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(user.user_id)}
                                                className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setCurrentPage(i + 1)}
                                className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${currentPage === i + 1
                                    ? "bg-teal-600 text-white"
                                    : "border border-teal-200 bg-white text-teal-700 hover:bg-teal-50"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

function EditUserForm({ user, onCancel, onUpdate }) {
    const [data, setData] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};
        if (!nameRegex.test(data.first_name.trim()))
            e.first_name = "First name must be at least 2 letters.";
        if (!nameRegex.test(data.last_name.trim()))
            e.last_name = "Last name must be at least 2 letters.";
        if (!emailRegex.test(data.email.trim()))
            e.email = "Enter a valid email address.";
        setErrors(e);
        return !Object.keys(e).length;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onUpdate(user.user_id, {
                first_name: data.first_name.trim(),
                last_name: data.last_name.trim(),
                email: data.email.trim(),
            });
        }
    };

    const fieldClass = (err) =>
        `w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none ${err
            ? "border-red-400 focus:border-red-500"
            : "border-slate-200 focus:border-teal-600"
        }`;

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="max-w-2xl space-y-5 rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm"
        >
            <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    First Name
                </label>
                <input
                    name="first_name"
                    value={data.first_name}
                    onChange={handleChange}
                    placeholder="First Name"
                    className={fieldClass(errors.first_name)}
                />
                {errors.first_name && (
                    <p className="mt-1 text-xs text-red-600">{errors.first_name}</p>
                )}
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Last Name
                </label>
                <input
                    name="last_name"
                    value={data.last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className={fieldClass(errors.last_name)}
                />
                {errors.last_name && (
                    <p className="mt-1 text-xs text-red-600">{errors.last_name}</p>
                )}
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Email
                </label>
                <input
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className={fieldClass(errors.email)}
                />
                {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
            </div>

            <div className="flex gap-3 pt-2">
                <button
                    type="submit"
                    className="flex-1 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-700 transition cursor-pointer"
                >
                    Save Changes
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg border border-teal-200 bg-white px-6 py-2.5 text-sm font-medium text-teal-700 hover:bg-teal-50 transition cursor-pointer"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
