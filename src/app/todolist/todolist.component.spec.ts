import { TodolistComponent } from './todolist.component';

describe('TodolistComponent', () => {
  let component: TodolistComponent;

  beforeEach(() => {
    component = new TodolistComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
