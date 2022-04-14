import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthorizationGuard } from "../../auth/authorization.guard";

import { StudentService } from "../../../services/students.service";
import { Student } from "../models/student";
import { EnrollmentService } from "../../../services/enrollments.service";

@Resolver(() => Student)
export class StudentResolver {
    constructor(
        private studentsService: StudentService,
        private enrollmentsService: EnrollmentService,
    ) { }

    // @Query(() => Student)
    // @UseGuards(AuthorizationGuard)
    // me(
    //     @CurrentUser() user: AuthUser,
    // ) {
    //     return this.studentsService.getStudentByAuthUserId(user.sub);
    // }

    @Query(() => [Student])
    @UseGuards(AuthorizationGuard)
    students() {
        return this.studentsService.listAllStudents();
    }

    @ResolveField()
    enrollments(@Parent() student: Student) {
        return this.enrollmentsService.listEnrollmentsByStudent(student.id)
    }
}