import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusPipe } from './pipes/task-status.pipe';
import { TaskStatus } from './providers/task-status.enum';
import { Task } from './providers/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    private logger = new Logger('TasksController')

    @Get()
    getTasks(@Req() req): Promise<Task[]> {
        this.logger.verbose(`${req.user.username} retrieving all tasks.`)
        return this.tasksService.getTasks(req)
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string, @Req() req) {
        this.logger.verbose(`${req.user.username} retrieving task with id ${id}`)
        return this.tasksService.getTaskById(id, req)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @Req() req,
    ): Promise<Task> {
        this.logger.verbose(`${req.user.username} creating task ${JSON.stringify(createTaskDto)}`)
        return this.tasksService.createTask(createTaskDto, req)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string, @Req() req): Promise<void> {
        return this.tasksService.deleteTask(id, req)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus,
    ) {
        this.tasksService.updateTaskStatus(id, status)
    }

}
