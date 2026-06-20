import { API, API_ROOT } from "@/constants/api"
import api from "./api"

export const getAllStudents = async () => {
    const respone = await api.get(API_ROOT + API.STUDENT.GET_ALL)

    return respone.data
}