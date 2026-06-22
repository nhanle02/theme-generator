import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    const request = host.switchToHttp().getRequest();

    const status = exception.getStatus();

    const errorResponse = exception.getResponse();

    response.status(status).json({
      success: false,
      statusCode: status,

      message:
        typeof errorResponse === 'object'
          ? errorResponse['message']
          : exception.message,

      path: request.url,
      data: null,

      timestamp: new Date().toISOString(),
    });
  }
}
