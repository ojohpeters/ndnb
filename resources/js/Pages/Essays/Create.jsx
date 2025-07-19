import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Create({ projects}) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        content: "",
        author: "",
        date_published: "",
        project_id: "",
        status: "draft",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleQuillChange = (value) => {
        setData("content", value);
    };

    const handleSubmit = (e, status) => {
        e.preventDefault();
        setData("status", status);
        post(route("essays.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Essay
                </h2>
            }
        >
            <Head title="Add Essay" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="max-w-3xl mx-auto p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">Add Essay</h1>
                                <Link
                                    href={route("essays.index")}
                                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded"
                                >
                                    Back
                                </Link>
                            </div>
                            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                                {/* Title */}
                                <div>
                                    <label className="block font-medium">Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
                                    {errors.title && (
                                        <div className="text-red-600 text-sm">{errors.title}</div>
                                    )}
                                </div>

                                {/* Content (WYSIWYG) */}
                                <div>
                                    <label className="block font-medium mb-1">content</label>
                                    <ReactQuill
                                        value={data.content}
                                        onChange={handleQuillChange}
                                        className="bg-white"
                                    />
                                    {errors.content && (
                                        <div className="text-red-600 text-sm">{errors.content}</div>
                                    )}
                                </div>

                                {/* Author */}
                                <div>
                                    <label className="block font-medium">Author</label>
                                    <input
                                        type="text"
                                        name="author"
                                        value={data.author}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.author && (
                                        <div className="text-red-600 text-sm">{errors.author}</div>
                                    )}
                                </div>

                                {/* Date Published */}
                                <div>
                                    <label className="block font-medium">Date Published</label>
                                    <input
                                        type="date"
                                        name="date_published"
                                        value={data.date_published}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.date_published && (
                                        <div className="text-red-600 text-sm">{errors.date_published}</div>
                                    )}
                                </div>

                                {/* Project */}
                                <div>
                                    <label className="block font-medium">Project</label>
                                    <select
                                        name="project_id"
                                        value={data.project_id}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    >
                                        <option value="">Select Project</option>
                                        {projects.map((project) => (
                                            <option key={project.code} value={project.id}>
                                                {project.title}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.project_id && (
                                        <div className="text-red-600 text-sm">{errors.project_id}</div>
                                    )}
                                </div>

                                {/* Submit */}
                                <div>
                                  <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        onClick={(e) =>  handleSubmit(e, 'draft')}
                                        disabled={processing}
                                        className="bg-gray-600 text-white px-4 py-2 rounded"
                                    >
                                        {processing ? "Saving..." : "Save as Draft"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => handleSubmit(e, 'submitted')}
                                        disabled={processing}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded"
                                    >
                                        {processing ? "Publishing..." : "Submit for Review"}
                                    </button>
                                </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}