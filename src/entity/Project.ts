import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany} from "typeorm";
import {User} from "./User";
import {WorkPlace} from "./WorkPlace";
import {Activity} from "./Activity";

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => User, user => user.projects)
    users: User[];

    @ManyToOne(type => WorkPlace, workPlace => workPlace.projects)
    workPlace: WorkPlace;

    @OneToMany(type => Activity, activity => activity.project)
    activities: Activity[];
}
