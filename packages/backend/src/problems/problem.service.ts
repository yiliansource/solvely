import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateProblemDto } from "./create-problem.dto";
import { Problem } from "./problem.model";
import { QueryProblemDto } from "./query-problem.dto";
import { Tag } from "./tag.model";

@Injectable()
export class ProblemService {
    constructor(
        @InjectRepository(Problem) private readonly problemsRepository: Repository<Problem>,
        @InjectRepository(Tag) private readonly tagsRepository: Repository<Tag>,
    ) {}

    async create(dto: CreateProblemDto) {
        const tags = await Promise.all(
            dto.tags.map(async (name) => {
                let tag = await this.tagsRepository.findOneBy({ name });
                if (!tag) {
                    tag = this.tagsRepository.create({ name });
                    await this.tagsRepository.save(tag);
                }
                return tag;
            }),
        );

        const newProblem = this.problemsRepository.create({
            content: dto.content,
            authorId: dto.authorId,
            source: dto.source,
            tags,
        });

        const problem = await this.problemsRepository.save(newProblem);
        return problem;
    }

    async query(dto: QueryProblemDto) {
        const query = this.problemsRepository.createQueryBuilder("problem").leftJoinAndSelect("problem.tags", "tag");

        if (dto.tags && dto.tags.length > 0) query.andWhere("tag.name IN (:...tags)", { tags: dto.tags });
        if (dto.source) query.andWhere("problem.source = :source", { source: dto.source });
        if (dto.content) query.andWhere("problem.content ILIKE :content", { content: `%${dto.content}%` });

        const results = await query.getMany();
        return results;
    }
}

