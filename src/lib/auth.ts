import { LoginCredentials, RegisterCredentials, User } from '@/types';

// Mock API functions - replace with actual API calls
export class AuthService {
  private static readonly TOKEN_KEY = 'poller_auth_token';
  private static readonly USER_KEY = 'poller_user';

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

  static async logout(): Promise<void> {
    // TODO: Replace with actual API call
    await this.delay(500);

    this.clearToken();
    this.clearUser();
  }

  static async getCurrentUser(): Promise<User | null> {
    const token = this.getToken();
    if (!token) return null;

    // TODO: Replace with actual API call to validate token
    const user = this.getUser();
    return user;
  }

  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static clearToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.TOKEN_KEY);
  }

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

  static setUser(user: User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  static clearUser(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.USER_KEY);
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
