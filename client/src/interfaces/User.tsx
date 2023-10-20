interface User {
    username: string,
    roles: string[],
    token: string,
    hasRole: (role: string) => boolean;
}


export default User;
