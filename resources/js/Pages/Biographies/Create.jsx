import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";

export default function Create({ states_and_lgas = [], regions, relatedOptions = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        occupation: "",
        date_of_birth: "",
        date_of_birth_circa: "",
        date_of_death: "",
        date_of_death_circa: "",
        geopolitical_zone: "",
        state_of_origin: "",
        lga: "",
        cultural_heritage: "",
        religious_influence: "",
        alma_mater: "",
        summary: "",
        biography: "",
        bibliography_entries: [],
        how_to_cite: "",
        references: "",
        bibliography: [],
        further_reading: "",
        image: null,
    });

    const geopoliticalZones = [
        'North-Central',
        'North-East', 
        'North-West',
        'South-East',
        'South-South',
        'South-West'
    ];

    const statesByZone = {
        'North-Central': ['Benue', 'FCT - Abuja', 'Kogi', 'Kwara', 'Nasarawa', 'Niger', 'Plateau'],
        'North-East': ['Adamawa', 'Bauchi', 'Borno', 'Gombe', 'Taraba', 'Yobe'],
        'North-West': ['Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Sokoto', 'Zamfara'],
        'South-East': ['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo'],
        'South-South': ['Akwa Ibom', 'Bayelsa', 'Cross River', 'Delta', 'Edo', 'Rivers'],
        'South-West': ['Ekiti', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Oyo']
    };

    const occupations = [
        'Academic/Professor',
        'Activist',
        'Artist',
        'Business Person',
        'Civil Servant',
        'Engineer',
        'Farmer',
        'Journalist',
        'Lawyer',
        'Medical Doctor',
        'Military Officer',
        'Musician',
        'Politician',
        'Religious Leader',
        'Scientist',
        'Teacher',
        'Traditional Ruler',
        'Writer/Author',
        'Other'
    ];

    const bibliographyTypes = [
        'Book (Published)',
        'Book (Unpublished)', 
        'Booklet/Pamphlet (Unpublished)',
        'Dissertation/Thesis/Project',
        'Journal (Online)',
        'Journal (Paperback)',
        'Newspaper (Online)',
        'Newspaper (Print)',
        'Oral Source (Interview)',
        'Oral Source (Folk Song)',
        'Website'
    ];

    // Find LGAs for selected state
    const selectedState = states_and_lgas.find(
        (s) => s.name === data.state_of_origin
    );
    const lgas = selectedState ? selectedState.lgas : [];

    const getBibliographyFields = (type) => {
        const fields = {
            'Book (Published)': [
                { name: 'authors_editors', label: 'Author(s) / Editor(s)', type: 'text', required: true },
                { name: 'title', label: 'Title of Book', type: 'text', required: true },
                { name: 'subtitle', label: 'Subtitle (if any)', type: 'text' },
                { name: 'edition', label: 'Edition (if not first)', type: 'text' },
                { name: 'publisher', label: 'Publisher', type: 'text', required: true },
                { name: 'place_of_publication', label: 'Place of Publication', type: 'text', required: true },
                { name: 'year_of_publication', label: 'Year of Publication', type: 'number', required: true },
                { name: 'isbn', label: 'ISBN (if available)', type: 'text' },
                { name: 'language', label: 'Language', type: 'text', required: true },
                { name: 'number_of_pages', label: 'Number of Pages', type: 'number' },
                { name: 'subject_keywords', label: 'Subject/Keywords', type: 'text' },
                { name: 'access_link', label: 'Access Link (if digital)', type: 'url' }
            ],
            'Book (Unpublished)': [
                { name: 'authors', label: 'Author(s)', type: 'text', required: true },
                { name: 'title', label: 'Title of Book', type: 'text', required: true },
                { name: 'subtitle', label: 'Subtitle (if any)', type: 'text' },
                { name: 'manuscript_status', label: 'Manuscript Status', type: 'select', options: [
                    'Unpublished Manuscript', 'Draft Manuscript', 'Submitted Manuscript', 
                    'Accepted Manuscript', 'Published Manuscript', 'Rejected Manuscript', 
                    'Withdrawn Manuscript', 'Archived Manuscript', 'Working Paper', 
                    'Preprint', 'Revised Manuscript', 'Confidential/Restricted Manuscript'
                ], required: true },
                { name: 'date_written', label: 'Date Written', type: 'date', required: true },
                { name: 'place_written', label: 'Place Written', type: 'text', required: true },
                { name: 'current_location', label: 'Current Location (Library/Personal Archive)', type: 'text', required: true },
                { name: 'language', label: 'Language', type: 'text', required: true }
            ],
            'Booklet/Pamphlet (Unpublished)': [
                { name: 'author_organization', label: 'Author / Organization', type: 'text', required: true },
                { name: 'title', label: 'Title', type: 'text', required: true },
                { name: 'subtitle', label: 'Subtitle (if any)', type: 'text' },
                { name: 'date_of_production', label: 'Date of Production', type: 'date', required: true },
                { name: 'place_of_production', label: 'Place of Production', type: 'text', required: true },
                { name: 'number_of_pages', label: 'Number of Pages', type: 'number' },
                { name: 'type', label: 'Type (e.g., handout, campaign material, sermon notes)', type: 'text', required: true },
                { name: 'language', label: 'Language', type: 'text', required: true },
                { name: 'current_location_archive', label: 'Current Location / Archive', type: 'text', required: true }
            ],
            'Dissertation/Thesis/Project': [
                { name: 'author', label: 'Author', type: 'text', required: true },
                { name: 'title', label: 'Title', type: 'text', required: true },
                { name: 'institution', label: 'Institution', type: 'text', required: true },
                { name: 'department_faculty', label: 'Department / Faculty', type: 'text', required: true },
                { name: 'degree_awarded', label: 'Degree Awarded (e.g., B.A., M.A., Ph.D.)', type: 'text', required: true },
                { name: 'year_of_submission', label: 'Year of Submission', type: 'number', required: true },
                { name: 'supervisor', label: 'Supervisor (optional)', type: 'text' },
                { name: 'place', label: 'Place (Institution Location)', type: 'text', required: true },
                { name: 'number_of_pages', label: 'Number of Pages', type: 'number' },
                { name: 'language', label: 'Language', type: 'text', required: true },
                { name: 'subject_keywords', label: 'Subject/Keywords', type: 'text' },
                { name: 'access_link', label: 'Access Link (if online)', type: 'url' },
                { name: 'repository_archive_location', label: 'Repository / Archive Location (if offline)', type: 'text' }
            ],
            'Journal (Online)': [
                { name: 'authors', label: 'Author(s)', type: 'text', required: true },
                { name: 'title_of_article', label: 'Title of Article', type: 'text', required: true },
                { name: 'journal_title', label: 'Journal Title', type: 'text', required: true },
                { name: 'volume_issue_number', label: 'Volume / Issue Number', type: 'text', required: true },
                { name: 'date_of_publication', label: 'Date of Publication', type: 'date', required: true },
                { name: 'page_range', label: 'Page Range (if paginated)', type: 'text' },
                { name: 'doi_permanent_url', label: 'DOI / Permanent URL', type: 'url', required: true },
                { name: 'publisher_journal_institution', label: 'Publisher / Journal Institution', type: 'text', required: true },
                { name: 'language', label: 'Language', type: 'text', required: true },
                { name: 'subject_keywords', label: 'Subject/Keywords', type: 'text' },
                { name: 'access_date', label: 'Access Date (date you viewed it)', type: 'date', required: true }
            ],
            'Journal (Paperback)': [
                { name: 'authors', label: 'Author(s)', type: 'text', required: true },
                { name: 'title_of_article', label: 'Title of Article', type: 'text', required: true },
                { name: 'journal_title', label: 'Journal Title', type: 'text', required: true },
                { name: 'volume_issue_number', label: 'Volume / Issue Number', type: 'text', required: true },
                { name: 'date_of_publication', label: 'Date of Publication', type: 'text', required: true },
                { name: 'page_range', label: 'Page Range', type: 'text', required: true },
                { name: 'publisher_journal_institution', label: 'Publisher / Journal Institution', type: 'text', required: true },
                { name: 'place_of_publication', label: 'Place of Publication', type: 'text', required: true },
                { name: 'language', label: 'Language', type: 'text', required: true }
            ],
            'Newspaper (Online)': [
                { name: 'author_reporter', label: 'Author / Reporter (if known)', type: 'text' },
                { name: 'title_of_article', label: 'Title of Article', type: 'text', required: true },
                { name: 'newspaper_name', label: 'Newspaper Name', type: 'text', required: true },
                { name: 'date_of_publication', label: 'Date of Publication', type: 'date', required: true },
                { name: 'url_web_link', label: 'URL / Web Link', type: 'url', required: true },
                { name: 'access_date', label: 'Access Date', type: 'date', required: true },
                { name: 'language', label: 'Language', type: 'text', required: true }
            ],
            'Newspaper (Print)': [
                { name: 'author_reporter', label: 'Author / Reporter (if known)', type: 'text' },
                { name: 'title_of_article', label: 'Title of Article', type: 'text', required: true },
                { name: 'newspaper_name', label: 'Newspaper Name', type: 'text', required: true },
                { name: 'date_of_publication', label: 'Date of Publication', type: 'date', required: true },
                { name: 'page_numbers', label: 'Page Number(s)', type: 'text', required: true },
                { name: 'place_of_publication', label: 'Place of Publication', type: 'text', required: true },
                { name: 'language', label: 'Language', type: 'text', required: true },
                { name: 'subject_keywords', label: 'Subject/Keywords', type: 'text' },
                { name: 'archive_location', label: 'Archive Location (if stored physically)', type: 'text' }
            ],
            'Oral Source (Interview)': [
                { name: 'name_of_interviewee', label: 'Name of Interviewee', type: 'text', required: true },
                { name: 'name_of_interviewer', label: 'Name of Interviewer', type: 'text', required: true },
                { name: 'date_of_interview', label: 'Date of Interview', type: 'date', required: true },
                { name: 'location_of_interview', label: 'Location of Interview', type: 'text', required: true },
                { name: 'language_used', label: 'Language Used', type: 'text', required: true },
                { name: 'topic_title_theme', label: 'Topic / Title / Theme', type: 'text', required: true },
                { name: 'format', label: 'Format', type: 'select', options: ['Audio', 'Video', 'Notes'], required: true },
                { name: 'institution_archive', label: 'Institution / Archive (if stored)', type: 'text' },
                { name: 'transcript_availability', label: 'Transcript Availability', type: 'select', options: ['yes', 'no'], required: true },
                { name: 'consent_for_use', label: 'Consent for Use', type: 'select', options: ['yes', 'no'], required: true },
                { name: 'notes', label: 'Notes (context, background info)', type: 'textarea' }
            ],
            'Oral Source (Folk Song)': [
                { name: 'title_name_of_song', label: 'Title / Name of Song (if known)', type: 'text' },
                { name: 'performers', label: 'Performer(s)', type: 'text', required: true },
                { name: 'collector_recorder', label: 'Collector / Recorder (if applicable)', type: 'text' },
                { name: 'date_collected_performed', label: 'Date Collected / Performed', type: 'date', required: true },
                { name: 'place_community', label: 'Place / Community', type: 'text', required: true },
                { name: 'language_dialect', label: 'Language / Dialect', type: 'text', required: true },
                { name: 'theme_message_function', label: 'Theme / Message / Function (e.g., praise, protest, harvest)', type: 'text', required: true },
                { name: 'performance_context', label: 'Performance Context (ceremony, festival, etc.)', type: 'text' },
                { name: 'format', label: 'Format', type: 'select', options: ['audio', 'video', 'notation'], required: true },
                { name: 'storage_location', label: 'Storage Location (archive, personal collection)', type: 'text', required: true },
                { name: 'transcript_translation_available', label: 'Transcript or Translation Available', type: 'select', options: ['yes', 'no'], required: true }
            ],
            'Website': [
                { name: 'title_of_webpage_article', label: 'Title of Webpage / Article', type: 'text', required: true },
                { name: 'author_organization', label: 'Author / Organization (if known)', type: 'text' },
                { name: 'website_name', label: 'Website Name', type: 'text', required: true },
                { name: 'url', label: 'URL', type: 'url', required: true },
                { name: 'date_published_updated', label: 'Date Published or Last Updated', type: 'date' },
                { name: 'access_date', label: 'Access Date (when you viewed it)', type: 'date', required: true },
                { name: 'publisher_hosting_institution', label: 'Publisher / Hosting Institution', type: 'text' },
                { name: 'language', label: 'Language', type: 'text', required: true }
            ]
        };
        return fields[type] || [];
    };

    const addBibliographyEntry = () => {
        const newEntry = {
            id: Date.now(),
            type: '',
            fields: {}
        };
        setData('bibliography_entries', [...(data.bibliography_entries || []), newEntry]);
    };

    const removeBibliographyEntry = (id) => {
        setData('bibliography_entries', data.bibliography_entries.filter(entry => entry.id !== id));
    };

    const updateBibliographyEntry = (id, field, value) => {
        const updatedEntries = data.bibliography_entries.map(entry => {
            if (entry.id === id) {
                if (field === 'type') {
                    return { ...entry, type: value, fields: {} };
                } else {
                    return { ...entry, fields: { ...entry.fields, [field]: value } };
                }
            }
            return entry;
        });
        setData('bibliography_entries', updatedEntries);
    };

    const renderBibliographyField = (field, entryId, value) => {
        const fieldValue = value || '';
        const key = `${entryId}-${field.name}`;

        if (field.type === 'select') {
            return (
                <select
                    key={key}
                    value={fieldValue}
                    onChange={(e) => updateBibliographyEntry(entryId, field.name, e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required={field.required}
                >
                    <option value="">Select {field.label}</option>
                    {field.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            );
        } else if (field.type === 'textarea') {
            return (
                <textarea
                    key={key}
                    value={fieldValue}
                    onChange={(e) => updateBibliographyEntry(entryId, field.name, e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    rows="3"
                    required={field.required}
                />
            );
        } else {
            return (
                <input
                    key={key}
                    type={field.type}
                    value={fieldValue}
                    onChange={(e) => updateBibliographyEntry(entryId, field.name, e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required={field.required}
                />
            );
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setData(name, type === "file" ? files[0] : value);
        // Reset LGA if state changes
        if (name === "state_of_origin") setData("lga", "");
    };

    const handleQuillChange = (field) => (value) => setData(field, value);

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
                                <h1 className="text-2xl font-bold">
                                    Add Biography
                                </h1>
                                <Link
                                    href={route("biographies.index")}
                                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded"
                                >
                                    Back
                                </Link>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label className="block font-medium">
                                        Name of Person's Biography
                                    </label>
                                    <p className="text-xs text-gray-500 mb-1">
                                        Enter real name of person as popularly known and called without title (e.g. Olusegun Obasanjo). 
                                        Full name and title should begin body of biography.
                                    </p>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
                                    {errors.name && (
                                        <div className="text-red-600 text-sm">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>

                                {/* Occupation */}
                                <div>
                                    <label className="block font-medium">
                                        Occupation
                                    </label>
                                    <select
                                        name="occupation"
                                        value={data.occupation}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    >
                                        <option value="">Select Occupation</option>
                                        {occupations.map(occupation => (
                                            <option key={occupation} value={occupation}>
                                                {occupation}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.occupation && (
                                        <div className="text-red-600 text-sm">
                                            {errors.occupation}
                                        </div>
                                    )}
                                </div>
                                {/* Date of Birth */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-medium">
                                            Date of Birth (Specific)
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
                                    <div>
                                        <label className="block font-medium">
                                            Date of Birth (Circa)
                                        </label>
                                        <div className="flex items-center">
                                            <span className="text-gray-500 mr-2">C.</span>
                                            <input
                                                type="text"
                                                name="date_of_birth_circa"
                                                value={data.date_of_birth_circa}
                                                onChange={handleChange}
                                                placeholder="1946"
                                                className="w-full border rounded px-3 py-2"
                                            />
                                        </div>
                                        {errors.date_of_birth_circa && (
                                            <div className="text-red-600 text-sm">
                                                {errors.date_of_birth_circa}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Date of Death */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-medium">
                                            Date of Death (Specific)
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
                                    <div>
                                        <label className="block font-medium">
                                            Date of Death (Circa)
                                        </label>
                                        <div className="flex items-center">
                                            <span className="text-gray-500 mr-2">C.</span>
                                            <input
                                                type="text"
                                                name="date_of_death_circa"
                                                value={data.date_of_death_circa}
                                                onChange={handleChange}
                                                placeholder="1998"
                                                className="w-full border rounded px-3 py-2"
                                            />
                                        </div>
                                        {errors.date_of_death_circa && (
                                            <div className="text-red-600 text-sm">
                                                {errors.date_of_death_circa}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* Geo-Political Zone */}
                                <div>
                                    <label className="block font-medium">
                                        Geo-Political Zone
                                    </label>
                                    <select
                                        name="geopolitical_zone"
                                        value={data.geopolitical_zone}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setData("state_of_origin", ""); // Reset state when zone changes
                                        }}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    >
                                        <option value="">Select Geo-Political Zone</option>
                                        {geopoliticalZones.map((zone) => (
                                            <option key={zone} value={zone}>
                                                {zone}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.geopolitical_zone && (
                                        <div className="text-red-600 text-sm">
                                            {errors.geopolitical_zone}
                                        </div>
                                    )}
                                </div>

                                {/* Region Selection */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Region *
                                        </label>
                                        <select
                                            value={data.region}
                                            onChange={(e) => {
                                                setData("region", e.target.value);
                                                setData("state_of_origin", ""); // Reset state when region changes
                                            }}
                                            className="w-full border rounded px-3 py-2"
                                            required
                                        >
                                            <option value="">Select Region</option>
                                            {Object.keys(regions).map((region) => (
                                                <option key={region} value={region}>
                                                    {region}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.region && (
                                            <div className="text-red-500 text-sm">
                                                {errors.region}
                                            </div>
                                        )}
                                    </div>

                                    {/* State Selection */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            State of Origin *
                                        </label>
                                        <select
                                            name="state_of_origin"
                                            value={data.state_of_origin}
                                            onChange={handleChange}
                                            className="w-full border rounded px-3 py-2"
                                            disabled={!data.geopolitical_zone}
                                            required
                                        >
                                            <option value="">Select State</option>
                                            {data.geopolitical_zone && statesByZone[data.geopolitical_zone]?.map((state) => (
                                                <option key={state} value={state}>
                                                    {state}
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
                                {/* Write Biography */}
                                <div>
                                    <label className="block font-medium mb-1">
                                        Write Biography
                                    </label>
                                    <p className="text-xs text-gray-500 mb-2">
                                        Maximum 1000 words. Only normal formatting allowed.
                                    </p>
                                    <ReactQuill
                                        value={data.biography}
                                        onChange={handleQuillChange("biography")}
                                        theme="snow"
                                        modules={{
                                            toolbar: [
                                                ['bold', 'italic', 'underline'],
                                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                                ['clean']
                                            ],
                                        }}
                                        formats={['bold', 'italic', 'underline', 'list', 'bullet']}
                                    />
                                    <div className="text-xs text-gray-500 mt-1">
                                        Word count: {data.biography.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length}/1000
                                    </div>
                                    {errors.biography && (
                                        <div className="text-red-600 text-sm">
                                            {errors.biography}
                                        </div>
                                    )}
                                </div>

                                {/* Bibliography Entries */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="block font-medium">
                                            Bibliography
                                        </label>
                                        <button
                                            type="button"
                                            onClick={addBibliographyEntry}
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        >
                                            + Add Bibliography Entry
                                        </button>
                                    </div>

                                    {data.bibliography_entries && data.bibliography_entries
                                        .sort((a, b) => {
                                            // Sort alphabetically by type first, then by title or main identifier
                                            const aTitle = a.fields.title || a.fields.title_of_article || a.fields.title_of_webpage_article || '';
                                            const bTitle = b.fields.title || b.fields.title_of_article || b.fields.title_of_webpage_article || '';
                                            if (a.type !== b.type) {
                                                return a.type.localeCompare(b.type);
                                            }
                                            return aTitle.localeCompare(bTitle);
                                        })
                                        .map((entry) => (
                                        <div key={entry.id} className="border rounded-lg p-4 mb-4 bg-gray-50">
                                            <div className="flex justify-between items-center mb-4">
                                                <h4 className="font-medium">Bibliography Entry</h4>
                                                <button
                                                    type="button"
                                                    onClick={() => removeBibliographyEntry(entry.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Remove
                                                </button>
                                            </div>

                                            {/* Source Type Selection */}
                                            <div className="mb-4">
                                                <label className="block font-medium mb-1">Source Type</label>
                                                <select
                                                    value={entry.type}
                                                    onChange={(e) => updateBibliographyEntry(entry.id, 'type', e.target.value)}
                                                    className="w-full border rounded px-3 py-2"
                                                    required
                                                >
                                                    <option value="">Select Source Type</option>
                                                    {bibliographyTypes.map(type => (
                                                        <option key={type} value={type}>{type}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Dynamic Fields Based on Source Type */}
                                            {entry.type && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {getBibliographyFields(entry.type).map(field => (
                                                        <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                                                            <label className="block font-medium mb-1">
                                                                {field.label} {field.required && <span className="text-red-500">*</span>}
                                                            </label>
                                                            {renderBibliographyField(field, entry.id, entry.fields[field.name])}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {(!data.bibliography_entries || data.bibliography_entries.length === 0) && (
                                        <p className="text-gray-500 text-center py-8">
                                            No bibliography entries added yet. Click "Add Bibliography Entry" to get started.
                                        </p>
                                    )}

                                    {errors.bibliography_entries && (
                                        <div className="text-red-600 text-sm">
                                            {errors.bibliography_entries}
                                        </div>
                                    )}
                                </div>

                                {/* How to Cite - Auto-generated */}
                                <div>
                                    <label className="block font-medium mb-1">
                                        How to Cite (Auto-generated)
                                    </label>
                                    <div className="w-full border rounded px-3 py-2 bg-gray-50">
                                        {data.name ? `${data.name}. Nigerian Dictionary of National Biography. Retrieved from [URL]` : 'Complete the name field to see citation format'}
                                    </div>
                                </div>
                                {/* Photo */}
                                <div>
                                    <label className="block font-medium">
                                        Photo
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                    {errors.image && (
                                        <div className="text-red-600 text-sm">
                                            {errors.image}
                                        </div>
                                    )}
                                </div>
                                {/* Education (dynamic) */}
                                <div>
                                    <label className="block font-medium">
                                        Education
                                    </label>
                                    {data.education && data.education.map((edu, idx) => (
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
                                                ...(data.education || []),
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
                                    {data.occupations && data.occupations.map((occ, idx) => (
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
                                                ...(data.occupations || []),
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
                                {/* How to Cite */}
                                <div>
                                    <label className="block font-medium mb-1">
                                        How to Cite
                                    </label>
                                    <ReactQuill
                                        value={data.how_to_cite}
                                        onChange={(value) =>
                                            setData("how_to_cite", value)
                                        }
                                        className="bg-white"
                                    />
                                    {errors.how_to_cite && (
                                        <div className="text-red-600 text-sm">
                                            {errors.how_to_cite}
                                        </div>
                                    )}
                                </div>
                                {/* References */}
                                <div>
                                    <label className="block font-medium mb-1">
                                        References
                                    </label>
                                    <ReactQuill
                                        value={data.references}
                                        onChange={(value) =>
                                            setData("references", value)
                                        }
                                        className="bg-white"
                                    />
                                    {errors.references && (
                                        <div className="text-red-600 text-sm">
                                            {errors.references}
                                        </div>
                                    )}
                                </div>
                                {/* Related Entries */}
                                <div>
                                    <label className="block font-medium">
                                        Related Entries
                                    </label>
                                    <Select
                                        isMulti
                                        name="related_entries"
                                        options={relatedOptions}
                                        value={relatedOptions.filter((opt) =>
                                            data.related_entries && data.related_entries.includes(
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
                                <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        // Save as draft
                                        post(route("biographies.save-draft"));
                                    }}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                    disabled={processing}
                                >
                                    Save
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        // Open preview modal or page
                                        window.open(route("biographies.preview"), '_blank');
                                    }}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Preview
                                </button>

                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    disabled={processing}
                                >
                                    {processing ? "Submitting..." : "Submit"}
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