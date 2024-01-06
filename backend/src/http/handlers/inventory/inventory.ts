import {
    NextFunction,
Request,
Response,
 Router,
} from "express";
import { Handler } from "../handler";
import routes from "./routes";
import InventoryService from "../../../services/inventory";
import { ok } from "../../response/response";
import { MsgCreatedInventory } from "../../response/messages";

const basePath = "/inventory";

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

     /**
     * @openapi
     * /inventory:
     *   post:
     *     tags:
     *      - Inventory
     *     summary: create a new inventory
     *     requestBody:
     *      $ref: '#/components/requestBodies/Inventory'
     *     responses:
     *        200:
     *          description: inventory created
     *     security:
     *      - bearerAuth: []
     */
    async addInventory(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.addInventory(req.body);
            return ok(MsgCreatedInventory, result).send(res)
        } catch (error: any) {
            return next(error);
        }
    }

    /**
     * @openapi
     * /inventory:
     *   get:
     *    summary: get inventries
     *    tags:
     *      - Inventory
     *    responses:
     *     200:
     *      description: gotten inventries
     */
    async getInventries(req: Request, res: Response, next: NextFunction){
        try{
            const results = await this.service.getInventories()
            return  ok("gotten inventries", results).send(res)
        }catch(error: any){
            return next(error)
        }
    } 

    async updateInventory(req: Request, res: Response, next: NextFunction){
        try{
            const results = await this.service.updateInventory(req.body)
            return  ok("updated inventory successfully", results).send(res)
        }catch(error: any){
            return next(error)
        }
    } 

    async getProductOrders(req: Request, res: Response, next: NextFunction){
        try{
            const results = await this.service.getPurchaseOrders();
            return  ok("gotten product orders successfully", results).send(res)
        }catch(error: any){
            return next(error)
        }
    } 
}
