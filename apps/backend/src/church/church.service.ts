import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateChurchDto } from './dto/create-church.dto';
import { UpdateChurchDto } from './dto/update-church.dto';
import { Church } from './interfaces/church.interface';

@Injectable()
export class ChurchService {
  constructor(
    private readonly firebaseService: FirebaseService,
  ) {}

  async create(createChurchDto: CreateChurchDto): Promise<Church> {
    return this.firebaseService.addDocument<Church>('churches', {
      ...createChurchDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  async findOne(id: string): Promise<Church> {
    const church = await this.firebaseService.getDocument<Church>('churches', id);
    
    if (!church) {
      throw new NotFoundException(`Church with ID ${id} not found`);
    }
    
    return church as Church;
  }

  async update(id: string, updateChurchDto: UpdateChurchDto): Promise<Church> {
    // First check if church exists
    await this.findOne(id);
    
    // Update the church
    const updatedChurch = await this.firebaseService.updateDocument<Church>('churches', id, {
      ...updateChurchDto,
      updatedAt: new Date().toISOString(),
    });
    
    if (!updatedChurch) {
      throw new NotFoundException(`Failed to update church with ID ${id}`);
    }
    
    return updatedChurch;
  }

  // Get all churches
  async findAll(): Promise<Church[]> {
    return this.firebaseService.queryCollection<Church>(
      'churches',
      [],
      ['name', 'asc']
    );
  }

  // Firebase integration for additional church data
  async getChurchEvents(churchId: string): Promise<any[]> {
    // Example of using Firestore to get church events
    return this.firebaseService.queryCollection(
      'events',
      [['churchId', '==', churchId]],
      ['startDate', 'asc']
    );
  }

  async getChurchMembers(churchId: string): Promise<any[]> {
    // Example of using Firestore to get church members
    return this.firebaseService.queryCollection(
      'members',
      [['churchId', '==', churchId]],
      ['lastName', 'asc']
    );
  }
} 