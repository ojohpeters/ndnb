import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import Select from "react-select";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";

export default function Create({
    states_and_lgas = [],
    regions = [],
    relatedOptions = [],
}) {
    const [showPreview, setShowPreview] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        full_name: "",
        title: "",
        date_of_birth: "",
        date_of_death: "",
        place_of_birth: "",
        place_of_death: "",
        cause_of_death: "",
        state_of_origin: "",
        lga: "",
        ethnic_group: "",
        religion: "",
        language: "",
        region: "",
        biography: "",
        how_to_cite: "",
        references: "",
        status: "draft",
        related_entries: [],
        education: [
            {
                institution_name: "",
                location: "",
                notes: "",
                start_date: "",
                end_date: "",
            },
        ],
        occupations: [
            {
                title: "",
                description: "",
                start_date: "",
                end_date: "",
            },
        ],
    });

    const [currentLgas, setCurrentLgas] = useState([]);

    const handleStateChange = (selectedState) => {
        setData("state_of_origin", selectedState);
        const stateData = states_and_lgas.find((s) => s.name === selectedState);
        setCurrentLgas(stateData ? stateData.lgas : []);
        setData("lga", "");
    };

    const handleSubmit = (e, status = "draft") => {
        e.preventDefault();
        const formData = { ...data, status };
        post(route("biographies.store"), {
            data: formData,
            onSuccess: () => {
                // Handle success
            },
        });
    };

    const handlePreview = () => {
        setShowPreview(true);
    };

    const handleSaveAsDraft = (e) => {
        e.preventDefault();
        const formData = { ...data, status: "draft" };
        post(route("biographies.store"), {
            data: formData,
            onSuccess: () => {
                // Handle success
            },
        });
    };

    const handleSubmitForReview = (e) => {
        e.preventDefault();
        const formData = { ...data, status: "submitted" };
        post(route("biographies.store"), {
            data: formData,
            onSuccess: () => {
                // Handle success
            },
        });
    };

    // Education handlers
    const addEducation = () => {
        setData("education", [
            ...data.education,
            {
                institution_name: "",
                location: "",
                notes: "",
                start_date: "",
                end_date: "",
            },
        ]);
    };

    const removeEducation = (index) => {
        const newEducation = data.education.filter((_, i) => i !== index);
        setData("education", newEducation);
    };

    const updateEducation = (index, field, value) => {
        const newEducation = [...data.education];
        newEducation[index][field] = value;
        setData("education", newEducation);
    };

    // Occupation handlers
    const addOccupation = () => {
        setData("occupations", [
            ...data.occupations,
            {
                title: "",
                description: "",
                start_date: "",
                end_date: "",
            },
        ]);
    };

    const removeOccupation = (index) => {
        const newOccupations = data.occupations.filter((_, i) => i !== index);
        setData("occupations", newOccupations);
    };

    const updateOccupation = (index, field, value) => {
        const newOccupations = [...data.occupations];
        newOccupations[index][field] = value;
        setData("occupations", newOccupations);
    };

    if (showPreview) {
        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-lg sm:text-xl font-semibold leading-tight text-green-800">
                        Biography Preview
                    </h2>
                }
            >
                <Head title="Biography Preview" />
                <div className="py-4 sm:py-8 lg:py-12 bg-green-50 min-h-screen">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <div className="bg-white shadow-lg sm:rounded-lg overflow-hidden border border-green-200">
                            <div className="bg-green-700 px-4 sm:px-6 py-3 sm:py-4">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                                    <h1 className="text-xl sm:text-2xl font-bold text-white">
                                        Biography Preview
                                    </h1>
                                    <button
                                        onClick={() => setShowPreview(false)}
                                        className="bg-white text-green-700 px-3 sm:px-4 py-2 rounded hover:bg-green-50 transition-colors text-sm sm:text-base"
                                    >
                                        ← Back to Edit
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 sm:p-6 lg:p-8">
                                <div className="space-y-4 sm:space-y-6">
                                    <div>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-2">
                                            {data.full_name}
                                        </h2>
                                        {data.title && (
                                            <p className="text-lg sm:text-xl text-green-600 font-medium">
                                                {data.title}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 bg-green-50 p-4 sm:p-6 rounded-lg">
                                        {data.date_of_birth && (
                                            <div>
                                                <h3 className="font-semibold text-green-800">
                                                    Date of Birth:
                                                </h3>
                                                <p className="text-gray-700">
                                                    {data.date_of_birth}
                                                </p>
                                            </div>
                                        )}
                                        {data.date_of_death && (
                                            <div>
                                                <h3 className="font-semibold text-green-800">
                                                    Date of Death:
                                                </h3>
                                                <p className="text-gray-700">
                                                    {data.date_of_death}
                                                </p>
                                            </div>
                                        )}
                                        {data.place_of_birth && (
                                            <div>
                                                <h3 className="font-semibold text-green-800">
                                                    Place of Birth:
                                                </h3>
                                                <p className="text-gray-700">
                                                    {data.place_of_birth}
                                                </p>
                                            </div>
                                        )}
                                        {data.state_of_origin && (
                                            <div>
                                                <h3 className="font-semibold text-green-800">
                                                    State of Origin:
                                                </h3>
                                                <p className="text-gray-700">
                                                    {data.state_of_origin}
                                                </p>
                                            </div>
                                        )}
                                        {data.religion && (
                                            <div>
                                                <h3 className="font-semibold text-green-800">
                                                    Religion:
                                                </h3>
                                                <p className="text-gray-700">
                                                    {data.religion}
                                                </p>
                                            </div>
                                        )}
                                        {data.ethnic_group && (
                                            <div>
                                                <h3 className="font-semibold text-green-800">
                                                    Ethnic Group:
                                                </h3>
                                                <p className="text-gray-700">
                                                    {data.ethnic_group}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {data.biography && (
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-3">
                                                Biography
                                            </h3>
                                            <div className="prose prose-green max-w-none prose-sm sm:prose-base">
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    rehypePlugins={[rehypeRaw]}
                                                >
                                                    {data.biography}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    )}

                                    {data.education.some(
                                        (edu) => edu.institution_name,
                                    ) && (
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-3">
                                                Education
                                            </h3>
                                            <div className="space-y-3 sm:space-y-4">
                                                {data.education.map(
                                                    (edu, index) =>
                                                        edu.institution_name && (
                                                            <div
                                                                key={index}
                                                                className="p-3 sm:p-4 bg-gray-50 rounded"
                                                            >
                                                                <p className="font-medium">
                                                                    {
                                                                        edu.institution_name
                                                                    }
                                                                </p>
                                                                {edu.location && (
                                                                    <p className="text-gray-600 text-sm sm:text-base">
                                                                        {
                                                                            edu.location
                                                                        }
                                                                    </p>
                                                                )}
                                                                {edu.start_date &&
                                                                    edu.end_date && (
                                                                        <p className="text-gray-600 text-sm sm:text-base">
                                                                            {
                                                                                edu.start_date
                                                                            }{" "}
                                                                            -{" "}
                                                                            {
                                                                                edu.end_date
                                                                            }
                                                                        </p>
                                                                    )}
                                                                {edu.notes && (
                                                                    <div className="text-gray-700 mt-2 prose prose-sm max-w-none">
                                                                        <ReactMarkdown
                                                                            remarkPlugins={[
                                                                                remarkGfm,
                                                                            ]}
                                                                            rehypePlugins={[
                                                                                rehypeRaw,
                                                                            ]}
                                                                        >
                                                                            {
                                                                                edu.notes
                                                                            }
                                                                        </ReactMarkdown>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ),
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {data.occupations.some(
                                        (occ) => occ.title,
                                    ) && (
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-3">
                                                Occupations
                                            </h3>
                                            <div className="space-y-3 sm:space-y-4">
                                                {data.occupations.map(
                                                    (occ, index) =>
                                                        occ.title && (
                                                            <div
                                                                key={index}
                                                                className="p-3 sm:p-4 bg-gray-50 rounded"
                                                            >
                                                                <p className="font-medium">
                                                                    {occ.title}
                                                                </p>
                                                                {occ.description && (
                                                                    <div className="text-gray-700 mt-2 prose prose-sm max-w-none">
                                                                        <ReactMarkdown
                                                                            remarkPlugins={[
                                                                                remarkGfm,
                                                                            ]}
                                                                            rehypePlugins={[
                                                                                rehypeRaw,
                                                                            ]}
                                                                        >
                                                                            {
                                                                                occ.description
                                                                            }
                                                                        </ReactMarkdown>
                                                                    </div>
                                                                )}
                                                                {occ.start_date &&
                                                                    occ.end_date && (
                                                                        <p className="text-gray-600 text-sm sm:text-base">
                                                                            {
                                                                                occ.start_date
                                                                            }{" "}
                                                                            -{" "}
                                                                            {
                                                                                occ.end_date
                                                                            }
                                                                        </p>
                                                                    )}
                                                            </div>
                                                        ),
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {data.how_to_cite && (
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-3">
                                                How to Cite
                                            </h3>
                                            <div className="bg-gray-50 p-3 sm:p-4 rounded border-l-4 border-green-500">
                                                <div className="prose prose-green max-w-none prose-sm sm:prose-base">
                                                    <ReactMarkdown
                                                        remarkPlugins={[
                                                            remarkGfm,
                                                        ]}
                                                        rehypePlugins={[
                                                            rehypeRaw,
                                                        ]}
                                                    >
                                                        {data.how_to_cite}
                                                    </ReactMarkdown>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {data.references && (
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-3">
                                                References
                                            </h3>
                                            <div className="prose prose-green max-w-none prose-sm sm:prose-base">
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    rehypePlugins={[rehypeRaw]}
                                                >
                                                    {data.references}
                                                </ReactMarkdown>
                                            </div>
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

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-lg sm:text-xl font-semibold leading-tight text-green-800">
                    Create Biography
                </h2>
            }
        >
            <Head title="Create Biography" />

            <div className="py-4 sm:py-8 lg:py-12 bg-green-50 min-h-screen">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg sm:rounded-lg overflow-hidden border border-green-200">
                        <div className="bg-green-700 px-4 sm:px-6 py-3 sm:py-4">
                            <h1 className="text-xl sm:text-2xl font-bold text-white">
                                Create New Biography
                            </h1>
                        </div>

                        <form className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                            {/* Basic Information Section */}
                            <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
                                <h2 className="text-base sm:text-lg font-semibold text-green-800 mb-3 sm:mb-4">
                                    Basic Information
                                </h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-green-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.full_name}
                                            onChange={(e) =>
                                                setData(
                                                    "full_name",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                            required
                                        />
                                        {errors.full_name && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.full_name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-green-700 mb-2">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                            placeholder="e.g., Professor, Chief, Dr."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-green-700 mb-2">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            value={data.date_of_birth}
                                            onChange={(e) =>
                                                setData(
                                                    "date_of_birth",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-green-700 mb-2">
                                            Date of Death
                                        </label>
                                        <input
                                            type="date"
                                            value={data.date_of_death}
                                            onChange={(e) =>
                                                setData(
                                                    "date_of_death",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-green-700 mb-2">
                                            Place of Birth
                                        </label>
                                        <input
                                            type="text"
                                            value={data.place_of_birth}
                                            onChange={(e) =>
                                                setData(
                                                    "place_of_birth",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-green-700 mb-2">
                                            Place of Death
                                        </label>
                                        <input
                                            type="text"
                                            value={data.place_of_death}
                                            onChange={(e) =>
                                                setData(
                                                    "place_of_death",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Location & Background */}
                            <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
                                <h2 className="text-base sm:text-lg font-semibold text-green-800 mb-3 sm:mb-4">
                                    Location & Background
                                </h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-green-700 mb-2">
                                            State of Origin
                                        </label>
                                        <select
                                            value={data.state_of_origin}
                                            onChange={(e) =>
                                                handleStateChange(
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                        >
                                            <option value="">
                                                Select State
                                            </option>
                                            {states_and_lgas.map((state) => (
                                                <option
                                                    key={state.name}
                                                    value={state.name}
                                                >
                                                    {state.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-green-700 mb-2">
                                            Local Government Area
                                        </label>
                                        <select
                                            value={data.lga}
                                            onChange={(e) =>
                                                setData("lga", e.target.value)
                                            }
                                            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                            disabled={!data.state_of_origin}
                                        >
                                            <option value="">Select LGA</option>
                                            {currentLgas.map((lga) => (
                                                <option key={lga} value={lga}>
                                                    {lga}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-green-700 mb-2">
                                            Region
                                        </label>
                                        <select
                                            value={data.region}
                                            onChange={(e) =>
                                                setData(
                                                    "region",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                        >
                                            <option value="">
                                                Select Region
                                            </option>
                                            {Object.keys(regions).map(
                                                (region) => (
                                                    <option
                                                        key={region}
                                                        value={region}
                                                    >
                                                        {region}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-green-700 mb-2">
                                            Ethnic Group
                                        </label>
                                        <input
                                            type="text"
                                            value={data.ethnic_group}
                                            onChange={(e) =>
                                                setData(
                                                    "ethnic_group",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-green-700 mb-2">
                                            Religion
                                        </label>
                                        <input
                                            type="text"
                                            value={data.religion}
                                            onChange={(e) =>
                                                setData(
                                                    "religion",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-green-700 mb-2">
                                            Language
                                        </label>
                                        <input
                                            type="text"
                                            value={data.language}
                                            onChange={(e) =>
                                                setData(
                                                    "language",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Education Section */}
                            <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2">
                                    <h2 className="text-base sm:text-lg font-semibold text-green-800">
                                        Education
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={addEducation}
                                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 w-full sm:w-auto"
                                    >
                                        + Add Education
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {data.education.map((edu, index) => (
                                        <div
                                            key={index}
                                            className="border border-green-200 p-3 sm:p-4 rounded-lg bg-white"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="font-medium text-green-800 text-sm sm:text-base">
                                                    Education #{index + 1}
                                                </h3>
                                                {data.education.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeEducation(
                                                                index,
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-800 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                                <div className="sm:col-span-2">
                                                    <label className="block text-sm font-medium text-green-700 mb-1">
                                                        Institution Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={
                                                            edu.institution_name
                                                        }
                                                        onChange={(e) =>
                                                            updateEducation(
                                                                index,
                                                                "institution_name",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-green-700 mb-1">
                                                        Location
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={edu.location}
                                                        onChange={(e) =>
                                                            updateEducation(
                                                                index,
                                                                "location",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-green-700 mb-1">
                                                        Start Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={edu.start_date}
                                                        onChange={(e) =>
                                                            updateEducation(
                                                                index,
                                                                "start_date",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-green-700 mb-1">
                                                        End Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={edu.end_date}
                                                        onChange={(e) =>
                                                            updateEducation(
                                                                index,
                                                                "end_date",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-3 sm:mt-4">
                                                <label className="block text-sm font-medium text-green-700 mb-1">
                                                    Notes
                                                </label>
                                                <div data-color-mode="light">
                                                    <MDEditor
                                                        value={edu.notes}
                                                        onChange={(val) =>
                                                            updateEducation(
                                                                index,
                                                                "notes",
                                                                val || "",
                                                            )
                                                        }
                                                        preview="edit"
                                                        hideToolbar={false}
                                                        visibleDragBar={false}
                                                        height={150}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Occupations Section */}
                            <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2">
                                    <h2 className="text-base sm:text-lg font-semibold text-green-800">
                                        Occupations
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={addOccupation}
                                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 w-full sm:w-auto"
                                    >
                                        + Add Occupation
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {data.occupations.map((occ, index) => (
                                        <div
                                            key={index}
                                            className="border border-green-200 p-3 sm:p-4 rounded-lg bg-white"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="font-medium text-green-800 text-sm sm:text-base">
                                                    Occupation #{index + 1}
                                                </h3>
                                                {data.occupations.length >
                                                    1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeOccupation(
                                                                index,
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-800 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                                <div className="sm:col-span-2">
                                                    <label className="block text-sm font-medium text-green-700 mb-1">
                                                        Job Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={occ.title}
                                                        onChange={(e) =>
                                                            updateOccupation(
                                                                index,
                                                                "title",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-green-700 mb-1">
                                                        Start Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={occ.start_date}
                                                        onChange={(e) =>
                                                            updateOccupation(
                                                                index,
                                                                "start_date",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-green-700 mb-1">
                                                        End Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={occ.end_date}
                                                        onChange={(e) =>
                                                            updateOccupation(
                                                                index,
                                                                "end_date",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-3 sm:mt-4">
                                                <label className="block text-sm font-medium text-green-700 mb-1">
                                                    Description
                                                </label>
                                                <div data-color-mode="light">
                                                    <MDEditor
                                                        value={occ.description}
                                                        onChange={(val) =>
                                                            updateOccupation(
                                                                index,
                                                                "description",
                                                                val || "",
                                                            )
                                                        }
                                                        preview="edit"
                                                        hideToolbar={false}
                                                        visibleDragBar={false}
                                                        height={200}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Related Entries */}
                            <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
                                <h2 className="text-base sm:text-lg font-semibold text-green-800 mb-3 sm:mb-4">
                                    Related Biographies
                                </h2>
                                <div>
                                    <label className="block text-sm font-medium text-green-700 mb-2">
                                        Select Related Biographies
                                    </label>
                                    <Select
                                        isMulti
                                        options={relatedOptions}
                                        value={relatedOptions.filter((opt) =>
                                            data.related_entries.includes(
                                                opt.value,
                                            ),
                                        )}
                                        onChange={(selected) =>
                                            setData(
                                                "related_entries",
                                                selected.map(
                                                    (opt) => opt.value,
                                                ),
                                            )
                                        }
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        placeholder="Select related biographies..."
                                    />
                                </div>
                            </div>

                            {/* Biography Content */}
                            <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
                                <h2 className="text-base sm:text-lg font-semibold text-green-800 mb-3 sm:mb-4">
                                    Biography Content
                                </h2>
                                <div>
                                    <label className="block text-sm font-medium text-green-700 mb-2">
                                        Biography * (Rich Text Editor)
                                    </label>
                                    <div className="text-xs text-gray-600 mb-2">
                                        Use the toolbar buttons above for
                                        formatting: Bold, Italic, Headers,
                                        Lists, Links, etc.
                                    </div>
                                    <div data-color-mode="light">
                                        <MDEditor
                                            value={data.biography}
                                            onChange={(val) =>
                                                setData("biography", val || "")
                                            }
                                            preview="edit"
                                            hideToolbar={false}
                                            visibleDragBar={false}
                                            height={400}
                                        />
                                    </div>
                                    {errors.biography && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.biography}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Citations & References */}
                            <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
                                <h2 className="text-base sm:text-lg font-semibold text-green-800 mb-3 sm:mb-4">
                                    Citations & References
                                </h2>
                                <div className="space-y-4 sm:space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-green-700 mb-2">
                                            How to Cite
                                        </label>
                                        <div data-color-mode="light">
                                            <MDEditor
                                                value={data.how_to_cite}
                                                onChange={(val) =>
                                                    setData(
                                                        "how_to_cite",
                                                        val || "",
                                                    )
                                                }
                                                preview="edit"
                                                hideToolbar={false}
                                                visibleDragBar={false}
                                                height={200}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-green-700 mb-2">
                                            References
                                        </label>
                                        <div data-color-mode="light">
                                            <MDEditor
                                                value={data.references}
                                                onChange={(val) =>
                                                    setData(
                                                        "references",
                                                        val || "",
                                                    )
                                                }
                                                preview="edit"
                                                hideToolbar={false}
                                                visibleDragBar={false}
                                                height={300}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 pt-4 sm:pt-6 border-t border-green-200">
                                <button
                                    type="button"
                                    onClick={handlePreview}
                                    className="w-full bg-green-100 text-green-700 py-3 px-4 sm:px-6 rounded-lg hover:bg-green-200 transition-colors font-medium text-sm sm:text-base"
                                >
                                    Preview
                                </button>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={handleSaveAsDraft}
                                        disabled={processing}
                                        className="bg-gray-500 text-white py-3 px-4 sm:px-6 rounded-lg hover:bg-gray-600 transition-colors font-medium disabled:opacity-50 text-sm sm:text-base"
                                    >
                                        {processing
                                            ? "Saving..."
                                            : "Save as Draft"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSubmitForReview}
                                        disabled={processing}
                                        className="bg-green-600 text-white py-3 px-4 sm:px-6 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 text-sm sm:text-base"
                                    >
                                        {processing
                                            ? "Submitting..."
                                            : "Submit for Review"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
