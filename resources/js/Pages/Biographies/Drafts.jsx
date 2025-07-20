import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Drafts({ drafts }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-green-800">
                    Biography Drafts
                </h2>
            }
        >
            <Head title="Biography Drafts" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-green-800">Your Biography Drafts</h1>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route("biographies.create")}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        + New Biography
                                    </Link>
                                    <Link
                                        href={route("biographies.index")}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Back to All Biographies
                                    </Link>
                                </div>
                            </div>

                            {drafts.data.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-gray-500 mb-4">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No drafts found</h3>
                                    <p className="text-gray-500 mb-4">You haven't saved any biography drafts yet.</p>
                                    <Link
                                        href={route("biographies.create")}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Create Your First Biography
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full table-auto border-collapse border border-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Full Name</th>
                                                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">State of Origin</th>
                                                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Last Updated</th>
                                                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {drafts.data.map((draft) =>  (
                                                <tr key={draft.id} className="hover:bg-gray-50">
                                                    <td className="border border-gray-200 px-4 py-2">
                                                        <div className="font-medium text-gray-900">{draft.full_name}</div>
                                                        {draft.title && (
                                                            <div className="text-sm text-gray-500">{draft.title}</div>
                                                        )}
                                                    </td>
                                                    <td className="border border-gray-200 px-4 py-2 text-gray-700">
                                                        {draft.state_of_origin || "-"}
                                                    </td>
                                                    <td className="border border-gray-200 px-4 py-2 text-gray-500">
                                                        {new Date(draft.updated_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="border border-gray-200 px-4 py-2">
                                                       <Link href={route('biographies.create', { draft_id: draft.id })}
                                                            className="text-green-600 hover:text-green-800 hover:underline font-medium"
                                                        >
                                                            Continue Editing
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Pagination */}
                            {drafts.links && drafts.links.length > 3 && (
                                <div className="mt-6 flex justify-center">
                                    <div className="flex space-x-1">
                                        {drafts.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || "#"}
                                                className={`px-3 py-2 text-sm rounded-md ${
                                                    link.active
                                                        ? "bg-green-600 text-white"
                                                        : "bg-white text-gray-500 hover:text-gray-700 border border-gray-300"
                                                } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}