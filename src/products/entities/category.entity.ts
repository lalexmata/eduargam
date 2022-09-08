import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "../../posts/entities/post.entity";
import {Product} from "./product.entity";

@Entity()
export class Category {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200})
  name: string;

  @Column({ type: 'varchar', length: 200})
  type: string;

  @Column({ type: 'longtext'})
  image: string;

  @ManyToMany( () => Post, (post) => post.categories)
  posts: Post[];

  @ManyToMany( () => Product, (product) => product.categories)
  products: Product[];

}
