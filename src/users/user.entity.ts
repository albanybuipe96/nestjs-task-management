import { Column, Entity, ObjectID, ObjectIdColumn, OneToMany, Unique } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Task } from "src/tasks/providers/task.entity";
import { type } from "os";

@Entity()
@Unique(['username'])
export class User {
    @ObjectIdColumn()
    _id: ObjectID

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    salt: string

    @OneToMany(type => Task, task => task.user, { eager: true })
    tasks: Task[]

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }
}