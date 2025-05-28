import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function GuestLayout({ children }) {
    const [showBrowse, setShowBrowse] = useState(false);
    const [showWarning, setShowWarning] = useState(true);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col text-gray-800">
            {/* Top Nav */}
            <div className="bg-gray-100 border-b text-sm px-4 py-2 flex justify-end space-x-4">
                <a href="#" className="hover:underline">Obituaries Nigeria</a>
                <a href="#" className="hover:underline">People Nigeria</a>
                <a href="#" className="hover:underline">Indigenous Nigeria</a>
                <a href="#" className="hover:underline">Women Nigeria</a>
                <a href="#" className="hover:underline">Labour Nigeria</a>
            </div>

            {/* Title and Search */}
            <div className="bg-white shadow-sm px-4 py-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className='flex items-center gap-4 sm:gap-6'>
                        <ApplicationLogo />
                    <h1 className="text-3xl font-bold text-center sm:text-left">Nigerian Dictionary of National Biography</h1>

                    </div>
                    <form className="flex items-center gap-2 w-full sm:w-auto">
                        <select className="border rounded px-2 py-1">
                            <option value="person">person</option>
                            <option value="all" selected>text</option>
                        </select>
                        <input type="text" placeholder="Quick search..." className="border rounded px-2 py-1 w-full sm:w-64" />
                        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Search</button>
                    </form>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="bg-blue-900 text-white">
                <ul className="flex flex-wrap justify-center space-x-4 px-4 py-3 text-sm font-medium">
                    <li><Link href="/" className="hover:underline">Home</Link></li>
                    <li><Link href="/about-us" className="hover:underline">About</Link></li>
                    <li><Link href="/contact-us" className="hover:underline">Contact</Link></li>
                    <li><Link href="/projects" className="hover:underline">Projects</Link></li>
                    <li><Link href="/essays/browse" className="hover:underline">Group Bios</Link></li>
                    <li><Link href="/advanced-search" className="hover:underline">Advanced Search</Link></li>
                    <li><Link href="/facets" className="hover:underline">Faceted Browse</Link></li>
                    <li><button onClick={() => setShowBrowse(!showBrowse)} className="hover:underline">Browse</button></li>
                    <li><Link href="/donate" className="hover:underline">Donate</Link></li>
                </ul>
            </nav>

            {/* Browse Panel */}
            {showBrowse && (
                <div className="bg-gray-100 border-t px-4 py-4">
                    <h3 className="font-semibold mb-2">Browse by:</h3>
                    <ul className="space-x-4 flex flex-wrap text-sm">
                        <li><Link href="/biographies/name" className="text-blue-700 hover:underline">Name</Link></li>
                        <li><Link href="/biographies/birth" className="text-blue-700 hover:underline">Date of Birth</Link></li>
                        <li><Link href="/biographies/death" className="text-blue-700 hover:underline">Date of Death</Link></li>
                        <li><Link href="/biographies/browse-author" className="text-blue-700 hover:underline">Author</Link></li>
                        <li><Link href="/entities/browse/?otype=map" className="text-blue-700 hover:underline">Maps</Link></li>
                    </ul>
                </div>
            )}

            {/* Cultural Warning */}
            {showWarning && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="font-bold mb-2">Cultural Advice</h2>
                            <p>This site may contain names, images, and voices of deceased persons.</p>
                            <p>Some articles reflect views from earlier periods that may no longer be appropriate.</p>
                        </div>
                        <button
                            onClick={() => setShowWarning(false)}
                            className="ml-4 text-sm underline"
                        >Hide message</button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white px-4 py-6 text-sm">
                <div className="container mx-auto text-center space-y-2">
                    <h3 className="text-lg font-semibold">Nigerian Dictionary of Biography</h3>
                    <p>An initiative of the <a href="https://www.nigerianhistory.org" className="underline">Institute for Historical Studies and Biographic Research</a></p>
                    <p>© Copyright NDB, 2025 · <Link href="/copyright" className="underline">Copyright</Link> · <Link href="/disclaimer" className="underline">Disclaimer</Link> · <Link href="/privacy" className="underline">Privacy Policy</Link></p>
                </div>
            </footer>
        </div>
    );
}
