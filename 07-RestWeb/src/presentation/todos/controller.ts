import type { Request, Response } from "express"
import { prisma } from "../../data/postgres/index.js";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";
import type { TodoRepository } from "../../domain/index.js";

export class TodosController {

    //* DI (Dependency Injection)
    constructor(
        private readonly todoRepository: TodoRepository,
    ) { }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await this.todoRepository.getAll();
        return res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = + req.params.id!;
        if (isNaN(id)) return res.status(400).json({ error: 'Id is not a number' });

        try {
            const todo = await this.todoRepository.findById(id);
            return res.json(todo);
        } catch (error) {
            res.status(400).json({ error });
        }


    }

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error });

        const todo = await this.todoRepository.create(createTodoDto!);
        return res.json(todo)

    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = + req.params.id!;
        const [error, updateTodoDto] = UpdateTodoDto.create(id, req.body);
        if (error) return res.status(400).json({ error });
        if (isNaN(id)) return res.status(400).json({ error: 'Id is not a number' });
        try {
            const updatedTodo = await this.todoRepository.updateById(updateTodoDto!)
            return res.json(updatedTodo)
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = + req.params.id!;
        if (isNaN(id)) return res.status(400).json({ error: 'Id is not a number' })

        try {
            const deletedTodo = await this.todoRepository.deleteById(id);
            return res.json(deletedTodo)
        } catch (error) {
            return res.status(400).json({ error })
        }

    }
}