import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CourseService } from '../services/courses.service';
import { EnrollmentService } from '../services/enrollments.service';
import { StudentService } from '../services/students.service';
import { PurchaseController } from './controllers/purchases.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [PurchaseController],
    providers: [
        StudentService,
        EnrollmentService,
        CourseService,
    ],
})
export class MessagingModule { }
