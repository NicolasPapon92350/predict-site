export function getSessionId(): string {
  if (typeof window === "undefined") return "";

  let sessionId = localStorage.getItem("pa_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("pa_session_id", sessionId);
  }
  return sessionId;
}
