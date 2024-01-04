export default interface Inventory {
    id?: number,
    name?: string,
    description?: string,
    currentStock?: number,
    reorderLevel?: number,
    optimalStockLevel?: number,
    leadTimeDays?: number,
    purchaseOrders?: PurchaseOrder[],
    inventoryHistory?: InventoryHistory[]
}

export interface PurchaseOrder {
    id?: number,
    inventoryItemId: number,
    quantityOrdered: number,
    orderDate: Date,
    expectedDeliveryDate: Date,
    status: string,
    inventoryItem?: Inventory
}


export interface InventoryHistory {
    id: number,
    inventoryItemId: number,
    date: Date,
    quantityChange: number,
    reason: string
    inventoryItem: Inventory
}