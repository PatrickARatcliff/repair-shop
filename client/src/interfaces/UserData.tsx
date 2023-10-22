interface UserData {
    userId: number;
    username: string;
    password: string;
    enabled: boolean;
    authorities: string[];
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
}

export default UserData;