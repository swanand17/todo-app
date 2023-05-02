import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

class Task {
  id!: number;
  name!: string;
  status: boolean = false;

  constructor(id: number, name: string, status: boolean) {
    this.id = id;
    this.name = name;
    this.status = status;
  }
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input()
  isDarkMode = true;

  @Output()
  readonly darkModeSwitched = new EventEmitter<boolean>();

  todoFC = new FormControl();
  tasks: Task[] = [];
  tasksBackup: Task[] = [];
  darkMode = true;
  themeName = '';

  filters = {
    all: true,
    active: false,
    completed: false,
  };

  deviceWidth = window.innerWidth;

  constructor() {}

  ngOnInit(): void {
    this.darkModeSwitched.emit(this.darkMode);
  }

  toggleTheme() {}

  addTask() {
    console.log(this.deviceWidth);

    if (this.todoFC.value) {
      let taskAlreadyExists = this.tasks.find(
        (task) => task.name === this.todoFC.value
      );

      if (!taskAlreadyExists) {
        let newTask = new Task(
          Math.round(Math.random() * 100),
          this.todoFC.value,
          false
        );
        this.tasks.push(newTask);
        this.tasksBackup.push(newTask);
      } else {
        alert('Task already exists.');
      }
    } else {
      alert('Task name cannot be empty.');
    }
  }

  removeTask(taskToRemove: Task) {
    this.tasks.splice(this.tasks.indexOf(taskToRemove), 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.darkModeSwitched.emit(this.darkMode);
  }

  toggleComplete(taskToggled: Task) {
    taskToggled.status = !taskToggled.status;
    this.tasks.map((task) => {
      if (task.id === taskToggled.id) {
        return {
          ...task,
          status: taskToggled.status,
        };
      } else {
        return task;
      }
    });
  }

  filterChanged(id: number, afterRemovedCompleted = false) {
    if (!afterRemovedCompleted) {
      this.tasks = [...this.tasksBackup];
    }

    if (this.tasks.length) {
      switch (id) {
        case 1: // All
          this.filters.all = true;
          this.filters.active = false;
          this.filters.completed = false;
          break;
        case 2: // Active
          this.filters.all = false;
          this.filters.active = true;
          this.filters.completed = false;
          this.showActiveTasks();
          break;
        case 3: // Completed
          this.filters.all = false;
          this.filters.active = false;
          this.filters.completed = true;
          this.showCompletedTasks();
          break;

        default:
          this.filters.all = true;
          this.filters.active = false;
          this.filters.completed = false;
          break;
      }
    } else {
      alert('Add tasks to be able to use filter');
    }
  }

  showActiveTasks() {
    this.tasks = this.tasks.filter((task) => {
      return task.status === false;
    });
  }

  showCompletedTasks() {
    this.tasks = this.tasks.filter((task) => {
      return task.status === true;
    });
  }

  removeCompletedTasks() {
    this.tasks = this.tasks.filter((task) => {
      return task.status === false;
    });
    this.tasksBackup = this.tasks;
    this.filterChanged(1, true);
  }
}
