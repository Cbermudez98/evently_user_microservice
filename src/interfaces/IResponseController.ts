import { HTTP_STATUS } from "../enums/Enum";

export interface IResponseController<T> {
    status: HTTP_STATUS,
    data: T
}