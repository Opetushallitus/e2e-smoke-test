const DOMAINS: string[] = [
  'https://untuvaopintopolku.fi',
  'https://hahtuvaopintopolku.fi',
  'https://testiopintopolku.fi',
  'https://opintopolku.fi']

export default DOMAINS

export const domainsToUse = process.env.DOMAIN !== undefined ? [process.env.DOMAIN] : DOMAINS
