import { InventoryRepository } from "../repository/inventory/inventory.repository";

export default class InventoryService{
    constructor(private readonly repo: InventoryRepository){
    }

    async checkAndGeneratePurchaseOrders() {
        try{
            const items = await this.repo.getInventories();
            items.forEach(async (item) => {
              if (item.currentStock <= item.reorderLevel) {
                await prisma.purchaseOrder.create({
                  data: {
                    inventoryItemId: item.id,
                    quantityOrdered: item.optimalStockLevel - item.currentStock,
                    orderDate: new Date(),
                    expectedDeliveryDate: new Date(Date.now() + item.leadTimeDays * 24 * 60 * 60 * 1000),
                    status: 'Ordered',
                  },
                });
              }
            });
        }catch(error: any){

        }
       
      }
   
}