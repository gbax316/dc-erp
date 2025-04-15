import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class ContentService {
  constructor(
    private readonly firebaseService: FirebaseService,
  ) {}

  async getSermons(churchId: string, options: any = {}) {
    const { startDate, endDate, speaker, limit = 20 } = options;
    
    let conditions: [string, any, any][] = [
      ['churchId', '==', churchId],
      ['type', '==', 'sermon'],
    ];
    
    if (startDate) {
      conditions.push(['date', '>=', startDate]);
    }
    
    if (endDate) {
      conditions.push(['date', '<=', endDate]);
    }
    
    if (speaker) {
      conditions.push(['speaker', '==', speaker]);
    }
    
    return this.firebaseService.queryCollection(
      'content',
      conditions,
      ['date', 'desc'],
      limit
    );
  }

  async getDevotionals(churchId: string, options: any = {}) {
    const { startDate, endDate, author, limit = 20 } = options;
    
    let conditions: [string, any, any][] = [
      ['churchId', '==', churchId],
      ['type', '==', 'devotional'],
    ];
    
    if (startDate) {
      conditions.push(['date', '>=', startDate]);
    }
    
    if (endDate) {
      conditions.push(['date', '<=', endDate]);
    }
    
    if (author) {
      conditions.push(['author', '==', author]);
    }
    
    return this.firebaseService.queryCollection(
      'content',
      conditions,
      ['date', 'desc'],
      limit
    );
  }

  async getBlogs(churchId: string, options: any = {}) {
    const { category, author, limit = 20 } = options;
    
    let conditions: [string, any, any][] = [
      ['churchId', '==', churchId],
      ['type', '==', 'blog'],
    ];
    
    if (category) {
      conditions.push(['category', '==', category]);
    }
    
    if (author) {
      conditions.push(['author', '==', author]);
    }
    
    return this.firebaseService.queryCollection(
      'content',
      conditions,
      ['publishedAt', 'desc'],
      limit
    );
  }

  async getContentItem(id: string) {
    return this.firebaseService.getDocument('content', id);
  }

  async createContent(contentData: any) {
    return this.firebaseService.addDocument('content', contentData);
  }

  async updateContent(id: string, contentData: any) {
    return this.firebaseService.updateDocument('content', id, contentData);
  }

  async deleteContent(id: string) {
    return this.firebaseService.deleteDocument('content', id);
  }
} 