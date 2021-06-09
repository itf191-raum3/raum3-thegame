import React from 'react';
import { initializeGameSession } from 'api/APIUtils';
export class SessionManager {
  static readonly USERNAME_STORAGE_ID = 'GameSessionUserName';
  static readonly GAMESESSION_STORAGE_ID = 'GameSessionId_';

  private _sessionId?: string;
  private _userName: string;

  constructor(userName: string, sessionId?: string) {
    this._userName = userName;
    this._sessionId = sessionId;
  }

  get sessionId() {
    return this._sessionId;
  }

  async initializeGameSession(subjectId: string) {
    const localStorageName = SessionManager.GAMESESSION_STORAGE_ID + subjectId;

    if (!this._sessionId) {
      this._sessionId = await initializeGameSession(this._userName, subjectId);
      localStorage.setItem(localStorageName, this._sessionId);
      localStorage.setItem(SessionManager.USERNAME_STORAGE_ID, this._userName);
    }
  }
}

export const SessionContext = React.createContext<SessionManager | undefined>(undefined);
