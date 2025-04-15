'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Sermons', href: '/sermons' },
  { name: 'Events', href: '/events' },
  { name: 'Devotionals', href: '/devotionals' },
  { name: 'Give', href: '/give' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global" data-testid="main-navigation">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Dominion City</span>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-primary-600"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
              </svg>
              <span className="ml-2 text-xl font-bold font-serif text-gray-900">Dominion City</span>
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                pathname === item.href
                  ? 'text-primary-600 font-semibold'
                  : 'text-gray-700 hover:text-primary-600',
                'text-sm font-medium leading-6 py-2'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
          <Link href="/prayer-request" className="btn btn-primary py-2">
            Prayer Request
          </Link>
          <Link 
            href="http://localhost:3000" 
            className="btn btn-secondary py-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Admin Login
          </Link>
        </div>
      </nav>
      {/* Mobile menu */}
      <div
        className={`${mobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'} lg:hidden`}
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-black/20" aria-hidden="true" onClick={() => setMobileMenuOpen(false)} />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Dominion City</span>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-primary-600"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                </svg>
                <span className="ml-2 text-xl font-bold font-serif text-gray-900">Dominion City</span>
              </div>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      pathname === item.href
                        ? 'text-primary-600 font-semibold'
                        : 'text-gray-700 hover:text-primary-600',
                      '-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 space-y-3">
                <Link
                  href="/prayer-request"
                  className="btn btn-primary w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Prayer Request
                </Link>
                <Link
                  href="http://localhost:3000"
                  className="btn btn-secondary w-full justify-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 