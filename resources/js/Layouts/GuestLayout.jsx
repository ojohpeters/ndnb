import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/" className="text-2xl font-bold text-green-800">
                                    NDNB
                                </Link>
                            </div>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            <Link
                                href="/"
                                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            >
                                Home
                            </Link>
                            <Link
                                href="/biographies"
                                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            >
                                Biographies
                            </Link>
                            <Link
                                href="/about-us"
                                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            >
                                About
                            </Link>
                            <Link
                                href="/contact-us"
                                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            >
                                Contact
                            </Link>
                            <Link
                                href="/faq"
                                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            >
                                FAQ
                            </Link>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            {auth?.user ? (
                                <Link
                                    href="/dashboard"
                                    className="text-sm text-gray-700 underline"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-sm text-gray-700 underline mr-4"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="text-sm text-gray-700 underline"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-green-800 text-white px-4 py-6 text-sm">
                <div className="container mx-auto text-center space-y-2">
                    <h3 className="text-lg font-semibold">Nigerian Dictionary of National Biography</h3>
                    <p>An initiative of the <a href="https://instituteforhistoricalstudies.org" className="underline">Institute for Historical Studies, Biographical Research, Documentation and Legacy</a></p>
                    <p>© Copyright NDNB, 2025</p>
                </div>
            </footer>
        </div>
    );
}