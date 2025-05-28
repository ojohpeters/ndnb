import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Create({ states_and_lgas = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: "",
        title: "",
        date_of_birth: "",
        date_of_death: "",
        cause_of_death: "",
        state_of_origin: "",
        lga: "",
        ethnic_group: "",
        religion: "",
        language: "",
        region: "",
        biography: "",
        photo: null,
    });

    // Find LGAs for selected state
    const selectedState = states_and_lgas.find(
        (s) => s.name === data.state_of_origin
    );
    const lgas = selectedState ? selectedState.lgas : [];

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setData(name, type === "file" ? files[0] : value);
        // Reset LGA if state changes
        if (name === "state_of_origin") setData("lga", "");
    };

    const handleQuillChange = (value) => {
        setData("biography", value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("biographies.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Biography
                </h2>
            }
        >
            <Head title="Add Biography" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="max-w-3xl mx-auto p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">Add Biography</h1>
                                <Link
                                    href={route("biographies.index")}
                                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded"
                                >
                                    Back
                                </Link>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Full Name */}
                                <div>
                                    <label className="block font-medium">Full Name *</label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={data.full_name}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
                                    {errors.full_name && (
                                        <div className="text-red-600 text-sm">{errors.full_name}</div>
                                    )}
                                </div>
                                {/* Title */}
                                <div>
                                    <label className="block font-medium">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.title && (
                                        <div className="text-red-600 text-sm">{errors.title}</div>
                                    )}
                                </div>
                                {/* Date of Birth */}
                                <div>
                                    <label className="block font-medium">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="date_of_birth"
                                        value={data.date_of_birth}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.date_of_birth && (
                                        <div className="text-red-600 text-sm">{errors.date_of_birth}</div>
                                    )}
                                </div>
                                {/* Date of Death */}
                                <div>
                                    <label className="block font-medium">Date of Death</label>
                                    <input
                                        type="date"
                                        name="date_of_death"
                                        value={data.date_of_death}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.date_of_death && (
                                        <div className="text-red-600 text-sm">{errors.date_of_death}</div>
                                    )}
                                </div>
                                {/* Cause of Death */}
                                <div>
                                    <label className="block font-medium">Cause of Death</label>
                                    <input
                                        type="text"
                                        name="cause_of_death"
                                        value={data.cause_of_death}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.cause_of_death && (
                                        <div className="text-red-600 text-sm">{errors.cause_of_death}</div>
                                    )}
                                </div>
                                {/* State of Origin */}
                                <div>
                                    <label className="block font-medium">State of Origin</label>
                                    <select
                                        name="state_of_origin"
                                        value={data.state_of_origin}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    >
                                        <option value="">Select State</option>
                                        {states_and_lgas.map((state) => (
                                            <option key={state.code} value={state.name}>
                                                {state.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.state_of_origin && (
                                        <div className="text-red-600 text-sm">{errors.state_of_origin}</div>
                                    )}
                                </div>
                                {/* LGA */}
                                <div>
                                    <label className="block font-medium">LGA</label>
                                    <select
                                        name="lga"
                                        value={data.lga}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                        disabled={!data.state_of_origin}
                                    >
                                        <option value="">Select LGA</option>
                                        {lgas && lgas.map((lga) => (
                                            <option key={lga} value={lga}>
                                                {lga}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.lga && (
                                        <div className="text-red-600 text-sm">{errors.lga}</div>
                                    )}
                                </div>
                                {/* Ethnic Group */}
                                <div>
                                    <label className="block font-medium">Ethnic Group</label>
                                    <input
                                        type="text"
                                        name="ethnic_group"
                                        value={data.ethnic_group}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.ethnic_group && (
                                        <div className="text-red-600 text-sm">{errors.ethnic_group}</div>
                                    )}
                                </div>
                                {/* Religion */}
                                <div>
                                    <label className="block font-medium">Religion</label>
                                    <input
                                        type="text"
                                        name="religion"
                                        value={data.religion}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.religion && (
                                        <div className="text-red-600 text-sm">{errors.religion}</div>
                                    )}
                                </div>
                                {/* Language */}
                                <div>
                                    <label className="block font-medium">Language</label>
                                    <input
                                        type="text"
                                        name="language"
                                        value={data.language}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.language && (
                                        <div className="text-red-600 text-sm">{errors.language}</div>
                                    )}
                                </div>
                                {/* Region */}
                                <div>
                                    <label className="block font-medium">Region</label>
                                    <input
                                        type="text"
                                        name="region"
                                        value={data.region}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.region && (
                                        <div className="text-red-600 text-sm">{errors.region}</div>
                                    )}
                                </div>
                                {/* Biography (WYSIWYG) */}
                                <div>
                                    <label className="block font-medium mb-1">Biography *</label>
                                    <ReactQuill
                                        value={data.biography}
                                        onChange={handleQuillChange}
                                        className="bg-white"
                                    />
                                    {errors.biography && (
                                        <div className="text-red-600 text-sm">{errors.biography}</div>
                                    )}
                                </div>
                                {/* Photo */}
                                <div>
                                    <label className="block font-medium">Photo</label>
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                    {errors.photo && (
                                        <div className="text-red-600 text-sm">{errors.photo}</div>
                                    )}
                                </div>
                                {/* Submit */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-indigo-600 text-white px-6 py-2 rounded"
                                    >
                                        {processing ? "Saving..." : "Save"}
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