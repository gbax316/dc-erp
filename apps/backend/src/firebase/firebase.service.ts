import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private firestore: admin.firestore.Firestore;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.initializeFirebase();
  }

  private initializeFirebase() {
    if (!admin.apps.length) {
      try {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: this.configService.get<string>('firebase.projectId'),
            clientEmail: this.configService.get<string>('firebase.clientEmail'),
            privateKey: this.configService.get<string>('firebase.privateKey'),
          }),
          databaseURL: this.configService.get<string>('firebase.databaseURL'),
        });
        
        this.firestore = admin.firestore();
        console.log('Firebase Admin SDK initialized successfully');
      } catch (error) {
        console.error('Error initializing Firebase Admin SDK:', error);
      }
    } else {
      this.firestore = admin.firestore();
    }
  }

  getFirestore(): admin.firestore.Firestore {
    return this.firestore;
  }

  // Helper methods for Firestore operations
  async getDocument<T>(collection: string, docId: string): Promise<T | null> {
    try {
      const docRef = this.firestore.collection(collection).doc(docId);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        return null;
      }
      
      return { id: doc.id, ...doc.data() } as unknown as T;
    } catch (error) {
      console.error(`Error fetching document ${docId} from ${collection}:`, error);
      throw error;
    }
  }

  async addDocument<T>(collection: string, data: any): Promise<T> {
    try {
      const docRef = await this.firestore.collection(collection).add({
        ...data,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      
      const doc = await docRef.get();
      return { id: doc.id, ...doc.data() } as unknown as T;
    } catch (error) {
      console.error(`Error adding document to ${collection}:`, error);
      throw error;
    }
  }

  async updateDocument<T>(collection: string, docId: string, data: any): Promise<T | null> {
    try {
      const docRef = this.firestore.collection(collection).doc(docId);
      
      await docRef.update({
        ...data,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      
      const doc = await docRef.get();
      if (!doc.exists) {
        return null;
      }
      
      return { id: doc.id, ...doc.data() } as unknown as T;
    } catch (error) {
      console.error(`Error updating document ${docId} in ${collection}:`, error);
      throw error;
    }
  }

  async deleteDocument(collection: string, docId: string): Promise<boolean> {
    try {
      const docRef = this.firestore.collection(collection).doc(docId);
      await docRef.delete();
      return true;
    } catch (error) {
      console.error(`Error deleting document ${docId} from ${collection}:`, error);
      throw error;
    }
  }

  async queryCollection<T>(
    collection: string, 
    conditions: [string, admin.firestore.WhereFilterOp, any][] = [],
    orderBy?: [string, 'asc' | 'desc'],
    limit?: number
  ): Promise<T[]> {
    try {
      let query: admin.firestore.Query = this.firestore.collection(collection);
      
      // Apply where conditions
      conditions.forEach(([field, operator, value]) => {
        query = query.where(field, operator, value);
      });
      
      // Apply order by
      if (orderBy) {
        query = query.orderBy(orderBy[0], orderBy[1]);
      }
      
      // Apply limit
      if (limit) {
        query = query.limit(limit);
      }
      
      const snapshot = await query.get();
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as unknown as T[];
    } catch (error) {
      console.error(`Error querying collection ${collection}:`, error);
      throw error;
    }
  }
} 