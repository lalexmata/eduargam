import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from '../../users/entities/client.entity';
import { Category } from '../../products/entities/category.entity';
import { ContactoComment } from './contacto-comment.entity';

@Entity()
export class Contacto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext' })
  comments: string;

  @Column({ default: 0 })
  status: number;

  @Column({ type: 'varchar', length: 200 })
  tipo_contacto: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToOne(() => Client, (client) => client.user, { nullable: false })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => Category, (category) => category.contacto, {
    nullable: false,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => ContactoComment, (observaciones) => observaciones.contacto)
  observaciones: ContactoComment;

}
