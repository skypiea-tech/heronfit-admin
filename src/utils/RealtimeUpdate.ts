/**
 * Utility class for managing real-time updates from Supabase
 */
export class RealtimeUpdate {
  private static intervals: Map<string, number> = new Map()
  private static DEFAULT_INTERVAL = 10000 // 10 seconds

  /**
   * Starts a real-time update for a specific key
   * @param key Unique identifier for this update interval
   * @param updateFn Function to be called on each interval
   * @param intervalMs Optional interval in milliseconds (default: 10000)
   */
  static startUpdate(
    key: string,
    updateFn: () => Promise<void>,
    intervalMs: number = this.DEFAULT_INTERVAL
  ): void {
    // Clear any existing interval for this key
    this.stopUpdate(key)

    // Initial update
    updateFn()

    // Set up new interval
    const intervalId = window.setInterval(updateFn, intervalMs)
    this.intervals.set(key, intervalId)
  }

  /**
   * Stops a real-time update for a specific key
   * @param key Unique identifier for the update interval to stop
   */
  static stopUpdate(key: string): void {
    const intervalId = this.intervals.get(key)
    if (intervalId) {
      clearInterval(intervalId)
      this.intervals.delete(key)
    }
  }

  /**
   * Stops all real-time updates
   */
  static stopAllUpdates(): void {
    this.intervals.forEach((intervalId, key) => {
      clearInterval(intervalId)
      this.intervals.delete(key)
    })
  }

  /**
   * Checks if an update is running for a specific key
   * @param key Unique identifier for the update interval
   * @returns boolean indicating if the update is running
   */
  static isUpdateRunning(key: string): boolean {
    return this.intervals.has(key)
  }

  /**
   * Gets the default update interval in milliseconds
   */
  static getDefaultInterval(): number {
    return this.DEFAULT_INTERVAL
  }
} 