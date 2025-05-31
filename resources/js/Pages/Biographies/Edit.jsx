import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";

export default function Edit({
    biography,
    states_and_lgas = [],
    relatedBiographies = [],
    relatedOptions = [],
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: biography.full_name || "",
        title: biography.title || "",
        date_of_birth: biography.date_of_birth || "",
        date_of_death: biography.date_of_death || "",
        cause_of_death: biography.cause_of_death || "",
        state_of_origin: biography.state_of_origin || "",
        lga: biography.lga || "",
        ethnic_group: biography.ethnic_group || "",
        religion: biography.religion || "",
        language: biography.language || "",
        region: biography.region || "",
        biography: biography.biography || "",
        photo: null, // for new upload
        how_to_cite: biography.how_to_cite || "",
        references: biography.references || "",
        related_entries: biography.related_biographies
            ? biography.related_biographies.map((b) => b.id)
            : [],
        education:
            biography.education && biography.education.length > 0
                ? biography.education.map((e) => ({
                      institution_name: e.institution_name || "",
                      location: e.location || "",
                      notes: e.notes || "",
                      start_date: e.start_date || "",
                      end_date: e.end_date || "",
                  }))
                : [
                      {
                          institution_name: "",
                          location: "",
                          notes: "",
                          start_date: "",
                          end_date: "",
                      },
                  ],
        occupations:
            biography.occupations && biography.occupations.length > 0
                ? biography.occupations.map((o) => ({
                      title: o.title || "",
                      description: o.description || "",
                      start_date: o.start_date || "",
                      end_date: o.end_date || "",
                  }))
                : [
                      {
                          title: "",
                          description: "",
                          start_date: "",
                          end_date: "",
                      },
                  ],
    });

    // Find LGAs for selected state
    const selectedState = states_and_lgas.find(
        (s) => s.name === data.state_of_origin
    );
    const lgas = selectedState ? selectedState.lgas : [];

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setData(name, type === "file" ? files[0] : value);
        if (name === "state_of_origin") setData("lga", "");
    };

    const handleQuillChange = (field) => (value) => setData(field, value);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("biographies.update", biography.slug), {
            method: "post",
            // _method: "put",
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Biography
                </h2>
            }
        >
            <Head title={`Edit: ${data.full_name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="max-w-3xl mx-auto p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">
                                    Edit Biography
                                </h1>
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
                                    <label className="block font-medium">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={data.full_name}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
                                    {errors.full_name && (
                                        <div className="text-red-600 text-sm">
                                            {errors.full_name}
                                        </div>
                                    )}
                                </div>
                                {/* Title */}
                                <div>
                                    <label className="block font-medium">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.title && (
                                        <div className="text-red-600 text-sm">
                                            {errors.title}
                                        </div>
                                    )}
                                </div>
                                {/* Date of Birth */}
                                <div>
                                    <label className="block font-medium">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        name="date_of_birth"
                                        value={data.date_of_birth}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.date_of_birth && (
                                        <div className="text-red-600 text-sm">
                                            {errors.date_of_birth}
                                        </div>
                                    )}
                                </div>
                                {/* Place of Birth */}
                                <div>
                                    <label className="block font-medium">
                                        Place of Birth
                                    </label>
                                    <input
                                        type="text"
                                        name="place_of_birth"
                                        value={data.place_of_birth}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.place_of_birth && (
                                        <div className="text-red-600 text-sm">
                                            {errors.place_of_birth}
                                        </div>
                                    )}
                                </div>
                                {/* Date of Death */}
                                <div>
                                    <label className="block font-medium">
                                        Date of Death
                                    </label>
                                    <input
                                        type="date"
                                        name="date_of_death"
                                        value={data.date_of_death}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.date_of_death && (
                                        <div className="text-red-600 text-sm">
                                            {errors.date_of_death}
                                        </div>
                                    )}
                                </div>

                                {/* Place of Death */}
                                <div>
                                    <label className="block font-medium">
                                        Place of Death
                                    </label>
                                    <input
                                        type="text"
                                        name="place_of_death"
                                        value={data.place_of_death}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.place_of_death && (
                                        <div className="text-red-600 text-sm">
                                            {errors.place_of_death}
                                        </div>
                                    )}
                                </div>
                                {/* Cause of Death */}
                                <div>
                                    <label className="block font-medium">
                                        Cause of Death
                                    </label>
                                    <input
                                        type="text"
                                        name="cause_of_death"
                                        value={data.cause_of_death}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.cause_of_death && (
                                        <div className="text-red-600 text-sm">
                                            {errors.cause_of_death}
                                        </div>
                                    )}
                                </div>
                                {/* State of Origin */}
                                <div>
                                    <label className="block font-medium">
                                        State of Origin
                                    </label>
                                    <select
                                        name="state_of_origin"
                                        value={data.state_of_origin}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    >
                                        <option value="">Select State</option>
                                        {states_and_lgas.map((state) => (
                                            <option
                                                key={state.code}
                                                value={state.name}
                                            >
                                                {state.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.state_of_origin && (
                                        <div className="text-red-600 text-sm">
                                            {errors.state_of_origin}
                                        </div>
                                    )}
                                </div>
                                {/* LGA */}
                                <div>
                                    <label className="block font-medium">
                                        LGA
                                    </label>
                                    <select
                                        name="lga"
                                        value={data.lga}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                        disabled={!data.state_of_origin}
                                    >
                                        <option value="">Select LGA</option>
                                        {lgas &&
                                            lgas.map((lga) => (
                                                <option key={lga} value={lga}>
                                                    {lga}
                                                </option>
                                            ))}
                                    </select>
                                    {errors.lga && (
                                        <div className="text-red-600 text-sm">
                                            {errors.lga}
                                        </div>
                                    )}
                                </div>
                                {/* Ethnic Group */}
                                <div>
                                    <label className="block font-medium">
                                        Ethnic Group
                                    </label>
                                    <input
                                        type="text"
                                        name="ethnic_group"
                                        value={data.ethnic_group}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.ethnic_group && (
                                        <div className="text-red-600 text-sm">
                                            {errors.ethnic_group}
                                        </div>
                                    )}
                                </div>
                                {/* Religion */}
                                <div>
                                    <label className="block font-medium">
                                        Religion
                                    </label>
                                    <input
                                        type="text"
                                        name="religion"
                                        value={data.religion}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.religion && (
                                        <div className="text-red-600 text-sm">
                                            {errors.religion}
                                        </div>
                                    )}
                                </div>
                                {/* Language */}
                                <div>
                                    <label className="block font-medium">
                                        Language
                                    </label>
                                    <input
                                        type="text"
                                        name="language"
                                        value={data.language}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.language && (
                                        <div className="text-red-600 text-sm">
                                            {errors.language}
                                        </div>
                                    )}
                                </div>
                                {/* Region */}
                                <div>
                                    <label className="block font-medium">
                                        Region
                                    </label>
                                    <input
                                        type="text"
                                        name="region"
                                        value={data.region}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.region && (
                                        <div className="text-red-600 text-sm">
                                            {errors.region}
                                        </div>
                                    )}
                                </div>
                                {/* Biography (WYSIWYG) */}
                                <div>
                                    <label className="block font-medium mb-1">
                                        Biography *
                                    </label>
                                    <ReactQuill
                                        value={data.biography}
                                        onChange={handleQuillChange}
                                        className="bg-white"
                                    />
                                    {errors.biography && (
                                        <div className="text-red-600 text-sm">
                                            {errors.biography}
                                        </div>
                                    )}
                                </div>
                                {/* How to Cite (WYSIWYG) */}
                                <div>
                                    <label className="block font-medium mb-1">
                                        How to Cite
                                    </label>
                                    <ReactQuill
                                        value={data.how_to_cite}
                                        onChange={handleQuillChange(
                                            "how_to_cite"
                                        )}
                                        className="bg-white"
                                    />
                                    {errors.how_to_cite && (
                                        <div className="text-red-600 text-sm">
                                            {errors.how_to_cite}
                                        </div>
                                    )}
                                </div>
                                {/* References (WYSIWYG) */}
                                <div>
                                    <label className="block font-medium mb-1">
                                        References
                                    </label>
                                    <ReactQuill
                                        value={data.references}
                                        onChange={handleQuillChange(
                                            "references"
                                        )}
                                        className="bg-white"
                                    />
                                    {errors.references && (
                                        <div className="text-red-600 text-sm">
                                            {errors.references}
                                        </div>
                                    )}
                                </div>
                                {/* Education (dynamic) */}
                                <div>
                                    <label className="block font-medium">
                                        Education
                                    </label>
                                    {data.education.map((edu, idx) => (
                                        <div
                                            key={idx}
                                            className="mb-2 flex flex-wrap gap-2 items-end"
                                        >
                                            <input
                                                type="text"
                                                placeholder="Institution"
                                                value={edu.institution_name}
                                                onChange={(e) => {
                                                    const edus = [
                                                        ...data.education,
                                                    ];
                                                    edus[idx].institution_name =
                                                        e.target.value;
                                                    setData("education", edus);
                                                }}
                                                className="border rounded px-2 py-1 flex-1"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Location"
                                                value={edu.location}
                                                onChange={(e) => {
                                                    const edus = [
                                                        ...data.education,
                                                    ];
                                                    edus[idx].location =
                                                        e.target.value;
                                                    setData("education", edus);
                                                }}
                                                className="border rounded px-2 py-1 flex-1"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Notes"
                                                value={edu.notes}
                                                onChange={(e) => {
                                                    const edus = [
                                                        ...data.education,
                                                    ];
                                                    edus[idx].notes =
                                                        e.target.value;
                                                    setData("education", edus);
                                                }}
                                                className="border rounded px-2 py-1 flex-1"
                                            />
                                            <input
                                                type="date"
                                                placeholder="Start Date"
                                                value={edu.start_date}
                                                onChange={(e) => {
                                                    const edus = [
                                                        ...data.education,
                                                    ];
                                                    edus[idx].start_date =
                                                        e.target.value;
                                                    setData("education", edus);
                                                }}
                                                className="border rounded px-2 py-1"
                                            />
                                            <input
                                                type="date"
                                                placeholder="End Date"
                                                value={edu.end_date}
                                                onChange={(e) => {
                                                    const edus = [
                                                        ...data.education,
                                                    ];
                                                    edus[idx].end_date =
                                                        e.target.value;
                                                    setData("education", edus);
                                                }}
                                                className="border rounded px-2 py-1"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData(
                                                        "education",
                                                        data.education.filter(
                                                            (_, i) => i !== idx
                                                        )
                                                    )
                                                }
                                                className="text-red-600 px-2"
                                                disabled={
                                                    data.education.length === 1
                                                }
                                            >
                                                –
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setData("education", [
                                                ...data.education,
                                                {
                                                    institution_name: "",
                                                    location: "",
                                                    notes: "",
                                                    start_date: "",
                                                    end_date: "",
                                                },
                                            ])
                                        }
                                        className="text-green-600 px-2"
                                    >
                                        + Add Education
                                    </button>
                                </div>
                                {/* Occupations (dynamic) */}
                                <div>
                                    <label className="block font-medium">
                                        Employment/Occupations
                                    </label>
                                    {data.occupations.map((occ, idx) => (
                                        <div
                                            key={idx}
                                            className="mb-2 flex flex-wrap gap-2 items-end"
                                        >
                                            <input
                                                type="text"
                                                placeholder="Title"
                                                value={occ.title}
                                                onChange={(e) => {
                                                    const occs = [
                                                        ...data.occupations,
                                                    ];
                                                    occs[idx].title =
                                                        e.target.value;
                                                    setData(
                                                        "occupations",
                                                        occs
                                                    );
                                                }}
                                                className="border rounded px-2 py-1 flex-1"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Description"
                                                value={occ.description}
                                                onChange={(e) => {
                                                    const occs = [
                                                        ...data.occupations,
                                                    ];
                                                    occs[idx].description =
                                                        e.target.value;
                                                    setData(
                                                        "occupations",
                                                        occs
                                                    );
                                                }}
                                                className="border rounded px-2 py-1 flex-1"
                                            />
                                            <input
                                                type="date"
                                                placeholder="Start Date"
                                                value={occ.start_date}
                                                onChange={(e) => {
                                                    const occs = [
                                                        ...data.occupations,
                                                    ];
                                                    occs[idx].start_date =
                                                        e.target.value;
                                                    setData(
                                                        "occupations",
                                                        occs
                                                    );
                                                }}
                                                className="border rounded px-2 py-1"
                                            />
                                            <input
                                                type="date"
                                                placeholder="End Date"
                                                value={occ.end_date}
                                                onChange={(e) => {
                                                    const occs = [
                                                        ...data.occupations,
                                                    ];
                                                    occs[idx].end_date =
                                                        e.target.value;
                                                    setData(
                                                        "occupations",
                                                        occs
                                                    );
                                                }}
                                                className="border rounded px-2 py-1"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData(
                                                        "occupations",
                                                        data.occupations.filter(
                                                            (_, i) => i !== idx
                                                        )
                                                    )
                                                }
                                                className="text-red-600 px-2"
                                                disabled={
                                                    data.occupations.length ===
                                                    1
                                                }
                                            >
                                                –
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setData("occupations", [
                                                ...data.occupations,
                                                {
                                                    title: "",
                                                    description: "",
                                                    start_date: "",
                                                    end_date: "",
                                                },
                                            ])
                                        }
                                        className="text-green-600 px-2"
                                    >
                                        + Add Occupation
                                    </button>
                                </div>
                                {/* Related Entries (Select2) */}
                                <div>
                                    <label className="block font-medium">
                                        Related Entries
                                    </label>
                                    <Select
                                        isMulti
                                        name="related_entries"
                                        options={relatedOptions}
                                        value={relatedOptions.filter((opt) =>
                                            data.related_entries.includes(
                                                opt.value
                                            )
                                        )}
                                        onChange={(selected) =>
                                            setData(
                                                "related_entries",
                                                selected.map((opt) => opt.value)
                                            )
                                        }
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        placeholder="Select related biographies..."
                                    />
                                    {errors.related_entries && (
                                        <div className="text-red-600 text-sm">
                                            {errors.related_entries}
                                        </div>
                                    )}
                                </div>
                                {/* Photo */}
                                <div>
                                    <label className="block font-medium">
                                        Photo
                                    </label>
                                    {typeof data.photo === "string" &&
                                        data.photo && (
                                            <img
                                                src={
                                                    data.photo.startsWith(
                                                        "http"
                                                    )
                                                        ? data.photo
                                                        : `/storage/${data.photo}`
                                                }
                                                alt={data.full_name}
                                                className="w-64 max-w-full rounded shadow mb-6 float-right ml-6 mb-4 lg:mb-0 lg:ml-8 lg:float-right"
                                            />
                                        )}
                                    {typeof data.photo === "object" &&
                                        data.photo && (
                                            <img
                                                src={URL.createObjectURL(
                                                    data.photo
                                                )}
                                                alt={data.full_name}
                                                className="w-64 max-w-full rounded shadow mb-6 float-right ml-6 mb-4 lg:mb-0 lg:ml-8 lg:float-right"
                                            />
                                        )}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                    {errors.photo && (
                                        <div className="text-red-600 text-sm">
                                            {errors.photo}
                                        </div>
                                    )}
                                </div>
                                {/* Submit */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-indigo-600 text-white px-6 py-2 rounded"
                                    >
                                        {processing ? "Saving..." : "Update"}
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
