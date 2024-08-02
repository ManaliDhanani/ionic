import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhatsAppPage } from './whats-app.page';

describe('WhatsAppPage', () => {
  let component: WhatsAppPage;
  let fixture: ComponentFixture<WhatsAppPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
