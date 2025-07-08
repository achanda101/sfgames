import { useState, useEffect } from 'react';
import { BarChart3, Users, Trophy, Clock, Monitor, Globe, Calendar } from 'lucide-react';
// import { databases, DATABASE_ID, COLLECTIONS, Query } from './appwriteConfig';

// Mock QuizAnalytics for demonstration purposes
const QuizAnalytics = {
    async getQuizAnalytics(quizType, startDate, endDate) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock data based on quiz type
        const mockData = {
            inclusion: {
                totalAttempts: 145,
                totalCompletions: 127,
                completionRate: 87.6,
                averageScore: 24.3,
                sessions: [
                    {
                        quiz_type: 'inclusion',
                        final_score: 28,
                        session_end_time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                        player_timezone: 'Asia/Kolkata',
                        player_os: 'Windows',
                        is_completed: true,
                        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
                    },
                    {
                        quiz_type: 'inclusion',
                        final_score: 22,
                        session_end_time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
                        player_timezone: 'Asia/Kolkata',
                        player_os: 'Android',
                        is_completed: true,
                        created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
                    }
                ]
            },
            financial: {
                totalAttempts: 203,
                totalCompletions: 178,
                completionRate: 87.7,
                averageScore: 16.8,
                sessions: [
                    {
                        quiz_type: 'financial',
                        final_score: 18,
                        session_end_time: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
                        player_timezone: 'Asia/Kolkata',
                        player_os: 'iOS',
                        is_completed: true,
                        created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
                    },
                    {
                        quiz_type: 'financial',
                        final_score: 15,
                        session_end_time: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
                        player_timezone: 'Asia/Kolkata',
                        player_os: 'Windows',
                        is_completed: true,
                        created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
                    }
                ]
            },
            workplace: {
                totalAttempts: 89,
                totalCompletions: 76,
                completionRate: 85.4,
                averageScore: 17.2,
                sessions: [
                    {
                        quiz_type: 'workplace',
                        final_score: 19,
                        session_end_time: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
                        player_timezone: 'Asia/Kolkata',
                        player_os: 'macOS',
                        is_completed: true,
                        created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
                    },
                    {
                        quiz_type: 'workplace',
                        final_score: 16,
                        session_end_time: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
                        player_timezone: 'America/New_York',
                        player_os: 'Linux',
                        is_completed: true,
                        created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
                    }
                ]
            },
            posh: {
                totalAttempts: 112,
                totalCompletions: 98,
                completionRate: 87.5,
                averageScore: 16.5,
                sessions: [
                    {
                        quiz_type: 'posh',
                        final_score: 17,
                        session_end_time: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
                        player_timezone: 'Europe/London',
                        player_os: 'Windows',
                        is_completed: true,
                        created_at: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString()
                    },
                    {
                        quiz_type: 'posh',
                        final_score: 14,
                        session_end_time: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
                        player_timezone: 'Asia/Tokyo',
                        player_os: 'Android',
                        is_completed: true,
                        created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
                    }
                ]
            }
        };

        return mockData[ quizType ] || mockData.inclusion;
    },

    processAnalytics(sessions) {
        const total = sessions.length;
        const completed = sessions.filter(s => s.is_completed).length;
        const completionRate = total > 0 ? (completed / total) * 100 : 0;

        const completedSessions = sessions.filter(s => s.is_completed);
        const averageScore = completedSessions.length > 0
            ? completedSessions.reduce((sum, s) => sum + (s.final_score || 0), 0) / completedSessions.length
            : 0;

        return {
            totalAttempts: total,
            totalCompletions: completed,
            completionRate,
            averageScore,
            sessions
        };
    }
};

const QuizDashboard = () => {
    const [ analyticsData, setAnalyticsData ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const [ selectedQuizType, setSelectedQuizType ] = useState('all');
    const [ dateRange, setDateRange ] = useState('7'); // days

    const quizTypes = [
        { value: 'all', label: 'All Quizzes' },
        { value: 'inclusion', label: 'Inclusion & Diversity' },
        { value: 'financial', label: 'Financial Literacy' },
        { value: 'workplace', label: 'Workplace Etiquette' },
        { value: 'posh', label: 'PoSH Awareness' }
    ];

    useEffect(() => {
        fetchAnalytics();
    }, [ selectedQuizType, dateRange ]);

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const endDate = new Date().toISOString();
            const startDate = new Date(Date.now() - parseInt(dateRange) * 24 * 60 * 60 * 1000).toISOString();

            if (selectedQuizType === 'all') {
                // Fetch data for all quiz types
                const allData = {};
                let combinedSessions = [];

                for (const quiz of quizTypes.slice(1)) { // Skip 'all' option
                    const data = await QuizAnalytics.getQuizAnalytics(quiz.value, startDate, endDate);
                    if (data) {
                        allData[ quiz.value ] = data;
                        combinedSessions = [ ...combinedSessions, ...data.sessions ];
                    }
                }

                // Process combined data
                const combinedData = QuizAnalytics.processAnalytics(combinedSessions);
                allData.combined = { ...combinedData, sessions: combinedSessions };
                setAnalyticsData(allData);
            } else {
                // Fetch data for specific quiz type
                const data = await QuizAnalytics.getQuizAnalytics(selectedQuizType, startDate, endDate);
                setAnalyticsData({ [ selectedQuizType ]: data });
            }
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    const getDisplayData = () => {
        if (selectedQuizType === 'all') {
            return analyticsData.combined || {};
        }
        return analyticsData[ selectedQuizType ] || {};
    };

    const displayData = getDisplayData();

    // Helper functions for data processing
    const getQuizTypeBreakdown = () => {
        if (selectedQuizType !== 'all') return [];

        return quizTypes.slice(1).map(quiz => {
            const data = analyticsData[ quiz.value ] || {};
            return {
                name: quiz.label,
                attempts: data.totalAttempts || 0,
                completions: data.totalCompletions || 0,
                avgScore: data.averageScore || 0
            };
        });
    };

    const getPlayerMetadata = () => {
        const sessions = displayData.sessions || [];
        const osCount = {};
        const timezoneCount = {};
        const languageCount = {};

        sessions.forEach(session => {
            // Count OS
            if (session.player_os) {
                osCount[ session.player_os ] = (osCount[ session.player_os ] || 0) + 1;
            }

            // Count timezones
            if (session.player_timezone) {
                timezoneCount[ session.player_timezone ] = (timezoneCount[ session.player_timezone ] || 0) + 1;
            }

            // Count languages
            if (session.player_language) {
                languageCount[ session.player_language ] = (languageCount[ session.player_language ] || 0) + 1;
            }
        });

        return { osCount, timezoneCount, languageCount };
    };

    const getRecentSessions = () => {
        const sessions = displayData.sessions || [];
        return sessions
            .filter(session => session.is_completed)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 10);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const metadata = getPlayerMetadata();
    const recentSessions = getRecentSessions();
    const quizBreakdown = getQuizTypeBreakdown();

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col gap-5 items-center justify-center p-8">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="p-6">
                        <div className="flex items-center gap-5 justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Quiz Analytics Dashboard</h1>
                                <p className="mt-1 text-sm text-gray-500">Monitor quiz performance and user engagement</p>
                            </div>
                            <div className="flex gap-5">
                                <select
                                    value={selectedQuizType}
                                    onChange={(e) => setSelectedQuizType(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {quizTypes.map(quiz => (
                                        <option key={quiz.value} value={quiz.value}>{quiz.label}</option>
                                    ))}
                                </select>
                                <select
                                    value={dateRange}
                                    onChange={(e) => setDateRange(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="1">Last 24 hours</option>
                                    <option value="7">Last 7 days</option>
                                    <option value="30">Last 30 days</option>
                                    <option value="90">Last 90 days</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-amber-300">
                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 p-10">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Users className="h-8 w-8 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total Attempts</p>
                                <p className="text-2xl font-semibold text-gray-900">{displayData.totalAttempts || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Trophy className="h-8 w-8 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Completions</p>
                                <p className="text-2xl font-semibold text-gray-900">{displayData.totalCompletions || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <BarChart3 className="h-8 w-8 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Completion Rate</p>
                                <p className="text-2xl font-semibold text-gray-900">{displayData.completionRate?.toFixed(1) || 0}%</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Clock className="h-8 w-8 text-orange-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Average Score</p>
                                <p className="text-2xl font-semibold text-gray-900">{displayData.averageScore?.toFixed(1) || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 m-8 bg-green-300">
                    {/* Quiz Type Breakdown */}
                    {selectedQuizType === 'all' && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Quiz Type Performance</h3>
                            <div className="space-y-4">
                                {quizBreakdown.map((quiz, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">{quiz.name}</p>
                                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                <span>{quiz.attempts} attempts</span>
                                                <span>{quiz.completions} completed</span>
                                                <span>Avg: {quiz.avgScore.toFixed(1)}</span>
                                            </div>
                                        </div>
                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{ width: `${quiz.attempts > 0 ? (quiz.completions / quiz.attempts) * 100 : 0}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Player Metadata */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Player Demographics</h3>

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <Monitor className="h-4 w-4 mr-2" />
                                    Operating Systems
                                </h4>
                                <div className="space-y-2">
                                    {Object.entries(metadata.osCount).slice(0, 5).map(([ os, count ]) => (
                                        <div key={os} className="flex justify-between text-sm">
                                            <span className="text-gray-600">{os}</span>
                                            <span className="font-medium">{count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <Globe className="h-4 w-4 mr-2" />
                                    Top Timezones
                                </h4>
                                <div className="space-y-2">
                                    {Object.entries(metadata.timezoneCount).slice(0, 5).map(([ timezone, count ]) => (
                                        <div key={timezone} className="flex justify-between text-sm">
                                            <span className="text-gray-600 truncate">{timezone}</span>
                                            <span className="font-medium">{count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Sessions */}
                <div className="rounded-lg shadow bg-red-200 mt-10">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center">
                            <Calendar className="h-5 w-5 mr-2" />
                            Recent Completed Sessions
                        </h3>
                    </div>
                    <div className="overflow-x-auto bg-purple-300">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Quiz Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Score
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Completed
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Timezone
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Platform
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentSessions.map((session, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                                            {session.quiz_type}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {session.final_score || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(session.session_end_time)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {session.player_timezone || 'Unknown'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {session.player_os || 'Unknown'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {recentSessions.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No completed sessions found for the selected period.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizDashboard;