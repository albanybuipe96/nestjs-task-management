import { User } from "src/users/user.entity";
import { Column, Entity, ManyToMany, ObjectID, ObjectIdColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity()
export class Task {
    @ObjectIdColumn()
    id: ObjectID

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    status: TaskStatus

    @ManyToMany(type => User, user => user.tasks, { eager: false })
    user: User

    @Column()
    userId: string
}