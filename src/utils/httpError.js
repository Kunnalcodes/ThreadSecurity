/**
 * Read body as JSON when possible (handles HTML error pages from proxies).
 */
export async function readResponseJson(response) {
    const text = await response.text();
    if (!text) return {};
    try {
        return JSON.parse(text);
    } catch {
        return {};
    }
}

/**
 * Map HTTP status + parsed JSON to a short user-visible string.
 */
export function userFacingHttpMessage(status, data, fallback = 'Request failed.') {
    if (status === 429) {
        if (typeof data.error === 'string' && data.error && data.error !== 'rate_limited') {
            return data.error;
        }
        if (typeof data.message === 'string' && data.message) return data.message;
        if (typeof data.detail === 'string' && data.detail) return data.detail;
        return 'Too many requests. Please wait before trying again.';
    }
    return fallback;
}
