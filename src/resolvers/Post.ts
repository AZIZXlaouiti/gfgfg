import { Post } from "../entities/Post";
import { MyContext } from "src/types";
import { Resolver  , Query , Ctx} from "type-graphql";

@Resolver()
export class PostResolver {
    @Query(()=> [Post]) // setting graphql type
    posts(
        @Ctx() {em}: MyContext
    ): Promise<Post[]> // setting typescript type
        {
            return em.find(Post , {}); // return a Promise of posts 
        }
}

