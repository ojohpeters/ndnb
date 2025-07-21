
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ biographies }) {
    const [selectedBio, setSelectedBio] = useState(null);
    const [showModal, setShowModal] = useState(false);
    
    const { data, setData, post, processing } = useForm({
        notes: ''
    });

    const handleAction = (biography) => {
        setSelectedBio(biography);
        setShowModal(true);
        setData({ notes: '' });
    };

    const submitAction = (e) => {
        e.preventDefault();
        
        post(route('copy-editor.approve', selectedBio.slug), {
            onSuccess: () => {
                setShowModal(false);
                setSelectedBio(null);
            }
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            'editor_approved': 'bg-green-100 text-green-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-lg sm:text-xl font-semibold leading-tight text-blue-800">
                    Copy Editor Dashboard
                </h2>
            }
        >
            <Head title="Copy Editor Dashboard" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-4 sm:py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg border-t-4 border-blue-600 overflow-hidden">
                        <div className="bg-blue-100 px-4 sm:px-6 py-3 sm:py-4 border-b border-blue-200">
                            <h3 className="text-base sm:text-lg font-semibold text-blue-800">
                                Biographies for Copy Editing
                            </h3>
                        </div>

                        <div className="divide-y divide-gray-200">
                            {biographies.data && biographies.data.length > 0 ? (
                                biographies.data.map((biography) => (
                                    <div key={biography.id} className="p-4 sm:p-6 hover:bg-gray-50">
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Link 
                                                        href={route('copy-editor.show', biography.id)}
                                                        className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                                                    >
                                                        {biography.subject_name || biography.full_name}
                                                    </Link>
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(biography.status)}`}>
                                                        {biography.status.replace('_', ' ').toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-600 space-y-1">
                                                    <div>By: {biography.creator?.first_name} {biography.creator?.last_name}</div>
                                                    <div>Approved by Editor: {biography.editor?.first_name} {biography.editor?.last_name}</div>
                                                    <div>Editor Approved: {new Date(biography.reviewed_at).toLocaleDateString()}</div>
                                                    {biography.editor_notes && (
                                                        <div className="text-green-600">
                                                            Editor Notes: {biography.editor_notes}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                                <Link
                                                    href={route('copy-editor.show', biography.id)}
                                                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-center text-sm font-medium"
                                                >
                                                    Preview
                                                </Link>
                                                
                                                <Link
                                                    href={route('biographies.edit', biography.id)}
                                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center text-sm font-medium"
                                                >
                                                    Edit
                                                </Link>
                                                
                                                <button
                                                    onClick={() => handleAction(biography)}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                                >
                                                    Approve
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center">
                                    <p className="text-gray-500 text-lg">No biographies awaiting copy editing.</p>
                                </div>
                            )}
                        </div>

                        {biographies.links && (
                            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                                <div className="flex flex-wrap justify-center gap-1">
                                    {biographies.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-3 py-2 text-sm rounded-md ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : link.url
                                                    ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Approve for Editor-in-Chief Review
                            </h3>
                            <form onSubmit={submitAction}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Copy Editor Notes (optional)
                                    </label>
                                    <textarea
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                        placeholder="Add any copy editing notes..."
                                    />
                                </div>
                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`px-4 py-2 text-white rounded-md bg-green-600 hover:bg-green-700 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {processing ? 'Processing...' : 'Approve & Send to EIC'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
