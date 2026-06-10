/* import base from '@playwright/test';

exports.customtest = base.test.extend(
    {
        testDataForOrder : {
        useremail: "abcdef.mejia@gmail.com",
        password: "Learning@830$3mK2",
        productName: "ZARA COAT 3"
    }
    }
) */

import { test as base } from '@playwright/test';

export const customtest = base.extend({
    testDataForOrder: {
        useremail: "abcdef.mejia@gmail.com",
        password: "Learning@830$3mK2",
        productName: "ZARA COAT 3"
    }
});