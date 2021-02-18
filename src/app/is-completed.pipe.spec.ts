import { IsCompletedPipe } from './is-completed.pipe';

describe('IsCompletedPipe', () => {
  it('create an instance', () => {
    const pipe = new IsCompletedPipe();
    expect(pipe).toBeTruthy();
  });
});
