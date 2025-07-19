
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        middle_name: '',
        last_name: '',
        username: '',
        sex: '',
        email: '',
        phone_number: '',
        educational_status: '',
        area_of_study: '',
        level_of_study: '',
        state_of_origin: '',
        lga_of_origin: '',
        state_of_residence: '',
        lga_of_residence: '',
        ethnicity: '',
        country_of_residence: '',
        password: '',
        password_confirmation: '',
    });

    const [isNigerianResident, setIsNigerianResident] = useState(true);
    const [showEthnicity, setShowEthnicity] = useState(true);
    const [showLGAOrigin, setShowLGAOrigin] = useState(true);

    const nigerianStates = [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
        'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
        'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
        'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
        'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
    ];

    const countries = [
        'Nigeria', 'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
        'Bangladesh', 'Belgium', 'Brazil', 'Canada', 'China', 'Egypt', 'France', 'Germany',
        'Ghana', 'India', 'Indonesia', 'Italy', 'Japan', 'Kenya', 'Malaysia', 'Mexico',
        'Netherlands', 'Pakistan', 'Philippines', 'Russia', 'Saudi Arabia', 'South Africa',
        'South Korea', 'Spain', 'Thailand', 'Turkey', 'Ukraine', 'United Kingdom',
        'United States', 'Vietnam'
    ];

    const areasOfStudy = [
        'Administration', 'Agriculture', 'Arts & Humanities', 'Education',
        'Engineering / Technology', 'Environmental', 'Law',
        'Medical / Pharmaceutical / Health Sciences', 'Sciences',
        'Social & Management Sciences'
    ];

    const levelsOfStudy = ['NCE', 'ND', 'HND', 'Bachelors', 'Masters', 'PhD'];

    useEffect(() => {
        if (data.country_of_residence === 'Nigeria') {
            setIsNigerianResident(true);
            setShowEthnicity(true);
            setShowLGAOrigin(true);
        } else if (data.country_of_residence && data.country_of_residence !== 'Nigeria') {
            setIsNigerianResident(false);
            setShowEthnicity(false);
            setShowLGAOrigin(false);
            setData(prevData => ({
                ...prevData,
                state_of_residence: '',
                lga_of_residence: '',
                lga_of_origin: '',
                ethnicity: ''
            }));
        }
    }, [data.country_of_residence]);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Sign Up" />

            <div className="max-w-4xl mx-auto">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Please ensure all information provided in this form is accurate, as it will be used for recruitment in our upcoming projects across other areas of interest.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <InputLabel htmlFor="first_name" value="First Name *" />
                            <TextInput
                                id="first_name"
                                name="first_name"
                                value={data.first_name}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('first_name', e.target.value)}
                                required
                            />
                            <InputError message={errors.first_name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="middle_name" value="Middle Name" />
                            <TextInput
                                id="middle_name"
                                name="middle_name"
                                value={data.middle_name}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('middle_name', e.target.value)}
                            />
                            <InputError message={errors.middle_name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="last_name" value="Last Name *" />
                            <TextInput
                                id="last_name"
                                name="last_name"
                                value={data.last_name}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('last_name', e.target.value)}
                                required
                            />
                            <InputError message={errors.last_name} className="mt-2" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">Write name exactly as you would want to be on byline</p>

                    {/* Username */}
                    <div>
                        <InputLabel htmlFor="username" value="Username (Should be unique and used for login) *" />
                        <TextInput
                            id="username"
                            name="username"
                            value={data.username}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('username', e.target.value)}
                            required
                        />
                        <InputError message={errors.username} className="mt-2" />
                    </div>

                    {/* Sex */}
                    <div>
                        <InputLabel htmlFor="sex" value="Sex *" />
                        <select
                            id="sex"
                            name="sex"
                            value={data.sex}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => setData('sex', e.target.value)}
                            required
                        >
                            <option value="">Select Sex</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <InputError message={errors.sex} className="mt-2" />
                    </div>

                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value="Email (must be unique) *" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <InputLabel htmlFor="phone_number" value="Phone Number (unique) *" />
                        <TextInput
                            id="phone_number"
                            type="tel"
                            name="phone_number"
                            value={data.phone_number}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('phone_number', e.target.value)}
                            required
                        />
                        <InputError message={errors.phone_number} className="mt-2" />
                    </div>

                    {/* Educational Status */}
                    <div>
                        <InputLabel htmlFor="educational_status" value="Educational Status *" />
                        <select
                            id="educational_status"
                            name="educational_status"
                            value={data.educational_status}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => setData('educational_status', e.target.value)}
                            required
                        >
                            <option value="">Select Educational Status</option>
                            <option value="Student">Student</option>
                            <option value="Graduate">Graduate</option>
                        </select>
                        <InputError message={errors.educational_status} className="mt-2" />
                    </div>

                    {/* Area of Study */}
                    <div>
                        <InputLabel htmlFor="area_of_study" value="Area of Study *" />
                        <select
                            id="area_of_study"
                            name="area_of_study"
                            value={data.area_of_study}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => setData('area_of_study', e.target.value)}
                            required
                        >
                            <option value="">Select Area of Study</option>
                            {areasOfStudy.map((area) => (
                                <option key={area} value={area}>{area}</option>
                            ))}
                        </select>
                        <InputError message={errors.area_of_study} className="mt-2" />
                    </div>

                    {/* Level of Study */}
                    <div>
                        <InputLabel htmlFor="level_of_study" value="Level of Study *" />
                        <select
                            id="level_of_study"
                            name="level_of_study"
                            value={data.level_of_study}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => setData('level_of_study', e.target.value)}
                            required
                        >
                            <option value="">Select Level of Study</option>
                            {levelsOfStudy.map((level) => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                        <InputError message={errors.level_of_study} className="mt-2" />
                    </div>

                    {/* Country of Residence */}
                    <div>
                        <InputLabel htmlFor="country_of_residence" value="Country of Residence *" />
                        <select
                            id="country_of_residence"
                            name="country_of_residence"
                            value={data.country_of_residence}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => setData('country_of_residence', e.target.value)}
                            required
                        >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                        <InputError message={errors.country_of_residence} className="mt-2" />
                    </div>

                    {/* State of Origin */}
                    <div>
                        <InputLabel htmlFor="state_of_origin" value="State of Origin *" />
                        <select
                            id="state_of_origin"
                            name="state_of_origin"
                            value={data.state_of_origin}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => setData('state_of_origin', e.target.value)}
                            required
                        >
                            <option value="">Select State of Origin</option>
                            {nigerianStates.map((state) => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                        <InputError message={errors.state_of_origin} className="mt-2" />
                    </div>

                    {/* LGA of Origin */}
                    {showLGAOrigin && (
                        <div>
                            <InputLabel htmlFor="lga_of_origin" value="LGA of Origin *" />
                            <TextInput
                                id="lga_of_origin"
                                name="lga_of_origin"
                                value={data.lga_of_origin}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('lga_of_origin', e.target.value)}
                                required={showLGAOrigin}
                            />
                            <InputError message={errors.lga_of_origin} className="mt-2" />
                        </div>
                    )}

                    {/* State of Residence (only if Nigerian resident) */}
                    {isNigerianResident && (
                        <div>
                            <InputLabel htmlFor="state_of_residence" value="State of Residence *" />
                            <select
                                id="state_of_residence"
                                name="state_of_residence"
                                value={data.state_of_residence}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                onChange={(e) => setData('state_of_residence', e.target.value)}
                                required={isNigerianResident}
                            >
                                <option value="">Select State of Residence</option>
                                {nigerianStates.map((state) => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                            <InputError message={errors.state_of_residence} className="mt-2" />
                        </div>
                    )}

                    {/* LGA of Residence (only if Nigerian resident) */}
                    {isNigerianResident && (
                        <div>
                            <InputLabel htmlFor="lga_of_residence" value="LGA of Residence *" />
                            <TextInput
                                id="lga_of_residence"
                                name="lga_of_residence"
                                value={data.lga_of_residence}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('lga_of_residence', e.target.value)}
                                required={isNigerianResident}
                            />
                            <InputError message={errors.lga_of_residence} className="mt-2" />
                        </div>
                    )}

                    {/* Ethnicity */}
                    {showEthnicity && (
                        <div>
                            <InputLabel htmlFor="ethnicity" value="Ethnicity *" />
                            <TextInput
                                id="ethnicity"
                                name="ethnicity"
                                value={data.ethnicity}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('ethnicity', e.target.value)}
                                required={showEthnicity}
                            />
                            <InputError message={errors.ethnicity} className="mt-2" />
                        </div>
                    )}

                    {/* Password */}
                    <div>
                        <InputLabel htmlFor="password" value="Password *" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password *" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between">
                        <Link
                            href={route('login')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Already registered?
                        </Link>

                        <PrimaryButton disabled={processing}>
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
