import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";

export default function Welcome({ latestBiography, latestBiographies, bornThisDay }) {
    console.log(latestBiography);
    return (
        <>
            <GuestLayout>
                <Head title="Home" />
                <div
                    id="pageContent"
                    className="flex flex-col lg:flex-row gap-8 p-6 bg-green-50 text-gray-800"
                >
                    {/* Main Column */}
                    <div id="homeColumnMain" className="flex-1 space-y-4">
                        <p>
                            The{" "}
                            <em>Nigerian Dictionary of National Biography</em>{" "}
                            is Nigeria's leading resource for national
                            biography. It features concise, informative, and
                            fascinating descriptions of the lives of significant
                            and representative persons in Nigerian history.
                        </p>
                        <p>
                            <strong>
                                <Link
                                    href="#"
                                    className="text-green-700 underline"
                                >
                                    See what notable Nigerians are saying about
                                    the NDNB.
                                </Link>
                            </strong>
                        </p>
                        <p>
                            The <em>NDNB</em> is produced by the&nbsp;
                            <a
                                href="https://instituteforhistoricalstudies.org"
                                className="text-green-700 font-semibold underline"
                            >
                                Institute for Historical Studies, Biographical
                                Research, Documentation and Legacy (IHS-BIRD &
                                L)
                            </a>
                        </p>
                        <hr />
                        {latestBiography && (
                            <div className="rounded border border-gray-300 bg-green-100 p-4">
                                <h3 className="text-xl text-green-800 text-center font-bold">
                                    New Biography Added!
                                </h3>
                                {latestBiography.photo && (
                                    <img
                                        src={
                                            latestBiography.photo.startsWith(
                                                "http"
                                            )
                                                ? latestBiography.photo
                                                : `/storage/${latestBiography.photo}`
                                        }
                                        alt={latestBiography.full_name}
                                        className="mb-2 object-cover rounded w-full"
                                        
                                    />
                                )}
                                <p>
                                    <strong>{latestBiography.full_name}</strong>
                                    {latestBiography.launched_on && (
                                        <>
                                            {" "}
                                            (Launched:{" "}
                                            {new Date(
                                                latestBiography.launched_on
                                            ).toLocaleDateString()}
                                            )
                                        </>
                                    )}
                                </p>
                                <div
                                    className="prose max-w-none mb-2"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            latestBiography.biography?.slice(
                                                0,
                                                300
                                            ) +
                                            (latestBiography.biography?.length >
                                            300
                                                ? "..."
                                                : ""),
                                    }}
                                />
                                <div className="flex justify-end">
                                    <Link
                                        href={route(
                                            "biographies.show",
                                            latestBiography.slug
                                        )}
                                        className="no-underline text-gray-800"
                                    >
                                        <div className="mt-2 inline-block rounded border border-black px-4 py-2 bg-white hover:bg-gray-100">
                                            <b>Explore</b>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )}
                        {!latestBiography && (
                            <div className="rounded border border-gray-300 bg-green-100 p-4 text-center text-green-800">
                                No biographies written yet.
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div
                        id="homeColumnSidebar"
                        className="w-full lg:w-1/3 space-y-6"
                    >
                        <div className="p-4 bg-white rounded shadow sidebarBoxNews">
                            <h5 className="text-lg font-semibold text-green-800">
                                What’s New
                            </h5>
                            <div>
                                {latestBiographies.map((biography) => (
                                    <div key={biography.id}>
                                        <h5 className="font-medium">
                                            {biography.created_at.split("T")[0]}
                                        </h5>
                                        <h4 className="mb-2">
                                            <Link
                                                href={route('biographies.show', biography.slug)}
                                                className="text-green-700 underline"
                                            >
                                                {biography.full_name}
                                            </Link>
                                        </h4>
                                        {/* <p>
                                            New entries April 2025{" "}
                                            <Link
                                                href="/news/?news=79"
                                                className="underline"
                                            >
                                                Read more ...
                                            </Link>
                                        </p> */}
                                    </div>
                                ))}
                            </div>
                            <h5 className="mt-4 text-green-800 font-semibold">
                                <Link href="/biographies/all" className="underline">
                                    All Biographies
                                </Link>
                            </h5>
                        </div>

                        <div className="p-4 bg-white rounded shadow sidebarBox01">
                            <h5 className="text-lg font-semibold text-green-800">
                                Born This Day
                            </h5>
                            {bornThisDay && bornThisDay.length > 0 ? (
                        bornThisDay.map((bio) => (
                            <div key={bio.id} className="mb-4">
                                <h3 className="text-xl font-bold">
                                    {bio.full_name}
                                    {bio.date_of_birth && (
                                        <> ({bio.date_of_birth.split('-')[0]}–{bio.date_of_death ? bio.date_of_death.split('-')[0] : ""})</>
                                    )}
                                </h3>
                                {bio.photo && (
                                    <img
                                        src={bio.photo.startsWith("http") ? bio.photo : `/storage/${bio.photo}`}
                                        width="67"
                                        height="88"
                                        alt={bio.full_name}
                                        className="mb-2"
                                    />
                                )}
                                <p>
                                    {bio.biography
                                        ? bio.biography.replace(/<[^>]+>/g, '').slice(0, 120) + (bio.biography.length > 120 ? "..." : "")
                                        : ""}
                                </p>
                                <h5 className="text-green-700 font-semibold mt-2">
                                    <Link
                                        href={route("biographies.show", bio.slug)}
                                        className="underline"
                                    >
                                        Read more
                                    </Link>
                                </h5>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500">No notable birthdays today.</div>
                    )}
                            <p>
                                <strong>
                                    <Link
                                        href="/biographies"
                                        className="text-green-700 underline"
                                    >
                                        See Biographies
                                    </Link>
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </>
    );
}
