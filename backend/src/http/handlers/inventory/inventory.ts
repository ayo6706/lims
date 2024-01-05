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
    async addInventory(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.addInventory(req.body);
            return ok(MsgCreatedInventory, result).send(res)
        } catch (error: any) {
            return next(error);
        }
    }

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
}
