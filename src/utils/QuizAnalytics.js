import { databases, DATABASE_ID, COLLECTIONS, ID, Query } from '../appwriteConfig';
import { toast } from "react-toastify";

class QuizAnalytics {
    static async startQuizSession(quizType) {
        try {
            const geolocation = await this.getCurrentLocation();
            const playerMetadata = this.getPlayerMetadata();

            // Prepare geolocation fields
            const geoFields = geolocation ? {
                geo_latitude: geolocation.latitude,
                geo_longitude: geolocation.longitude,
                geo_city: geolocation.city || null,
                geo_country: geolocation.country || null,
                geo_accuracy: geolocation.accuracy,
                geo_timestamp: geolocation.timestamp
            } : {
                geo_latitude: null,
                geo_longitude: null,
                geo_city: null,
                geo_country: null,
                geo_accuracy: null,
                geo_timestamp: null
            };

            const session = await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.QUIZ_SESSIONS,
                ID.unique(),
                {
                    quiz_type: quizType,
                    session_start_time: new Date().toISOString(),
                    is_completed: false,
                    current_question: 0,
                    current_score: 10,
                    total_questions_answered: 0,
                    ...geoFields,
                    player_user_agent: playerMetadata.user_agent,
                    player_language: playerMetadata.language,
                    player_timezone: playerMetadata.timezone,
                    player_screen_resolution: playerMetadata.screen_resolution,
                    player_os: playerMetadata.os,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            );
            return session.$id;
        } catch (error) {
            toast.error(`Error starting quiz session: ${error}`, { position: "bottom-right" });
            return null;
        }
    }

    // Update session progress
    static async updateSessionProgress(sessionId, questionNumber, currentScore, totalAnswered) {
        try {
            await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.QUIZ_SESSIONS,
                sessionId,
                {
                    current_question: questionNumber,
                    current_score: currentScore,
                    total_questions_answered: totalAnswered,
                    updated_at: new Date().toISOString()
                }
            );
        } catch (error) {
            console.error('Error updating session progress:', error);
        }
    }

    // Complete quiz session
    static async completeQuizSession(sessionId, finalScore) {
        try {
            await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.QUIZ_SESSIONS,
                sessionId,
                {
                    session_end_time: new Date().toISOString(),
                    is_completed: true,
                    final_score: finalScore,
                    updated_at: new Date().toISOString()
                }
            );
        } catch (error) {
            console.error('Error completing quiz session:', error);
        }
    }

    // Record individual response
    static async recordResponse(sessionId, questionNumber, scenarioId, optionIndex, pointsEarned, timeTaken) {
        try {
            await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.QUIZ_RESPONSES,
                ID.unique(),
                {
                    session_id: sessionId,
                    question_number: questionNumber,
                    scenario_id: scenarioId,
                    selected_option_index: optionIndex,
                    points_earned: pointsEarned,
                    time_taken_seconds: timeTaken,
                    response_timestamp: new Date().toISOString(),
                    created_at: new Date().toISOString()
                }
            );
        } catch (error) {
            console.error('Error recording response:', error);
        }
    }

    // Get analytics data
    static async getQuizAnalytics(quizType, startDate, endDate) {
        try {
            const sessions = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.QUIZ_SESSIONS,
                [
                    Query.equal('quiz_type', quizType),
                    Query.greaterThanEqual('created_at', startDate),
                    Query.lessThanEqual('created_at', endDate)
                ]
            );

            return this.processAnalytics(sessions.documents);
        } catch (error) {
            console.error('Error fetching analytics:', error);
            return null;
        }
    }

    static processAnalytics(sessions) {
        const total = sessions.length;
        const completed = sessions.filter(s => s.is_completed).length;
        const completionRate = total > 0 ? (completed / total) * 100 : 0;

        const completedSessions = sessions.filter(s => s.is_completed);
        const averageScore = completedSessions.length > 0
            ? completedSessions.reduce((sum, s) => sum + s.final_score, 0) / completedSessions.length
            : 0;

        return {
            totalAttempts: total,
            totalCompletions: completed,
            completionRate,
            averageScore,
            sessions
        };
    }

    // HELPER FUNCTIONS
    // Enhanced geolocation with city/country lookup
    static async getCurrentLocation() {
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                resolve(null);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

                    // Reverse geocoding to get city/country
                    const locationDetails = await this.reverseGeocode(lat, lng);

                    resolve({
                        latitude: lat,
                        longitude: lng,
                        accuracy: position.coords.accuracy,
                        city: locationDetails?.city || null,
                        country: locationDetails?.country || null,
                        timestamp: new Date().toISOString()
                    });
                },
                () => resolve(null),
                {
                    timeout: 5000,
                    enableHighAccuracy: false,
                    maximumAge: 300000 // 5 minutes cache
                }
            );
        });
    }

    // Reverse geocoding to get city/country
    static async reverseGeocode(lat, lng) {
        try {
            // Using a free geocoding service (you can use others)
            const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
            );
            const data = await response.json();

            return {
                city: data.city || data.locality || null,
                country: data.countryName || null
            };
        } catch (error) {
            console.error('Reverse geocoding failed:', error);
            return null;
        }
    }

    // Optional: Round coordinates for privacy
    static anonymizeLocation(lat, lng) {
        // Round to ~1km accuracy instead of exact location
        return {
            latitude: Math.round(lat * 100) / 100,
            longitude: Math.round(lng * 100) / 100
        };
    }

    // Get player metadata
    static getPlayerMetadata() {
        return {
            user_agent: navigator.userAgent,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            screen_resolution: `${screen.width}x${screen.height}`,
            os: this.getOSName()
        };
    }

    // Get OS name from user agent
    static getOSName() {
        const userAgent = navigator.userAgent;

        if (userAgent.includes('Windows NT')) return 'Windows';
        if (userAgent.includes('Mac OS X')) return 'macOS';
        if (userAgent.includes('Linux')) return 'Linux';
        if (userAgent.includes('Android')) return 'Android';
        if (userAgent.includes('iOS')) return 'iOS';
        if (userAgent.includes('iPhone')) return 'iOS';
        if (userAgent.includes('iPad')) return 'iOS';

        return 'Unknown';
    }
}

export default QuizAnalytics;