import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalComponent } from '../modal/modal.component';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryComponent, ModalComponent],
      imports: [RouterTestingModule]
    });
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
