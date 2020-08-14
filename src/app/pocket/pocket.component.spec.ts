import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketComponent } from './pocket.component';
import { MaterialModule } from '../material.module';

describe('PocketComponent', () => {
  let component: PocketComponent;
  let fixture: ComponentFixture<PocketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PocketComponent],
      imports: [MaterialModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
