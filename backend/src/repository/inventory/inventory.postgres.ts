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
                } = obj
            const inventory = await prisma.inventoryItem.create({
                data: {
                    name: name!,
                    currentStock: currentStock!,
                    description: description,
                    reorderLevel: reorderLevel!,
                    optimalStockLevel: optimalStockLevel!,
                    leadTimeDays: leadTimeDays!
                }
            });

            return Promise.resolve(<Inventory>inventory)

        }catch(error: any){
            log.error(error);
            throw new DatabaseError(error);
        }

    }

    async getInventoryByName(name: string): Promise<Inventory>{
        try{
            const result = await prisma.inventoryItem.findFirst({
                where: {
                    name,
                }
            });
            return Promise.resolve(<Inventory>result)
        }catch(error: any){
            log.error(error)
            throw new DatabaseError(error)
        }

    }
    async getInventories(): Promise<Inventory[]>{
        try{
            const results =  await prisma.inventoryItem.findMany({
                include: {
                inventoryHistory: true,
              }});
            return Promise.resolve(<Inventory[]>results)
        }catch(error: any){
            log.error(error);
            throw new DatabaseError(error)
        }
    }

    async updateInventory(obj: Inventory): Promise<Inventory> {
        try{
            const {
                id,
                name,
                description,
                currentStock,
                reorderLevel,
                optimalStockLevel,
                leadTimeDays
            } = obj
            const result = await prisma.inventoryItem.update({
                where: { id },
                data: { 
                    name,
                    currentStock,
                    description,
                    reorderLevel,
                    optimalStockLevel,
                    leadTimeDays
                },
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

    async createPurchaseOrders(obj: PurchaseOrder[]): Promise<PurchaseOrder[]>{
        try{
            const result = await prisma.purchaseOrder.createMany({
                data: obj
            })
            return Promise.resolve(<PurchaseOrder[]><unknown>result)
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

    async getInventoryHistories(): Promise<InventoryHistory[]>{
        try{
            const results = await prisma.inventoryHistory.findMany();
            return Promise.resolve(<InventoryHistory[]>results)
        }catch(error: any){
            log.error(error)
            throw new DatabaseError(error)
        }
    }

    async addInventoryHistory(data: InventoryHistory): Promise<InventoryHistory>{
        try{
            const {inventoryItemId, quantityChange, reason, date }= data
            const result = await prisma.inventoryHistory.create({
                data: {
                    inventoryItemId: inventoryItemId!,
                    quantityChange: quantityChange!,
                    reason,
                    date
                }
            })
            return Promise.resolve(<InventoryHistory>result)
        }catch(error: any){
            log.error(error)
            throw new DatabaseError(error)
        }
    }
}
