import React from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Calendar, MapPin, Star } from 'lucide-react';
import { useMemberProfile } from '@/hooks/useMemberProfile';

const MemberProfileCard = () => {
  const { memberProfile, isLoading, error } = useMemberProfile();

  if (isLoading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 animate-pulse">
        <div className="h-32 bg-gray-200 rounded-md mb-4"></div>
        <div className="h-6 bg-gray-200 rounded-md mb-2"></div>
        <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
      </div>
    );
  }

  if (error || !memberProfile) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="bg-red-50 text-red-500 p-4 rounded-md">
          {error || 'Failed to load profile information'}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600">
        {memberProfile.profileImageUrl && (
          <div className="absolute bottom-0 left-6 transform translate-y-1/2">
            <img
              src={memberProfile.profileImageUrl}
              alt={`${memberProfile.firstName} ${memberProfile.lastName}`}
              className="h-24 w-24 rounded-full border-4 border-white object-cover"
            />
          </div>
        )}
        {!memberProfile.profileImageUrl && (
          <div className="absolute bottom-0 left-6 transform translate-y-1/2 h-24 w-24 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
            <User size={32} className="text-gray-400" />
          </div>
        )}
      </div>
      
      <div className="pt-16 pb-6 px-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {memberProfile.firstName} {memberProfile.lastName}
            </h2>
            <p className="text-gray-600">{memberProfile.role || 'Member'}</p>
          </div>
          <Link
            to="/member/profile"
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-400 mr-3" />
            <span className="text-gray-600">{memberProfile.email}</span>
          </div>
          
          {memberProfile.phone && (
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-gray-600">{memberProfile.phone}</span>
            </div>
          )}
          
          {memberProfile.joinDate && (
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-gray-600">Joined: {new Date(memberProfile.joinDate).toLocaleDateString()}</span>
            </div>
          )}
          
          {memberProfile.address && (
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-gray-600">{memberProfile.address}</span>
            </div>
          )}
        </div>
        
        {memberProfile.churchName && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-gray-600">Church: {memberProfile.churchName}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberProfileCard; 