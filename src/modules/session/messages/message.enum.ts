export enum SessionMessage {
  USER_NOT_FOUND = 'حساب کاربری پیدا نشد',
  SESSION_NOT_FOUND = 'Session not found',
  WORKOUT_NOT_FOUND = 'Workout template not found',
  ACCESS_DENIED = 'Access denied',
  SESSION_ALREADY_COMPLETED = 'Session is already completed',
  SESSION_PRACTICE_NOT_FOUND = 'Session practice not found',
  CANNOT_RECORD_FOR_COMPLETED_SESSION = 'Cannot record sets for completed session',
  CANNOT_DELETE_OTHERS_SESSIONS = 'You can only delete your own sessions',
  INVALID_SESSION_STATE_FOR_PAUSE = 'Session is not in a state that can be paused',
  INVALID_SESSION_STATE_FOR_RESUME = 'Session is not in a state that can be resumed',
  PRACTICE_NOT_FOUND = 'Practice not found',
}
