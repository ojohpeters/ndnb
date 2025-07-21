import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { useRef, useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function Show({ biography, related_essays = [] }) {
    const {
        full_name,
        title,
        date_of_birth,
        place_of_birth,
        date_of_death,
        place_of_death,
        cause_of_death,
        state_of_origin,
        lga,
        ethnic_group,
        religion,
        language,
        region,
        biography: bioContent,
        photo,
        awards,
        workplaces,
        occupations,
        education,
        references,
        how_to_cite,
        creator
    } = biography;

    // Helper: format date
    const formatDate = (date) =>
        date
            ? new Date(date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
              })
            : "";

    // Calculate age at death if both dates are present
    let ageAtDeath = "";
    if (date_of_birth && date_of_death) {
        const dob = new Date(date_of_birth);
        const dod = new Date(date_of_death);
        ageAtDeath = dod.getFullYear() - dob.getFullYear();
        const m = dod.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && dod.getDate() < dob.getDate())) {
            ageAtDeath--;
        }
    }

    // Copy to clipboard for How to Cite
    const citeRef = useRef();
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        if (citeRef.current) {
            // Get plain text from HTML
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = how_to_cite;
            const text = tempDiv.innerText;
            navigator.clipboard.writeText(text).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            });
        }
    };

    return (
        <GuestLayout>
            <Head title={full_name} />

            <div className="mx-auto flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 max-w-7xl">
                {/* Main Content */}
                <article className="flex-1 order-2 lg:order-1">
                    <header className="mb-4 sm:mb-6">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                            {full_name}
                        </h1>
                        {(date_of_birth || date_of_death) && (
                            <h2 className="text-base sm:text-lg text-gray-600 mb-2">
                                {formatDate(date_of_birth)}
                                {date_of_birth && date_of_death ? " – " : ""}
                                {formatDate(date_of_death)}
                            </h2>
                        )}
                        {title && (
                            <div className="text-indigo-700 font-semibold mb-2 text-sm sm:text-base">
                                {title}
                            </div>
                        )}
                        <p className="text-sm sm:text-base">by <span className="font-bold">{creator.name}</span></p>
                    </header>

                    {/* Biography Content */}
                    {bioContent && (
                        <section className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mb-6 sm:mb-8">
                            <ReactMarkdown 
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {bioContent}
                            </ReactMarkdown>
                        </section>
                    )}

                    {/* References */}
                    <div className="my-6 sm:my-8 p-4 sm:p-6 rounded-lg border-l-4 border-green-700 bg-green-50 shadow">
                        <h2 className="font-bold text-green-800 mb-2 text-lg sm:text-xl">
                            References and Further Reading
                        </h2>
                        <section className="prose prose-sm sm:prose-base max-w-none">
                            <ReactMarkdown 
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {references}
                            </ReactMarkdown>
                        </section>
                    </div>

                    {/* How To Cite */}
                    <div className="my-6 sm:my-8 p-4 sm:p-6 rounded-lg border-l-4 border-indigo-700 bg-indigo-50 shadow relative">
                        <h2 className="font-bold text-indigo-800 mb-2 text-lg sm:text-xl">
                            How To Cite
                        </h2>
                        <section
                            ref={citeRef}
                            className="prose prose-sm sm:prose-base max-w-none"
                        >
                            <ReactMarkdown 
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {how_to_cite}
                            </ReactMarkdown>
                        </section>
                        <button
                            onClick={handleCopy}
                            className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-indigo-600 text-white px-2 sm:px-3 py-1 rounded hover:bg-indigo-700 transition text-xs sm:text-sm"
                        >
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>

                    {/* Related Entries as pills */}
                    {biography.related_biographies &&
                        biography.related_biographies.length > 0 && (
                            <div className="mt-4 sm:mt-6">
                                <h3 className="font-semibold mb-2 text-sm sm:text-base">
                                    Related Entries
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {biography.related_biographies.map((rel) => (
                                        <Link
                                            key={rel.id}
                                            href={route(
                                                "biographies.show",
                                                rel.slug
                                            )}
                                            className="inline-block px-3 sm:px-4 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs sm:text-sm font-medium hover:bg-indigo-200 transition"
                                        >
                                            {rel.full_name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                </article>

                {/* Aside: Life Summary */}
                <aside className="w-full lg:w-1/3 bg-gray-50 border rounded p-4 sm:p-6 order-1 lg:order-2">
                    {photo && (
                        <>
                            <img
                                src={
                                    photo.startsWith("http")
                                        ? photo
                                        : `/storage/${photo}`
                                }
                                alt={full_name}
                                className="w-full object-cover rounded shadow mb-2"
                            />
                            <p className="mb-4 sm:mb-6 text-center italic text-gray-600 text-sm">
                                {full_name}
                            </p>
                        </>
                    )}
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Life Summary</h3>
                    <dl className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                        {(date_of_birth || lga || state_of_origin) && (
                            <>
                                <dt className="font-semibold">Birth</dt>
                                <dd className="ml-2 text-gray-700">
                                    {formatDate(date_of_birth)}
                                    {place_of_birth && (
                                        <>
                                            {date_of_birth ? ", " : ""}
                                            {[place_of_birth]
                                                .filter(Boolean)
                                                .join(", ")}
                                        </>
                                    )}
                                </dd>
                            </>
                        )}
                        {(date_of_death || ageAtDeath) && (
                            <>
                                <dt className="font-semibold">Death</dt>
                                <dd className="ml-2 text-gray-700">
                                    {formatDate(date_of_death)}
                                    {ageAtDeath && <> (aged {ageAtDeath})</>}
                                    {place_of_death && (
                                        <>
                                            {date_of_death ? ", " : ""}
                                            {[place_of_death]
                                                .filter(Boolean)
                                                .join(", ")}
                                        </>
                                    )}
                                </dd>
                            </>
                        )}
                        {cause_of_death && (
                            <>
                                <dt className="font-semibold">
                                    Cause of Death
                                </dt>
                                <dd className="ml-2 text-gray-700">
                                    {cause_of_death}
                                </dd>
                            </>
                        )}
                        {ethnic_group && (
                            <>
                                <dt className="font-semibold">
                                    Cultural Heritage
                                </dt>
                                <dd className="ml-2 text-gray-700">
                                    {ethnic_group}
                                </dd>
                            </>
                        )}
                        {religion && (
                            <>
                                <dt className="font-semibold">
                                    Religious Influence
                                </dt>
                                <dd className="ml-2 text-gray-700">
                                    {religion}
                                </dd>
                            </>
                        )}
                        {language && (
                            <>
                                <dt className="font-semibold">Language</dt>
                                <dd className="ml-2 text-gray-700">
                                    {language}
                                </dd>
                            </>
                        )}
                        {region && (
                            <>
                                <dt className="font-semibold">Region</dt>
                                <dd className="ml-2 text-gray-700">{region}</dd>
                            </>
                        )}
                        {education && education.length > 0 && (
                            <>
                                <dt className="font-semibold">Education</dt>
                                <dd className="ml-2 text-gray-700">
                                    <ul className="list-disc list-inside space-y-1">
                                        {education.map((school, idx) => (
                                            <li key={school.id || idx} className="text-sm">
                                                {school.institution_name}
                                                {school.location &&
                                                    `, ${school.location}`}
                                                {school.start_date &&
                                                    ` (${school.start_date}`}
                                                {school.end_date &&
                                                    ` - ${school.end_date})`}
                                                {school.notes && (
                                                    <div className="mt-1 prose prose-sm max-w-none">
                                                        <ReactMarkdown 
                                                            remarkPlugins={[remarkGfm]}
                                                            rehypePlugins={[rehypeRaw]}
                                                        >
                                                            {school.notes}
                                                        </ReactMarkdown>
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </dd>
                            </>
                        )}
                        {occupations && occupations.length > 0 && (
                            <>
                                <dt className="font-semibold">Occupations</dt>
                                <dd className="ml-2 text-gray-700">
                                    <ul className="list-disc list-inside space-y-2">
                                        {occupations.map((occ, idx) => (
                                            <li key={occ.id || idx} className="text-sm">
                                                {occ.title}
                                                {occ.start_date &&
                                                    ` (${occ.start_date}`}
                                                {occ.end_date &&
                                                    ` - ${occ.end_date})`}
                                                {occ.description && (
                                                    <div className="mt-1 prose prose-sm max-w-none">
                                                        <ReactMarkdown 
                                                            remarkPlugins={[remarkGfm]}
                                                            rehypePlugins={[rehypeRaw]}
                                                        >
                                                            {occ.description}
                                                        </ReactMarkdown>
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </dd>
                            </>
                        )}
                    </dl>
                </aside>
            </div>
        </GuestLayout>
    );
}