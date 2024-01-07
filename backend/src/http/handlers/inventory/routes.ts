import express, { Router } from "express";

export default function routes(handler: any): express.Router {
    const router = Router();
    router.post(
        "/",
        handler.addInventory.bind(handler),
    );
    router.get(
        "/",
        handler.getInventries.bind(handler),
    );
    router.patch(
        "/",
        handler.updateInventory.bind(handler),
    );
    router.get(
        "/product-orders",
        handler.getProductOrders.bind(handler),
    );
    router.get(
        "/history",
        handler.getHistories.bind(handler),
    );
    return router;
}
