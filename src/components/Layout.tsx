"use client";

import { useState, ReactNode, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Stethoscope,
    Settings,
    X,
    Menu,
    Bell,
    User,
    Clipboard,
    LogOut,
    UserCircle,
    ClipboardCheck,
    Share,
    Info
} from "lucide-react";

interface LayoutProps {
    children: ReactNode;
    title?: string;
    subtitle?: string;
}

export default function Layout({ children, title, subtitle }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const notificationsRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    const navigationItems = [
        { id: "dashboard", name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { id: "patients", name: "Patients", href: "/patientsList", icon: Users },
        { id: "doctors", name: "Doctors", href: "/doctors", icon: Stethoscope },
        { id: "knowledge", name: "Knowledge Sharing", href: "/knowledgeSharing", icon: Info },
        { id: "settings", name: "Settings", href: "/settings", icon: Settings }
    ];

    // Mock notifications data
    const notifications = [
        { id: 1, title: "New patient registered", message: "John Doe has been added to the system", time: "5 min ago", unread: true },
        { id: 2, title: "Appointment reminder", message: "You have 3 appointments today", time: "1 hour ago", unread: true },
        { id: 3, title: "Lab results ready", message: "Patient #1234 lab results are available", time: "2 hours ago", unread: false },
    ];

    // Handle logout
    const handleLogout = () => {
        // Clear localStorage
        localStorage.removeItem("token");
        // Clear cookie
        document.cookie = "token=; path=/; max-age=0";
        // Redirect to login
        router.push("/login");
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setNotificationsOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex">
            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 z-50 ${sidebarOpen ? "w-64" : "w-0"} overflow-hidden`}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                    <Clipboard className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold text-gray-900 dark:text-white">MedApp</h1>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Healthcare Portal</p>
                                </div>
                            </div>
                            <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 p-4 space-y-2">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${pathname === item.href
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                                DR
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Dr. Smith</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">doctor@medapp.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
                <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
                    <div className="px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                {!sidebarOpen && (
                                    <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                                    </button>
                                )}
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">{title || "MedApp"}</h1>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">{subtitle || "Healthcare Professional Portal"}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                {/* Notifications Dropdown */}
                                <div className="relative" ref={notificationsRef}>
                                    <button
                                        onClick={() => {
                                            setNotificationsOpen(!notificationsOpen);
                                            setProfileOpen(false);
                                        }}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative"
                                    >
                                        <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                                        {/* Notification badge */}
                                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                    </button>

                                    {/* Notifications Dropdown Menu */}
                                    {notificationsOpen && (
                                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2">
                                            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
                                            </div>
                                            <div className="max-h-96 overflow-y-auto">
                                                {notifications.map((notification) => (
                                                    <div
                                                        key={notification.id}
                                                        className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${notification.unread ? "bg-blue-50 dark:bg-blue-900/10" : ""
                                                            }`}
                                                    >
                                                        <div className="flex items-start space-x-3">
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                                    {notification.title}
                                                                </p>
                                                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                                    {notification.message}
                                                                </p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                                    {notification.time}
                                                                </p>
                                                            </div>
                                                            {notification.unread && (
                                                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                                                <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium">
                                                    View all notifications
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Profile Dropdown */}
                                <div className="relative" ref={profileRef}>
                                    <button
                                        onClick={() => {
                                            setProfileOpen(!profileOpen);
                                            setNotificationsOpen(false);
                                        }}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        <User className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                                    </button>

                                    {/* Profile Dropdown Menu */}
                                    {profileOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2">
                                            {/* User Info */}
                                            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">Dr. Smith</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">doctor@medapp.com</p>
                                            </div>

                                            {/* Menu Items */}
                                            <div className="py-1">
                                                <button
                                                    onClick={() => {
                                                        router.push("/profile");
                                                        setProfileOpen(false);
                                                    }}
                                                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    <UserCircle className="w-4 h-4" />
                                                    <span>My Profile</span>
                                                </button>

                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    <span>Logout</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="px-4 sm:px-6 lg:px-8 py-8">{children}</main>
            </div>
        </div>
    );
}