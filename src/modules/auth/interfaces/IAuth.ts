export interface IAuth {
    id: number;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}

export interface IAuthCreate extends Pick<IAuth, "email" | "password">{}

export interface IAuthLogin extends Pick<IAuth, "email" | "password"> {}