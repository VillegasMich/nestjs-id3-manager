import { SongMetadata } from 'src/metadata/entities/song-metadata.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @OneToMany(() => SongMetadata, (metadata) => metadata.user)
  songs: SongMetadata[];

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;
}
