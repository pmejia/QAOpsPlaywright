
import { test as baseTest } from "@playwright/test";

interface TestDataForOrder {
    useremail: string;
    password: string;
    productName: string;
};

export const customTest = baseTest.extend<{ testDataForOrder: TestDataForOrder }>(
    {
        testDataForOrder: {
            useremail: "abcdef.mejia@gmail.com",
            password: "Learning@830$3mK2",
            productName: "ZARA COAT 3"
        }
    }
)