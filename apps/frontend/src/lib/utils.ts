import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and merges Tailwind CSS classes efficiently.
 * 
 * @param inputs - The class names to combine.
 * @returns A string containing the merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date into a human-readable string.
 * 
 * @param date - The date to format.
 * @param options - The formatting options.
 * @returns A formatted date string.
 */
export function formatDate(date: Date | string, options: Intl.DateTimeFormatOptions = {}) {
  const dateToFormat = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  
  return new Intl.DateTimeFormat('en-US', defaultOptions).format(dateToFormat);
}

/**
 * Truncates a string to a specified length and adds an ellipsis if truncated.
 * 
 * @param text - The text to truncate.
 * @param length - The maximum length of the text.
 * @returns The truncated text with an ellipsis if necessary.
 */
export function truncateText(text: string, length: number) {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Generates a URL-friendly slug from a string.
 * 
 * @param text - The text to slugify.
 * @returns A URL-friendly slug.
 */
export function slugify(text: string) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
} 