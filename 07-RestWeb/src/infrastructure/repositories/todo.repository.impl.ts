import type { CreateTodoDto, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain/index.js";

export class TodoRepositoryImpl implements TodoRepository {

    constructor(
        private readonly datasource: TodoDataSource,
    ) { }


    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.create(createTodoDto);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll();
    }
    findById(id: number): Promise<TodoEntity> {
        return this.datasource.findById(id);
    }
    updateById(updateTodo: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasource.updateById(updateTodo);
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.datasource.deleteById(id);
    }

}