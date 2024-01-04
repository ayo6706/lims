import { PrismaClient } from "@prisma/client";
import DatabaseError from "../../errors/database";
import { log } from "../../loggers/repository";
import { InventoryRepository } from "./inventory.repository";
import Inventory, { InventoryHistory, PurchaseOrder } from "./models";

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

    async getInventories(): Promise<Inventory[]>{
        try{
            const results =  await prisma.inventoryItem.findMany();
            return Promise.resolve(<Inventory[]>results)
        }catch(error: any){
            log.error(error);
            throw new DatabaseError(error)
        }
    }

    async updateInventory(id: number, currentStock: number): Promise<Inventory> {
        try{
            const result = await prisma.inventoryItem.update({
                where: { id },
                data: { currentStock },
            });

            return Promise.resolve(<Inventory>result)
        }catch(error: any){
            log.error(error);
            throw new DatabaseError(error)
        }
        
    }

    async createPurchaseOrder(obj: PurchaseOrder): Promise<PurchaseOrder>{
        try{
            const {  
                inventoryItemId,
                quantityOrdered,
                orderDate,
                expectedDeliveryDate,
                status,
                inventoryItem } = obj
            const result = await prisma.purchaseOrder.create({
                data: {
                    inventoryItemId,
                    quantityOrdered,
                    orderDate,
                    expectedDeliveryDate,
                    status
                }
            })
            return Promise.resolve(<PurchaseOrder>result)
        }catch(error: any){
            log.error(error)
            throw new DatabaseError(error)
        }
    }

    async getPurchaseOrders(): Promise<PurchaseOrder[]>{
        try{
            const results = await prisma.purchaseOrder.findMany();
            return Promise.resolve(<PurchaseOrder[]>results)
        }catch(error: any){
            log.error(error)
            throw new DatabaseError(error)
        }
    }

    async updatePurchaseOrderStatus(id: number,status: string): Promise<PurchaseOrder>{
        try{
            const result = await prisma.purchaseOrder.update({
                where: { id },
                data: { status },
            });
            return Promise.resolve(<PurchaseOrder> result)
        }catch(error: any){
            log.error(error)
            throw new DatabaseError(error)
        }
    }

    async getInventoryHistories(id: number): Promise<InventoryHistory[]>{
        try{
            const results = await prisma.inventoryHistory.findMany({
                where: { inventoryItemId: id },
            });
            return Promise.resolve(<InventoryHistory[]>results)
        }catch(error: any){
            log.error(error)
            throw new DatabaseError(error)
        }
    }
}
