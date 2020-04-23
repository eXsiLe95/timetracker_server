import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne} from "typeorm";
import {User} from "./User";
import {WorkPlace} from "./WorkPlace";
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

    @ManyToOne(type => WorkPlace, workPlace => workPlace.activities, {nullable: true})
    workPlace: WorkPlace;
}
