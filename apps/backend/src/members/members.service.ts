import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './interfaces/member.interface';

@Injectable()
export class MembersService {
  constructor(
    private readonly firebaseService: FirebaseService,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    return this.firebaseService.addDocument<Member>('members', {
      ...createMemberDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  async findOne(id: string): Promise<Member> {
    const member = await this.firebaseService.getDocument<Member>('members', id);
    
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    
    return member as Member;
  }

  async findByChurch(churchId: string): Promise<Member[]> {
    return this.firebaseService.queryCollection<Member>(
      'members',
      [['churchId', '==', churchId]],
      ['lastName', 'asc']
    );
  }

  async update(id: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
    // First check if member exists
    await this.findOne(id);
    
    // Update the member
    const updatedMember = await this.firebaseService.updateDocument<Member>('members', id, {
      ...updateMemberDto,
      updatedAt: new Date().toISOString(),
    });
    
    if (!updatedMember) {
      throw new NotFoundException(`Failed to update member with ID ${id}`);
    }
    
    return updatedMember;
  }

  async remove(id: string): Promise<boolean> {
    // First check if member exists
    await this.findOne(id);
    
    // Delete the member
    return this.firebaseService.deleteDocument('members', id);
  }
} 