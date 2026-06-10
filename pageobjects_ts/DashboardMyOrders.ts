import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardMyOrders {
    page: Page;
    ordersTable: Locator;

    constructor(page:Page) {
        this.page = page;
        this.ordersTable = page.locator("tbody");
    }

    async searchOrderById(orderId: string) {
        
        await this.page.waitForLoadState('networkidle');
        await this.ordersTable.first().waitFor({ state: 'visible' });
        const rows = this.ordersTable.locator("tr");
        const rowsCount: number = await rows.count();
        
        for (let j:number = 0; j < rowsCount; ++j) {
            const rowOrderId: any = await rows.nth(j).locator("th").textContent();
            console.log(rowOrderId);
            if (rowOrderId.includes(orderId.trim())) {
                console.log("Ingreso a la orden correcta");
                await rows.nth(j).locator("text= View").click();
                break;
            }
        };

    }
}
