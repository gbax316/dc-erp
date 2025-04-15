import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('churches')
export class Church {
  @ApiProperty({ description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Church name' })
  @Column()
  church_name: string;

  @ApiProperty({ description: 'Church address' })
  @Column()
  address: string;

  @ApiProperty({ description: 'Church city' })
  @Column({ nullable: true })
  city: string;

  @ApiProperty({ description: 'Church state/province' })
  @Column()
  state: string;

  @ApiProperty({ description: 'Church postal code' })
  @Column({ nullable: true })
  postalCode: string;

  @ApiProperty({ description: 'Church country' })
  @Column({ nullable: true })
  country: string;

  @ApiProperty({ description: 'Membership strength' })
  @Column({ nullable: true })
  membership_strength: number;

  @ApiProperty({ description: 'Pastor name' })
  @Column()
  pastor_name: string;

  @ApiProperty({ description: 'Pastor phone number' })
  @Column()
  pastor_phone: string;

  @ApiProperty({ description: 'Pastor email address' })
  @Column()
  pastor_email: string;

  @ApiProperty({ description: 'Admin name' })
  @Column()
  admin_name: string;

  @ApiProperty({ description: 'Admin phone number' })
  @Column()
  admin_phone: string;

  @ApiProperty({ description: 'Admin email address' })
  @Column()
  admin_email: string;

  @ApiProperty({ description: 'Church phone number' })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({ description: 'Church email address' })
  @Column({ nullable: true })
  email: string;

  @ApiProperty({ description: 'Church website URL' })
  @Column({ nullable: true })
  website: string;

  @ApiProperty({ description: 'Church logo URL' })
  @Column({ nullable: true })
  logoUrl: string;

  @ApiProperty({ description: 'Church description' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'When the church was founded' })
  @Column({ type: 'date', nullable: true })
  foundedDate: Date;

  @ApiProperty({ description: 'Church denomination/affiliation' })
  @Column({ nullable: true })
  denomination: string;

  @ApiProperty({ description: 'When the record was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'When the record was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;
} 