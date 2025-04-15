import { useState, useEffect } from 'react';
import { Member, getMember } from '@/services/member';

interface MemberProfile extends Member {
  churchName?: string;
}

export const useMemberProfile = () => {
  const [memberProfile, setMemberProfile] = useState<MemberProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemberProfile = async () => {
      try {
        setIsLoading(true);
        // For now, we're assuming we can get the current member's ID from localStorage
        // This would typically come from an auth context in a real application
        const memberId = localStorage.getItem('currentMemberId');
        
        if (!memberId) {
          throw new Error('Not authenticated');
        }
        
        const memberData = await getMember(memberId);
        
        // In a real app, you would fetch the church name from a service
        // For now, we'll mock this data
        const memberWithChurch: MemberProfile = {
          ...memberData,
          churchName: 'First Community Church' // This would be fetched from an API
        };
        
        setMemberProfile(memberWithChurch);
        setError(null);
      } catch (err) {
        console.error('Error fetching member profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemberProfile();
  }, []);

  return { memberProfile, isLoading, error };
}; 