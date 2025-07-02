import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import Joi from "joi";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { LlmModule } from "./llms/llm.module";
import { Problem } from "./problems/problem.model";
import { ProblemModule } from "./problems/problem.module";
import { Tag } from "./problems/tag.model";
import { User } from "./users/user.model";
import { UserModule } from "./users/user.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                FRONTEND_URL: Joi.string().default("http://localhost:3000"),

                DATABASE_NAME: Joi.string().default("solvely"),
                DATABASE_USER: Joi.string().default("root"),
                DATABASE_PASSWORD: Joi.string().default("root"),

                PORT: Joi.number().port().default(3001),

                GOOGLE_CLIENT_ID: Joi.string().required(),
                GOOGLE_CLIENT_SECRET: Joi.string().required(),
                GOOGLE_CALLBACK_URL: Joi.string().required(),

                JWT_SECRET: Joi.string().default("math"),
            }),
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: configService.get<string>("DATABASE_USER"),
                password: configService.get<string>("DATABASE_PASSWORD"),
                database: configService.get<string>("DATABASE_NAME"),
                entities: [User, Problem, Tag],
                synchronize: true,
            }),
        }),
        AuthModule,
        ProblemModule,
        UserModule,
        LlmModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        AppService,
    ],
})
export class AppModule {}

