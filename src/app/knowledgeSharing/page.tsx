"use client";
import { useState } from "react";
import Layout from "@/components/Layout";
import withAuth from "@/middleware/withAuth";

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    authorRole: string;
    timestamp: string;
    likes: number;
    comments: number;
    category: string;
    isLiked?: boolean;
}

interface Comment {
    id: number;
    postId: number;
    author: string;
    content: string;
    timestamp: string;
}

const KnowledgeSharingPage = () => {
    const [posts, setPosts] = useState<Post[]>([
        {
            id: 1,
            title: "New approach for ACL rehab",
            content: "We tried a new exercise sequence that significantly improved recovery times. The protocol involves progressive loading with emphasis on proprioception training in the first 4 weeks. Results showed 30% faster return to sport compared to traditional methods.",
            author: "Dr. Alex Thompson",
            authorRole: "Orthopedic Surgeon",
            timestamp: "2 hours ago",
            likes: 24,
            comments: 8,
            category: "Rehabilitation",
            isLiked: false
        },
        {
            id: 2,
            title: "Effective Manual Therapy Techniques for Lower Back Pain",
            content: "After 15 years of clinical practice, I've found that combining mobilization with specific strengthening exercises yields the best outcomes. Here's my step-by-step approach that has helped over 500 patients achieve pain-free movement.",
            author: "Sarah Martinez",
            authorRole: "Physical Therapist",
            timestamp: "5 hours ago",
            likes: 42,
            comments: 15,
            category: "Best Practices",
            isLiked: false
        },
        {
            id: 3,
            title: "Innovative Use of Dry Needling in Sports Medicine",
            content: "Recent research and my clinical experience show that dry needling, when combined with movement therapy, can accelerate recovery in athletes. I've documented cases with 40% reduction in recovery time for muscle strains.",
            author: "Dr. James Chen",
            authorRole: "Sports Medicine Specialist",
            timestamp: "1 day ago",
            likes: 67,
            comments: 23,
            category: "Innovation",
            isLiked: true
        },
        {
            id: 4,
            title: "Case Study: Post-Surgical Shoulder Rehabilitation",
            content: "Patient presented with rotator cuff repair. Implemented a 12-week progressive program focusing on scapular stability before advancing to strengthening. Full ROM achieved by week 8. Sharing detailed protocol and outcomes.",
            author: "Linda Foster",
            authorRole: "Physical Therapist",
            timestamp: "2 days ago",
            likes: 31,
            comments: 12,
            category: "Case Studies",
            isLiked: false
        }
    ]);

    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const [newPost, setNewPost] = useState({ title: "", content: "", category: "Best Practices" });
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [expandedPost, setExpandedPost] = useState<number | null>(null);

    const categories = ["All", "Best Practices", "Innovation", "Case Studies", "Rehabilitation", "Research"];

    const handleLike = (postId: number) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                    isLiked: !post.isLiked
                };
            }
            return post;
        }));
    };

    const handleAddPost = () => {
        if (newPost.title.trim() && newPost.content.trim()) {
            const post: Post = {
                id: posts.length + 1,
                title: newPost.title,
                content: newPost.content,
                author: "Dr. Smith",
                authorRole: "Orthopedic Surgeon",
                timestamp: "Just now",
                likes: 0,
                comments: 0,
                category: newPost.category,
                isLiked: false
            };
            setPosts([post, ...posts]);
            setNewPost({ title: "", content: "", category: "Best Practices" });
            setShowNewPostModal(false);
        }
    };

    const filteredPosts = selectedCategory === "All"
        ? posts
        : posts.filter(post => post.category === selectedCategory);

    const trendingTopics = [
        { name: "ACL Recovery", count: 45 },
        { name: "Manual Therapy", count: 38 },
        { name: "Sports Rehab", count: 32 },
        { name: "Pain Management", count: 28 },
        { name: "Dry Needling", count: 24 }
    ];

    return (
        <Layout title="Knowledge Sharing" subtitle="Professional Network for Healthcare Providers">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Create Post Button */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <button
                            onClick={() => setShowNewPostModal(true)}
                            className="w-full flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors text-left border-2 border-dashed border-gray-300 dark:border-gray-600"
                        >
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                DS
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-600 dark:text-gray-400 font-medium">Share your knowledge with the community...</p>
                            </div>
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>

                    {/* Category Filter */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <div className="flex items-center space-x-2 overflow-x-auto">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Posts Feed */}
                    <div className="space-y-6">
                        {filteredPosts.map((post) => (
                            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                                {/* Post Header */}
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                {post.author.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">{post.author}</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{post.authorRole}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-500">{post.timestamp}</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-semibold">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Post Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{post.title}</h3>
                                    <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${expandedPost === post.id ? "" : "line-clamp-3"
                                        }`}>
                                        {post.content}
                                    </p>
                                    {post.content.length > 150 && (
                                        <button
                                            onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                                            className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-2 hover:underline"
                                        >
                                            {expandedPost === post.id ? "Show less" : "Read more"}
                                        </button>
                                    )}
                                </div>

                                {/* Post Actions */}
                                <div className="px-6 pb-6 flex items-center space-x-6">
                                    <button
                                        onClick={() => handleLike(post.id)}
                                        className={`flex items-center space-x-2 transition-colors ${post.isLiked
                                            ? "text-red-600 dark:text-red-400"
                                            : "text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                                            }`}
                                    >
                                        <svg className={`w-6 h-6 ${post.isLiked ? "fill-current" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        <span className="font-semibold">{post.likes}</span>
                                    </button>

                                    <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        <span className="font-semibold">{post.comments}</span>
                                    </button>

                                    <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ml-auto">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                        </svg>
                                        <span className="font-semibold">Share</span>
                                    </button>

                                    <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Stats Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Community Stats</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Total Posts</span>
                                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">1,234</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Active Members</span>
                                <span className="text-xl font-bold text-green-600 dark:text-green-400">456</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">This Month</span>
                                <span className="text-xl font-bold text-purple-600 dark:text-purple-400">89</span>
                            </div>
                        </div>
                    </div>

                    {/* Trending Topics */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Trending Topics</h3>
                        <div className="space-y-3">
                            {trendingTopics.map((topic, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                                    <div className="flex items-center space-x-3">
                                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                            {index + 1}
                                        </span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">{topic.name}</span>
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{topic.count} posts</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors text-left">
                                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Create Post</span>
                            </button>
                            <button className="w-full flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
                                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">My Network</span>
                            </button>
                            <button className="w-full flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
                                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Saved Posts</span>
                            </button>
                        </div>
                    </div>

                    {/* Innovation Badge */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-xl p-6 border border-purple-200 dark:border-purple-800">
                        <div className="flex items-center mb-3">
                            <svg className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            <div>
                                <h4 className="font-bold text-purple-900 dark:text-purple-300">Innovation Hub</h4>
                                <p className="text-xs text-purple-700 dark:text-purple-400">Share breakthrough ideas</p>
                            </div>
                        </div>
                        <p className="text-xs text-purple-800 dark:text-purple-300">
                            Your contributions help advance the entire healthcare community. Keep innovating!
                        </p>
                    </div>
                </div>
            </div>

            {/* New Post Modal */}
            {showNewPostModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Post</h3>
                                <button
                                    onClick={() => setShowNewPostModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Category Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                                <select
                                    value={newPost.category}
                                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                >
                                    {categories.filter(c => c !== "All").map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Title Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={newPost.title}
                                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                    placeholder="Enter a descriptive title..."
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                />
                            </div>

                            {/* Content Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
                                <textarea
                                    value={newPost.content}
                                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                    placeholder="Share your knowledge, insights, or case study..."
                                    rows={8}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none transition-colors"
                                />
                            </div>

                            {/* Tips */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Tips for Quality Posts
                                </h4>
                                <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                                    <li>• Be specific and include relevant details</li>
                                    <li>• Share data or outcomes when possible</li>
                                    <li>• Use clear, professional language</li>
                                    <li>• Include actionable insights for colleagues</li>
                                </ul>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowNewPostModal(false)}
                                className="px-6 py-3 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg border border-gray-300 dark:border-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddPost}
                                disabled={!newPost.title.trim() || !newPost.content.trim()}
                                className={`px-6 py-3 rounded-lg font-medium transition-colors ${newPost.title.trim() && newPost.content.trim()
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                Publish Post
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}


export default withAuth(KnowledgeSharingPage)