/**
 * Utility class containing user activity related settings
 */
export class UserActivitySettings {
  /**
   * Duration in milliseconds after which a user is considered inactive
   * Default: 2 hours
   */
  static readonly INACTIVITY_TIMEOUT_MS = 24 /** hour*/ * 60 * 60 * 1000; // 2 hours in milliseconds

  /**
   * Converts milliseconds to a human-readable duration string
   * @param ms Duration in milliseconds
   * @returns Human readable duration (e.g. "2 hours")
   */
  static getReadableDuration(ms: number): string {
    const hours = Math.floor(ms / (60 * 60 * 1000));
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }
} 
