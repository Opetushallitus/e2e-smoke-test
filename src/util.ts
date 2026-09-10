import axios from 'axios'
import {
  KONFO_GET_KOULUTUS_WITH_TOTEUTUKSET,
  KONFO_GET_KOULUTUS_WITH_HAKU_AND_HAKUKOHDE,
  type Endpoint
} from './endpoints'
import type { KonfoParams } from './params'

interface KonfoSearchResponse {
  hits: Array<{
    oid: string
    toteutukset: Array<{ toteutusOid: string }>
  }>
}

interface KoulutusResponse {
  haut: Array<{ oid: string }>
  hakukohteet: Array<{ oid: string }>
}

const formatUrl = (endpoint: Endpoint, params: Record<string, string>): string =>
  endpoint.params.reduce((url, param) => url.replace('%s', params[param]), endpoint.url)

const connectToEndpoint = async (domain: string, endpoint: Endpoint, params: Record<string, string>): Promise<number> => {
  const url = formatUrl(endpoint, params)
  const response = await axios.get(`${domain}/${url}`)
  return response.status
}

export const getKonfoParams = async (domain: string): Promise<KonfoParams> => {
  const { data } = await axios.get<KonfoSearchResponse>(`${domain}/${KONFO_GET_KOULUTUS_WITH_TOTEUTUKSET}`)
  const { hits } = data
  for (const { oid: koulutusOid, toteutukset: [{ toteutusOid }] } of hits) {
    // eslint-disable-next-line no-await-in-loop -- must stop at the first match, so requests can't run in parallel
    const { data: koulutusData } = await axios.get<KoulutusResponse>(`${domain}/${KONFO_GET_KOULUTUS_WITH_HAKU_AND_HAKUKOHDE.replace('%s', koulutusOid)}`)
    const { haut, hakukohteet } = koulutusData
    if (haut.length > 0 && hakukohteet.length > 0) {
      return {
        domain,
        koulutusOid,
        toteutusOid,
        hakuOid: haut[0].oid,
        hakukohdeOid: hakukohteet[0].oid
      }
    }
  }
  throw new Error('Could not find a toteutus with at least one haku and hakukohde')
}

export default connectToEndpoint
