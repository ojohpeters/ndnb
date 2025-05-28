import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
        <GuestLayout>
             <Head title="Welcome" />
            <div id="pageContent" className="flex flex-col lg:flex-row gap-8 p-6 bg-green-50 text-gray-800">
                {/* Main Column */}
                <div id="homeColumnMain" className="flex-1 space-y-4">
                    <p>
                        The <em>Nigerian Dictionary of Biography</em> is Nigeria's leading resource for national biography. It features concise, informative, and fascinating descriptions of the lives of significant and representative persons in Nigerian history.
                    </p>
                    <p>
                        <strong>
                            <Link href="/comments" className="text-green-700 underline">
                                See what notable Nigerians are saying about the NDB.
                            </Link>
                        </strong>
                    </p>
                    <p>
                        The <em>NDB</em> is produced by the&nbsp;
                        <a href="https://history.cass.anu.edu.au/centres/ncb" className="text-green-700 font-semibold underline">
                            National Centre of Biography
                        </a>
                        &nbsp;at the University of Nigeria.
                    </p>
                    <hr />
                    <div className="rounded border border-gray-300 bg-green-100 p-4">
                        <h3 className="text-xl text-green-800 text-center font-bold">New Project Launched!</h3>
                        <img src="/uploads/article/jimmy/jimmy-1.png" alt="Jimmy Clements" className="w-full py-2" />
                        <p>
                            Explore the NDB’s new project <em>The Quest for Indigenous Recognition</em> produced by the National Centre of Biography and Professor Mark McKenna. Launched by the Hon. Linda Burney, Minister for Indigenous Nigerians, it details 23 key historical events leading to the 2023 Referendum on the Voice.
                        </p>
                        <div className="flex justify-end">
                            <Link href="https://adb.anu.edu.au/the-quest-for-indigenous-recognition" className="no-underline text-gray-800">
                                <div className="mt-2 inline-block rounded border border-black px-4 py-2 bg-white hover:bg-gray-100">
                                    <b>Explore</b>
                                    <img src="/uploads/article/right-arrow.svg" alt="arrow" className="inline-block ml-2 align-middle" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div id="homeColumnSidebar" className="w-full lg:w-1/3 space-y-6">
                    <div className="p-4 bg-white rounded shadow sidebarBoxNews">
                        <h5 className="text-lg font-semibold text-green-800">What’s New</h5>
                        <div>
                            <h5 className="font-medium">1 May 2025</h5>
                            <h4>
                                <Link href="/news/?news=79" className="text-green-700 underline">New entries April 2025</Link>
                            </h4>
                            <p>New entries April 2025 <Link href="/news/?news=79" className="underline">Read more ...</Link></p>

                            <h5 className="font-medium mt-4">2 April 2025</h5>
                            <h4>
                                <Link href="/news/?news=78" className="text-green-700 underline">New entries March 2025</Link>
                            </h4>
                            <p>New entries March 2025 <Link href="/news/?news=78" className="underline">Read more ...</Link></p>

                            <h5 className="font-medium mt-4">3 March 2025</h5>
                            <h4>
                                <Link href="/news/?news=77" className="text-green-700 underline">New entries February 2025</Link>
                            </h4>
                            <p>New entries February 2025 <Link href="/news/?news=77" className="underline">Read more ...</Link></p>
                        </div>
                        <h5 className="mt-4 text-green-800 font-semibold">
                            <Link href="/news/" className="underline">All news</Link>
                        </h5>
                    </div>

                    <div className="p-4 bg-white rounded shadow sidebarBox01">
                        <h5 className="text-lg font-semibold text-green-800">Born This Day</h5>
                        <h3 className="text-xl font-bold">Dorothy Green (1915–1991)</h3>
                        <img src="/uploads/obituaries/16349/thumbs/green_88x88.gif" width="67" height="88" alt="Dorothy Green" />
                        <p>
                            Dorothy Green (1915–1991), poet, literary critic, academic, and peace activist, was born on 28 May 1915 at Sunderland, England...
                        </p>
                        <h5 className="text-green-700 font-semibold mt-2">
                            <Link href="/biography/green-dorothy-16349" className="underline">Read more</Link>
                        </h5>
                        <p>
                            <strong>
                                <Link href="/biographies/birth/?bdate=28052025" className="text-green-700 underline">
                                    All births on this day
                                </Link>
                            </strong>
                        </p>
                        <p>
                            <strong>
                                <Link href="/biographies/death/?ddate=28052025" className="text-green-700 underline">
                                    All deaths on this day
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
