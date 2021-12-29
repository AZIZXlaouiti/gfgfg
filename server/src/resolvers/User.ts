import { User } from "../entities/User";
import { MyContext } from "src/types/types";
import { ObjectType,Ctx, Field, Resolver, Arg, Mutation, InputType , Query } from "type-graphql";
import argon2 from 'argon2'
// import { EntityManager } from '@mikro-orm/postgresql'

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
    @Query (()=> User , {nullable: true})
    async me(
         @Ctx() { req , em }:MyContext
     ){
         if (!req.session.userId){
             return null;
            }
       
       const user = await em.findOne(User , {_id: req.session.userId})
       return user;
     }
     


    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em , req }: MyContext
    ) : Promise<UserResponse>{

        if (/\s/g.test(options.username)){
           return {
               errors:[
                   {   
                       field:"username",
                       message:'no white spaces are allowed',
                   },
               ]
           }
        }
        if (options.username.length <=2){
            return {
                errors:[
                    {   
                        field:"username",
                        message:'length must be greater than 2',
                    },
                ]
            }
        }
        
        const res =  await em.findOne(User, { username: options.username });
        if(res){
            return {
                errors:[
                    {
                        field:"username",
                        message:"user already taken"
                    }
                ]
              }
        } 
        
          
            const hash = await argon2.hash(options.password);
            const user = em.create(User,
                 { username: options.username,
                     password: hash 
                 });
            await em.persistAndFlush(user);
    
           
           // store cookie session 
           req.session!.userId = user._id;
    
            return {
                user,
               
            }
        
        
    }


    @Query(()=> [User])
    async users(
        @Ctx() {em}:MyContext
    ){
        return em.find(User , {})
     }

    @Mutation(()=> Boolean)
    async deleteUser(
        @Arg("username") username: string,
        @Ctx() { em }: MyContext
    ): Promise<boolean> {
      try{
        await em.nativeDelete(User , { username })
      }
      catch{
        return false
      }
      return true
    }

     
    @Mutation(() => UserResponse)
    async login(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em , req}: MyContext
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
                }
              ],
            };
        }

        req.session!.userId = user._id;

        return { 
            user,
        };
    }
}
// redis session update conflict
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/49941#issuecomment-748513261