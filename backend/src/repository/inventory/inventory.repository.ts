import Inventory from "./models";

export interface InventoryRepository{
    addInventory(obj: Inventory): Promise<Inventory>
    getInventories(): Promise<Inventory[]>
    updateInventory(id: number, currentStock: number): Promise<Inventory>
}