import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Multimedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext' })
  uri: string;

  @Column({ type: 'varchar', length: 10, default: 'png' })
  extension: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToMany(() => Post, (post) => post.images)
  posts: Post[];

  @OneToOne(() => Product, (product) => product.multimedia, { nullable: true })
  product: Product;
}
