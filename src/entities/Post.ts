import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import {ObjectType , Field , Int} from "type-graphql"
// adding schema 
@ObjectType()
@Entity()
export class Post {
  @Field(()=> Int) 
  @PrimaryKey()
  _id!: number;
  @Field(()=> String) 
  @Property()
  createdAt: Date = new Date();
  @Field(() => String) 
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
  @Field() 
  @Property({type: 'text'})
  title!: string;


//   @OneToMany(() => Book, book => book.author)
//   books = new Collection<Book>(this);

//   @ManyToMany(() => Author)
//   friends = new Collection<Author>(this);

//   @ManyToOne(() => Book, { nullable: true })
//   favouriteBook?: Book;

 

//   constructor(name: string, email: string) {
//     this.name = name;
//     this.email = email;
//   }

}