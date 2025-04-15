import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import MemberProfileCard from '@/components/member/MemberProfileCard';
import VowsSummary from '@/components/member/VowsSummary';
import TrainingProgress from '@/components/member/TrainingProgress';
import { getMemberProfile, Member } from '@/services/member';

const MemberHomePage = () => {
  const navigate = useNavigate();
  const [memberName, setMemberName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        setIsLoading(true);
        const memberData = await getMemberProfile();
        setMemberName(`${memberData.firstName} ${memberData.lastName}`);
        setError(null);
      } catch (err) {
        console.error('Error loading member profile:', err);
        setError('Failed to load your profile. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemberData();
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="bg-red-50 text-red-500 p-4 rounded-md my-6">
          {error}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-8">Welcome Back, {memberName}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
            <MemberProfileCard />
          </div>
          
          <div className="md:col-span-1">
            <VowsSummary />
          </div>
          
          <div className="md:col-span-1 lg:col-span-2">
            <TrainingProgress />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MemberHomePage; 