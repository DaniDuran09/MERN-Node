


import type { CreateTodoDto } from "../dtos/index.js";
import type { UpdateTodoDto } from "../dtos/todos/update-todo.dto.js";
import type { TodoEntity } from "../entities/todo.entity.js";

export abstract class TodoRepository {

    abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

    //todo: paginación
    abstract getAll(): Promise<TodoEntity[]>;

    abstract findById(id: number): Promise<TodoEntity>;
    abstract updateById(updateTodo: UpdateTodoDto): Promise<TodoEntity>;
    abstract deleteById(id: number): Promise<TodoEntity>;


}