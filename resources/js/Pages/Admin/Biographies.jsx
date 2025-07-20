
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Biographies({ biographies, stats }) {
    const handleAction = (biography, action) => {
        if (action === 'approve') {
            if (confirm(`Are you sure you want to approve and publish "${biography.full_name}"?`)) {
                router.post(route('admin.biographies.approve', biography));
            }
        } else if (action === 'reject') {
            if (confirm(`Are you sure you want to reject "${biography.full_name}"?`)) {
                router.post(route('admin.biographies.reject', biography));
            }
        } else if (action === 'delete') {
            if (confirm(`Are you sure you want to delete "${biography.full_name}"? This action cannot be undone.`)) {
                router.delete(route('admin.biographies.delete', biography));
            }
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin - Biography Management
                </h2>
            }
        >
            <Head title="Biography Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold mb-4">Biography Management</h1>
                                
                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                                        <div className="text-sm text-blue-500">Total Biographies</div>
                                    </div>
                                    <div className="bg-yellow-50 p-4 rounded-lg">
                                        <div className="text-2xl font-bold text-yellow-600">{stats.submitted}</div>
                                        <div className="text-sm text-yellow-500">Pending Review</div>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <div className="text-2xl font-bold text-green-600">{stats.published}</div>
                                        <div className="text-sm text-green-500">Published</div>
                                    </div>
                                    <div className="bg-red-50 p-4 rounded-lg">
                                        <div className="text-2xl font-bold text-red-600">{stats.declined}</div>
                                        <div className="text-sm text-red-500">Declined</div>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Biography
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Author
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Submitted
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {biographies.data.map((biography) => (
                                            <tr key={biography.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        {biography.photo && (
                                                            <img
                                                                className="h-10 w-10 rounded-full object-cover mr-4"
                                                                src={`/storage/${biography.photo}`}
                                                                alt={biography.full_name}
                                                            />
                                                        )}
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {biography.full_name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {biography.title}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {biography.user?.first_name} {biography.user?.last_name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {biography.user?.email}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        biography.status === 'published' ? 'bg-green-100 text-green-800' :
                                                        biography.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                                                        biography.status === 'declined' ? 'bg-red-100 text-red-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {biography.status.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {biography.submitted_at ? new Date(biography.submitted_at).toLocaleDateString() : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link
                                                        href={route('admin.biographies.show', biography)}
                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                    >
                                                        View
                                                    </Link>
                                                    {biography.status === 'submitted' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleAction(biography, 'approve')}
                                                                className="text-green-600 hover:text-green-900 mr-3"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleAction(biography, 'reject')}
                                                                className="text-red-600 hover:text-red-900 mr-3"
                                                            >
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}
                                                    <button
                                                        onClick={() => handleAction(biography, 'delete')}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {biographies.data.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No biographies found.</p>
                                </div>
                            )}

                            {/* Pagination */}
                            <div className="flex justify-center mt-6 space-x-2">
                                {biographies.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        disabled={!link.url}
                                        onClick={() => link.url && (window.location.href = link.url)}
                                        className={`px-3 py-1 rounded ${
                                            link.active
                                                ? "bg-blue-600 text-white"
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
