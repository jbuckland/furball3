import {Router } from "express";

export interface IRoutes{
    createRouter(): Router;
}