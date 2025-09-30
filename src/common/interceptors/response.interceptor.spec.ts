import { ResponseTransformInterceptor } from './response.interceptor';
import { of } from 'rxjs';
import { ExecutionContext } from '@nestjs/common';

describe('ResponseTransformInterceptor', () => {
  let interceptor: ResponseTransformInterceptor;

  beforeEach(() => {
    interceptor = new ResponseTransformInterceptor();
  });

  function mockExecutionContext(
    statusCode = 200,
    headersSent = false,
  ): Partial<ExecutionContext> {
    return {
      switchToHttp: () => ({
        getResponse: () => ({ statusCode, headersSent }),
      }),
    } as any;
  }

  it('should wrap plain object into success + data', (done) => {
    const ctx = mockExecutionContext();
    interceptor
      .intercept(
        ctx as ExecutionContext,
        { handle: () => of({ foo: 'bar' }) } as any,
      )
      .subscribe((result) => {
        expect(result).toEqual({ success: true, data: { foo: 'bar' } });
        done();
      });
  });

  it('should wrap primitive into data', (done) => {
    const ctx = mockExecutionContext();
    interceptor
      .intercept(ctx as ExecutionContext, { handle: () => of('hello') } as any)
      .subscribe((result) => {
        expect(result).toEqual({ success: true, data: 'hello' });
        done();
      });
  });

  it('should not double-wrap if already has success', (done) => {
    const ctx = mockExecutionContext();
    const input = { success: true, data: 123 };
    interceptor
      .intercept(ctx as ExecutionContext, { handle: () => of(input) } as any)
      .subscribe((result) => {
        expect(result).toBe(input); // unchanged
        done();
      });
  });

  it('should preserve meta and message if present', (done) => {
    const ctx = mockExecutionContext();
    interceptor
      .intercept(
        ctx as ExecutionContext,
        {
          handle: () =>
            of({
              data: [1, 2, 3],
              meta: { page: 1, total: 3 },
              message: 'ok',
            }),
        } as any,
      )
      .subscribe((result) => {
        expect(result).toEqual({
          success: true,
          data: [1, 2, 3],
          meta: { page: 1, total: 3 },
          message: 'ok',
        });
        done();
      });
  });
});
