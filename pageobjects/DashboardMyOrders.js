export class DashboardMyOrders {
    constructor(page) {
        this.page = page;
        this.ordersTable = page.locator("tbody");
    }

    async searchOrderById(orderId) {
        
        await this.page.waitForLoadState('networkidle');
        await this.ordersTable.first().waitFor({ state: 'visible' });
        const rows = this.ordersTable.locator("tr");
        const rowsCount = rows.count();
        
        for (let j = 0; j < rowsCount; ++j) {
            const rowOrderId = await rows.nth(j).locator("th").textContent();
            console.log(rowOrderId);
            if (rowOrderId.includes(orderId.trim())) {
                console.log("Ingreso a la orden correcta");
                await rows.nth(j).locator("text= View").click();
                break;
            }
        };

    }
}
//module.exports = { DashboardMyOrders };