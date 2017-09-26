import { t, Selector} from 'testcafe';
import * as Selectors from  './ca_r6.7.0_selectors.js';


export async function getClick (t) {
    await t.click('.new-btn');
}

export const login = async () => {
	await t
       	//.navigateTo(`https://ca1.webdev.uiscom.ru`)
        .typeText('input[name="login"]', 'qa@uiscom.ru')
        .typeText('input[name="password"]', '>bcrjvRjvtl;br')
        .pressKey('enter')
}

export const addReport = async () => {
	const reportCount = await Selectors.getReportCount()
   	if (reportCount<15)
   	{
       	await t
       		.click(Selectors.getAddReport)
       		.wait(1000)
			// .click(getPencil)
			// .wait(1000)
			// .pressKey('delete')
			// .wait(1000)
			// .typeText(getReportInput, 'Report-'+getRandomInt(10000,99999))
			// .wait(1000)
			// .click(getPencil)
			// .wait(1000)
	}
}

export const clickToReport = async () => {
	const elNumber = await Selectors.getReportCount() - 1
	await t.click(Selector('*[class*="x-tab-inner"]:not([data-ref="btnInnerEl"])').nth(elNumber))
	await t.wait(1000);	
}

export const delReport = async () => {
	const elNumber = await Selectors.getReportCount() - 1
	await t.click(Selector('*[class*="x-tab-inner"]:not([data-ref="btnInnerEl"])').nth(elNumber))
	await t.wait(1000);	
	await t.click(Selector('span.x-tab-edit-btn-inner').nth(elNumber))
	await t.wait(1000);	
	await t.click(Selector('span.ul-btn-usual-icon-cls-remove').nth(0))
	await t.wait(1000);	
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}