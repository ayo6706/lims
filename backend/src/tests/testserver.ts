import express from "express";
import Http from "../http/http";
import InventoryService from "../services/inventory";
import InventoryRepositoryPostgres from "../repository/inventory/inventory.postgres";
import { Services } from "../services/services";
/* eslint-disable import/no-extraneous-dependencies */

export default class Setup {
    public inventoryService: InventoryService;

    constructor() {
        this.inventoryService = new InventoryService(new InventoryRepositoryPostgres);

    }

    init(): express.Express {
        const services: Services = {
            inventoryService: this.inventoryService,
        };
        const http = new Http(services);
        return http.serve("4000", "v1");
    }
}
