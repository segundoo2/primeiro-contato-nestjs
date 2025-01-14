import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { findAllParameters, TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    this.tasks.push(task);
    console.log(this.tasks);
  }

  findBydId(id: string): TaskDto {
    const foundTask = this.tasks.filter((t) => t.id === id);

    if (foundTask.length) {
      return foundTask[0];
    }

    throw new HttpException(`Task width id  ${id}`, HttpStatus.NOT_FOUND);
  }

  findAll(params: findAllParameters): TaskDto[] {
    return this.tasks.filter((t) => {
      let match = true;

      if (params.title != undefined && t.title.includes(params.title)) {
        match = false;
      }

      if (params.status != undefined && t.status.includes(params.status)) {
        match = false;
      }

      return match;
    });
  }

  update(task: TaskDto) {
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);

    if (taskIndex >= 0) {
      this.tasks[taskIndex] = task;
      return;
    }

    throw new HttpException(
      `Task width id  ${task.id}`,
      HttpStatus.BAD_REQUEST,
    );
  }

  remove(id: string) {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex);
      return;
    }

    throw new HttpException(
      `Task with id ${id} not found.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
