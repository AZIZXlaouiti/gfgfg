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
const main = async ()=>{
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();
    const app =  express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver , PostResolver],
            validate: false
            
        }),
        context: ()=> ({
            em: orm.em
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