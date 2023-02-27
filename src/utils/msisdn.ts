import {
  INDOSAT_PREFIXES,
  TELKOMSEL_PREFIXES,
  EXCEL_PREFIXES,
  AXIS_PREFIXES,
  THREE_PREFIXES,
  SMARTFREN_PREFIXES
} from 'constant/msisdn'

export const getMsisdnProvider = (msisdn: string) => {
  const prefixNo = msisdn.slice(0, 4)
  let telco = ''
  if (INDOSAT_PREFIXES.includes(prefixNo)) {
    telco = 'ISAT'
  } else if (TELKOMSEL_PREFIXES.includes(prefixNo)) {
    telco = 'TSEL'
  } else if (EXCEL_PREFIXES.includes(prefixNo)) {
    telco = 'EXCL'
  } else if (AXIS_PREFIXES.includes(prefixNo)) {
    telco = 'AXIS'
  } else if (THREE_PREFIXES.includes(prefixNo)) {
    telco = 'THRE'
  } else if (SMARTFREN_PREFIXES.includes(prefixNo)) {
    telco = 'FREN'
  }
  return telco
}
