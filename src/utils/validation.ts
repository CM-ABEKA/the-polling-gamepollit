/**
 * Validation utilities for forms and user input
 */

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateUsername(username: string): {
  isValid: boolean;
  error?: string;
} {
  if (username.length < 3) {
    return {
      isValid: false,
      error: 'Username must be at least 3 characters long',
    };
  }

  if (username.length > 20) {
    return {
      isValid: false,
      error: 'Username must be less than 20 characters long',
    };
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return {
      isValid: false,
      error: 'Username can only contain letters, numbers, and underscores',
    };
  }

  return { isValid: true };
}

export function validatePollTitle(title: string): {
  isValid: boolean;
  error?: string;
} {
  const trimmedTitle = title.trim();

  if (trimmedTitle.length === 0) {
    return {
      isValid: false,
      error: 'Poll title is required',
    };
  }

  if (trimmedTitle.length < 5) {
    return {
      isValid: false,
      error: 'Poll title must be at least 5 characters long',
    };
  }

  if (trimmedTitle.length > 200) {
    return {
      isValid: false,
      error: 'Poll title must be less than 200 characters long',
    };
  }

  return { isValid: true };
}

export function validatePollOptions(options: string[]): {
  isValid: boolean;
  error?: string;
} {
  const validOptions = options.filter(opt => opt.trim().length > 0);

  if (validOptions.length < 2) {
    return {
      isValid: false,
      error: 'Poll must have at least 2 options',
    };
  }

  if (validOptions.length > 10) {
    return {
      isValid: false,
      error: 'Poll cannot have more than 10 options',
    };
  }

  // Check for duplicate options
  const uniqueOptions = new Set(validOptions.map(opt => opt.trim().toLowerCase()));
  if (uniqueOptions.size !== validOptions.length) {
    return {
      isValid: false,
      error: 'Poll options must be unique',
    };
  }

  // Check option length
  for (const option of validOptions) {
    if (option.trim().length > 100) {
      return {
        isValid: false,
        error: 'Each option must be less than 100 characters long',
      };
    }
  }

  return { isValid: true };
}
