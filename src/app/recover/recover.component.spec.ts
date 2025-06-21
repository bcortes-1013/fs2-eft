import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecoverComponent } from './recover.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('RecoverComponent', () => {
  let component: RecoverComponent;
  let fixture: ComponentFixture<RecoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecoverComponent],
      imports: [ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(RecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
