import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class EventService {
  constructor(
    private readonly firebaseService: FirebaseService,
  ) {}

  async getEvents(churchId: string, options: any = {}) {
    const { startDate, endDate, category, limit = 20 } = options;
    
    let conditions: [string, any, any][] = [
      ['churchId', '==', churchId],
    ];
    
    if (startDate) {
      conditions.push(['startDate', '>=', startDate]);
    }
    
    if (endDate) {
      conditions.push(['endDate', '<=', endDate]);
    }
    
    if (category) {
      conditions.push(['category', '==', category]);
    }
    
    return this.firebaseService.queryCollection(
      'events',
      conditions,
      ['startDate', 'asc'],
      limit
    );
  }

  async getEvent(id: string) {
    return this.firebaseService.getDocument('events', id);
  }

  async createEvent(eventData: any) {
    return this.firebaseService.addDocument('events', eventData);
  }

  async updateEvent(id: string, eventData: any) {
    return this.firebaseService.updateDocument('events', id, eventData);
  }

  async deleteEvent(id: string) {
    return this.firebaseService.deleteDocument('events', id);
  }

  async getEventAttendees(eventId: string) {
    return this.firebaseService.queryCollection(
      'eventAttendees',
      [['eventId', '==', eventId]],
      ['registeredAt', 'asc']
    );
  }

  async registerAttendee(eventId: string, attendeeData: any) {
    return this.firebaseService.addDocument('eventAttendees', {
      ...attendeeData,
      eventId,
      registeredAt: new Date().toISOString(),
    });
  }
} 