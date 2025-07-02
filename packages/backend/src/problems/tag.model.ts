import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { Problem } from "./problem.model";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Problem, (problem) => problem.tags)
    problems: Problem[];
}

