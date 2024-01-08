import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainWebsiteComponent } from './main-website.component';

describe('MainWebsiteComponent', () => {
  let component: MainWebsiteComponent;
  let fixture: ComponentFixture<MainWebsiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainWebsiteComponent]
    });
    fixture = TestBed.createComponent(MainWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
