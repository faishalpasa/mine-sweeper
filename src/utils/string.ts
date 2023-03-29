export const isJsonStringValid = (jsonString: string) => {
  try {
    JSON.parse(jsonString)
  } catch (e) {
    return false
  }
  return true
}

export const maskPhoneNumber = (phoneNumber: string, mask = '*', maskLength = 6) => {
  return (
    phoneNumber.slice(0, phoneNumber.length - maskLength) +
    phoneNumber.slice(-maskLength).replace(/./g, mask)
  )
}
