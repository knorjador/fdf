
const BACKEND = import.meta.env.VITE_BACKEND;

export const CONFIG = {

    BACKEND,
    AUTH: `${BACKEND}/auth`,
    API: `${BACKEND}/api`,
    REGEXES: {
        siret: /^\d{14}$/
    }

}