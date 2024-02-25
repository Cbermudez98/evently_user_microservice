import { Router } from "express";

export interface IRouterAdapter {
    initRoute: () => Router;
}