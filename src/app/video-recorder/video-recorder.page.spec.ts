import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoRecorderPage } from './video-recorder.page';

describe('VideoRecorderPage', () => {
  let component: VideoRecorderPage;
  let fixture: ComponentFixture<VideoRecorderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoRecorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
