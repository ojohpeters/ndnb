import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, usePage, Head, router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ biographies, filters, states }) {
    const [search, setSearch] = useState(filters.search || "");
    const [stateOfOrigin, setStateOfOrigin] = useState(
        filters.state_of_origin || ""
    );

    const [showModal, setShowModal] = useState(false);
    const [toDelete, setToDelete] = useState(null);

    const handleFilter = (e) => {
        e.preventDefault();
        let params = [];
        if (search) params.push(`search=${encodeURIComponent(search)}`);
        if (stateOfOrigin)
            params.push(`state_of_origin=${encodeURIComponent(stateOfOrigin)}`);
        window.location.href = `?${params.join("&")}`;
    };

    const confirmDelete = (bio) => {
        setToDelete(bio);
        setShowModal(true);
    };

    const handleDelete = () => {
        if (toDelete) {
            console.log("Deleting:", toDelete);
            router.delete(route("biographies.destroy", toDelete.slug), {
                onFinish: () => {
                    setShowModal(false);
                    setToDelete(null);
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="max-w-5xl mx-auto p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold mb-6 ">
                                    Biographies
                                </h1>
                                <Link
                                    href={route("biographies.create")}
                                    className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded"
                                >
                                    Add
                                </Link>
                            </div>

                            {/* Search & Filter */}
                            <form
                                onSubmit={handleFilter}
                                className="flex flex-wrap gap-2 mb-6"
                            >
                                <input
                                    type="text"
                                    placeholder="Search by name or title"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="border rounded px-3 py-2"
                                />
                                <select
                                    value={stateOfOrigin}
                                    onChange={(e) =>
                                        setStateOfOrigin(e.target.value)
                                    }
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
                                    className="bg-indigo-600 text-white px-4 py-2 rounded"
                                >
                                    Filter
                                </button>
                            </form>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border">
                                                Name
                                            </th>
                                            <th className="px-4 py-2 border">
                                                Title
                                            </th>
                                            <th className="px-4 py-2 border">
                                                State of Origin
                                            </th>
                                            <th className="px-4 py-2 border">
                                                Date of Birth
                                            </th>
                                            <th className="px-4 py-2 border">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {biographies.data.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="text-center py-4"
                                                >
                                                    No biographies found.
                                                </td>
                                            </tr>
                                        )}
                                        {biographies.data.map((bio) => (
                                            <tr key={bio.id}>
                                                <td className="border px-4 py-2">
                                                    {bio.full_name}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {bio.title}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {bio.state_of_origin}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {bio.date_of_birth}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    <Link
                                                        href={route(
                                                            "biographies.show",
                                                            bio.slug
                                                        )}
                                                        className="text-indigo-600 hover:underline"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "biographies.edit",
                                                            bio.slug
                                                        )}
                                                        className="text-indigo-600 hover:underline ml-2"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            confirmDelete(bio)
                                                        }
                                                        className="text-red-600 hover:underline ml-2"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Confirmation Modal */}
                            {showModal && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                                    <div className="bg-white rounded shadow-lg p-6 max-w-sm w-full">
                                        <h2 className="text-lg font-bold mb-4">
                                            Confirm Delete
                                        </h2>
                                        <p>
                                            Are you sure you want to delete{" "}
                                            <span className="font-semibold">
                                                {toDelete?.full_name}
                                            </span>
                                            ?
                                        </p>
                                        <div className="mt-6 flex justify-end gap-2">
                                            <button
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                                className="px-4 py-2 rounded bg-gray-200"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleDelete}
                                                className="px-4 py-2 rounded bg-red-600 text-white"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Pagination */}
                            <div className="flex justify-center mt-6 space-x-2">
                                {biographies.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        disabled={!link.url}
                                        onClick={() =>
                                            link.url &&
                                            (window.location.href = link.url)
                                        }
                                        className={`px-3 py-1 rounded ${
                                            link.active
                                                ? "bg-indigo-600 text-white"
                                                : "bg-white border"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
