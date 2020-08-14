import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketDetailComponent } from './pocket-detail.component';
import { MaterialModule } from 'src/app/material.module';

describe('PocketDetailComponent', () => {
  let component: PocketDetailComponent;
  let fixture: ComponentFixture<PocketDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PocketDetailComponent],
      imports: [MaterialModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
