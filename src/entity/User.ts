import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import {WorkPlace} from "./WorkPlace";
import {Project} from "./Project";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    mail: string;

    @ManyToMany(type => WorkPlace, workPlace => workPlace.users)
    @JoinTable()
    workPlaces: WorkPlace[];

    @ManyToMany(type => Project, project => project.users)
    @JoinTable()
    projects: Project[];

}
