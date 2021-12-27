import 'reflect-metadata';
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { CorsOptions } from 'apollo-server-express';
// import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { UserResolver } from "./resolvers/User";
import { PostResolver } from "./resolvers/Post";
import connectRedis from 'connect-redis';
import redis from 'redis';
import session from 'express-session';
import { MyContext } from './types/types';

const main = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();

    const app = express();

    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient();

    app.use(
        session({
            name: "quidd",
            store: new RedisStore({
                client: redisClient,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // session max age in miliseconds
                httpOnly: true,  // if true prevent client side JS from reading the cookie 
                sameSite: "lax", // csrf
                secure: __prod__, // cookie only works in https 
                                  // if true only transmit cookie over https
            },
            saveUninitialized: false,
            secret: "gtfj?/uj045887d656z#@$",
            resave: false,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver, UserResolver],
            validate: false,
        }),
        context: ({ req, res }): MyContext => ({
            em: orm.em,
            req,
            res
        }),
    });

    apolloServer.applyMiddleware({ app });

    app.listen(8000, () => {
        console.log('🚀 listening on port 8000')
    })
};

main().catch(err => console.log(err))
//  1. Server<<session>> --> cookie storage<browser>
//  2. browser<<cookie>> --> Server<Session: {
                                 //      cookie : {...props}
                                //       userId : user_id
                                           //}>