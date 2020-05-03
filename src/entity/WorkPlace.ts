import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany} from "typeorm";
import {User} from "./User";
import {Project} from "./Project";

@Entity()
export class WorkPlace {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Project, project => project.workPlace)
    projects: Project[];

    @ManyToMany(type => User, user => user.workPlaces)
    users: User[];
}
