
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Show({ biography }) {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    
    const { data, setData, post, processing } = useForm({
        notes: '',
        reason: ''
    });

    const handleAction = (type) => {
        setModalType(type);
        setShowModal(true);
        setData({ notes: '', reason: '' });
    };

    const submitAction = (e) => {
        e.preventDefault();
        const route_name = modalType === 'publish' ? 'editor-in-chief.publish' : 
                          modalType === 'return' ? 'editor-in-chief.return' : 'editor-in-chief.decline';
        
        post(route(route_name, biography.slug), {
            onSuccess: () => {
                setShowModal(false);
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-purple-800">
                        Final Review: {biography.subject_name}
                    </h2>
                    <Link
                        href={route('editor-in-chief.dashboard')}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            }
        >
            <Head title={`Final Review - ${biography.subject_name}`} />

            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg border-t-4 border-purple-600 overflow-hidden">
                        <div className="p-6">
                            <div className="prose max-w-none">
                                <h1 className="text-2xl font-bold text-gray-900 mb-4">{biography.subject_name}</h1>
                                
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Biography Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div><strong>Birth Date:</strong> {biography.birth_date || 'N/A'}</div>
                                        <div><strong>Death Date:</strong> {biography.death_date || 'N/A'}</div>
                                        <div><strong>Birthplace:</strong> {biography.birthplace || 'N/A'}</div>
                                        <div><strong>Status:</strong> {biography.status}</div>
                                        <div><strong>Submitted by:</strong> {biography.creator?.first_name} {biography.creator?.last_name}</div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Biography Content</h3>
                                    <div className="border border-gray-200 rounded-lg p-4 bg-white">
                                        <div dangerouslySetInnerHTML={{ __html: biography.content }} />
                                    </div>
                                </div>

                                {biography.editor_notes && (
                                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Previous Notes</h3>
                                        <p className="text-blue-700">{biography.editor_notes}</p>
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-3 mt-6">
                                    <button
                                        onClick={() => handleAction('publish')}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Publish
                                    </button>
                                    
                                    <button
                                        onClick={() => handleAction('return')}
                                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                                    >
                                        Return to Editor
                                    </button>
                                    
                                    <button
                                        onClick={() => handleAction('decline')}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                {modalType === 'publish' ? 'Publish Biography' : 
                                 modalType === 'return' ? 'Return to Editor' : 'Decline Biography'}
                            </h3>
                            <form onSubmit={submitAction}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {modalType === 'decline' ? 'Reason (required)' : 'Notes (optional)'}
                                    </label>
                                    <textarea
                                        value={modalType === 'decline' ? data.reason : data.notes}
                                        onChange={(e) => setData(modalType === 'decline' ? 'reason' : 'notes', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        rows="3"
                                        placeholder={modalType === 'decline' ? 'Please provide a reason...' : 'Add any notes...'}
                                        required={modalType === 'decline'}
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
                                        className={`px-4 py-2 text-white rounded-md ${
                                            modalType === 'publish' ? 'bg-green-600 hover:bg-green-700' :
                                            modalType === 'return' ? 'bg-yellow-600 hover:bg-yellow-700' :
                                            'bg-red-600 hover:bg-red-700'
                                        } ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {processing ? 'Processing...' : 
                                         modalType === 'publish' ? 'Publish' :
                                         modalType === 'return' ? 'Return' : 'Decline'}
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
