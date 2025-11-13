"use client"
import React, { useState } from 'react';

interface RehabTask {
    task: string;
    done: boolean;
}

interface Medication {
    name: string;
    dosage: string;
    time: string;
}

const PostSurgeryCareScreen: React.FC = () => {
    const [rehabTasks, setRehabTasks] = useState<RehabTask[]>([
        { task: "Walk for 15 minutes daily", done: false },
        { task: "Stretching exercises", done: true },
        { task: "Ice therapy - 3 times daily", done: false },
        { task: "Wound care and dressing change", done: true }
    ]);

    const followups: string[] = ["2024-03-15", "2024-03-22", "2024-04-01"];

    const medications: Medication[] = [
        { name: "Painkiller A", dosage: "2x/day", time: "Morning & Evening" },
        { name: "Antibiotic B", dosage: "1x/day", time: "After breakfast" },
        { name: "Vitamin C", dosage: "1x/day", time: "With lunch" }
    ];

    const toggleTask = (index: number): void => {
        setRehabTasks(prev => prev.map((task, i) =>
            i === index ? { ...task, done: !task.done } : task
        ));
    };

    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const getDaysUntil = (dateStr: string): number => {
        const target = new Date(dateStr);
        const today = new Date();
        const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diff;
    };

    const completedTasks = rehabTasks.filter(t => t.done).length;
    const progressPercentage = Math.round((completedTasks / rehabTasks.length) * 100);

    return (
        <div className="dark min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
                    <div className="flex items-center mb-2">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-3">
                            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Post-Surgery Care</h1>
                            <p className="text-sm text-gray-400">Track your recovery progress and follow care instructions</p>
                        </div>
                    </div>
                </div>

                {/* Follow-up Appointments */}
                <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mr-3">
                            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-white">Follow-up Appointments</h2>
                    </div>
                    <div className="space-y-3">
                        {followups.map((date, index) => {
                            const daysUntil = getDaysUntil(date);
                            const isPast = daysUntil < 0;
                            const isToday = daysUntil === 0;

                            return (
                                <div
                                    key={index}
                                    className={`p-4 rounded-xl border-2 transition-all ${isPast
                                        ? 'bg-gray-700/50 border-gray-600'
                                        : isToday
                                            ? 'bg-green-900/20 border-green-600'
                                            : 'bg-blue-900/20 border-blue-600'
                                        }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-white">{formatDate(date)}</p>
                                            <p className="text-sm text-gray-400">
                                                {isPast ? 'Completed' : isToday ? 'Today' : `In ${daysUntil} days`}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${isPast
                                            ? 'bg-gray-700 text-gray-400'
                                            : isToday
                                                ? 'bg-green-900/40 text-green-400'
                                                : 'bg-blue-900/40 text-blue-400'
                                            }`}>
                                            {isPast ? 'Past' : isToday ? 'Today' : 'Upcoming'}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Rehabilitation Tasks */}
                <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mr-3">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-white">Rehabilitation Tasks</h2>
                    </div>

                    <div className="space-y-3 mb-6">
                        {rehabTasks.map((item, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${item.done
                                    ? 'bg-green-900/20 border-green-700'
                                    : 'bg-gray-700 border-gray-600 hover:border-blue-500'
                                    }`}
                                onClick={() => toggleTask(index)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${item.done
                                            ? 'border-green-600 bg-green-600'
                                            : 'border-gray-500'
                                            }`}>
                                            {item.done && (
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className={`font-medium ${item.done
                                            ? 'text-gray-400 line-through'
                                            : 'text-white'
                                            }`}>
                                            {item.task}
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleTask(index);
                                        }}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all ${item.done
                                            ? 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                            }`}
                                    >
                                        {item.done ? 'Undo' : 'Complete'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Progress Section */}
                    <div className="p-4 bg-blue-900/20 rounded-xl border border-blue-800">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-semibold text-gray-300">Overall Progress</span>
                            <span className="text-lg font-bold text-blue-400">
                                {progressPercentage}%
                            </span>
                        </div>
                        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 transition-all duration-500"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                            {completedTasks} of {rehabTasks.length} tasks completed
                        </p>
                    </div>
                </div>

                {/* Medication Schedule */}
                <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mr-3">
                            <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-white">Medication Schedule</h2>
                    </div>
                    <div className="space-y-3">
                        {medications.map((med, index) => (
                            <div
                                key={index}
                                className="p-4 rounded-xl border-2 border-gray-600 hover:border-blue-500 transition-all">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-white mb-2">{med.name}</h3>
                                        <div className="space-y-1">
                                            <div className="flex items-center text-sm text-gray-400">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                                </svg>
                                                <span>{med.dosage}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-400">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>{med.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-semibold">
                                        Active
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Reminder */}
                    <div className="mt-4 p-4 bg-yellow-900/20 border-l-4 border-yellow-600 rounded-lg">
                        <div className="flex items-start">
                            <svg className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div>
                                <h4 className="font-bold text-yellow-300 text-sm mb-1">Reminder</h4>
                                <p className="text-sm text-yellow-400">
                                    Take all medications as prescribed. Contact your doctor if you experience any side effects.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-gray-800 rounded-2xl shadow-xl p-6 border-2 border-red-800">
                    <div className="flex items-start mb-4">
                        <div className="w-12 h-12 bg-red-900/30 rounded-xl flex items-center justify-center mr-3 flex-shrink-0">
                            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-red-400 text-lg mb-2">Emergency Contact</h3>
                            <p className="text-red-300 text-sm mb-4">
                                If you experience severe pain, fever, unusual bleeding, or concerning symptoms, contact your healthcare provider immediately.
                            </p>
                            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all shadow-md flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>Call Healthcare Provider</span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PostSurgeryCareScreen;