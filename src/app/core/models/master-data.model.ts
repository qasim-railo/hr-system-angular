export interface CountryMaster { countryId?: number; code: string; name: string; isActive: boolean; }
export interface CurrencyMaster { currencyId?: number; code: string; name: string; symbol: string; decimalPlaces: number; isActive: boolean; }
export interface TimeZoneMaster { timeZoneId: string; displayName: string; countryCode?: string; isActive: boolean; }
