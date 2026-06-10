import { test, expect } from '@playwright/test';
import ExcelJS from 'exceljs';

async function writeExcelTest(searchText, replaceText, change, filePath) {

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.column+change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
};

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {

                output.row = rowNumber;
                output.column = colNumber;

            }
        })
    })
    return output;

};

test ('Upload download excel validation', async ({page})=>
{
    const filePath = "D:/CURSOS/Playwright Rahul/exceldownloadTest.xlsx";
    const textSearch = "Mango";
    const updateValue = '450';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole("button",{name:'Download'}).click();
    const download = await downloadPromise;
    await download.saveAs(`${filePath}`);
    //await downloadPromise.then(download => download.saveAs(`${filePath}`));
   
    await writeExcelTest(textSearch, updateValue,{rowChange:0,colChange:2}, `${filePath}`);
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(`${filePath}`); 
    const textlocator = await page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has: textlocator});
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});