
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ mustVerifyEmail, status, auth }) {
    const [activeTab, setActiveTab] = useState('profile');
    
    const { data, setData, patch, processing, errors } = useForm({
        bio: auth.user.bio || '',
    });

    const handleBioSubmit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    const wordCount = data.bio.trim().split(/\s+/).filter(word => word.length > 0).length;
    const isOverLimit = wordCount > 100;

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-green-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Tab Navigation */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-8">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                                        activeTab === 'profile'
                                            ? 'border-green-500 text-green-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Profile Information
                                </button>
                                <button
                                    onClick={() => setActiveTab('bio')}
                                    className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                                        activeTab === 'bio'
                                            ? 'border-green-500 text-green-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Contributor's Profile
                                </button>
                                <button
                                    onClick={() => setActiveTab('password')}
                                    className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                                        activeTab === 'password'
                                            ? 'border-green-500 text-green-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Update Password
                                </button>
                                <button
                                    onClick={() => setActiveTab('delete')}
                                    className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                                        activeTab === 'delete'
                                            ? 'border-red-500 text-red-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Delete Account
                                </button>
                            </nav>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Profile Information Tab */}
                        {activeTab === 'profile' && (
                            <div className="bg-white shadow-lg rounded-lg border-t-4 border-green-600 overflow-hidden">
                                <div className="bg-green-100 px-6 py-4 border-b border-green-200">
                                    <h3 className="text-lg font-medium text-green-800">Profile Information</h3>
                                    <p className="text-sm text-green-600">Update your account's profile information and email address.</p>
                                </div>
                                <div className="p-6">
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                        className="max-w-xl"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Contributor's Profile Tab */}
                        {activeTab === 'bio' && (
                            <div className="bg-white shadow-lg rounded-lg border-t-4 border-green-600 overflow-hidden">
                                <div className="bg-green-100 px-6 py-4 border-b border-green-200">
                                    <h3 className="text-lg font-medium text-green-800">Contributor's Profile</h3>
                                    <p className="text-sm text-green-600">Write a bio of yourself using the sample below. Limit: 100 words</p>
                                </div>
                                <div className="p-6">
                                    <form onSubmit={handleBioSubmit} className="space-y-6">
                                        <div>
                                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                                                Your Bio
                                            </label>
                                            <textarea
                                                id="bio"
                                                name="bio"
                                                value={data.bio}
                                                onChange={(e) => setData('bio', e.target.value)}
                                                rows={6}
                                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                                                    isOverLimit ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                                placeholder="Write your professional bio here..."
                                            />
                                            <div className="flex justify-between items-center mt-2">
                                                <div className={`text-sm ${isOverLimit ? 'text-red-600' : 'text-gray-600'}`}>
                                                    Word count: {wordCount}/100
                                                </div>
                                                {isOverLimit && (
                                                    <div className="text-sm text-red-600">
                                                        Please reduce by {wordCount - 100} words
                                                    </div>
                                                )}
                                            </div>
                                            {errors.bio && <div className="text-red-500 text-sm mt-1">{errors.bio}</div>}
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h4 className="font-medium text-gray-800 mb-2">Sample:</h4>
                                            <p className="text-sm text-gray-700 italic">
                                                Amaka Nwosu is a Nigerian journalist and historian with a focus on post-independence political figures. 
                                                She holds a degree in History from the University of Ibadan and has written for national newspapers and 
                                                academic platforms. Her work explores the legacy of overlooked reformers and grassroots leaders. 
                                                Amaka is committed to documenting Nigeria's evolving civic landscape through verified, accessible storytelling.
                                            </p>
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={processing || isOverLimit}
                                                className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors font-medium"
                                            >
                                                {processing ? 'Saving...' : 'Save Bio'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Update Password Tab */}
                        {activeTab === 'password' && (
                            <div className="bg-white shadow-lg rounded-lg border-t-4 border-green-600 overflow-hidden">
                                <div className="bg-green-100 px-6 py-4 border-b border-green-200">
                                    <h3 className="text-lg font-medium text-green-800">Update Password</h3>
                                    <p className="text-sm text-green-600">Ensure your account is using a long, random password to stay secure.</p>
                                </div>
                                <div className="p-6">
                                    <UpdatePasswordForm className="max-w-xl" />
                                </div>
                            </div>
                        )}

                        {/* Delete Account Tab */}
                        {activeTab === 'delete' && (
                            <div className="bg-white shadow-lg rounded-lg border-t-4 border-red-600 overflow-hidden">
                                <div className="bg-red-100 px-6 py-4 border-b border-red-200">
                                    <h3 className="text-lg font-medium text-red-800">Delete Account</h3>
                                    <p className="text-sm text-red-600">Once your account is deleted, all of its resources and data will be permanently deleted.</p>
                                </div>
                                <div className="p-6">
                                    <DeleteUserForm className="max-w-xl" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
