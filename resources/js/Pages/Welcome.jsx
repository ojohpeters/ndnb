import { Link, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Welcome() {
    return (
        <GuestLayout>
            <Head title="Welcome to NDNB" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">
                            Welcome to the Nigerian Dictionary of National Biography
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Preserving the stories of Nigeria's most influential figures
                        </p>
                        <div className="space-x-4">
                            <Link
                                href="/biographies"
                                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
                            >
                                Explore Biographies
                            </Link>
                            <Link
                                href="/about-us"
                                className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition duration-300"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}