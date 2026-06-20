export const savePhone = (phone: string) => {
    localStorage.setItem('phone', phone);
};

export const getPhone = () => {
    return localStorage.getItem('phone');
};

export const removePhone = () => {
    localStorage.removeItem('phone');
};
