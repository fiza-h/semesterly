import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Students Table
export const studentsTable = sqliteTable('students', {
  erp: integer('erp').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  program: text('program').notNull(),
});

// GeneratedSchedules Table
export const generatedSchedulesTable = sqliteTable('generated_schedules', {
  studentId: integer('student_id')
    .notNull()
    .references(() => studentsTable.erp, { onDelete: 'cascade' }),
  scheduleId: integer('schedule_id').primaryKey(),
});

// Schedules Table
export const schedulesTable = sqliteTable('schedules', {
  id: integer('id').primaryKey(),
  sectionList: text('section_list').notNull(),
});

// Courses Table
export const coursesTable = sqliteTable('courses', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  creditHours: integer('credit_hours').notNull(),
});

// Instructors Table
export const instructorsTable = sqliteTable('instructors', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  department: text('department').notNull(),
});

// Sections Table
export const sectionsTable = sqliteTable('sections', {
  id: integer('id').primaryKey(),
  courseId: integer('course_id')
    .notNull()
    .references(() => coursesTable.id, { onDelete: 'cascade' }),
  instructorId: integer('instructor_id')
    .notNull()
    .references(() => instructorsTable.id, { onDelete: 'cascade' }),
  lecDay: integer('lec_day').notNull(),
  lecTime: integer('lec_time').notNull(),
  labTime: integer('lab_time').notNull(),
  labDay: integer('lab_day').notNull(),
});

// Student_Course Table
export const studentCourseTable = sqliteTable('student_course', {
  studentId: integer('student_id')
    .notNull()
    .references(() => studentsTable.erp, { onDelete: 'cascade' }),
  sectionId: integer('section_id')
    .notNull()
    .references(() => sectionsTable.id, { onDelete: 'cascade' }),
});

// export type InsertStudent = typeof studentsTable.$inferInsert;
// export type SelectStudent = typeof studentsTable.$inferSelect;

// export type InsertGeneratedSchedule = typeof generatedSchedulesTable.$inferInsert;
// export type SelectGeneratedSchedule = typeof generatedSchedulesTable.$inferSelect;

// export type InsertSchedule = typeof schedulesTable.$inferInsert;
// export type SelectSchedule = typeof schedulesTable.$inferSelect;

// export type InsertCourse = typeof coursesTable.$inferInsert;
// export type SelectCourse = typeof coursesTable.$inferSelect;

// export type InsertInstructor = typeof instructorsTable.$inferInsert;
// export type SelectInstructor = typeof instructorsTable.$inferSelect;

// export type InsertSection = typeof sectionsTable.$inferInsert;
// export type SelectSection = typeof sectionsTable.$inferSelect;

// export type InsertStudentCourse = typeof studentCourseTable.$inferInsert;
// export type SelectStudentCourse = typeof studentCourseTable.$inferSelect;
