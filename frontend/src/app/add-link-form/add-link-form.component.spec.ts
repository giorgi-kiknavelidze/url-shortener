import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLinkFormComponent } from './add-link-form.component';

describe('AddLinkFormComponent', () => {
  let component: AddLinkFormComponent;
  let fixture: ComponentFixture<AddLinkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLinkFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
