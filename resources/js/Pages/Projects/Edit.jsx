import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Edit({ project }) {
    const { data, setData, post, processing, errors } = useForm({
        title: project.title || "",
        description: project.description || "",
        launched_on: project.launched_on || "",
        cover_image: null, // file input can't be pre-filled
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setData(name, type === "file" ? files[0] : value);
    };

    const handleQuillChange = (value) => {
        setData("description", value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("projects.update", project.slug));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Project
                </h2>
            }
        >
            <Head title="Edit Project" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="max-w-3xl mx-auto p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">Edit Project</h1>
                                <Link
                                    href={route("projects.index")}
                                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded"
                                >
                                    Back
                                </Link>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
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
                                {/* Description */}
                                <div>
                                    <label className="block font-medium mb-1">Description</label>
                                    <ReactQuill
                                        value={data.description}
                                        onChange={handleQuillChange}
                                        className="bg-white"
                                    />
                                    {errors.description && (
                                        <div className="text-red-600 text-sm">{errors.description}</div>
                                    )}
                                </div>
                                {/* Launched On */}
                                <div>
                                    <label className="block font-medium">Launched On</label>
                                    <input
                                        type="date"
                                        name="launched_on"
                                        value={data.launched_on}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.launched_on && (
                                        <div className="text-red-600 text-sm">{errors.launched_on}</div>
                                    )}
                                </div>
                                {/* Cover Image */}
                                <div>
                                    <label className="block font-medium">Cover Image</label>
                                    <input
                                        type="file"
                                        name="cover_image"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                    {errors.cover_image && (
                                        <div className="text-red-600 text-sm">{errors.cover_image}</div>
                                    )}
                                </div>
                                {/* Submit */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-indigo-600 text-white px-6 py-2 rounded"
                                    >
                                        {processing ? "Updating..." : "Update Project"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
