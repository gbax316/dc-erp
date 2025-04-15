import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'ADMIN',
  BRANCH_ADMIN = 'branch_admin',
  STAFF = 'STAFF',
  FINANCIAL_CONTROLLER = 'financial_controller',
  UNIT_LEADER = 'unit_leader',
  DATA_ENTRY = 'data_entry',
  MEMBER = 'MEMBER',
}

@Entity('users')
export class User {
  @ApiProperty({ description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'User\'s email address' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'User\'s first name' })
  @Column()
  firstName: string;

  @ApiProperty({ description: 'User\'s last name' })
  @Column()
  lastName: string;

  @ApiProperty({ description: 'User\'s role', enum: UserRole })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.DATA_ENTRY })
  role: UserRole;

  @ApiProperty({ description: 'User\'s phone number' })
  @Column({ nullable: true })
  phone: string;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty({ description: 'User\'s profile picture URL' })
  @Column({ nullable: true })
  profilePicture: string;

  @ApiProperty({ description: 'Two-factor authentication enabled' })
  @Column({ default: false })
  twoFactorEnabled: boolean;

  @ApiProperty({ description: 'Two-factor authentication secret' })
  @Column({ nullable: true })
  @Exclude()
  twoFactorSecret: string;

  @ApiProperty({ description: 'Whether user has verified their email' })
  @Column({ default: false })
  isEmailVerified: boolean;

  @ApiProperty({ description: 'Password reset token' })
  @Column({ nullable: true })
  @Exclude()
  resetPasswordToken: string;

  @ApiProperty({ description: 'Password reset token expiry date' })
  @Column({ nullable: true })
  @Exclude()
  resetPasswordExpires: Date;

  @ApiProperty({ description: 'Last login date' })
  @Column({ nullable: true })
  lastLoginAt: Date;

  @ApiProperty({ description: 'When the user was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'When the user was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password);
  }

  // Helper method to get full name
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}