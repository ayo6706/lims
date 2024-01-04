import { InventoryRepository } from "../repository/inventory/inventory.repository";
import { failedPromise } from "./util";

export default class InventoryService{
    constructor(private readonly repo: InventoryRepository){
    }

    async checkAndGeneratePurchaseOrders(): Promise<void> {
        try{
            const items = await this.repo.getInventories();
            items.forEach(async (item) => {
                if (item.currentStock <= item.reorderLevel) {
                    const expectedDeliveryDate = new Date(
                        Date.now() + item.leadTimeDays * 24 * 60 * 60 * 1000
                        );
                    const data = {
                        inventoryItemId: item.id!,
                        quantityOrdered: item.optimalStockLevel - item.currentStock,
                        orderDate: new Date(),
                        expectedDeliveryDate,
                        status: 'Ordered',
                    }
                    await this.repo.createPurchaseOrder(data)
                }
            });
        }catch(error: any){
            return failedPromise(error)
        }
    }
}
