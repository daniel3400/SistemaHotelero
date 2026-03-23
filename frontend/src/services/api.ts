const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

const buildHeaders = (token?: string | null) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };

  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Error inesperado." }));
    throw new Error(error.message ?? "Error inesperado.");
  }
  return response.json();
};

export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({ username, password })
  });

  return handleResponse<{ token: string }>(response);
};

export const getDashboardSummary = async (token: string) => {
  const response = await fetch(`${API_URL}/dashboard/summary`, {
    headers: buildHeaders(token)
  });
  return handleResponse<{
    roomsAvailable: number;
    roomsCleaningPending: number;
    roomsOccupied: number;
    activeStays: number;
    pendingPayments: number;
  }>(response);
};

export const listRooms = async (token: string, status?: string) => {
  const query = status ? `?status=${status}` : "";
  const response = await fetch(`${API_URL}/rooms${query}`, {
    headers: buildHeaders(token)
  });
  return handleResponse<Array<Record<string, unknown>>>(response);
};

export const listGuests = async (token: string) => {
  const response = await fetch(`${API_URL}/guests`, {
    headers: buildHeaders(token)
  });
  return handleResponse<Array<Record<string, unknown>>>(response);
};

export const listActiveStays = async (token: string) => {
  const response = await fetch(`${API_URL}/stays/active`, {
    headers: buildHeaders(token)
  });
  return handleResponse<Array<Record<string, unknown>>>(response);
};

export const listPayments = async (token: string) => {
  const response = await fetch(`${API_URL}/payments`, {
    headers: buildHeaders(token)
  });
  return handleResponse<Array<Record<string, unknown>>>(response);
};
