export const isAdministrator = (email) => {
    const administrators = process.env.ADMINISTRATORS?.split(',') || ['gundamzhou863@gmail.com'];
    return administrators.includes(email);
}