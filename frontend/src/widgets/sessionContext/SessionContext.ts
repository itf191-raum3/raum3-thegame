import { initializeGameSession } from 'api/APIUtils';

export async function getSessionId(subjectId: string) {
  const localStorageName = 'GameSessionId_' + subjectId;
  let sessionId = localStorage.getItem(localStorageName);

  if (!sessionId) {
    sessionId = await initializeGameSession(subjectId);
    localStorage.setItem(localStorageName, sessionId);
  }

  return sessionId;
}
