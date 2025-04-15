import React from 'react';
import { Metadata } from 'next';
import PublicVowsForm from '@/components/forms/PublicVowsForm';

export const metadata: Metadata = {
  title: 'Vows | Dominion City',
  description: 'Make your financial vows and commitments to Dominion City',
};

export default function VowsPage() {
  return (
    <div className="container-page">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Make Your Vow</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Complete the form below to register your financial vow to Dominion City.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-sm">
        <PublicVowsForm />
      </div>
    </div>
  );
}