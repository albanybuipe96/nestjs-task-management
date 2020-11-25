import { Logger } from "@nestjs/common";
import { User } from "src/users/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./providers/task-status.enum";
import { Task } from "./providers/task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    private logger = new Logger('TaskRepository')

    async createTask(createTaskDto: CreateTaskDto, req): Promise<Task> {
        const { title, description } = createTaskDto
        const task = new Task()
        task.title = title
        task.description = description
        task.status = TaskStatus.OPEN
        task.user = req.user
        task.userId = req.user._id
        await this.insert(task)
        delete task.user
        return task
    }
}