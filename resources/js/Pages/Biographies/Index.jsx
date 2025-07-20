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
                                <div className="flex space-x-2">
                                    <Link
                                        href={route("biographies.drafts")}
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        View Drafts
                                    </Link>
                                    <Link
                                        href={route("biographies.create")}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        + New Biography
                                    </Link>
                                </div>
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
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Biography Details
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                                        {biographies.data.map((biography) => (
                                            <tr key={biography.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            {biography.photo ? (
                                                                <img
                                                                    className="h-10 w-10 rounded-full object-cover"
                                                                    src={`/storage/${biography.photo}`}
                                                                    alt={biography.full_name}
                                                                />
                                                            ) : (
                                                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                                    <span className="text-sm font-medium text-gray-700">
                                                                        {biography.full_name
                                                                            .split(' ')
                                                                            .map(name => name[0])
                                                                            .join('')
                                                                            .toUpperCase()}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                <Link
                                                                    href={route('biographies.show', biography.slug)}
                                                                    className="hover:text-blue-600"
                                                                >
                                                                    {biography.full_name}
                                                                </Link>
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {biography.title}
                                                                {biography.date_of_birth && ` (${new Date(biography.date_of_birth).getFullYear()})`}
                                                                {biography.date_of_death && ` - ${new Date(biography.date_of_death).getFullYear()}`}
                                                            </div>
                                                            <div className="text-xs text-gray-400 mt-1">
                                                                {biography.state_of_origin && `${biography.state_of_origin} • `}
                                                                {biography.biography_text && `${biography.biography_text.substring(0, 100)}...`}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        biography.status === 'published' ? 'bg-green-100 text-green-800' :
                                                        biography.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                                                        biography.status === 'copy_editing' ? 'bg-yellow-100 text-yellow-800' :
                                                        biography.status === 'editor_review' ? 'bg-purple-100 text-purple-800' :
                                                        biography.status === 'declined' ? 'bg-red-100 text-red-800' :
                                                        biography.status === 'returned' ? 'bg-orange-100 text-orange-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {biography.status.replace('_', ' ').toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {biography.submitted_at ? new Date(biography.submitted_at).toLocaleDateString() : 
                                                     biography.created_at ? new Date(biography.created_at).toLocaleDateString() : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link
                                                        href={route('biographies.show', biography.slug)}
                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                    >
                                                        View
                                                    </Link>
                                                    {biography.status === 'draft' && (
                                                        <Link
                                                            href={route('biographies.edit', biography)}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Edit
                                                        </Link>
                                                    )}
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
// The code has been updated to improve the biography index page by displaying more relevant information and enhancing the layout.