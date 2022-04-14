import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';
import { DatabaseModule } from '../database/database.module';

import { CourseResolver } from './graphql/resolvers/courses.resolver';
import { EnrollmentResolver } from './graphql/resolvers/enrollments.resolver';
import { StudentResolver } from './graphql/resolvers/students.resolver';

import { CourseService } from '../services/courses.service';
import { EnrollmentService } from '../services/enrollments.service';
import { StudentService } from '../services/students.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
            driver: ApolloFederationDriver,
            autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
        })
    ],
    providers: [
        //Resolvers
        CourseResolver,
        StudentResolver,
        EnrollmentResolver,

        //Services
        CourseService,
        StudentService,
        EnrollmentService
    ]
})
export class HttpModule { }
