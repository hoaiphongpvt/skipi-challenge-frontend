import { API, API_ROOT } from '@/constants/api';
import api from './api';

export const getAllLessons = async (data: {
    page: number;
    limit: number;
    search: string;
}) => {
    const respones = await api.get(API_ROOT + API.LESSON.GET_ALL, {
        params: data,
    });

    return respones.data;
};

export const getLessonById = async (data: { id: string }) => {
    const response = await api.get(
        API_ROOT + API.LESSON.GET_BY_ID.replace(':id', data.id)
    );

    return response.data;
};

export const addLesson = async (data: {
    name: string;
    description: string;
}) => {
    const response = await api.post(API_ROOT + API.LESSON.CREATE, data);

    return response.data;
};

export const editLesson = async (data: {
    id: string;
    name: string;
    description: string;
}) => {
    const response = await api.put(
        API_ROOT + API.LESSON.EDIT.replace(':id', data.id),
        data
    );

    return response.data;
};

export const deleteLesson = async (data: { id: string }) => {
    const response = await api.delete(
        API_ROOT + API.LESSON.DELETE.replace(':id', data.id)
    );

    return response.data;
};

export const getAssignedLessons = async () => {
    const response = await api.get(API_ROOT + API.LESSON.GET_ASSINGED);

    return response.data;
};

export const assignLesson = async (data: {
    studentPhone: string;
    lessonId: string;
    title: string;
    description: string;
}) => {
    const response = await api.post(API_ROOT + API.LESSON.ASSIGN, data);

    return response.data;
};

export const assignmentStatistics = async () => {
    const reponse = await api.get(API_ROOT + API.LESSON.ASSIGNMENT_STAT);

    return reponse.data;
};
