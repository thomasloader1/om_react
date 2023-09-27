export const getAvailableDocuments = (countryCode) => {
    switch (countryCode) {
        default:
            return [{ id: 1, name: 'PPN' }, { id: 2, name: 'CC' }, { id: 3, name: 'CI' }, { id: 4, name: 'RUC' }];
    }
};