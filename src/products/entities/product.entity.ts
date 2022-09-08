import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "./category.entity";
import {Client} from "../../users/entities/client.entity";
import {Multimedia} from "../../multimedia/entities/multimedia.entity";

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200})
  name: string;

  @Column({ type: 'longtext'})
  description: string;

  @Column({})
  price: number;

  @Column()
  stock: number;


  @OneToOne( () => Multimedia, (multimedia) => multimedia.product, { nullable:true})
  @JoinColumn({ name: 'image_id'})
  multimedia: Multimedia

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'products_categories', //nombre de la tabla ternaria
    joinColumn: {
      name: 'products_id',
    },
    inverseJoinColumn: {
      name: 'category_id',
    },
  })
  categories: Category[];
}
