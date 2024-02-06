export const getQueryString = (query: string) => {
  const url = new URL(window.location.href)
  const queryString = url.searchParams.get(query)
  return queryString
}
