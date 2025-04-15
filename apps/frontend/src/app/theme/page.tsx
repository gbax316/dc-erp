import React from 'react';
import type { Metadata } from 'next';
import ThemeShowcase from '@/components/ThemeShowcase';

export const metadata: Metadata = {
  title: 'Theme Showcase | Church App',
  description: 'View all the custom theme components and styles for our church application.',
};

export default function ThemePage() {
  return <ThemeShowcase />;
} 