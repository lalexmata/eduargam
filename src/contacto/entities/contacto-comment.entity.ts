import {
  Column,
  CreateDateColumn, DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {Client} from "../../users/entities/client.entity";
import { User } from '../../users/entities/user.entity';
import {Contacto} from "./contacto.entity";


@Entity()
export class ContactoComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext' })
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne( () => Contacto, (contacto) => contacto.id)
  @JoinColumn( { name: 'contacto_id'})
  contacto: Contacto;
}
