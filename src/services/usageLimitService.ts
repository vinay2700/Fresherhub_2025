interface UsageData {
  count: number;
  resetTime: number;
}

class UsageLimitService {
  private readonly STORAGE_KEY = 'fresherhub_usage_limit';
  private readonly MAX_USES = 5;
  private readonly RESET_HOURS = 1.5;
  private subscribers: ((data: UsageData) => void)[] = [];
  private resetTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.initializeResetTimer();
  }

  private initializeResetTimer() {
    const data = this.getUsageData();
    if (data.resetTime > Date.now()) {
      const timeUntilReset = data.resetTime - Date.now();
      this.resetTimer = setTimeout(() => {
        this.resetUsage();
      }, timeUntilReset);
    }
  }

  private getUsageData(): UsageData {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        // Check if reset time has passed
        if (Date.now() >= data.resetTime) {
          return this.resetUsage();
        }
        return data;
      }
    } catch (error) {
      console.error('Error reading usage data:', error);
    }
    
    // Initialize new usage data
    return this.resetUsage();
  }

  private saveUsageData(data: UsageData): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving usage data:', error);
    }
  }

  private resetUsage(): UsageData {
    const resetTime = Date.now() + (this.RESET_HOURS * 60 * 60 * 1000);
    const data: UsageData = {
      count: 0,
      resetTime
    };
    
    this.saveUsageData(data);
    this.notifySubscribers(data);
    
    // Set up next reset timer
    if (this.resetTimer) {
      clearTimeout(this.resetTimer);
    }
    this.resetTimer = setTimeout(() => {
      this.resetUsage();
    }, this.RESET_HOURS * 60 * 60 * 1000);
    
    return data;
  }

  private notifySubscribers(data: UsageData): void {
    this.subscribers.forEach(callback => callback(data));
  }

  public getRemainingUses(): number {
    const data = this.getUsageData();
    return Math.max(0, this.MAX_USES - data.count);
  }

  public canUseTools(): boolean {
    return this.getRemainingUses() > 0;
  }

  public useOneTool(): boolean {
    const data = this.getUsageData();
    
    if (data.count >= this.MAX_USES) {
      return false;
    }
    
    data.count += 1;
    this.saveUsageData(data);
    this.notifySubscribers(data);
    
    return true;
  }

  public getResetTimeRemaining(): string {
    const data = this.getUsageData();
    const timeRemaining = data.resetTime - Date.now();
    
    if (timeRemaining <= 0) {
      return '0 minutes';
    }
    
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes} minutes`;
  }

  public subscribe(callback: (data: UsageData) => void): () => void {
    this.subscribers.push(callback);
    
    // Immediately call with current data
    callback(this.getUsageData());
    
    // Return unsubscribe function
    return () => {
      const index = this.subscribers.indexOf(callback);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }

  // Debug methods
  public getUsageInfo(): { remaining: number; resetTime: string; canUse: boolean } {
    return {
      remaining: this.getRemainingUses(),
      resetTime: this.getResetTimeRemaining(),
      canUse: this.canUseTools()
    };
  }

  public forceReset(): void {
    this.resetUsage();
  }
}

export const usageLimitService = new UsageLimitService();