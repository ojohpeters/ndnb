import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ project }) {
    const {
        title,
        description,
        cover_image,
        launched_on,
    } = project;

    // Helper: format date
    const formatDate = (date) =>
        date ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "";

    return (
        <GuestLayout>
            <Head title={title} />

            <div className="max-w-4xl mx-auto py-10">
                <article className="bg-white shadow rounded-lg p-8">
                    <header className="mb-6">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{title}</h1>
                        {launched_on && (
                            <div className="text-lg text-gray-600 mb-4">
                                Launched: {formatDate(launched_on)}
                            </div>
                        )}
                        {cover_image && (
                            <img
                                src={cover_image.startsWith("http") ? cover_image : `/storage/${cover_image}`}
                                alt={title}
                                className="w-full max-w-lg mx-auto rounded shadow mb-6"
                            />
                        )}
                    </header>
                    {/* Description Content */}
                    {description && (
                        <section
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                    )}
                </article>
            </div>
        </GuestLayout>
    );
}