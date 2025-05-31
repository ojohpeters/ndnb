// Example snippet for resources/js/Pages/Biographies/All.jsx

import { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function All({ biographies, filters, states }) {
    const [search, setSearch] = useState(filters.search || "");
    const [stateOfOrigin, setStateOfOrigin] = useState(
        filters.state_of_origin || ""
    );

    const handleFilter = (e) => {
        e.preventDefault();
        let params = [];
        if (search) params.push(`search=${encodeURIComponent(search)}`);
        if (stateOfOrigin)
            params.push(`state_of_origin=${encodeURIComponent(stateOfOrigin)}`);
        window.location.href = `?${params.join("&")}`;
    };

    return (
        <GuestLayout>
            <Head title="Biographies" />
            <div>
            <form onSubmit={handleFilter} className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Search by name or title"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded px-3 py-2"
                />
                <select
                    value={stateOfOrigin}
                    onChange={(e) => setStateOfOrigin(e.target.value)}
                    className="border rounded px-3 py-2"
                >
                    <option value="">All States</option>
                    {states.map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Filter
                </button>
            </form>

            {biographies.data.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                    No biographies found.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {biographies.data.map((bio) => (
                        <div
                            key={bio.id}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col"
                        >
                            {bio.photo && (
                                <img
                                    src={
                                        bio.photo.startsWith("http")
                                            ? bio.photo
                                            : `/storage/${bio.photo}`
                                    }
                                    alt={bio.full_name}
                                    className="w-full h-48 object-cover rounded mb-4"
                                />
                            )}
                            <h3 className="text-xl font-bold mb-1">
                                {bio.full_name}
                            </h3>
                            {bio.title && (
                                <div className="text-green-700 font-semibold mb-1">
                                    {bio.title}
                                </div>
                            )}
                            <div className="text-gray-600 mb-2">
                                {bio.state_of_origin}
                                {bio.lga && `, ${bio.lga}`}
                            </div>
                            <div className="text-gray-500 text-sm mb-4">
                                {bio.date_of_birth && (
                                    <>Born: {bio.date_of_birth}</>
                                )}
                                {bio.date_of_death && (
                                    <>
                                        {bio.date_of_birth ? " – " : ""}
                                        Died: {bio.date_of_death}
                                    </>
                                )}
                            </div>
                            <Link
                                href={route("biographies.show", bio.slug)}
                                className="mt-auto inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                            >
                                View Biography
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {biographies.links && biographies.links.length > 1 && (
                <div className="mt-8 flex justify-center space-x-1">
                    {biographies.links.map((link, idx) => (
                        <button
                            key={idx}
                            disabled={!link.url}
                            onClick={() =>
                                link.url && (window.location.href = link.url)
                            }
                            className={`px-3 py-1 rounded ${
                                link.active
                                    ? "bg-green-600 text-white"
                                    : "bg-white text-green-700 border"
                            } ${
                                !link.url
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-green-50"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </div>
        </GuestLayout>
    );
}
