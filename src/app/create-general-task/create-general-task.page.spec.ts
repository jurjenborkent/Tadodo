import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateGeneralTaskPage } from './create-general-task.page';

describe('CreateGeneralTaskPage', () => {
  let component: CreateGeneralTaskPage;
  let fixture: ComponentFixture<CreateGeneralTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGeneralTaskPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateGeneralTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
