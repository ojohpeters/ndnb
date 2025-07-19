
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, stats = {} }) {
    const user = auth.user;
    const userRoles = user.roles || [];
    const isEditor = userRoles.some(role => role.name === 'editor');
    const isCopyEditor = userRoles.some(role => role.name === 'copy-editor');
    const isEditorInChief = userRoles.some(role => role.name === 'editor-in-chief');
    const isContributor = !isEditor && !isCopyEditor && !isEditorInChief;

    const getDashboardTitle = () => {
        if (isEditorInChief) return "Editor-in-Chief Dashboard";
        if (isEditor) return "Editor Dashboard";
        if (isCopyEditor) return "Copy Editor Dashboard";
        return "Contributor Dashboard";
    };

    const getDashboardDescription = () => {
        if (isEditorInChief) return "Manage final reviews and publications";
        if (isEditor) return "Review and approve submitted biographies";
        if (isCopyEditor) return "Review grammar, style, and formatting";
        return "Create and manage your biography submissions";
    };

    const getQuickActions = () => {
        if (isEditorInChief) {
            return [
                {
                    title: "Review Submissions",
                    description: "Final review before publication",
                    href: route('editor-in-chief.dashboard'),
                    icon: "📝",
                    color: "bg-purple-600 hover:bg-purple-700"
                },
                {
                    title: "Published Biographies",
                    description: "View all published content",
                    href: route('biographies.all'),
                    icon: "📚",
                    color: "bg-green-600 hover:bg-green-700"
                }
            ];
        }
        
        if (isEditor) {
            return [
                {
                    title: "Editor Dashboard",
                    description: "Review submitted biographies",
                    href: route('editor.dashboard'),
                    icon: "👨‍💼",
                    color: "bg-blue-600 hover:bg-blue-700"
                },
                {
                    title: "All Biographies",
                    description: "Browse published biographies",
                    href: route('biographies.all'),
                    icon: "📖",
                    color: "bg-green-600 hover:bg-green-700"
                }
            ];
        }
        
        if (isCopyEditor) {
            return [
                {
                    title: "Copy Editor Dashboard",
                    description: "Review approved submissions",
                    href: route('copy-editor.dashboard'),
                    icon: "✏️",
                    color: "bg-orange-600 hover:bg-orange-700"
                },
                {
                    title: "Style Guidelines",
                    description: "NDNB house style reference",
                    href: "#",
                    icon: "📋",
                    color: "bg-gray-600 hover:bg-gray-700"
                }
            ];
        }
        
        return [
            {
                title: "Create Biography",
                description: "Add a new biography entry",
                href: route('biographies.create'),
                icon: "✍️",
                color: "bg-green-600 hover:bg-green-700"
            },
            {
                title: "My Biographies",
                description: "View and manage your submissions",
                href: route('biographies.index'),
                icon: "📄",
                color: "bg-blue-600 hover:bg-blue-700"
            },
            {
                title: "Browse All",
                description: "Explore published biographies",
                href: route('biographies.all'),
                icon: "🔍",
                color: "bg-purple-600 hover:bg-purple-700"
            },
            {
                title: "My Profile",
                description: "Update your contributor profile",
                href: route('profile.edit'),
                icon: "👤",
                color: "bg-gray-600 hover:bg-gray-700"
            }
        ];
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-green-800 leading-tight">{getDashboardTitle()}</h2>}
        >
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
                <div className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Welcome Section */}
                        <div className="bg-white overflow-hidden shadow-lg rounded-lg border-t-4 border-green-600 mb-8">
                            <div className="bg-gradient-to-r from-green-100 to-green-50 px-6 py-8">
                                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                                    <div>
                                        <h1 className="text-3xl font-bold text-green-800 mb-2">
                                            Welcome back, {user.first_name || user.name}!
                                        </h1>
                                        <p className="text-green-700 text-lg">
                                            {getDashboardDescription()}
                                        </p>
                                    </div>
                                    <div className="mt-4 lg:mt-0">
                                        <div className="bg-white p-4 rounded-lg shadow-md">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-green-600">
                                                    {stats.totalBiographies || 0}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {isContributor ? 'Your Submissions' : 'Total Biographies'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                            {getQuickActions().map((action, index) => (
                                <Link
                                    key={index}
                                    href={action.href}
                                    className="block group"
                                >
                                    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden">
                                        <div className={`${action.color} text-white p-4`}>
                                            <div className="flex items-center justify-between">
                                                <span className="text-2xl">{action.icon}</span>
                                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                                            <p className="text-gray-600 text-sm">{action.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Recent Activity or Role-Specific Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Notifications */}
                            <div className="bg-white rounded-lg shadow-md border border-gray-200">
                                <div className="bg-green-50 px-6 py-4 border-b border-green-100">
                                    <h2 className="text-lg font-semibold text-green-800">Recent Notifications</h2>
                                </div>
                                <div className="p-6">
                                    <div className="text-gray-600 text-center py-8">
                                        <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM9 5l7 7-7 7V5z" />
                                        </svg>
                                        <p>No recent notifications</p>
                                        <Link href={route('notifications.index')} className="text-green-600 hover:text-green-800 text-sm">
                                            View all notifications →
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-white rounded-lg shadow-md border border-gray-200">
                                <div className="bg-green-50 px-6 py-4 border-b border-green-100">
                                    <h2 className="text-lg font-semibold text-green-800">Overview</h2>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Draft Biographies</span>
                                            <span className="font-semibold text-gray-900">{stats.drafts || 0}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Under Review</span>
                                            <span className="font-semibold text-gray-900">{stats.underReview || 0}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-600">Published</span>
                                            <span className="font-semibold text-green-600">{stats.published || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
