
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ notifications, unreadCount }) {
    const { post, processing } = useForm();

    const markAsRead = (notificationId) => {
        post(route('notifications.mark-read', notificationId), {
            preserveScroll: true,
            onSuccess: () => {
                // The notification will be marked as read
            }
        });
    };

    const markAllAsRead = () => {
        post(route('notifications.mark-all-read'), {
            preserveScroll: true,
        });
    };

    const getNotificationIcon = (type) => {
        const icons = {
            'submission_received': '📝',
            'biography_approved': '✅',
            'biography_declined': '❌',
            'biography_returned': '🔄',
            'biography_published': '🎉',
            'copy_editing_complete': '✏️',
            'editor_review_complete': '👁️'
        };
        return icons[type] || '📢';
    };

    const getNotificationColor = (type, isRead) => {
        const baseClasses = isRead ? 'bg-gray-50' : 'bg-green-50 border-l-4 border-l-green-500';
        const typeColors = {
            'biography_approved': isRead ? 'bg-gray-50' : 'bg-green-50 border-l-green-500',
            'biography_declined': isRead ? 'bg-gray-50' : 'bg-red-50 border-l-red-500',
            'biography_returned': isRead ? 'bg-gray-50' : 'bg-yellow-50 border-l-yellow-500',
            'biography_published': isRead ? 'bg-gray-50' : 'bg-blue-50 border-l-blue-500',
        };
        return typeColors[type] || baseClasses;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-green-800">
                        Notifications
                        {unreadCount > 0 && (
                            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                {unreadCount}
                            </span>
                        )}
                    </h2>
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            disabled={processing}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
                        >
                            Mark All as Read
                        </button>
                    )}
                </div>
            }
        >
            <Head title="Notifications" />

            <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg border-t-4 border-green-600 overflow-hidden">
                        {notifications.data.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🔔</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    No notifications yet
                                </h3>
                                <p className="text-gray-500">
                                    You'll see notifications here when there are updates to your biographies.
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {notifications.data.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-6 ${getNotificationColor(notification.type, notification.read_at)} hover:bg-gray-50 transition-colors duration-150`}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className="text-2xl flex-shrink-0">
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-lg font-medium text-gray-900">
                                                        {notification.title}
                                                    </h4>
                                                    {!notification.read_at && (
                                                        <button
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="text-sm text-green-600 hover:text-green-800"
                                                        >
                                                            Mark as read
                                                        </button>
                                                    )}
                                                </div>
                                                <p className="mt-2 text-gray-700">
                                                    {notification.message}
                                                </p>
                                                
                                                {/* Display additional data */}
                                                {notification.data?.reason && (
                                                    <div className="mt-3 p-3 bg-red-100 border-l-4 border-red-500 rounded">
                                                        <h5 className="font-medium text-red-800">Reason:</h5>
                                                        <p className="text-red-700">{notification.data.reason}</p>
                                                    </div>
                                                )}
                                                
                                                {notification.data?.editor_notes && (
                                                    <div className="mt-3 p-3 bg-blue-100 border-l-4 border-blue-500 rounded">
                                                        <h5 className="font-medium text-blue-800">Editor's Notes:</h5>
                                                        <p className="text-blue-700">{notification.data.editor_notes}</p>
                                                    </div>
                                                )}

                                                {notification.biography && (
                                                    <div className="mt-3">
                                                        <Link
                                                            href={route('biographies.show', notification.biography.slug)}
                                                            className="text-green-600 hover:text-green-800 font-medium"
                                                        >
                                                            View Biography →
                                                        </Link>
                                                    </div>
                                                )}
                                                
                                                <div className="mt-3 text-sm text-gray-500">
                                                    {formatDate(notification.created_at)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {/* Pagination */}
                        {notifications.links && notifications.links.length > 3 && (
                            <div className="px-6 py-4 bg-gray-50 border-t">
                                <div className="flex justify-center">
                                    {notifications.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || ''}
                                            className={`px-3 py-1 mx-1 rounded ${
                                                link.active
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-white text-green-600 hover:bg-green-100'
                                            } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
