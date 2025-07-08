import { Client, Account, Databases, ID, Query } from "appwrite";

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your project ID

const databases = new Databases(client);
const account = new Account(client);
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTIONS = {
    QUIZ_TYPES: 'quiz_types',
    QUIZ_SESSIONS: 'quiz_sessions',
    QUIZ_RESPONSES: 'quiz_responses',
    QUIZ_ANALYTICS: 'quiz_analytics'
}

export { client, databases, account, DATABASE_ID, COLLECTIONS, ID, Query };
