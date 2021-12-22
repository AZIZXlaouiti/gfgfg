import { User } from "../entities/User";
import { MyContext } from "src/types";
import { ObjectType,Ctx, Field, Resolver, Arg, Mutation, InputType , Query } from "type-graphql";
import argon2 from 'argon2'
@InputType()// used in Arg
class UsernamePasswordInput {
    @Field()
    username: string
    @Field()
    password: string

}

@ObjectType() // returned from mutation decorator 
class UserResponse {
  @Field(()=> [Error] , {nullable: true})
  errors?: Error[]
  @Field(()=> User, {nullable: true})
  user?: User
}
@Resolver()
export class UserResolver {
    @Mutation(() => User)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ) {
        const hash = await argon2.hash(options.password);
        const user = em.create(User, { username: options.username, password: hash });
        await em.persistAndFlush(user);
        return user
    }
    @Query(()=> [User])
    async users(
        @Ctx() {em}:MyContext
    ){
        return em.find(User , {})
     }
    @Mutation(() => User)
    async login(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ) {
        try{

            const user = em.findOne(User , {username: options.username})
        }
        catch{
            return {
                errors: [{

                }]
            }
        }
    }
}