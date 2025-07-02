import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProblemController } from "./problem.controller";
import { Problem } from "./problem.model";
import { ProblemService } from "./problem.service";
import { Tag } from "./tag.model";

@Module({
    imports: [TypeOrmModule.forFeature([Problem]), TypeOrmModule.forFeature([Tag])],
    controllers: [ProblemController],
    providers: [ProblemService],
})
export class ProblemModule {}

