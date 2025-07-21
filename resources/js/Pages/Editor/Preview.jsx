
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Preview({ biography }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-green-800">
                        Preview: {biography.subject_name}
                    </h2>
                    <div className="flex gap-3">
                        <Link
                            href={route('editor.show', biography.id)}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
                        >
                            Back to Review
                        </Link>
                        <Link
                            href={route('editor.dashboard')}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                        >
                            Dashboard
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Preview - ${biography.subject_name}`} />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg border-t-4 border-blue-600 overflow-hidden">
                        <div className="p-8">
                            <article className="prose prose-lg max-w-none">
                                <header className="mb-8 text-center border-b pb-6">
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{biography.subject_name}</h1>
                                    <div className="text-gray-600">
                                        {biography.birth_date && biography.death_date ? (
                                            <span>({new Date(biography.birth_date).getFullYear()} - {new Date(biography.death_date).getFullYear()})</span>
                                        ) : biography.birth_date ? (
                                            <span>(b. {new Date(biography.birth_date).getFullYear()})</span>
                                        ) : null}
                                    </div>
                                    {biography.birthplace && (
                                        <div className="text-sm text-gray-500 mt-1">
                                            Born in {biography.birthplace}
                                        </div>
                                    )}
                                </header>

                                <div className="biography-content">
                                    <div dangerouslySetInnerHTML={{ __html: biography.content }} />
                                </div>

                                <footer className="mt-8 pt-6 border-t text-sm text-gray-500">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <strong>Birth Date:</strong> {biography.birth_date ? new Date(biography.birth_date).toLocaleDateString() : 'Unknown'}
                                        </div>
                                        {biography.death_date && (
                                            <div>
                                                <strong>Death Date:</strong> {new Date(biography.death_date).toLocaleDateString()}
                                            </div>
                                        )}
                                        <div>
                                            <strong>Birthplace:</strong> {biography.birthplace || 'Unknown'}
                                        </div>
                                        {biography.state_of_origin && (
                                            <div>
                                                <strong>State of Origin:</strong> {biography.state_of_origin}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-4 text-center">
                                        <em>Contributed by {biography.creator?.first_name} {biography.creator?.last_name}</em>
                                    </div>
                                </footer>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
