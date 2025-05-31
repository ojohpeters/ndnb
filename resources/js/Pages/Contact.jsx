import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

export default function Contact() {
    const { flash, errors, success } = usePage().props;
    const { data, setData, post, processing, reset } = useForm({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("contact.submit"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <GuestLayout>
            <Head title="Contact & Contribute" />
            <div className="max-w-3xl mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold mb-6 text-green-800">Contact Us</h1>
                <p className="mb-8 text-gray-700">
                    Have a question, suggestion, or want to contribute a biography? Fill out the form below or read the instructions on how to contribute.
                </p>

                <div className="bg-white rounded shadow p-6 mb-10">
                    {flash.success && (
                        <div className="text-green-700 font-semibold text-center mb-4">
                            {flash.success}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block font-medium mb-1" htmlFor="name">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={data.name}
                                onChange={e => setData("name", e.target.value)}
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.name && (
                                <div className="text-red-600 text-sm">{errors.name}</div>
                            )}
                        </div>
                        <div>
                            <label className="block font-medium mb-1" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={e => setData("email", e.target.value)}
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.email && (
                                <div className="text-red-600 text-sm">{errors.email}</div>
                            )}
                        </div>
                        <div>
                            <label className="block font-medium mb-1" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={data.message}
                                onChange={e => setData("message", e.target.value)}
                                required
                                rows={5}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.message && (
                                <div className="text-red-600 text-sm">{errors.message}</div>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
                        >
                            {processing ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>

                <div className="bg-green-50 border-l-4 border-green-700 p-6 rounded">
                    <h2 className="text-2xl font-bold mb-2 text-green-800">How to Contribute a Biography</h2>
                    <ol className="list-decimal list-inside text-gray-800 space-y-2">
                        <li>
                            <strong>Prepare your biography:</strong> Write a concise and factual account of the person's life, including full name, dates, achievements, and sources.
                        </li>
                        <li>
                            <strong>Include references:</strong> List books, articles, or websites that support your submission.
                        </li>
                        <li>
                            <strong>Submit via this form:</strong> Use the message box above to send your draft or express your interest in contributing.
                        </li>
                        <li>
                            <strong>Editorial review:</strong> Our editorial team will review your submission and may contact you for clarification or additional information.
                        </li>
                        <li>
                            <strong>Publication:</strong> Once approved, your contribution will be published and credited appropriately.
                        </li>
                    </ol>
                </div>
            </div>
        </GuestLayout>
    );
}