import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { trace } from 'console';
import { userInfo } from 'os';
import { use } from 'passport';
import { User } from 'src/users/user.entity';
import { FindConditions } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './providers/task-status.enum';
import { Task } from './providers/task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private readonly taskRepository: TaskRepository) {}

    private logger = new Logger('TasksService')

    async getTasks(req): Promise<Task[]> {
        const user = req.user
        this.logger.error(`Authenticated user not reached.`)
        return this.taskRepository.find({ userId: user._id })
    }

    async getTaskById(id: string, req): Promise<Task> {
        const user = req.user
        const task = await this.taskRepository.findOne(id, { where: { userId: user._id } })
            .catch(err => {
                throw new NotFoundException(`[getTaskById] Task with ID ${id} not found`)
            })
        if (!task) {
            throw new NotFoundException(`[getTaskById] Task with ID ${id} not found`)
        }
        return task
    }

    async createTask(createTaskDto: CreateTaskDto, req) {
        return this.taskRepository.createTask(createTaskDto, req)
    }

    async deleteTask(id: string, req): Promise<void> {
        const user = req.user
        const userId = user._id
        await this.taskRepository.delete({ id, userId })
            .catch(err => {
                throw new NotFoundException(`[TasksService.deleteTask] Task with ID ${id} not found`)
            })
    }

    async updateTaskStatus(id: string, status: TaskStatus) {
        const result = await this.taskRepository.update(id, { status })
            .catch(err => {
                if (err) {
                    throw new BadRequestException(`Error occurred while updating Task with ID ${id}`)
                }
            })
    }

}
