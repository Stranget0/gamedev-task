export async function appFetch<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init)
  if (!response.ok) throw new Error(response.statusText)
  return response.json()
}
