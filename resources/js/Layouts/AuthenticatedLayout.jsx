import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link, usePage, router } from "@inertiajs/react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navLinks = [
        { name: "Dashboard", routeName: "dashboard" },
        { name: "Biographies", routeName: "biographies.index" },
        // { name: "Education", routeName: "education.index" },
        // { name: "Occupations", routeName: "occupations.index" },
        // { name: "Awards", routeName: "awards.index" },
        // { name: "Workplaces", routeName: "workplaces.index" },
        // // { name: "News", routeName: "news.index" },
        // { name: "Projects", routeName: "projects.index" },
        // { name: "Essays", routeName: "essays.index" },
    ];

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route("logout"));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside
                className={`h-full bg-white shadow-md flex flex-col transition-all duration-200 ${
                    sidebarOpen ? "w-64" : ""
                }`}
                style={{
                    minHeight: "100vh",
                }}
            >
                {/* Toggle button */}
                <button
                    className="absolute top-4 right-[20px] z-10 bg-white border rounded-full shadow p-1 focus:outline-none"
                    onClick={() => setSidebarOpen((open) => !open)}
                    aria-label="Toggle sidebar"
                >
                    <svg
                        className="h-6 w-6 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        {sidebarOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                {/* User profile section */}
                <div className="flex flex-col items-center px-4 py-6 border-b border-gray-200 ">
                    <img
                        src={
                            user.profile_photo_url ||
                            "https://ui-avatars.com/api/?name=" +
                                encodeURIComponent(user.name)
                        }
                        alt={user.name}
                        className="w-12 h-12 rounded-full mb-2"
                    />
                    {sidebarOpen && (
                        <>
                            <span className="font-semibold text-gray-800">
                                {user.name}
                            </span>
                            <div className="flex flex-col mt-2 w-full">
                                <Link
                                    href={route("profile.edit")}
                                    className="text-sm text-gray-600 hover:text-indigo-700 py-1"
                                >
                                    Profile
                                </Link>
                                <form
                                    method="POST"
                                    onSubmit={handleLogout}
                                    className="w-full"
                                >
                                    
                                    <button
                                        type="submit"
                                        className="text-sm text-red-600 hover:text-red-800 py-1 text-left w-full"
                                    >
                                        Log Out
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                </div>

                {/* Navigation links */}
                <nav className="flex flex-col p-4 space-y-2 flex-1">
                    {navLinks.map(({ name, routeName }) => (
                        <Link
                            key={name}
                            href={route(routeName)}
                            className={`block rounded px-3 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-900 ${
                                !sidebarOpen ? "text-center px-0" : ""
                            }`}
                            title={!sidebarOpen ? name : undefined}
                        >
                            {sidebarOpen ? name : name[0]}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Page content */}
            <div className="flex-1 flex flex-col">
                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main>{children}</main>
            </div>
        </div>
    );
}
