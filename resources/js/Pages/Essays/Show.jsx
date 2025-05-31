import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

export default function Show({ essay }) {
    console.log("Essay data:", essay);
    const {
        title,
        content,
        author,
        date_published,
        project,
    } = essay;

    const formatDate = (date) =>
        date ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "";

    return (
        <GuestLayout>
            <Head title={title} />

            <div className="max-w-4xl mx-auto py-10">
                <article className="bg-white shadow rounded-lg p-8">
                    <header className="mb-6">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{title}</h1>

                        {author && (
                            <div className="text-lg text-gray-600 mb-1">
                                By {author}
                            </div>
                        )}

                        {date_published && (
                            <div className="text-md text-gray-500 mb-4">
                                Published: {formatDate(date_published)}
                            </div>
                        )}

                        {project && (
                            <div className="text-md text-gray-500 mb-4">
                                Part of project: <span className="font-medium">{project.title}</span>
                            </div>
                        )}
                    </header>

                    {/* Body Content */}
                    {content && (
                        <section
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    )}
                </article>
            </div>
        </GuestLayout>
    );
}
