import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import {MikroORM} from '@mikro-orm/core'
export default  {
    entities: [Post],
    dbName: 'lireddit',
    type:"postgresql",
    debug: !__prod__,
    password:`${process.env.REACT_APP_PASS}`,
    user:"postgres"
    
} as Parameters<typeof MikroORM.init>[0] ;
