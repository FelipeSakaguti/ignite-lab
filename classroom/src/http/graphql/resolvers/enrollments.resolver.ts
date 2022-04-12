import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { AuthorizationGuard } from "../../auth/authorization.guard";

import { Enrollment } from "../models/enrollment";
import { EnrollmentService } from "../../../services/enrollments.service";
import { CourseService } from "../../../services/courses.service";
import { StudentService } from "../../../services/students.service";

@Resolver(() => Enrollment)
export class EnrollmentResolver {
    constructor(
        private enrollmentService: EnrollmentService,
        private courseService: CourseService,
        private studentService: StudentService,
    ) { }

    @Query(() => [Enrollment])
    @UseGuards(AuthorizationGuard)
    enrollments() {
        return this.enrollmentService.listAllEnrollments();
    }

    @ResolveField()
    student(@Parent() enrollment: Enrollment) {
        return this.studentService.getStudentById(enrollment.studentId);
    }

    @ResolveField()
    course(@Parent() enrollment: Enrollment) {
        return this.courseService.getCourseById(enrollment.courseId);
    }
}