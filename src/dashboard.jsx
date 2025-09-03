import { useState, useEffect, useCallback } from 'react';
import { BarChart3, Users, Trophy, Clock, Monitor, Globe, Calendar, Star, ChevronDown, ChevronUp } from 'lucide-react';
import QuizAnalytics from './utils/QuizAnalytics.js';
import './dashboard.css';

const QuizDashboard = () => {
    const [ analyticsData, setAnalyticsData ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const [ selectedQuizType, setSelectedQuizType ] = useState('all');
    const [ dateRange, setDateRange ] = useState('7'); // days
    const [ expandedQuiz, setExpandedQuiz ] = useState(null);
    const [ questionAnalytics, setQuestionAnalytics ] = useState({});

    const quizTypes = [
        { value: 'all', label: 'All Quizzes' },
        { value: 'inclusion', label: 'Inclusion & Diversity' },
        { value: 'financial', label: 'Financial Literacy' },
        { value: 'workplace', label: 'Workplace Etiquette' },
        { value: 'posh', label: 'PoSH Awareness' }
    ];

    const fetchAnalytics = useCallback(async () => {
        setLoading(true);
        // Clear cached question analytics when fetching new data
        setQuestionAnalytics({});
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
    }, [ selectedQuizType, dateRange ]);

    useEffect(() => {
        fetchAnalytics();
    }, [ fetchAnalytics ]);

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
            const attempts = data.totalAttempts || 0;
            const completions = data.totalCompletions || 0;
            const completionRate = attempts > 0 ? (completions / attempts) * 100 : 0;
            
            return {
                name: quiz.label,
                attempts: attempts,
                completions: completions,
                completionRate: completionRate,
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

    const getMostPopularQuiz = () => {
        if (selectedQuizType !== 'all') {
            return { name: 'N/A', attempts: 0 };
        }

        const breakdown = getQuizTypeBreakdown();
        if (breakdown.length === 0) {
            return { name: 'No Data', attempts: 0 };
        }

        const mostPopular = breakdown.reduce((max, quiz) => {
            return quiz.attempts > max.attempts ? quiz : max;
        }, breakdown[0]);

        return {
            name: mostPopular.name,
            attempts: mostPopular.attempts
        };
    };

    const toggleQuizExpansion = async (quizValue) => {
        if (expandedQuiz === quizValue) {
            setExpandedQuiz(null);
            return;
        }

        setExpandedQuiz(quizValue);

        // Fetch detailed question analytics if not already loaded
        if (!questionAnalytics[quizValue]) {
            try {
                const endDate = new Date().toISOString();
                const startDate = new Date(Date.now() - parseInt(dateRange) * 24 * 60 * 60 * 1000).toISOString();
                
                const questionData = await QuizAnalytics.getQuestionAnalytics(quizValue, startDate, endDate);
                
                setQuestionAnalytics(prev => ({
                    ...prev,
                    [quizValue]: questionData
                }));
            } catch (error) {
                console.error('Error fetching question analytics:', error);
            }
        }
    };

    const metadata = getPlayerMetadata();
    const recentSessions = getRecentSessions();
    const quizBreakdown = getQuizTypeBreakdown();
    const mostPopularQuiz = getMostPopularQuiz();

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-content">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Loading analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            {/* Header */}
            <div className="dashboard-header">
                <div className="header-content">
                    <div className="header-flex">
                        <div className="header-text">
                            <h1>Quiz Analytics Dashboard</h1>
                            <p>Monitor quiz performance and user engagement</p>
                        </div>
                        <div className="header-controls">
                            <select
                                value={selectedQuizType}
                                onChange={(e) => setSelectedQuizType(e.target.value)}
                                className="dashboard-select"
                            >
                                {quizTypes.map(quiz => (
                                    <option key={quiz.value} value={quiz.value}>{quiz.label}</option>
                                ))}
                            </select>
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="dashboard-select"
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

            <div className="dashboard-main">
                {/* Overview Cards */}
                <div className="overview-grid">
                    <div className="overview-card">
                        <div className="card-content">
                            <div className="card-icon blue">
                                <Users />
                            </div>
                            <div className="card-text">
                                <h3>Total Attempts</h3>
                                <p>{displayData.totalAttempts || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="overview-card">
                        <div className="card-content">
                            <div className="card-icon green">
                                <Trophy />
                            </div>
                            <div className="card-text">
                                <h3>Completions</h3>
                                <p>{displayData.totalCompletions || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="overview-card">
                        <div className="card-content">
                            <div className="card-icon purple">
                                <BarChart3 />
                            </div>
                            <div className="card-text">
                                <h3>Completion Rate</h3>
                                <p>{displayData.completionRate?.toFixed(1) || 0}%</p>
                            </div>
                        </div>
                    </div>

                    <div className="overview-card">
                        <div className="card-content">
                            <div className="card-icon orange">
                                <Star />
                            </div>
                            <div className="card-text">
                                <h3>Most Played <span className="card-subtitle">(by attempts)</span></h3>
                                <p>{mostPopularQuiz.name === 'No Data' ? 'N/A' : mostPopularQuiz.name.split(' ')[0]}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="content-grid">
                    {/* Quiz Type Breakdown */}
                    {selectedQuizType === 'all' && (
                        <div className="section-card">
                            <div className="section-header">
                                <h3><BarChart3 />Quiz Type Performance</h3>
                            </div>
                            <div className="section-content">
                                <div className="quiz-breakdown">
                                    {quizBreakdown.map((quiz, index) => {
                                        const quizValue = quizTypes.find(q => q.label === quiz.name)?.value;
                                        const isExpanded = expandedQuiz === quizValue;
                                        
                                        return (
                                            <div key={index} className="quiz-accordion">
                                                <div 
                                                    className="quiz-item clickable"
                                                    onClick={() => toggleQuizExpansion(quizValue)}
                                                >
                                                    <div className="quiz-info">
                                                        <h4>{quiz.name}</h4>
                                                        <div className="quiz-stats-inline">
                                                            <span className="stat-group">
                                                                <strong>{quiz.attempts}</strong> attempts
                                                            </span>
                                                            <span className="stat-separator">•</span>
                                                            <span className="stat-group">
                                                                <strong>{quiz.completions}</strong> completed
                                                            </span>
                                                            <span className="stat-separator">•</span>
                                                            <span className="stat-group">
                                                                Avg: <strong>{quiz.avgScore.toFixed(1)}</strong>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="quiz-item-right">
                                                        <div className="progress-section">
                                                            <div className="completion-rate-label">
                                                                <div className="completion-rate-percentage">{quiz.completionRate.toFixed(1)}%</div>
                                                                <div className="completion-rate-text">completion rate</div>
                                                            </div>
                                                            <div className="progress-bar">
                                                                <div
                                                                    className="progress-fill"
                                                                    style={{ width: `${quiz.attempts > 0 ? (quiz.completions / quiz.attempts) * 100 : 0}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                        <div className="expand-icon">
                                                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {isExpanded && questionAnalytics[quizValue] && (
                                                    <div className="quiz-details">
                                                        <div className="question-analytics">
                                                            <h5>Question-by-Question Breakdown</h5>
                                                            <div className="questions-grid">
                                                                {Object.entries(questionAnalytics[quizValue]).map(([questionNum, options]) => (
                                                                    <div key={questionNum} className="question-column">
                                                                        <div className="question-header">Q{parseInt(questionNum) + 1}</div>
                                                                        <div className="options-breakdown">
                                                                            {Object.entries(options).map(([optionIndex, count]) => (
                                                                                <div key={optionIndex} className="option-count">
                                                                                    <span className="option-label">{String.fromCharCode(65 + parseInt(optionIndex))}</span>
                                                                                    <span className="option-value">{count}</span>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Player Metadata */}
                    <div className="section-card">
                        <div className="section-header">
                            <h3><Users />Player Demographics</h3>
                        </div>
                        <div className="section-content">
                            <div className="demographics-section">
                                <div className="demo-group">
                                    <h4>
                                        <Monitor />
                                        Operating Systems
                                    </h4>
                                    <div className="demo-list">
                                        {Object.entries(metadata.osCount).slice(0, 5).map(([os, count]) => (
                                            <div key={os} className="demo-item">
                                                <span className="demo-label">{os}</span>
                                                <span className="demo-count">{count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="demo-group">
                                    <h4>
                                        <Globe />
                                        Top Timezones
                                    </h4>
                                    <div className="demo-list">
                                        {Object.entries(metadata.timezoneCount).slice(0, 5).map(([timezone, count]) => (
                                            <div key={timezone} className="demo-item">
                                                <span className="demo-label">{timezone}</span>
                                                <span className="demo-count">{count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Sessions */}
                <div className="sessions-card">
                    <div className="sessions-header">
                        <h3>
                            <Calendar />
                            Recent Completed Sessions
                        </h3>
                    </div>
                    <div className="sessions-table-container">
                        <table className="sessions-table">
                            <thead>
                                <tr>
                                    <th>Quiz Type</th>
                                    <th>Score</th>
                                    <th>Completed</th>
                                    <th>Timezone</th>
                                    <th>Platform</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentSessions.map((session, index) => (
                                    <tr key={index}>
                                        <td>
                                            <span className="quiz-type-badge">
                                                {session.quiz_type}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="score-badge">
                                                {session.final_score || 'N/A'}
                                            </span>
                                        </td>
                                        <td>{formatDate(session.session_end_time)}</td>
                                        <td>{session.player_timezone || 'Unknown'}</td>
                                        <td>{session.player_os || 'Unknown'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {recentSessions.length === 0 && (
                            <div className="empty-state">
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