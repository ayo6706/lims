import express from "express";
import cors from "cors";
import { log } from "../loggers/http";
import { Services } from "../services/services";

const apiPath = "/api";
export default class Http {

    private apiVersion: string = "";

    constructor(services: Services) {
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

        app.listen(port, () => { log.info("starting express server"); });

        return app;
    }
}
