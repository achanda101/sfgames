import { Client, Account, Databases, ID, Query } from "appwrite";

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your project ID

const databases = new Databases(client);
const account = new Account(client);
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTIONS = {
    QUIZ_TYPES: '68661def001ad53018f5',
    QUIZ_SESSIONS: '686626b6001535ffd4de',
    QUIZ_RESPONSES: '68663e8f001e8420f3ca',
    QUIZ_ANALYTICS: '6867f5c2001185ffbb3a'
}

export const runDiagnostics = async () => {
    console.log('🔍 Starting comprehensive diagnostics...');

    // Test 1: Check environment variables
    console.log('\n📋 Test 1: Environment Variables');
    console.log('ENDPOINT:', import.meta.env.VITE_APPWRITE_ENDPOINT);
    console.log('PROJECT_ID:', import.meta.env.VITE_APPWRITE_PROJECT_ID);
    console.log('DATABASE_ID:', import.meta.env.VITE_APPWRITE_DATABASE_ID);
    console.log('Expected DATABASE_ID: 68661d9b001e0629ed99');
    console.log('Match:', import.meta.env.VITE_APPWRITE_DATABASE_ID === '68661d9b001e0629ed99');

    // Test 2: Check collections configuration
    console.log('\n📋 Test 2: Collections Config');
    console.log('COLLECTIONS object:', COLLECTIONS);
    console.log('QUIZ_SESSIONS:', COLLECTIONS.QUIZ_SESSIONS);
    console.log('QUIZ_RESPONSES:', COLLECTIONS.QUIZ_RESPONSES);

    // Test 3: Test database connection
    console.log('\n📋 Test 3: Database Connection');
    try {
        const testResult = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.QUIZ_SESSIONS,
            []
        );
        console.log('✅ Database connection successful');
        console.log('Existing documents:', testResult.total);
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        return false;
    }

    // Test 4: Create test document
    console.log('\n📋 Test 4: Create Test Document');
    try {
        const testDoc = await databases.createDocument(
            DATABASE_ID,
            COLLECTIONS.QUIZ_SESSIONS,
            ID.unique(),
            {
                quiz_type: 'diagnostic-test',
                session_start_time: new Date().toISOString(),
                is_completed: false,
                current_question: 0,
                current_score: 10,
                total_questions_answered: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        );
        console.log('✅ Test document created successfully:', testDoc.$id);

        // Clean up test document
        await databases.deleteDocument(DATABASE_ID, COLLECTIONS.QUIZ_SESSIONS, testDoc.$id);
        console.log('✅ Test document cleaned up');

        return true;
    } catch (error) {
        console.error('❌ Failed to create test document:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            type: error.type
        });
        return false;
    }
};

export { client, databases, account, DATABASE_ID, COLLECTIONS, ID, Query };
