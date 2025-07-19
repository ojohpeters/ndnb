
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

export default function FAQ() {
    const faqs = [
        {
            question: "What is the NDNB?",
            answer: "The Nigerian Dictionary of National Biography (NDNB) is a scholarly and authoritative reference work dedicated to preserving and presenting the lives of individuals whose achievements and legacies have significantly shaped Nigeria's development and identity. It provides inclusive, well-documented biographies of both living and deceased individuals, reflecting Nigeria's historical diversity and societal complexity. Inspired by global models like the Biographical Dictionary of America, NDNB is uniquely adapted to the Nigerian context."
        },
        {
            question: "Who is eligible to be included in the NDNB?",
            answer: "To be included in the NDNB, an individual must meet specific criteria including national identity and relevance, significant public contribution, legacy and historical significance. The person must be a Nigerian citizen by birth or naturalization, or of Nigerian descent with substantial impact on Nigerian life, or a non-Nigerian whose work had transformative impact on Nigerian society."
        },
        {
            question: "What are the eligible fields for inclusion?",
            answer: "The NDNB recognizes contributions across diverse fields including Agriculture, Banking & Finance, Business & Entrepreneurship, Civil Society & Activism, Diplomacy, Education & Academia, Government & Public Administration, Information Technology, Judiciary & Legal Reform, Literature & Arts, Media & Journalism, Medicine & Healthcare, Military & Security, Religious Leadership, Science & Engineering, Sports, Traditional Institutions, and many others."
        },
        {
            question: "What editorial standards are applied to NDNB entries?",
            answer: "The NDNB adheres to strict scholarly standards including documentation and scholarship (all biographies must be factual, referenced, and based on verifiable sources), non-partisan balanced representation, and diversity and inclusion with gender balance, ethnic and regional diversity, and inclusion of historically marginalized groups."
        },
        {
            question: "Who can contribute to the NDNB?",
            answer: "The NDNB is an open, curated platform. Contributors may include historians, researchers, academics, journalists, biographers, writers, graduate students, professionals in related fields, and community members with verifiable local or cultural knowledge. All contributions are reviewed editorially to ensure accuracy and relevance."
        },
        {
            question: "What is the purpose of the NDNB?",
            answer: "The NDNB serves as a national reference resource for schools, libraries, universities, and researchers; a repository of collective memory preserving stories of individuals who built, shaped, or transformed Nigeria; and a tool for civic and cultural education, helping future generations understand the lives that define the Nigerian experience."
        },
        {
            question: "Can living persons be included in the NDNB?",
            answer: "Yes, both living and deceased persons may be included in the NDNB. However, living individuals must have already established an enduring legacy that meets the criteria for inclusion."
        },
        {
            question: "How does the NDNB ensure diversity and inclusion?",
            answer: "The NDNB prioritizes gender balance in representation, ethnic and regional diversity, and inclusion of historically marginalized or underrepresented groups and professions. This ensures a comprehensive and inclusive portrayal of Nigeria's rich heritage."
        }
    ];

    return (
        <GuestLayout>
            <Head title="Frequently Asked Questions" />
            
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-lg text-gray-600">
                            Get answers to common questions about the Nigerian Dictionary of National Biography
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg">
                        <div className="divide-y divide-gray-200">
                            {faqs.map((faq, index) => (
                                <div key={index} className="p-6">
                                    <h3 className="text-xl font-semibold text-green-800 mb-3">
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-green-800 mb-2">
                                Have more questions?
                            </h3>
                            <p className="text-green-700 mb-4">
                                If you have additional questions or would like to contribute to the NDNB, please don't hesitate to reach out.
                            </p>
                            <a
                                href="/contact-us"
                                className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
