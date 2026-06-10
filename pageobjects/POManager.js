

/* const { LoginPage } = require("./LoginPage").
const { DashboardPage } = require("./DashboardPage");
const { DashboardCart } = require('./DashboardCart');
const { DashboardCheckout } = require('./DashboardCheckout');
const { DashboardThankyou } = require('./DashboardThankyou');
const { DashboardMyOrders } = require('./DashboardMyOrders'); */
import { LoginPage } from "./LoginPage.js";
import { DashboardPage } from "./DashboardPage.js";
import { DashboardCart } from "./DashboardCart.js";
import { DashboardCheckout } from "./DashboardCheckout.js";
import { DashboardThankyou } from "./DashboardThankyou.js";
import { DashboardMyOrders } from "./DashboardMyOrders.js";

export class POManager {

    constructor(page) {
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
//module.exports = { POManager };