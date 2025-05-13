export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export async function apiClient<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(url, {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  });

  const json: ApiResponse<T> = await response.json();

  if (!response.ok || json.error) {
    throw new Error(json.error || `API 요청 실패: ${response.status}`);
  }

  return json.data;
}
