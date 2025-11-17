/**
 * Firebase Admin SDK initialization module
 *
 * This module handles the initialization of Firebase Admin SDK for server-side
 * operations. It sets up authentication, Firestore database, and Storage.
 */

import {
    initializeApp,
    cert,
    getApps,
    App,
    AppOptions,
    ServiceAccount,
} from "firebase-admin/app";

import { getFirestore, Firestore, FirestoreSettings  } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";
import { getStorage, Storage } from "firebase-admin/storage";

/**
 * Retrieves Firebase configuration from environment variables
 *
 * @returns {AppOptions} Firebase application configuration object
 * @throws {Error} If any required environment variables are missing
 */
const getFirebaseConfig = (): AppOptions => {
    const {
        FIREBASE_PROJECT_ID,
        FIREBASE_CLIENT_EMAIL,
        FIREBASE_PRIVATE_KEY,
        FIREBASE_STORAGE_BUCKET,
    } = process.env;

    // Validate that all required configuration values are present
    if (
        !FIREBASE_PROJECT_ID ||
        !FIREBASE_CLIENT_EMAIL ||
        !FIREBASE_PRIVATE_KEY ||
        !FIREBASE_STORAGE_BUCKET
    ) {
        throw new Error(
            "Missing Firebase configuration. Please check your environment variables."
        );
    }

    const serviceAccount: ServiceAccount = {
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };

    return {
        credential: cert(serviceAccount),
        storageBucket: FIREBASE_STORAGE_BUCKET,
    };
};

/**
 * Initializes Firebase Admin SDK if not already initialized
 *
 * @returns {App} Firebase Admin app instance
 */
const initializeFirebaseAdmin = (): App => {
    const existingApp: App | undefined = getApps()[0];
    if (existingApp) return existingApp;

    return initializeApp(getFirebaseConfig());
};

// Initialize Firebase Admin app
const app: App = initializeFirebaseAdmin();

// Services
const db: Firestore = getFirestore(app);
db.settings({ ignoreUndefinedProperties: true } as FirestoreSettings);

const auth: Auth = getAuth(app);

const storage: Storage = getStorage(app);

const bucket = storage.bucket();

export { db, auth, storage, bucket };