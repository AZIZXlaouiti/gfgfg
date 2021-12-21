import {MikroORM} from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
const main = async ()=>{
    const orm = await MikroORM.init(mikroOrmConfig);
     await orm.getMigrator().up();
     const app =  express();
     app.listen(8000 ,()=> {
         console.log('listening on port 8000')
     })
     app.get('/' , (_ , res )=>{
         res.send("welcome !")
     })

    }; 
    // // await orm.isConnected();
    // const post = orm.em.create(Post , {title: 'first time using mikroOrm'})
    // await orm.em.persistAndFlush(post)
    // const posts = await orm.em.find(Post , {})
    // console.log(posts , "all")
main().catch(err => console.log(err))