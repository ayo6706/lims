import InventoryDto, { InventoryHistoryDto, PurchaseOrderDto } from "../dto/inventory/inventory.dto";
import { InventoryRepository } from "../repository/inventory/inventory.repository";
import { failedPromise } from "./util";
import * as errors from "../errors/services";
import InventoryReasonType from "../helpers/constants";

export default class InventoryService {
    constructor(private readonly repo: InventoryRepository) {
    }

    async addInventory(dto: InventoryDto): Promise<InventoryDto>{
        try{
            const exists = await this.repo.getInventoryByName(dto.name!)
            if(exists){
                return failedPromise(errors.ErrExistingInventory)
            }
            const result = await this.repo.addInventory(dto)
            const inventoryHistory = {
                inventoryItemId: result.id!,
                quantityChange: result.currentStock,
                reason: InventoryReasonType.NEW_PRODUCT,
                date: new Date()
            }
            await this.repo.addInventoryHistory(inventoryHistory)
            return result
        }catch(error: any){
            return failedPromise(error)
        }
    }

    async getInventories(): Promise<InventoryDto[]>{
        try{
            const results = await this.repo.getInventories();
            return results
        }catch(error: any){
            return failedPromise(error)
        }
    }

    async updateInventory(obj: InventoryDto): Promise<InventoryDto>{
        try{
            const result = await this.repo.updateInventory(obj);
            const inventoryHistory = {
                inventoryItemId: result.id!,
                quantityChange: result.currentStock,
                reason: InventoryReasonType.UPDATE_PRODUCT,
                date: new Date()
            }
            await this.repo.addInventoryHistory(inventoryHistory)
            return result
        }catch(error: any){
            return failedPromise(error)
        }
    }

    async getPurchaseOrders(): Promise<PurchaseOrderDto[]>{
        try{
            const results = await this.repo.getPurchaseOrders()
            return results
        }catch(error: any){
            return failedPromise(error)
        }
    }

    async checkAndGeneratePurchaseOrders(): Promise<void> {
        try {
            const items = await this.repo.getInventories();
            const purchaseOrders: PurchaseOrderDto[] = []
            items.forEach(async (item) => {
                if (item.currentStock! <= item.reorderLevel!) {
                    const expectedDeliveryDate = new Date(
                        Date.now() + item.leadTimeDays! * 24 * 60 * 60 * 1000
                    );
                    const data = {
                        inventoryItemId: item.id!,
                        quantityOrdered: item.optimalStockLevel! - item.currentStock!,
                        orderDate: new Date(),
                        expectedDeliveryDate,
                        status: 'Ordered',
                    }
                    purchaseOrders.push(data)
                    // await this.repo.createPurchaseOrder(data)
                }

            });
            await this.repo.createPurchaseOrders(purchaseOrders)
        } catch (error: any) {
            return failedPromise(error)
        }
    }

    async optimizeStockLevels(): Promise<void> {
        try {

            const data = await this.repo.getInventories();

            for (let item of data) {
                // Calculate average sales velocity
                let totalQuantityChange = 0;
                item.inventoryHistory!.forEach(history => {
                    // Assuming a negative change indicates a sale
                    if (history.quantityChange! < 0) totalQuantityChange -= history.quantityChange!; // aggregate sold items
                });

                const salesVelocity = totalQuantityChange / item.inventoryHistory!.length;

                // Adjust reorder level based on the new sales velocity and some buffer 
                // (e.g., 20% more than average sales)
                const newReorderLevel = Math.ceil(salesVelocity * (1 + 0.20));

                // Update the item if the calculated reorder level is different
                if (newReorderLevel !== item.reorderLevel) {
                    const updateObj = {
                        id: item.id,
                        reorderLevel: newReorderLevel
                    }
                    await this.repo.updateInventory(updateObj)
                }
            }
        } catch (error: any) {
            return failedPromise(error)
        }
    }
}
