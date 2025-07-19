

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ biographies }) {
    const [selectedBio, setSelectedBio] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    
    const { data, setData, post, processing } = useForm({
        notes: '',
        reason: ''
    });

    const handleAction = (biography, type) => {
        setSelectedBio(biography);
        setModalType(type);
        setShowModal(true);
        setData({ notes: '', reason: '' });
    };

    const submitAction = (e) => {
        e.preventDefault();
        const route_name = modalType === 'approve' ? 'editor.approve' : 
                          modalType === 'redraft' ? 'editor.redraft' : 'editor.decline';
        
        post(route(route_name, selectedBio.id), {
            onSuccess: () => {
                setShowModal(false);
                setSelectedBio(null);
            }
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            'submitted': 'bg-blue-100 text-blue-800',
            'returned': 'bg-yellow-100 text-yellow-800',
            'under_review': 'bg-purple-100 text-purple-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-lg sm:text-xl font-semibold leading-tight text-green-800">
                    Editors Approval Dashboard (EAD)
                </h2>
            }
        >
            <Head title="Editor Dashboard" />

            <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-4 sm:py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg border-t-4 border-green-600 overflow-hidden">
                        <div className="bg-green-100 px-4 sm:px-6 py-3 sm:py-4 border-b border-green-200">
                            <h3 className="text-base sm:text-lg font-semibold text-green-800">
                                Submitted Biographies Awaiting Review
                            </h3>
                        </div>

                        {/* Mobile Card View */}
                        <div className="block lg:hidden">
                            <div className="space-y-3 sm:space-y-4 p-4">
                                {biographies.data.map((biography) => (
                                    <div key={biography.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <div className="flex flex-col space-y-3">
                                            <div>
                                                <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                                                    {biography.full_name}
                                                </h4>
                                                <p className="text-xs sm:text-sm text-gray-600">
                                                    Author: {biography.creator?.name || 'N/A'}
                                                </p>
                                                <p className="text-xs sm:text-sm text-gray-600">
                                                    Contributor: {biography.creator?.first_name} {biography.creator?.last_name}
                                                </p>
                                            </div>
                                            
                                            <div className="flex items-center justify-between">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(biography.status)}`}>
                                                    {biography.status.replace('_', ' ').toUpperCase()}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {biography.submitted_at ? new Date(biography.submitted_at).toLocaleDateString() : 'N/A'}
                                                </span>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-2">
                                                <Link
                                                    href={route('editor.preview', biography.id)}
                                                    className="text-center text-blue-600 hover:text-blue-900 bg-blue-100 px-2 py-1 rounded text-xs"
                                                >
                                                    Preview
                                                </Link>
                                                <Link
                                                    href={route('editor.show', biography.id)}
                                                    className="text-center text-green-600 hover:text-green-900 bg-green-100 px-2 py-1 rounded text-xs"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                            
                                            <div className="grid grid-cols-3 gap-2">
                                                <button
                                                    onClick={() => handleAction(biography, 'approve')}
                                                    className="text-green-600 hover:text-green-900 bg-green-100 px-2 py-1 rounded text-xs"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleAction(biography, 'redraft')}
                                                    className="text-yellow-600 hover:text-yellow-900 bg-yellow-100 px-2 py-1 rounded text-xs"
                                                >
                                                    ReDraft
                                                </button>
                                                <button
                                                    onClick={() => handleAction(biography, 'decline')}
                                                    className="text-red-600 hover:text-red-900 bg-red-100 px-2 py-1 rounded text-xs"
                                                >
                                                    Decline
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="min-w-full divide-y divide-green-200">
                                <thead className="bg-green-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                                            Author
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                                            Contributor
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                                            Submitted
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-green-100">
                                    {biographies.data.map((biography) => (
                                        <tr key={biography.id} className="hover:bg-green-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {biography.full_name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {biography.creator?.name || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {biography.creator?.first_name} {biography.creator?.last_name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(biography.status)}`}>
                                                    {biography.status.replace('_', ' ').toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {biography.submitted_at ? new Date(biography.submitted_at).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                <Link
                                                    href={route('editor.preview', biography.id)}
                                                    className="text-blue-600 hover:text-blue-900 bg-blue-100 px-3 py-1 rounded"
                                                >
                                                    Preview
                                                </Link>
                                                <Link
                                                    href={route('editor.show', biography.id)}
                                                    className="text-green-600 hover:text-green-900 bg-green-100 px-3 py-1 rounded"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleAction(biography, 'approve')}
                                                    className="text-green-600 hover:text-green-900 bg-green-100 px-3 py-1 rounded"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleAction(biography, 'redraft')}
                                                    className="text-yellow-600 hover:text-yellow-900 bg-yellow-100 px-3 py-1 rounded"
                                                >
                                                    ReDraft
                                                </button>
                                                <button
                                                    onClick={() => handleAction(biography, 'decline')}
                                                    className="text-red-600 hover:text-red-900 bg-red-100 px-3 py-1 rounded"
                                                >
                                                    Decline
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {biographies.data.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No biographies pending review.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal for actions */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-4">
                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-green-800">
                            {modalType === 'approve' ? 'Approve Biography' : 
                             modalType === 'redraft' ? 'Request Redraft' : 'Decline Biography'}
                        </h3>
                        
                        <form onSubmit={submitAction}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {modalType === 'decline' ? 'Reason for decline' : 'Notes (optional)'}
                                </label>
                                <textarea
                                    value={modalType === 'decline' ? data.reason : data.notes}
                                    onChange={(e) => modalType === 'decline' ? 
                                        setData('reason', e.target.value) : 
                                        setData('notes', e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base"
                                    rows="4"
                                    required={modalType === 'decline' || modalType === 'redraft'}
                                    placeholder={modalType === 'decline' ? 'Please provide a reason for declining this biography...' : 'Add notes for the contributor...'}
                                />
                            </div>
                            
                            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 text-sm sm:text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`px-4 py-2 rounded text-white text-sm sm:text-base ${
                                        modalType === 'approve' ? 'bg-green-600 hover:bg-green-700' :
                                        modalType === 'redraft' ? 'bg-yellow-600 hover:bg-yellow-700' :
                                        'bg-red-600 hover:bg-red-700'
                                    }`}
                                >
                                    {processing ? 'Processing...' : 
                                     modalType === 'approve' ? 'Approve' :
                                     modalType === 'redraft' ? 'Request Redraft' : 'Decline'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}

