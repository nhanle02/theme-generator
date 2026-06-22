import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const message = data?.message || 'OK';

        if (data?.message) {
          delete data.message;
        }

        return {
          success: true,
          message,

          data: Object.keys(data || {}).length ? data : null,
        };
      }),
    );
  }
}
