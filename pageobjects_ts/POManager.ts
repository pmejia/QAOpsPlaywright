import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { DashboardCart } from "./DashboardCart";
import { DashboardCheckout } from "./DashboardCheckout";
import { DashboardThankyou } from "./DashboardThankyou";
import { DashboardMyOrders } from "./DashboardMyOrders";
import { Page } from "@playwright/test";


export class POManager {
    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    dashboardCart: DashboardCart;
    dashboardCheckout: DashboardCheckout;
    dashboardThankyou: DashboardThankyou;
    dashboardMyOrders: DashboardMyOrders;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.dashboardCart = new DashboardCart(this.page);
        this.dashboardCheckout = new DashboardCheckout(this.page);
        this.dashboardThankyou = new DashboardThankyou(this.page);
        this.dashboardMyOrders = new DashboardMyOrders(this.page);
    }

    getLoginPage() {
        return this.loginPage;

    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getDashboardCart() {
        return this.dashboardCart;
    }
    getDashboardCheckout() {
        return this.dashboardCheckout;
    }
    getDashboardThankyou() {
        return this.dashboardThankyou;
    }
    getDashboardMyOrders() {
        return this.dashboardMyOrders;
    }
}
