import { API, API_ROOT } from '@/constants/api';
import api from './api';

export const getAllStudents = async () => {
    const respone = await api.get(API_ROOT + API.STUDENT.GET_ALL);

    return respone.data;
};

export const getStudentByPhone = async (data: { phone: string }) => {
    const response = await api.get(
        API_ROOT + API.STUDENT.GET_BY_PHONE.replace(':phone', data.phone)
    );

    return response.data;
};

export const addStudent = async (data: {
    name: string;
    phone: string;
    email: string;
    role: string;
}) => {
    const response = await api.post(API_ROOT + API.STUDENT.CREAT, data);

    return response.data;
};

export const editStudent = async (data: {
    name: string;
    phone: string;
    email: string;
    role: string;
}) => {
    const respose = await api.put(
        API_ROOT + API.STUDENT.EDIT.replace(':phone', data.phone),
        data
    );

    return respose.data;
};

export const deleteStudent = async (data: { phone: string }) => {
    const respone = await api.delete(
        API_ROOT + API.STUDENT.DELETE.replace(':phone', data.phone)
    );
    return respone.data;
};
