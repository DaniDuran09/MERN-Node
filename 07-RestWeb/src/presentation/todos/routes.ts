import { Router } from "express";
import { TodosController } from "./controller.js";
import { TodoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl.js";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl.js";

export class TodoRoutes {

    static get routes(): Router {

        const router = Router();

        //postgres
        const datasource = new TodoDatasourceImpl();
        const todoRepository = new TodoRepositoryImpl(datasource);

        const todoController = new TodosController(todoRepository);

        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoById);

        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);

        return router;
    }
}