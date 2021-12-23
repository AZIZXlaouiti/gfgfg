import 'reflect-metadata';
import {MikroORM} from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import { UserResolver } from "./resolvers/User";
import { PostResolver } from "./resolvers/Post";
import connectRedis from 'connect-redis';
import redis from 'redis';
import session from 'express-session';
import { MyContext } from './types/types';



const main = async ()=>{
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();
  
    const app = express();
  
    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient()

    app.use(
    session({
        store: new RedisStore({ 
            client: redisClient, 
            disableTouch: true,
        }),
        cookie:{
          maxAge: 1000*60*60*24*365*10, // date of expiration is 10years
          httpOnly: true ,
          sameSite: 'lax' , 
          secure: __prod__ // ensure working on production only https
        },
        saveUninitialized: false,
        secret: 'keyboard cat',
        resave: false,
    })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver , PostResolver],
            validate: false,
            
        }),
        context: ({ req , res }): MyContext=> ({
            em: orm.em , 
            req ,
            res
        })
    });
    // creating a graphql endpoint inside express 
    await apolloServer.start();
    apolloServer.applyMiddleware({ app })
    app.listen(8000 ,()=> {
        console.log('listening on port 8000')
    })
}; 
main().catch(err => console.log(err))
  
  
    // // await orm.isConnected();
    // const post = orm.em.create(Post , {title: 'first time using mikroOrm'})
    // await orm.em.persistAndFlush(post)
    // const posts = await orm.em.find(Post , {})
    // console.log(posts , "all")