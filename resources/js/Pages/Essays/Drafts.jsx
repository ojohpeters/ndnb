import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";

export default function Drafts({ drafts }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Essay Drafts
                </h2>
            }
        >
            <Head title="Essay Drafts" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="max-w-5xl mx-auto p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">Essay Drafts</h1>
                                <div className="flex gap-2">
                                    <Link
                                        href={route("essays.index")}
                                        className="bg-gray-600 text-white px-4 py-2 rounded"
                                    >
                                        View All Essays
                                    </Link>
                                    <Link
                                        href={route("essays.create")}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded"
                                    >
                                        Create Essay
                                    </Link>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border">Title</th>
                                            <th className="px-4 py-2 border">Author</th>
                                            <th className="px-4 py-2 border">Project</th>
                                            <th className="px-4 py-2 border">Last Modified</th>
                                            <th className="px-4 py-2 border">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {drafts.data.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="text-center py-4">
                                                    No drafts found.
                                                </td>
                                            </tr>
                                        )}
                                        {drafts.data.map((draft) => (
                                            <tr key={draft.id}>
                                                <td className="border px-4 py-2">{draft.title}</td>
                                                <td className="border px-4 py-2">{draft.author || "-"}</td>
                                                <td className="border px-4 py-2">{draft.project || "-"}</td>
                                                <td className="border px-4 py-2">
                                                    {new Date(draft.updated_at).toLocaleDateString()}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    <Link
                                                        href={route("essays.edit", draft.slug)}
                                                        className="text-indigo-600 hover:underline"
                                                    >
                                                        Continue Editing
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center mt-6 space-x-2">
                                {drafts.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        disabled={!link.url}
                                        onClick={() => link.url && (window.location.href = link.url)}
                                        className={`px-3 py-1 rounded ${
                                            link.active
                                                ? "bg-indigo-600 text-white"
                                                : "bg-white border"
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
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