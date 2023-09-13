import { Context, Handler, Callback } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configure as serverlessExpress } from '@vendia/serverless-express'

let server: Handler;
async function bootstrapServer() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({app: expressApp})
}
export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
    console.log('-=========-', event);
  server = server ?? (await bootstrapServer());
  return server(event, context, callback);
};