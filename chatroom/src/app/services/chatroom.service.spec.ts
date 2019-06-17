import { TestBed } from '@angular/core/testing';

import { ChatroomService } from './chatroom.service';

describe('ChatroomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatroomService = TestBed.get(ChatroomService);
    expect(service).toBeTruthy();
  });
});
