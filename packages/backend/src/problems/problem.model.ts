import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { Tag } from "./tag.model";

@Entity()
export class Problem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    content: string;

    @CreateDateColumn()
    publishedAt: Date;

    @UpdateDateColumn()
    lastEditedAt: Date;

    @Column({ type: "integer" })
    authorId: number;

    @Column({ type: "text" })
    source: string;

    @ManyToMany(() => Tag, (tag) => tag.problems, { cascade: true })
    @JoinTable()
    tags: Tag[];
}

