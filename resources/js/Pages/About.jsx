import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

export default function About() {
    return (
        <GuestLayout>
            <Head title="About NDNB" />
            <div className="max-w-3xl mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold mb-6 text-green-800">About the NDNB</h1>
                <p className="mb-4 text-gray-700">
                    The <strong>Nigerian Dictionary of National Biography (NDNB)</strong> is Nigeria’s leading resource for national biography. Our mission is to document, preserve, and share the stories of significant and representative individuals who have shaped Nigerian history, culture, and society.
                </p>
                <p className="mb-4 text-gray-700">
                    The NDNB features concise, informative, and fascinating descriptions of the lives of notable Nigerians from all walks of life—leaders, thinkers, artists, scientists, activists, and more. Each entry is carefully researched and referenced, providing a reliable resource for students, researchers, and the general public.
                </p>
                <p className="mb-4 text-gray-700">
                    The NDNB is produced by the{" "}
                    <a
                        href="https://instituteforhistoricalstudies.org"
                        className="text-green-700 font-semibold underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Institute for Historical Studies, Biographical Research, Documentation and Legacy (IHS-BIRD & L)
                    </a>
                    . Our editorial team is committed to maintaining high standards of accuracy, inclusivity, and accessibility.
                </p>
                <h2 className="text-2xl font-bold mt-8 mb-2 text-green-800">Our Vision</h2>
                <p className="mb-4 text-gray-700">
                    We envision a comprehensive, living archive that celebrates Nigeria’s diversity and honors the contributions of its people, past and present.
                </p>
                <h2 className="text-2xl font-bold mt-8 mb-2 text-green-800">Get Involved</h2>
                <p className="mb-4 text-gray-700">
                    The NDNB is a collaborative project. We welcome contributions from researchers, historians, and members of the public. If you would like to suggest a biography or help expand our collection, please visit our <a href="/contact-us" className="text-green-700 underline">Contact</a> page.
                </p>
                <h2 className="text-2xl font-bold mt-8 mb-2 text-green-800">Contact</h2>
                <p className="mb-4 text-gray-700">
                    For inquiries, suggestions, or partnership opportunities, please <a href="/contact-us" className="text-green-700 underline">contact us</a>.
                </p>
            </div>
        </GuestLayout>
    );
}