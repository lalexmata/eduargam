import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  rut: string;

  @Column({ type: 'varchar', length: 200 })
  email: string;

  @Column({ type: 'varchar', length: 200 })
  telephone: string;

  @Column({ type: 'longtext' })
  address: string;

  @Column({ type: 'varchar', length: 200, default: 'S/D' })
  contact: string;

  @Column({ type: 'varchar', length: 200, default: 'S/D' })
  city: string;

  @Column({ type: 'varchar', length: 200, default: 'S/D' })
  comuna: string;

  @Column({ type: 'longtext', nullable: true })
  logo: string;

  @Column({ type: 'integer', nullable: false, default: false })
  mostrar_en_principal: boolean;

  @OneToOne(() => User, (user) => user.client, { nullable: true })
  user: User;
}
