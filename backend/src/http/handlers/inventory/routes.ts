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
    return router;
}
