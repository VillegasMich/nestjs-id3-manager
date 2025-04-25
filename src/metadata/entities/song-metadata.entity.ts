import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class SongMetadata {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Basic metadata
  @Column()
  title: string;

  @Column('text', { array: true })
  artists: string[];

  @Column()
  albumArtist: string;

  @Column('text', { array: true })
  albums: string[];

  @Column('int', { array: true })
  years: number[];

  @Column('text', { array: true })
  genres: string[];

  @Column()
  trackNumber: number;

  @Column()
  discNumber: number;

  // Technical metadata
  @Column()
  duration: string;

  @Column()
  bitrate: string;

  @Column()
  sampleRate: string;

  @Column()
  channels: number;

  @Column()
  encoder: string;

  @Column()
  fileSize: string;

  // Additional metadata
  @Column('text', { array: true })
  composers: string[];

  @Column('text', { array: true })
  conductors: string[];

  @Column()
  publisher: string;

  @Column()
  copyright: string;

  @Column()
  isrc: string;

  @Column()
  bpm: number;

  @Column()
  key: string;

  @Column()
  mood: string;

  @Column()
  language: string;

  // Comments and custom tags
  @Column({ type: 'text' })
  comments: string;

  @Column({ type: 'text' })
  lyrics: string;

  // File information
  @Column('text', { array: true })
  paths: string[];

  @Column()
  lastModified: Date;

  @Column()
  playCount: number;

  @Column()
  rating: number;

  @CreateDateColumn()
  createdAt: Date;
}
