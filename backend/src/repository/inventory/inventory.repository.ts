import Inventory from "./models";

export interface InventoryRepository{
    addInventory(obj: Inventory): Promise<Inventory>
}