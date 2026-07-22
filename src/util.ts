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
  const [{ oid: koulutusOid, toteutukset: [{ toteutusOid }] }] = hits
  const { data: koulutusData } = await axios.get<KoulutusResponse>(`${domain}/${KONFO_GET_KOULUTUS_WITH_HAKU_AND_HAKUKOHDE.replace('%s', koulutusOid)}`)
  const { haut, hakukohteet } = koulutusData
  const [{ oid: hakuOid }] = haut
  const [{ oid: hakukohdeOid }] = hakukohteet
  return {
    domain,
    koulutusOid,
    toteutusOid,
    hakuOid,
    hakukohdeOid
  }
}

export default connectToEndpoint
