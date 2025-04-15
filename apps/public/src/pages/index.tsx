import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Users, FileText, GraduationCap, ClipboardList } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>Dominion City - Church Management Hub</title>
        <meta name="description" content="One platform to manage churches, members, services, and spiritual growth." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 shadow-sm sticky top-0 bg-white z-50">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold">
            DC
          </div>
          <span className="text-xl font-bold">Dominion City</span>
        </div>
        <div className="flex gap-2">
          <Link href="/upload-logo">
            <span className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
              Upload Logo
            </span>
          </Link>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <a href="/vows">Submit Vow</a>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <a href="/login">Login</a>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-b from-blue-100 to-white">
        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl">
          Welcome to Dominion City Hub
        </h1>
        <p className="text-lg mt-4 max-w-xl text-gray-600">
          One platform to manage churches, members, services, and spiritual growth.
        </p>
        <div className="mt-6 flex gap-4">
          <a href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
            Get Started
          </a>
          <a href="/vows" className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 font-medium">
            Submit Vow
          </a>
        </div>
      </header>

      {/* Features */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-8">What You Can Do</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border rounded-lg hover:shadow-md transition p-6 flex flex-col items-center">
            <Users className="w-8 h-8 mb-3 text-blue-600" />
            <h3 className="text-lg font-medium">Membership</h3>
            <p className="text-sm text-center text-gray-600 mt-2">
              Manage member profiles, departments, and progress.
            </p>
          </div>

          <div className="border rounded-lg hover:shadow-md transition p-6 flex flex-col items-center">
            <FileText className="w-8 h-8 mb-3 text-blue-600" />
            <h3 className="text-lg font-medium">Vows</h3>
            <p className="text-sm text-center text-gray-600 mt-2">
              Submit and track financial commitments to the church.
            </p>
          </div>

          <div className="border rounded-lg hover:shadow-md transition p-6 flex flex-col items-center">
            <GraduationCap className="w-8 h-8 mb-3 text-blue-600" />
            <h3 className="text-lg font-medium">Trainings</h3>
            <p className="text-sm text-center text-gray-600 mt-2">
              Track spiritual trainings and growth stages.
            </p>
          </div>

          <div className="border rounded-lg hover:shadow-md transition p-6 flex flex-col items-center">
            <ClipboardList className="w-8 h-8 mb-3 text-blue-600" />
            <h3 className="text-lg font-medium">Service Reports</h3>
            <p className="text-sm text-center text-gray-600 mt-2">
              Submit and view attendance, offerings, and remittance.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 py-6 border-t mt-auto">
        © Dominion City {new Date().getFullYear()}. All rights reserved.
      </footer>
    </div>
  );
} 