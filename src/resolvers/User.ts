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
@ObjectType()
class FieldError{
  @Field()
  field: string
  @Field()
  message: string
}
@ObjectType() // returned from mutation decorator 
class UserResponse {
  @Field(()=> [FieldError] , {nullable: true})
  errors?: FieldError[]
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
    @Query(() => UserResponse)
    async login(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ): Promise<UserResponse> {

        const user =await em.findOne(User , {username: options.username})
        if (!user){
            
            return {
                errors: [{
                    field: "username",
                    message: "username doesn't exist",
                }]
            }
        }
        const valid = await argon2.verify(user.password, options.password) 
        if (!valid){
            return {
                errors: [{
                    field: "password",
                    message: "incorrect password",
                }]
            }
        }
        return {
            user,
        }
    }
}