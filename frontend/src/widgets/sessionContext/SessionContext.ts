import React from 'react';

export class SessionManager {
  readonly sessionId: string;

  constructor(sessionId: string) {
    this.sessionId = sessionId;
  }
}

const SessionContext = React.createContext<SessionManager | undefined>(undefined);

const GameSessionId = 'GameSessionId';

export { SessionContext, GameSessionId };
