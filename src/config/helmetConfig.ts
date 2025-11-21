import helmet from "helmet";

export const getHelmetConfig = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
        return helmet({
            // Relaxed settings for development
            contentSecurityPolicy: false, // Disable CSP in development
            hsts: false, // No HTTPS enforcement in development
        });
    }

    // Production configuration optimized for APIs
    return helmet({
        // Disable CSP for API-only applications
        contentSecurityPolicy: false,

        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
        },

        // Hide server technology information
        hidePoweredBy: true,

        // Prevent MIME type sniffing
        noSniff: true,

        // Set referrer policy for API responses
        referrerPolicy: { policy: "no-referrer" },
    });
};