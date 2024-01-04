import InventoryDto from "../dto/inventory/inventory.dto";
import { InventoryRepository } from "../repository/inventory/inventory.repository";
import { failedPromise } from "./util";

export default class InventoryService {
    constructor(private readonly repo: InventoryRepository) {
    }

    async addInventory(dto: InventoryDto): Promise<InventoryDto>{
        try{
            const result = await this.repo.addInventory(dto)
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

    async updateInventories(obj: InventoryDto): Promise<InventoryDto>{
        try{
            const result = await this.repo.updateInventory(obj);
            return result
        }catch(error: any){
            return failedPromise(error)
        }
    }

    async checkAndGeneratePurchaseOrders(): Promise<void> {
        try {
            const items = await this.repo.getInventories();
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
                    await this.repo.createPurchaseOrder(data)
                }
            });
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
                    if (history.quantityChange < 0) totalQuantityChange -= history.quantityChange; // aggregate sold items
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
