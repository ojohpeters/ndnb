import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ states_and_lgas = [], regions = {}, relatedOptions = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        full_name: "",
        maiden_name: "",
        birth_year: "",
        death_year: "",
        date_of_birth: "",
        date_of_death: "",
        place_of_birth: "",
        place_of_death: "",
        state_of_origin: "",
        local_government_area: "",
        ethnicity: "",
        religion: "",
        occupation: "",
        biography_text: "",
        written_by: "",
        how_to_cite: "",
        references: "",
        status: "draft",
        education: [{ institution_name: "", qualification: "", year: "" }],
        occupations: [{ title: "", organization: "", start_year: "", end_year: "" }],
        related_entries: []
    });

    const [previewMode, setPreviewMode] = useState(false);

    // Find LGAs for selected state
    const selectedState = states_and_lgas.find(
        (s) => s.name === data.state_of_origin
    );
    const lgas = selectedState ? selectedState.lgas : [];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
        if (name === "state_of_origin") {
            setData("local_government_area", "");
        }
    };

    const handleSubmit = (e, status = 'draft') => {
        e.preventDefault();
        setData('status', status);
        post(route("biographies.store"), {
            preserveScroll: true,
        });
    };

    const handlePreview = () => {
        setPreviewMode(!previewMode);
    };

    const addEducation = () => {
        setData('education', [...data.education, { institution_name: "", qualification: "", year: "" }]);
    };

    const removeEducation = (index) => {
        const newEducation = data.education.filter((_, i) => i !== index);
        setData('education', newEducation);
    };

    const updateEducation = (index, field, value) => {
        const newEducation = [...data.education];
        newEducation[index][field] = value;
        setData('education', newEducation);
    };

    const addOccupation = () => {
        setData('occupations', [...data.occupations, { title: "", organization: "", start_year: "", end_year: "" }]);
    };

    const removeOccupation = (index) => {
        const newOccupations = data.occupations.filter((_, i) => i !== index);
        setData('occupations', newOccupations);
    };

    const updateOccupation = (index, field, value) => {
        const newOccupations = [...data.occupations];
        newOccupations[index][field] = value;
        setData('occupations', newOccupations);
    };

    if (previewMode) {
        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-green-800">
                        Biography Preview
                    </h2>
                }
            >
                <Head title="Biography Preview" />
                <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <div className="bg-white shadow-lg rounded-lg border-t-4 border-green-600 overflow-hidden">
                            <div className="bg-green-100 px-6 py-4 border-b border-green-200">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-2xl font-bold text-green-800">Preview: {data.full_name}</h1>
                                    <button
                                        onClick={handlePreview}
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        ← Back to Edit
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="prose max-w-none">
                                    <h2 className="text-green-800">{data.full_name}</h2>
                                    {data.maiden_name && <p><strong>Maiden Name:</strong> {data.maiden_name}</p>}
                                    {data.date_of_birth && <p><strong>Born:</strong> {data.date_of_birth}</p>}
                                    {data.date_of_death && <p><strong>Died:</strong> {data.date_of_death}</p>}
                                    {data.place_of_birth && <p><strong>Place of Birth:</strong> {data.place_of_birth}</p>}
                                    {data.state_of_origin && <p><strong>State of Origin:</strong> {data.state_of_origin}</p>}
                                    <div className="mt-6">
                                        <h3 className="text-green-700">Biography</h3>
                                        <div dangerouslySetInnerHTML={{ __html: data.biography_text }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-green-800">
                    Create Biography
                </h2>
            }
        >
            <Head title="Create Biography" />
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg border-t-4 border-green-600 overflow-hidden">
                        <div className="bg-green-100 px-6 py-4 border-b border-green-200">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <h1 className="text-2xl font-bold text-green-800">Create New Biography</h1>
                                <Link
                                    href={route("biographies.index")}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    ← Back to List
                                </Link>
                            </div>
                        </div>

                        <div className="p-6">
                            <form className="space-y-6">
                                {/* Basic Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="full_name"
                                            value={data.full_name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            required
                                        />
                                        {errors.full_name && <div className="text-red-500 text-sm mt-1">{errors.full_name}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Maiden Name
                                        </label>
                                        <input
                                            type="text"
                                            name="maiden_name"
                                            value={data.maiden_name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            name="date_of_birth"
                                            value={data.date_of_birth}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Date of Death
                                        </label>
                                        <input
                                            type="date"
                                            name="date_of_death"
                                            value={data.date_of_death}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            State of Origin
                                        </label>
                                        <select
                                            name="state_of_origin"
                                            value={data.state_of_origin}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        >
                                            <option value="">Select State</option>
                                            {states_and_lgas.map((state) => (
                                                <option key={state.code} value={state.name}>
                                                    {state.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Local Government Area
                                        </label>
                                        <select
                                            name="local_government_area"
                                            value={data.local_government_area}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            disabled={!data.state_of_origin}
                                        >
                                            <option value="">Select LGA</option>
                                            {lgas.map((lga, index) => (
                                                <option key={index} value={lga}>
                                                    {lga}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Biography Text */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Biography Text *
                                    </label>
                                    <textarea
                                        name="biography_text"
                                        value={data.biography_text}
                                        onChange={handleChange}
                                        rows={10}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        placeholder="Write the biography here..."
                                        required
                                    />
                                    {errors.biography_text && <div className="text-red-500 text-sm mt-1">{errors.biography_text}</div>}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={handlePreview}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                                    >
                                        Preview
                                    </button>

                                    <button
                                        type="button"
                                        onClick={(e) => handleSubmit(e, 'draft')}
                                        disabled={processing}
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors font-medium disabled:opacity-50"
                                    >
                                        {processing ? "Saving..." : "Save as Draft"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={(e) => handleSubmit(e, 'submitted')}
                                        disabled={processing}
                                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors font-medium disabled:opacity-50"
                                    >
                                        {processing ? "Submitting..." : "Submit for Review"}
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