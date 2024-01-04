import { PrismaClient } from "@prisma/client";
import DatabaseError from "../../errors/database";
import { log } from "../../loggers/repository";
import { InventoryRepository } from "./inventory.repository";
import Inventory from "./models";

const prisma = new PrismaClient();
export default class InventoryRepositoryPostgres implements InventoryRepository{
    async addInventory(obj: Inventory): Promise<Inventory>{
        try{
            const {
                name,
                description,
                currentStock,
                reorderLevel,
                optimalStockLevel,
                leadTimeDays,
                purchaseOrders,
                inventoryHistory} = obj
            const inventory = await prisma.inventoryItem.create({
                data: {
                    name,
                    currentStock,
                    description,
                    reorderLevel,
                    optimalStockLevel,
                    leadTimeDays,
                    purchaseOrders: {
                        create: purchaseOrders
                    },
                    inventoryHistory: {
                        create: inventoryHistory
                    }
                }
            });

            return Promise.resolve(<Inventory>inventory)

        }catch(error: any){
            log.error(error);
            throw new DatabaseError(error);
        }

    }

}