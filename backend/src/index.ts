import config from "config";
import { PrismaClient } from "@prisma/client";
import { createLogger, log, useLogger } from "./loggers";
import HttpLogger from "./loggers/http";
import { Services } from "./services/services";
import Http from "./http/http";
import InventoryService from "./services/inventory";
import InventoryRepositoryPostgres from "./repository/inventory/inventory.postgres";
const cron = require("node-cron");

const prisma = new PrismaClient();

const DBUri = config.get<string>("DBUri");

const SystemLoggerID = "SYS";
const HTTPLoggerID = "HTTP";

function initializeLoggers() {
    useLogger(createLogger(SystemLoggerID));
    HttpLogger.useLogger(createLogger(HTTPLoggerID));
}
function main(): void {
    initializeLoggers();
    prisma.$connect().then(() => {
        log.info(`connected to db: ${DBUri}`);
    }).catch((error: any) => {
        log.error(`db connection error: ${error}`);
    });
    const services: Services = {
        inventoryService: new InventoryService(
            new InventoryRepositoryPostgres()
        )

    };

    cron.schedule("", () => {
        services.inventoryService.getPurchaseOrders().then(() => {
        }).catch((error) => log.error(error));
    }, {
        scheduled: false
    });


    cron.schedule("", () => {
            services.inventoryService.optimizeStockLevels().then(() => {
            }).catch((error) => log.error(error));
        }, {
            scheduled: false
    });

    const http = new Http(services);
    http.serve("3000", "v1");
}

main();
