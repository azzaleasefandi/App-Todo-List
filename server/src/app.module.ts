import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TasksModule } from './todos/tasks.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/todo-list'),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
