import {MikroORM} from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

const main = async ()=>{
    const orm = await MikroORM.init({
        entities: [Post],
        dbName: 'redditdb',
        type:"postgresql",
        debug: !__prod__,
        user:'postgres',
        password:'postgres',
        port:5432,
        host:'localhost',
    });

    await orm.isConnected();
    orm.em.create(Post , {title: 'first time using mikroOrm'})
};
main()