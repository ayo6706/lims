import {
 Router,
} from "express";
import { Handler } from "../handler";
import routes from "./routes";
import InventoryService from "../../../services/inventory";

const basePath = "/system";

export default class InventoryHandler implements Handler {
    private service: InventoryService;

    constructor(
        service: InventoryService
    ) {
        this.service = service;
    }

    path(): string {
        return basePath;
    }

    routes(): Router {
        return routes(this);
    }
}
