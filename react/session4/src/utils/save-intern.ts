

export async function saveIntern(
  request: {
    url: string;
    options: RequestInit;
  },
  fetchFn: typeof fetch = fetch,
): Promise<Response> {
  return fetchFn(request.url, request.options);
}