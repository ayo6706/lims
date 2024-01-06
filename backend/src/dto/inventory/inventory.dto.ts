/**
 * @openapi
 * components:
 *  requestBodies:
 *   Inventory:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/CreateInventory'
 *  schemas:
 *   CreateInventory:
 *     type: object
 *     required:
 *       - name
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       currentStock:
 *         type: number
 *       reorderLevel:
 *         type: number
 *       optimalStockLevel:
 *         type: number
 *       leadTimeDays:
 *         type: number
 */


/**
 * @openapi
 * components:
 *  requestBodies:
 *   updateInventory:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UpdateInventory'
 *  schemas:
 *   UpdateInventory:
 *     type: object
 *     required:
 *       - id
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       currentStock:
 *         type: number
 *       reorderLevel:
 *         type: number
 *       optimalStockLevel:
 *         type: number
 *       leadTimeDays:
 *         type: number
 */

export default interface InventoryDto {
    id?: number,
    name?: string,
    description?: string,
    currentStock?: number,
    reorderLevel?: number,
    optimalStockLevel?: number,
    leadTimeDays?: number,
    purchaseOrders?: PurchaseOrderDto[],
    inventoryHistory?: InventoryHistoryDto[]
}

export interface PurchaseOrderDto {
    id?: number,
    inventoryItemId: number,
    quantityOrdered: number,
    orderDate: Date,
    expectedDeliveryDate: Date,
    status: string,
    inventoryItem?: InventoryDto
}


export interface InventoryHistoryDto {
    id?: number,
    inventoryItemId?: number,
    date: Date,
    quantityChange?: number,
    reason: string
    inventoryItem?: InventoryDto
}