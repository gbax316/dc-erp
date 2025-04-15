import React from 'react';
import { BookOpen, Award, ArrowRight } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  category: string;
  dueDate?: string;
}

const TrainingProgress = () => {
  // In a real app, this would come from an API call
  const courses: Course[] = [
    {
      id: '1',
      title: 'New Member Orientation',
      progress: 100,
      totalModules: 5,
      completedModules: 5,
      category: 'Orientation',
      dueDate: '2023-04-15'
    },
    {
      id: '2',
      title: 'Foundations of Faith',
      progress: 60,
      totalModules: 10,
      completedModules: 6,
      category: 'Discipleship',
      dueDate: '2023-06-30'
    },
    {
      id: '3',
      title: 'Introduction to Ministry',
      progress: 25,
      totalModules: 8,
      completedModules: 2,
      category: 'Leadership',
      dueDate: '2023-08-15'
    },
    {
      id: '4',
      title: 'Prayer and Worship',
      progress: 0,
      totalModules: 6,
      completedModules: 0,
      category: 'Spiritual Growth'
    }
  ];

  // Calculate overall training progress
  const totalCompleted = courses.reduce((sum, course) => sum + course.completedModules, 0);
  const totalModules = courses.reduce((sum, course) => sum + course.totalModules, 0);
  const overallProgress = Math.round((totalCompleted / totalModules) * 100);

  // Sort courses by progress descending
  const sortedCourses = [...courses].sort((a, b) => {
    // First prioritize in-progress courses (not 0% and not 100%)
    if ((a.progress > 0 && a.progress < 100) && (b.progress === 0 || b.progress === 100)) {
      return -1;
    }
    if ((b.progress > 0 && b.progress < 100) && (a.progress === 0 || a.progress === 100)) {
      return 1;
    }
    // Then sort by progress
    return b.progress - a.progress;
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Training Progress</h2>
        <div className="flex items-center">
          <span className="text-2xl font-bold text-blue-600">{overallProgress}%</span>
          <span className="ml-2 text-sm text-gray-500">complete</span>
        </div>
      </div>
      
      <div className="space-y-6">
        {sortedCourses.map(course => (
          <div key={course.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-start">
                <BookOpen className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{course.title}</h3>
                  <p className="text-xs text-gray-500">{course.category}</p>
                </div>
              </div>
              {course.progress === 100 && (
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                  <Award className="h-3 w-3 mr-1" />
                  Completed
                </div>
              )}
            </div>
            
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{course.completedModules} of {course.totalModules} modules</span>
                {course.dueDate && (
                  <span>Due: {new Date(course.dueDate).toLocaleDateString()}</span>
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    course.progress === 100 
                      ? 'bg-green-500' 
                      : course.progress > 0 
                        ? 'bg-blue-500' 
                        : 'bg-gray-300'
                  }`}
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
            
            {course.progress < 100 && (
              <div className="mt-3 text-right">
                <a
                  href={`/member/courses/${course.id}`}
                  className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-500"
                >
                  {course.progress === 0 ? 'Start Course' : 'Continue Course'}
                  <ArrowRight className="ml-1 h-3 w-3" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <a
          href="/member/courses"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          View all courses
          <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default TrainingProgress; 