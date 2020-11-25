import { BadRequestException, PipeTransform } from "@nestjs/common"
import { TaskStatus } from "../providers/task-status.enum"


export class TaskStatusPipe implements PipeTransform {

    private readonly statuses = [
        TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE
    ]

    transform(value: any) {
        // value = value.toUpperCase()
        if (!this.validate(value)) {
            throw new BadRequestException(`${value} is not valid STATUS value`)
        }
    }

    validate(value: any): boolean {
        return this.statuses.indexOf(value) !== -1
    }

}