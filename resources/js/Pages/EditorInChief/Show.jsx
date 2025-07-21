
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ biography }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-green-800">
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
                                        <div><strong>Birth Date:</strong> {biography.birth_date}</div>
                                        <div><strong>Death Date:</strong> {biography.death_date || 'N/A'}</div>
                                        <div><strong>Birthplace:</strong> {biography.birthplace}</div>
                                        <div><strong>Word Count:</strong> {biography.word_count}</div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
