import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { Product } from './product.entity';
import { User } from '../../users/entities/user.entity';
import { Contacto } from '../../contacto/entities/contacto.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  type: string;

  @Column({ type: 'longtext' })
  image: string;

  @Column()
  slug: string;

  @Column({ type: 'longtext' })
  description: string;

  @ManyToMany(() => Post, (post) => post.categories)
  posts: Post[];

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];

  @OneToOne(() => Contacto, (contacto) => contacto.category, {
    nullable: true,
  })
  contacto: User;
}
