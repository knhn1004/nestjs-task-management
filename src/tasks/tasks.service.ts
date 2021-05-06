import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with id "${id}" not found!`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string) {
    const toDeleteIndex = this.tasks.findIndex((task) => task.id === id);
    if (toDeleteIndex < 0) {
      throw new NotFoundException(`Task with id "${id}" not found!`);
    }
    this.tasks.splice(toDeleteIndex, 1);
    return {
      message: 'ok',
    };
  }

  updateStatusById(id: string, status: TaskStatus): Task {
    const toUpdateIndex = this.tasks.findIndex((task) => task.id === id);
    if (toUpdateIndex < 0) {
      throw new NotFoundException(`Task with id "${id}" not found!`);
    }
    this.tasks[toUpdateIndex].status = status;
    return this.tasks[toUpdateIndex];
  }
}
