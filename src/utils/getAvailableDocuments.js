export const getAvailableDocuments = (countryCode) => {
    switch (countryCode) {
        default:
            return [{ id: 1, name: 'RUC' }, { id: 2, name: 'CC' }, { id: 3, name: 'CU' }];
    }
};