export interface IBcrypt {
    compare: (hashed: string, actual: string) => boolean;
    encrypt: (actual: string) => string;
}