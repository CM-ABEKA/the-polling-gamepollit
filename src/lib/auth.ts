import { LoginCredentials, RegisterCredentials, User } from '@/types';

// Mock API functions - replace with actual API calls
/**
 * AuthService
 *
 * Simulates authentication flows for login, registration, token storage, and
 * current user retrieval. This implementation uses localStorage and artificial
 * delays to mimic API calls. Replace with real server-side auth for production.
 */
export class AuthService {
  private static readonly TOKEN_KEY = 'poller_auth_token';
  private static readonly USER_KEY = 'poller_user';

  /**
   * Perform a mock login and persist the returned token and user in localStorage.
   * Returns a user and token object.
   */
  static async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    // TODO: Replace with actual API call
    await this.delay(1000); // Simulate API call

    // Mock successful login
    const mockUser: User = {
      id: '1',
      email: credentials.email,
      username: credentials.email.split('@')[0],
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockToken = 'mock-jwt-token';

    this.setToken(mockToken);
    this.setUser(mockUser);

    return { user: mockUser, token: mockToken };
  }

  /**
   * Register a mock user, validate simple client-side password confirmation,
   * and persist token/user in localStorage.
   */
  static async register(credentials: RegisterCredentials): Promise<{ user: User; token: string }> {
    // TODO: Replace with actual API call
    await this.delay(1000); // Simulate API call

    if (credentials.password !== credentials.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Mock successful registration
    const mockUser: User = {
      id: '1',
      email: credentials.email,
      username: credentials.username,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockToken = 'mock-jwt-token';

    this.setToken(mockToken);
    this.setUser(mockUser);

    return { user: mockUser, token: mockToken };
  }

  /**
   * Clear token and user to simulate a logout action.
   */
  static async logout(): Promise<void> {
    // TODO: Replace with actual API call
    await this.delay(500);

    this.clearToken();
    this.clearUser();
  }

  /**
   * Return the current user if a token is present.
   * Note: In production, validate token on the server.
   */
  static async getCurrentUser(): Promise<User | null> {
    const token = this.getToken();
    if (!token) return null;

    // TODO: Replace with actual API call to validate token
    const user = this.getUser();
    return user;
  }

  /** Get the raw token from localStorage or null on server. */
  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /** Persist token to localStorage (no-op on server). */
  static setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /** Remove token from localStorage (no-op on server). */
  static clearToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Parse the stored user from localStorage, reviving date fields.
   * Returns null on parse errors or when running on server.
   */
  static getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem(this.USER_KEY);
    if (!userStr) return null;
    
    try {
      const user = JSON.parse(userStr);
      return {
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      };
    } catch {
      return null;
    }
  }

  /** Persist user to localStorage (no-op on server). */
  static setUser(user: User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /** Remove user from localStorage (no-op on server). */
  static clearUser(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.USER_KEY);
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}


