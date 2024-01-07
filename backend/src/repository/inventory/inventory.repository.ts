import Inventory, { InventoryHistory, PurchaseOrder } from "./models";

export interface InventoryRepository{
    addInventory(obj: Inventory): Promise<Inventory>
    getInventoryByName(name: string): Promise<Inventory>
    getInventories(): Promise<Inventory[]>
    updateInventory(obj: Inventory): Promise<Inventory>
    createPurchaseOrder(obj: PurchaseOrder): Promise<PurchaseOrder>
    createPurchaseOrders(obj: PurchaseOrder[]): Promise<PurchaseOrder[]>
    getPurchaseOrders(): Promise<PurchaseOrder[]>
    updatePurchaseOrderStatus(id: number,status: string): Promise<PurchaseOrder>
    getInventoryHistories(): Promise<InventoryHistory[]>
    addInventoryHistory(data: InventoryHistory): Promise<InventoryHistory>
}