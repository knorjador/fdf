
import { CONFIG } from '@/config'
import type { Company } from '@/types'

const REGEXES = CONFIG.REGEXES

const isValidSiret = (siret: string) => REGEXES.siret.test(siret)

const isModifiedCompany = (selected: Company, company: Company) => {
    const keys = Object.keys(selected) as Array<keyof Company>

    return keys.some(key => selected[key] !== company[key])
}

const isValidCompany = (company: Company) => {
    const { regex, fields } = REGEXES.company

    for (const field of fields) {
        const 
            { key, display } = field,
            value = company[key as keyof Company]

        if (!regex.test(value))
            return `${display} incorrect`
    
    }

    return true
}

const formatDetail = (detail: string): string => detail && detail.replace(/\\n/g, '\n')

export {
    isValidSiret,
    isModifiedCompany,
    isValidCompany,
    formatDetail
}