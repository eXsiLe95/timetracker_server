import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Project} from "./Project";

@Entity()
export class Activity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    start: Date;

    @Column({nullable: true})
    end: Date;

    @ManyToOne(type => Project, project => project.activities, {nullable: true})
    project: Project;
}
