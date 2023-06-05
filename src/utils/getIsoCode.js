export const getIsoCode = (country) => {
    switch (country) {
        case 'Chile':
            return 'ch';
        case 'Argentina':
            return 'ar';
        case 'Mexico':
            return 'mx';
        default:
            return 'usd';
    }
};