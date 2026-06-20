import { API, API_ROOT } from '@/constants/api';
import api from './api';

export const getOTP = async (data: { phone: string }) => {
    const response = await api.post(API_ROOT + API.AUTH.GET_OTP, data);

    return response.data;
};

export const verifyOTP = async (data: { phone: string; otp: string }) => {
    const respone = await api.post(API_ROOT + API.AUTH.VERIFY_OTP, data);

    return respone.data;
};
