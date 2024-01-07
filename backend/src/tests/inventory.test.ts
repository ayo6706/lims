import request from 'supertest';
import Setup from './testserver';
import { PrismockClient } from 'prismock';

const setup = new Setup();
const server = setup.init();
const baseRoute = "/api/v1";
const basePath = "/inventory"
const route = baseRoute + basePath
const ordersRoute = `${route}/product-orders`;
const historyRoute = `${route}/history`;

let inventoryId: number;
describe('Inventory', () => {
    beforeAll(async () => {
        await new PrismockClient().$connect()
    });

    afterAll(async () => {
        await new PrismockClient().$disconnect()
    });
    describe('given that the fields are valid', () => {
        it('should create a new inventory', async () => {
            const inventoryData = {
                name: "Product One",
                description: " product one descrition",
                currentStock: 20,
                reorderLevel: 5,
                optimalStockLevel: 40,
                leadTimeDays: 5
            };

            const response = await request(server)
                .post(route)
                .send(inventoryData);

            expect(response.status).toBe(201);
            expect(response.body.data.name).toBe(inventoryData.name)
            expect(response.body).toHaveProperty('message', 'inventory created');
            inventoryId = response.body.data.id
        });
    });

    describe('given that the fields are valid', () => {
        it('should retrieve all inventories', async () => {
            const response = await request(server).get(route);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'gotten inventries');
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });

    describe('given that the fields are valid', () => {
        it('should update an inventory item', async () => {
            const updateData = {
                id: inventoryId,
                currentStock: 20,
                reorderLevel: 5,
            };

            const response = await request(server)
                .patch(route)
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'updated inventory successfully');
        });
    });

    describe('given that the fields are valid', () => {
        it('should retrieve product orders', async () => {
            const response = await request(server).get(ordersRoute);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'gotten product orders successfully');
        });
    });
    describe('given that the fields are valid', () => {
        it('should retrieve inventory history records', async () => {
            const response = await request(server).get(historyRoute);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'gotten inventries record successfully');
        });
    });
});
