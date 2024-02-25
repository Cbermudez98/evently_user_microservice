export enum ROLES {
    USER = "User",
    ADMIN = "Admin"
}

export enum HTTP_STATUS {
    SUCCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    FORBIDDEN = 401,
    UN_AUTHORIZED = 403,
    INTERNAL_ERROR = 500
}

export enum HTTP_MESSAGE {
    SUCCESS = "Success",
    BAD_REQUEST = "Bad request",
    FORBIDDEN = "Not allowed",
    UN_AUTHORIZED = "Unauthorized",
    INTERNAL_ERROR = "Internal server error"
}