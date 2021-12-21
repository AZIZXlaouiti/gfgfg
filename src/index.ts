import {MikroORM} from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";
const main = async ()=>{
    const orm = await MikroORM.init(mikroOrmConfig);
     await orm.getMigrator().up();
    // // await orm.isConnected();
    // const post = orm.em.create(Post , {title: 'first time using mikroOrm'})
    // await orm.em.persistAndFlush(post)
    // const posts = await orm.em.find(Post , {})
    // console.log(posts , "all")
}; 
main().catch(err => console.log(err))