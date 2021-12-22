import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import {MikroORM} from '@mikro-orm/core'
import path from "path";
import { User } from "./entities/User";
export default  {
    migrations:{
        path: path.join(__dirname,'./migrations'), // path to the folder with migrations
        pattern:  /^[\w-]+\d+\.(js|ts)$/, // regex pattern for the migration files
    },
    entities: [Post , User],
    dbName: 'lireddit',
    type:"postgresql",
    debug: !__prod__,
    password:"postgres",
    user:"postgres"
    
} as Parameters<typeof MikroORM.init>[0] ;
