
const BACKEND = import.meta.env.VITE_BACKEND

export const CONFIG = {

    BACKEND,
    AUTH: `${BACKEND}/auth`,
    API: `${BACKEND}/api/company`,
    REGEXES: {
        siret: /^\d{14}$/,
        siren: /^\d{9}$/,
        company: {
            regex: /^[a-zA-Z0-9\s]{1,255}$/,
            fields: [
                { key: 'name', display: 'Nom'},
                { key: 'address', display: 'Adresse'},
                { key: 'tva', display: 'TVA'}
            ]
        }
    }
    
}