import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  NotFoundException,
  Delete,
  Param,
  Query,
} from "@nestjs/common";
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller("todos")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get("/all-task")
    public async getTodos(
      @Res() res,
      @Query() paginationQuery: PaginationQueryDto,
    ) {
        const tasks = await this.tasksService.findAll(paginationQuery);
        return res.status(HttpStatus.OK).json(tasks);
    }

  @Post("/add-new-task")
    public async addTask(
      @Res() res,
      @Body() createTaskDto: CreateTaskDto,
    ) {
      try {
        const task = await this.tasksService.create(createTaskDto);
        return res.status(HttpStatus.OK).json({
          message: 'Task has been added successfully',
          task,
        });
      } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Error: Cannot add task!',
          status: 400,
        });
      }
    }

  @Put(":id/check-box")
    public async updateStatus(
      @Res() res,
      @Param('id') id: string,
      @Body() updateTaskDto: UpdateTaskDto,
    ) {
      try {
        const task = await this.tasksService.update(
          id,
          updateTaskDto,
        );
        if (!task) {
          throw new NotFoundException('Task does not exist!');
        }
        return res.status(HttpStatus.OK).json({
          message: 'Task has been successfully updated',
          task,
        });
      } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Error: Task not updated!',
          status: 400,
        });
      }
    }

  @Put(":id/edit-task-name")
    public async updateTaskName(
      @Res() res,
      @Param('id') id: string,
      @Body() updateTaskDto: UpdateTaskDto,
    ) {
      try {
        const task = await this.tasksService.update(
          id,
          updateTaskDto,
        );
        if (!task) {
          throw new NotFoundException('Task does not exist!');
        }
        return res.status(HttpStatus.OK).json({
          message: 'Task has been successfully updated',
          task,
        });
      } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Error: Task not updated!',
          status: 400,
        });
      }
    }

  @Delete(":id/delete-task")
    public async deleteTask(@Res() res, @Param('id') id: string) {
      if (!id) {
        throw new NotFoundException('Task id does not exist');
      }
  
      const task = await this.tasksService.remove(id);
  
      if (!task) {
        throw new NotFoundException('Task does not exist');
      }
  
      return res.status(HttpStatus.OK).json({
        message: 'Customer has been deleted',
        task,
      });
    }
}
