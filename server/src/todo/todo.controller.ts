import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from "@nestjs/common";
import { response } from "express";
import { TodoDTO } from "./todo.dto";
import { todos } from "./todos-mock";

let todosData = todos;

@Controller("todos")
export class TodoController {
  @Get("/all-task")
  getTodos(): TodoDTO[] {
    if(todosData.length === 0){
      return []
    } else{
      return todosData;
    } 
  }

  @Post("/add-new-task")
  createTodo(@Body() createTodo: TodoDTO): TodoDTO {
    let count = todosData.length
    const newTodo: TodoDTO = {
      id: count.toString(),
      ...createTodo
    };
    ++count;

    todosData = [...todosData, newTodo];

    return newTodo;
  }

  @Put(":id/check-box")
  updateStatus(@Body() updateStatus: TodoDTO, @Param("id") id): TodoDTO {
    todosData = todosData.map(todo => (todo.id === id ? updateStatus : todo));
    return updateStatus;
  }

  @Put(":id/edit-task-name")
  updateTaskName(@Body() updateTaskName: TodoDTO, @Param("id") id): TodoDTO {
    todosData = todosData.map(todo => (todo.id === id ? updateTaskName : todo));
    return updateTaskName;
  }

  @Delete(":id/delete-task")
  deleteTodo(@Param("id") id): TodoDTO {
    const todoToDelete = todosData.find(todo => todo.id === id);
    todosData = todosData.filter(todo => todo.id !== id);

    return todoToDelete;
  }
}
