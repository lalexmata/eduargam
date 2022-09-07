import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

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

  @Column({ type: 'varchar', length: 200 })
  contact: string;

  @Column({ type: 'varchar', length: 200 })
  city: string;

  @Column({ type: 'varchar', length: 200 })
  comuna: string;


  @OneToOne( () => User, (user) => user.client, { nullable:true })
  user: User
}
