import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ITask } from "./interfaces/task.interface";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./schemas/task.schema";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>
  ) {}

  public async findAll(
    paginationQuery: PaginationQueryDto
  ): Promise<Task[]> {
    const { limit, offset } = paginationQuery;

    return await this.taskModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec();
  }

  public async findOne(id: string): Promise<Task> {
    const task = await this.taskModel
      .findById({ _id: id })
      .exec();

    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }

    return task;
  }

  public async create(
    createTaskDto: CreateTaskDto
  ): Promise<ITask> {
    const newTask = await new this.taskModel(createTaskDto);
    return newTask.save();
  }

  public async update(
    id: string,
    updateTaskDto: UpdateTaskDto
  ): Promise<ITask> {
    const existingTask = await this.taskModel.findByIdAndUpdate(
      { _id: id },
      updateTaskDto
    );

    if (!existingTask) {
      throw new NotFoundException(`Task #${id} not found`);
    }

    return existingTask;
  }

  public async remove(id: string): Promise<any> {
    const deletedTask = await this.taskModel.findByIdAndRemove(
      id
    );
    return deletedTask;
  }
}
