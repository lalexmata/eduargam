import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../products/entities/category.entity';
import { Multimedia } from '../../multimedia/entities/multimedia.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ default: 0 })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable({
    name: 'posts_categories', //nombre de la tabla ternaria
    joinColumn: {
      name: 'post_id',
    },
    inverseJoinColumn: {
      name: 'category_id',
    },
  })
  categories: Category[];

  @ManyToMany(() => Multimedia, (multimedia) => multimedia.posts)
  @JoinTable({
    name: 'posts_multimedia', //nombre de la tabla ternaria
    joinColumn: {
      name: 'post_id',
    },
    inverseJoinColumn: {
      name: 'multimedia_id',
    },
  })
  images: Multimedia[];
}
