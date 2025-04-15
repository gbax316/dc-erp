import { randomBytes } from 'crypto';

/**
 * Generates a random password with specified length containing a mix of:
 * - Uppercase letters
 * - Lowercase letters
 * - Numbers
 * - Special characters
 */
export function generateRandomPassword(length: number = 12): string {
  const charset = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    special: '!@#$%^&*'
  };

  // Ensure at least one character from each set
  let password = '';
  password += charset.uppercase[Math.floor(Math.random() * charset.uppercase.length)];
  password += charset.lowercase[Math.floor(Math.random() * charset.lowercase.length)];
  password += charset.numbers[Math.floor(Math.random() * charset.numbers.length)];
  password += charset.special[Math.floor(Math.random() * charset.special.length)];

  // Fill the rest with random characters from all sets
  const allChars = Object.values(charset).join('');
  const remainingLength = length - password.length;

  for (let i = 0; i < remainingLength; i++) {
    const randomBytes = randomBytes(1);
    password += allChars[randomBytes[0] % allChars.length];
  }

  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
} 