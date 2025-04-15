import React from 'react';
import { User, Mail, Building, Briefcase, BookOpen } from 'lucide-react';

interface MemberProfileProps {
  member: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImageUrl?: string;
    churchName?: string;
    department?: string;
    trainings_attended?: string[];
  };
}

const MemberProfileCard: React.FC<MemberProfileProps> = ({ member }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 bg-gray-50 p-6 flex justify-center items-start">
          <div className="relative">
            {member.profileImageUrl ? (
              <img 
                src={member.profileImageUrl} 
                alt={`${member.firstName} ${member.lastName}`}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow">
                <User size={48} className="text-gray-400" />
              </div>
            )}
          </div>
        </div>
        
        <div className="w-full md:w-2/3 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {member.firstName} {member.lastName}
          </h2>
          
          <div className="space-y-3 mt-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-500 mr-3" />
              <span className="text-gray-600">{member.email}</span>
            </div>
            
            {member.churchName && (
              <div className="flex items-center">
                <Building className="h-5 w-5 text-gray-500 mr-3" />
                <span className="text-gray-600">{member.churchName}</span>
              </div>
            )}
            
            {member.department && (
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 text-gray-500 mr-3" />
                <span className="text-gray-600">{member.department}</span>
              </div>
            )}
          </div>
          
          {member.trainings_attended && member.trainings_attended.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-start">
                <BookOpen className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Trainings Attended</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.trainings_attended.map((training, index) => (
                      <span 
                        key={index} 
                        className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full"
                      >
                        {training}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberProfileCard; 