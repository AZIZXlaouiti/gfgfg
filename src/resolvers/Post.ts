import { Post } from "../entities/Post";
import { MyContext } from "src/types";
import { Resolver  , Query , Ctx , Arg  , Mutation} from "type-graphql";

@Resolver()
export class PostResolver {

    // index get all posts     
    @Query(()=> [Post]) // setting graphql type
    posts(
        @Ctx() {em}: MyContext
        ): Promise<Post[]> // setting typescript type
        {
            return em.find(Post , {}); // return a Promise of posts 
        }
        
    // show get specific post
    @Query(()=> Post , { nullable: true })    
    post(
        @Arg("id" ) _id: number,
        @Ctx() { em }: MyContext
    ):Promise<Post| null> {
        return em.findOne(Post , { _id });
    } 
    
    // create post
    @Mutation(()=> Post)    
    async createPost(
        @Arg("title" ) title: String, // adding arguments
        @Ctx() { em }: MyContext
    ):Promise<Post> {
        const post = em.create(Post , {title})
        em.persistAndFlush(post)
        return post ;
    }
  
    @Mutation(() => Post, { nullable: true })
    async updatePost(
      @Arg("id") _id: number,
      @Arg("title", () => String, { nullable: true }) title: string,
      @Ctx() { em }: MyContext
    ): Promise<Post | null> {
      const post = await em.findOne(Post, { _id });
      if (!post) {
        return null;
      }
      if (typeof title !== "undefined") {
        post.title = title;
        await em.persistAndFlush(post);
      }
      return post;
    }
}

// querying --> getting data 
// mutation --> insertion / creation 