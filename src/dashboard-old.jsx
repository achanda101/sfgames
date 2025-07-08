import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Users, Trophy, Clock, TrendingUp, Award, Monitor, Globe } from 'lucide-react';
import { databases, DATABASE_ID, COLLECTIONS, Query } from './appwriteConfig';

const QuizDashboard = () => {
    const [ loading, setLoading ] = useState(true);
    const [ sessions, setSessions ] = useState([]);
    const [ responses, setResponses ] = useState([]);
    const [ selectedQuizType, setSelectedQuizType ] = useState('all');
    const [ dateRange, setDateRange ] = useState('week');

    // Processed statistics
    const [ stats, setStats ] = useState({
        totalAttempts: 0,
        completionRate: 0,
        averageScore: 0,
        averageTime: 0,
        quizBreakdown: [],
        dailyTrends: [],
        scoreDistribution: [],
        osBreakdown: [],
        timezoneBreakdown: []
    });

    const quizTypes = {
        all: 'All Quizzes',
        inclusion: 'Inclusion & Diversity',
        financial: 'Financial Literacy',
        workplace: 'Workplace Etiquette',
        posh: 'PoSH Awareness'
    };

    const quizColors = {
        inclusion: '#8b5cf6',
        financial: '#f97316',
        workplace: '#3b82f6',
        posh: '#ef4444'
    };

    useEffect(() => {
        fetchAnalyticsData();
    }, [ selectedQuizType, dateRange ]);

    const fetchAnalyticsData = async () => {
        setLoading(true);
        try {
            // Calculate date range
            const endDate = new Date();
            const startDate = new Date();

            switch (dateRange) {
                case 'day':
                    startDate.setDate(startDate.getDate() - 1);
                    break;
                case 'week':
                    startDate.setDate(startDate.getDate() - 7);
                    break;
                case 'month':
                    startDate.setMonth(startDate.getMonth() - 1);
                    break;
                case 'year':
                    startDate.setFullYear(startDate.getFullYear() - 1);
                    break;
            }

            // Build queries
            let sessionQueries = [
                Query.greaterThanEqual('created_at', startDate.toISOString()),
                Query.lessThanEqual('created_at', endDate.toISOString()),
                Query.limit(1000)
            ];

            if (selectedQuizType !== 'all') {
                sessionQueries.push(Query.equal('quiz_type', selectedQuizType));
            }

            // Fetch sessions
            const sessionsResponse = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.QUIZ_SESSIONS,
                sessionQueries
            );

            const sessionData = sessionsResponse.documents;
            setSessions(sessionData);

            // Fetch responses for these sessions
            if (sessionData.length > 0) {
                const sessionIds = sessionData.map(s => s.$id);
                const responseQueries = [
                    Query.equal('session_id', sessionIds),
                    Query.limit(1000)
                ];

                const responsesResponse = await databases.listDocuments(
                    DATABASE_ID,
                    COLLECTIONS.QUIZ_RESPONSES,
                    responseQueries
                );

                setResponses(responsesResponse.documents);
            }

            // Process statistics
            processStatistics(sessionData);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    const processStatistics = (sessionData) => {
        // Overall stats
        const totalAttempts = sessionData.length;
        const completedSessions = sessionData.filter(s => s.is_completed);
        const completionRate = totalAttempts > 0 ? (completedSessions.length / totalAttempts) * 100 : 0;

        // Average score
        const averageScore = completedSessions.length > 0
            ? completedSessions.reduce((sum, s) => sum + (s.final_score || 0), 0) / completedSessions.length
            : 0;

        // Average time (for completed sessions)
        let averageTime = 0;
        if (completedSessions.length > 0) {
            const totalTime = completedSessions.reduce((sum, s) => {
                if (s.session_start_time && s.session_end_time) {
                    const duration = new Date(s.session_end_time) - new Date(s.session_start_time);
                    return sum + duration;
                }
                return sum;
            }, 0);
            averageTime = totalTime / completedSessions.length / 1000 / 60; // Convert to minutes
        }

        // Quiz type breakdown
        const quizBreakdown = Object.keys(quizTypes)
            .filter(type => type !== 'all')
            .map(type => {
                const typeSessions = sessionData.filter(s => s.quiz_type === type);
                const typeCompleted = typeSessions.filter(s => s.is_completed);
                return {
                    name: quizTypes[ type ],
                    type: type,
                    attempts: typeSessions.length,
                    completed: typeCompleted.length,
                    avgScore: typeCompleted.length > 0
                        ? typeCompleted.reduce((sum, s) => sum + (s.final_score || 0), 0) / typeCompleted.length
                        : 0
                };
            });

        // Daily trends
        const dailyData = {};
        sessionData.forEach(session => {
            const date = new Date(session.created_at).toLocaleDateString();
            if (!dailyData[ date ]) {
                dailyData[ date ] = { date, attempts: 0, completed: 0 };
            }
            dailyData[ date ].attempts++;
            if (session.is_completed) {
                dailyData[ date ].completed++;
            }
        });
        const dailyTrends = Object.values(dailyData).sort((a, b) => new Date(a.date) - new Date(b.date));

        // Score distribution
        const scoreRanges = [
            { range: '0-5', min: 0, max: 5, count: 0 },
            { range: '6-10', min: 6, max: 10, count: 0 },
            { range: '11-15', min: 11, max: 15, count: 0 },
            { range: '16-20', min: 16, max: 20, count: 0 },
            { range: '21+', min: 21, max: Infinity, count: 0 }
        ];

        completedSessions.forEach(session => {
            const score = session.final_score || 0;
            const range = scoreRanges.find(r => score >= r.min && score <= r.max);
            if (range) range.count++;
        });

        // OS breakdown
        const osData = {};
        sessionData.forEach(session => {
            const os = session.player_os || 'Unknown';
            osData[ os ] = (osData[ os ] || 0) + 1;
        });
        const osBreakdown = Object.entries(osData).map(([ name, value ]) => ({ name, value }));

        // Timezone breakdown (top 5)
        const timezoneData = {};
        sessionData.forEach(session => {
            const timezone = session.player_timezone || 'Unknown';
            timezoneData[ timezone ] = (timezoneData[ timezone ] || 0) + 1;
        });
        const timezoneBreakdown = Object.entries(timezoneData)
            .map(([ name, value ]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);

        setStats({
            totalAttempts,
            completionRate,
            averageScore,
            averageTime,
            quizBreakdown,
            dailyTrends,
            scoreDistribution: scoreRanges,
            osBreakdown,
            timezoneBreakdown
        });
    };

    const StatCard = ({ icon: Icon, title, value, subtitle, color = "blue" }) => {
        const colorClasses = {
            blue: "bg-blue-50 text-blue-600 border-blue-200",
            green: "bg-green-50 text-green-600 border-green-200",
            purple: "bg-purple-50 text-purple-600 border-purple-200",
            orange: "bg-orange-50 text-orange-600 border-orange-200"
        };

        return (
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">{title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                        {subtitle && (
                            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                        )}
                    </div>
                    <div className={`p-3 rounded-lg ${colorClasses[ color ]}`}>
                        <Icon size={24} />
                    </div>
                </div>
            </div>
        );
    };

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
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Quiz Analytics Dashboard</h1>
                    <p className="text-gray-600 mt-2">Track performance and engagement across all quizzes</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Type</label>
                            <select
                                value={selectedQuizType}
                                onChange={(e) => setSelectedQuizType(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {Object.entries(quizTypes).map(([ value, label ]) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="day">Last 24 Hours</option>
                                <option value="week">Last 7 Days</option>
                                <option value="month">Last 30 Days</option>
                                <option value="year">Last Year</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        icon={Users}
                        title="Total Attempts"
                        value={stats.totalAttempts.toLocaleString()}
                        subtitle="Quiz sessions started"
                        color="blue"
                    />
                    <StatCard
                        icon={Trophy}
                        title="Completion Rate"
                        value={`${stats.completionRate.toFixed(1)}%`}
                        subtitle="Successfully completed"
                        color="green"
                    />
                    <StatCard
                        icon={Award}
                        title="Average Score"
                        value={stats.averageScore.toFixed(1)}
                        subtitle="Out of 20 points"
                        color="purple"
                    />
                    <StatCard
                        icon={Clock}
                        title="Avg. Duration"
                        value={`${stats.averageTime.toFixed(0)}m`}
                        subtitle="Time per session"
                        color="orange"
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Quiz Breakdown */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiz Performance</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={stats.quizBreakdown}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="attempts" fill="#94a3b8" name="Attempts" />
                                <Bar dataKey="completed" fill="#10b981" name="Completed" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Daily Trends */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Activity</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={stats.dailyTrends}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="attempts" stroke="#3b82f6" name="Attempts" />
                                <Line type="monotone" dataKey="completed" stroke="#10b981" name="Completed" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Score Distribution */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={stats.scoreDistribution}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="range" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8b5cf6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Platform Distribution */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={stats.osBreakdown}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {stats.osBreakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={[ '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6' ][ index % 5 ]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Timezones */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Globe size={20} /> Top Locations
                        </h3>
                        <div className="space-y-3">
                            {stats.timezoneBreakdown.map((tz, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">{tz.name}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-32 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{ width: `${(tz.value / stats.totalAttempts) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-gray-900 w-12 text-right">
                                            {tz.value}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quiz Scores by Type */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <TrendingUp size={20} /> Average Scores by Quiz
                        </h3>
                        <div className="space-y-3">
                            {stats.quizBreakdown.map((quiz, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">{quiz.name}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-32 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="h-2 rounded-full"
                                                style={{
                                                    width: `${(quiz.avgScore / 20) * 100}%`,
                                                    backgroundColor: quizColors[ quiz.type ]
                                                }}
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-gray-900 w-12 text-right">
                                            {quiz.avgScore.toFixed(1)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizDashboard;