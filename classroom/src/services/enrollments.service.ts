import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

interface GetByCourseAndStudentIdProps {
    courseId: string;
    studentId: string;
}

@Injectable()
export class EnrollmentService {
    constructor(private prisma: PrismaService) { }

    getByCourseAndStudentId({ courseId, studentId }: GetByCourseAndStudentIdProps) {
        return this.prisma.enrollment.findFirst({
            where: {
                courseId,
                studentId,
                canceledAt: null
            }
        })
    }

    listAllEnrollments() {
        return this.prisma.enrollment.findMany({
            where: {
                canceledAt: null,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    listEnrollmentsByStudent(studentId: string) {
        return this.prisma.enrollment.findMany({
            where: {
                canceledAt: null,
                studentId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
}