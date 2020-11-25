import { IsIn, IsNotEmpty } from "class-validator"
import { TaskStatus } from "../providers/task-status.enum"


export class CreateTaskDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string
}