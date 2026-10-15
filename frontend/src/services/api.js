const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "http://127.0.0.1:8000/api/v1" : "")
).replace(/\/$/, "");

function responseMessage(data, fallback) {
  if (typeof data?.detail === "string") return data.detail;
  if (typeof data?.message === "string") return data.message;
  if (data && typeof data === "object") {
    const fields = Object.entries(data).flatMap(([field, value]) => {
      if (!Array.isArray(value)) return [];
      return value.filter((item) => typeof item === "string")
        .map((item) => `${field === "non_field_errors" ? "Form" : field}: ${item}`);
    });
    if (fields.length) return fields.join(" ");
  }
  return fallback;
}

export async function apiFetch(path, options = {}) {
  if (!API_BASE_URL) {
    throw new Error("The contact service is not configured yet. Please use the email link instead.");
  }
  const { headers, signal, ...requestOptions } = options;
  // Allow a sleeping backend to wake up, while preventing an endless spinner.
  const requestSignal = signal || AbortSignal.timeout(90000);
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...requestOptions,
      signal: requestSignal,
      headers: {
        Accept: "application/json",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
    });
  } catch (error) {
    if (error.name === "TimeoutError" || error.name === "AbortError") {
      throw new Error("The request took too long. Your enquiry may have been received. Retry the unchanged form safely, or contact us by email.");
    }
    throw new Error("We couldn’t reach the contact service. Check your connection and retry, or use the email link.");
  }
  if (response.status === 204) return null;
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await response.json() : null;
  if (!response.ok) {
    const fallback = response.status === 429
      ? "Please wait a few minutes before submitting another enquiry."
      : "We couldn’t receive your enquiry. Please retry or use the email link.";
    throw new Error(response.status >= 500 ? fallback : responseMessage(data, fallback));
  }
  // Static hosts can return index.html with HTTP 200 for a misrouted API URL.
  if (!data) throw new Error("The contact service returned an unexpected response. Please use the email link.");
  return data;
}

export { API_BASE_URL };
