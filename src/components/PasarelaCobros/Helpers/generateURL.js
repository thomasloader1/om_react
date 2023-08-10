export function generateURL(suffix) {
    const isProduction = process.env.NODE_ENV === "production";
    const baseURL = process.env.REACT_APP_OCEANO_URL;
    const prefix = process.env.REACT_APP_API_PAYMENTS_PREFIX_PRD;

    return isProduction
        ? `${baseURL}${prefix}${suffix}`
        : suffix;
}