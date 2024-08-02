import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialSharingPage } from './social-sharing.page';

describe('SocialSharingPage', () => {
  let component: SocialSharingPage;
  let fixture: ComponentFixture<SocialSharingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialSharingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
