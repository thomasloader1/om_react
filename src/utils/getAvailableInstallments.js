export const getAvailableInstallments = (countryCode) => {
    switch (countryCode) {
        case 'ch': //Chile
            return [8, 6, 3, 1];
        case 'ar':
            return [1, 3, 6, 9, 12, 18, 24];
        default:
            return [12, 9, 6, 3, 1];
    }
};