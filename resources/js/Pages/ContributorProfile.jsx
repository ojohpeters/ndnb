
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function ContributorProfile({ auth, profile = null }) {
    const { data, setData, post, put, processing, errors } = useForm({
        bio: profile?.bio || '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (profile) {
            put(route('contributor-profile.update'));
        } else {
            post(route('contributor-profile.store'));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Contributor's Profile
                </h2>
            }
        >
            <Head title="Contributor's Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <h3 className="text-lg font-medium mb-2">Write a bio of yourself using the sample below.</h3>
                                <p className="text-sm text-gray-600 mb-4">Limit the word count to 100 words.</p>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="bio" value="Your Biography" />
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        value={data.bio}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        rows="6"
                                        maxLength="500"
                                        onChange={(e) => setData('bio', e.target.value)}
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        {data.bio.length}/500 characters
                                    </p>
                                    <InputError message={errors.bio} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end">
                                    <PrimaryButton disabled={processing}>
                                        {profile ? 'Update Profile' : 'Create Profile'}
                                    </PrimaryButton>
                                </div>
                            </form>

                            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium mb-2">Sample:</h4>
                                <p className="text-sm text-gray-700">
                                    Amaka Nwosu is a Nigerian journalist and historian with a focus on post-independence political figures. She holds a degree in History from the University of Ibadan and has written for national newspapers and academic platforms. Her work explores the legacy of overlooked reformers and grassroots leaders. Amaka is committed to documenting Nigeria's evolving civic landscape through verified, accessible storytelling.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
