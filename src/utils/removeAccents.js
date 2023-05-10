export const removeAccents = (country) => {
    const accents = {
        á: 'a',
        é: 'e',
        í: 'i',
        ó: 'o',
        ú: 'u',
        Á: 'A',
        É: 'E',
        Í: 'I',
        Ó: 'O',
        Ú: 'U',
    };
    const regex = new RegExp(`[${Object.keys(accents).join('')}]`, 'g');
    return country.replace(regex, (match) => accents[match]);
};