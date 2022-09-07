import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "./role.entity";
import {Client} from "./client.entity";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToOne( () => Client, (client) => client.user, { nullable:true})
  @JoinColumn({ name: 'client_id'})
  client: Client
}
