import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ projects, filters, years }) {
    const [search, setSearch] = useState(filters.search || "");
    const [year, setYear] = useState(filters.year || "");

    const handleFilter = (e) => {
        e.preventDefault();
        let params = [];
        if (search) params.push(`search=${encodeURIComponent(search)}`);
        if (year) params.push(`year=${encodeURIComponent(year)}`);
        window.location.href = `?${params.join("&")}`;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="max-w-5xl mx-auto p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold mb-6">
                                    Projects
                                </h1>
                                <Link
                                    href={route("projects.create")}
                                    className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded"
                                >
                                    Add
                                </Link>
                            </div>

                            {/* Search & Filter */}
                            <form
                                onSubmit={handleFilter}
                                className="flex flex-wrap gap-2 mb-6"
                            >
                                <input
                                    type="text"
                                    placeholder="Search by title or description"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="border rounded px-3 py-2"
                                />
                                <select
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    className="border rounded px-3 py-2"
                                >
                                    <option value="">All Years</option>
                                    {years.map((y) => (
                                        <option key={y} value={y}>
                                            {y}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded"
                                >
                                    Filter
                                </button>
                            </form>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border">Title</th>
                                            <th className="px-4 py-2 border">Description</th>
                                            <th className="px-4 py-2 border">Launched On</th>
                                            <th className="px-4 py-2 border">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.data.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="text-center py-4">
                                                    No projects found.
                                                </td>
                                            </tr>
                                        )}
                                        {projects.data.map((project) => (
                                            <tr key={project.id}>
                                                <td className="border px-4 py-2">{project.title}</td>
                                                <td className="border px-4 py-2">
                                                    {project.description?.slice(0, 80)}
                                                    {project.description && project.description.length > 80 ? "..." : ""}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {project.launched_on}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    <Link
                                                        href={route("projects.show", project.slug)}
                                                        className="text-indigo-600 hover:underline"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={route("projects.edit", project.slug)}
                                                        className="text-indigo-600 hover:underline ml-2"
                                                    >
                                                        Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center mt-6 space-x-2">
                                {projects.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        disabled={!link.url}
                                        onClick={() =>
                                            link.url &&
                                            (window.location.href = link.url)
                                        }
                                        className={`px-3 py-1 rounded ${
                                            link.active
                                                ? "bg-indigo-600 text-white"
                                                : "bg-white border"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}