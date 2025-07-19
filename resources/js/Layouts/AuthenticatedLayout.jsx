import { useState, useEffect } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage, router } from "@inertiajs/react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // Fetch unread notifications count
        fetch(route('notifications.unread-count'))
            .then(response => response.json())
            .then(data => setUnreadCount(data.count))
            .catch(error => console.error('Error fetching notifications:', error));
    }, []);

    const NotificationBell = () => (
        <Link
            href={route('notifications.index')}
            className="relative p-2 text-gray-500 hover:text-green-600 transition-colors duration-200"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-4.8-5.4c-.46-.52-.7-1.2-.7-1.9V6a5 5 0 00-10 0v3.7c0 .7-.24 1.37-.7 1.9L0 17h5m10 0v1a3 3 0 01-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center">
                    {unreadCount > 99 ? '99+' : unreadCount}
                </span>
            )}
        </Link>
    );

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
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                        {header}
                        <div className="flex items-center space-x-4">
                            <NotificationBell />
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </header>

                <main>{children}</main>
            </div>
        </div>
    );
}