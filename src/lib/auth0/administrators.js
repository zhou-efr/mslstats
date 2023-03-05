export const isAdministrator = (email) => {
    const administrators = [
        'gundamzhou863@gmail.com',
    ];
    return administrators.includes(email);
}