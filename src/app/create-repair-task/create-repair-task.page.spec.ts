import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateRepairTaskPage } from './create-repair-task.page';

describe('CreateRepairTaskPage', () => {
  let component: CreateRepairTaskPage;
  let fixture: ComponentFixture<CreateRepairTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRepairTaskPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRepairTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
