import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const trainings = [
  { name: 'DCA Basic', status: 'Completed' },
  { name: 'DCA Advance', status: 'In Progress' },
  { name: 'DLI Basic', status: 'Not Started' },
  { name: 'DLI Advance', status: 'Not Started' },
  { name: 'GLI', status: 'Completed' }
];

const statusColors = {
  'Completed': 'bg-green-500 text-white',
  'In Progress': 'bg-yellow-500 text-white',
  'Not Started': 'bg-gray-300 text-black'
};

export default function TrainingProgress() {
  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Training Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {trainings.map((training) => (
          <div
            key={training.name}
            className="flex items-center justify-between border p-3 rounded-md"
          >
            <span className="font-medium">{training.name}</span>
            <Badge className={statusColors[training.status]}>
              {training.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
} 