export const ROOT = 'http://localhost:3000';
export const API_ROOT = `${ROOT}/api`;

export const TIMEOUT = 10000;

export const API = {
    AUTH: {
        GET_OTP: '/auth/get-otp',
        VERIFY_OTP: '/auth/verify-otp',
    },
    STUDENT: {
        GET_ALL: '/students',
        GET_BY_PHONE: '/students/:phone',
        CREAT: '/students',
        EDIT: '/students/:phone',
        DELETE: '/students/:phone',
        GET_MY_LESSONS: '/students/myLessons',
        MARK_LESSON_DONE: '/students/markLessonDone/:lessonId',
    },
    LESSON: {
        GET_ALL: '/lessons',
        GET_BY_ID: '/lessons/:id',
        CREATE: 'lessons',
        EDIT: 'lessons/:id',
        DELETE: 'lessons/:id',
        ASSIGN: 'lessons/assignLesson',
    },
};
