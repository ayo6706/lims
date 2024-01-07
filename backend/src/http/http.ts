import express from "express";
import cors from "cors";
import { log } from "../loggers/http";
import { Services } from "../services/services";
import errorMiddleware from "./middlewares/error";
import InventoryHandler from "./handlers/inventory/inventory";
import SwaggerHandler from "./handlers/swagger/swagger";
import config from "config";

const apiPath = "/api";
const NODE_ENV = config.get<string>("NODE_ENV");
export default class Http {
    private inventoryHandler: InventoryHandler;
    private apiVersion: string = "";

    constructor(services: Services) {
        this.inventoryHandler = new InventoryHandler(services.inventoryService);
    }

    basePath(handlerPath: string): string {
        return `${apiPath}/${this.apiVersion}${handlerPath}`;
    }

    serve(port: string, version: string) {
        this.apiVersion = version;

        const app = express();
        app.use(cors());
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        // register handler routes
        app.get("/", (req, res) => {
            res.send("lims backend service");
        });

        app.use(this.basePath(this.inventoryHandler.path()), this.inventoryHandler.routes());

        const swagger = new SwaggerHandler();
        app.use(this.basePath(swagger.path()), swagger.routes());
        app.use(errorMiddleware);

        if (NODE_ENV !== "test") {
            app.listen(port, () => { log.info("starting express server"); });
        }
        return app;
    }
}
