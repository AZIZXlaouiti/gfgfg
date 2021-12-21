import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
// adding schema 
@Entity()
export class Post {

  @PrimaryKey()
  _id!: number;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

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