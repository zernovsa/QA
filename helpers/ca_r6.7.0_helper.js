import {t, Selector} from 'testcafe';
import * as Selectors from '../selectors/ca_r6.7.0_selectors.js';
import {username, password} from '../config.js';


export async function getClick (t) {
    await t.click('.new-btn');
}

export const addReport = async () => {
    const reportCount = await Selectors.getReportCount()
    if (reportCount < 15) {
        await t
            .click(Selectors.getAddReport)
        // .click(getPencil)
        // .wait(1000)
        // .pressKey('delete')
        // .wait(1000)
        // .typeText(getReportInput, 'Report-'+getRandomInt(10000,99999))
        // .wait(1000)
        // .click(getPencil)
        // .wait(1000)
    }
    else {
    }
}

export const clickToTabIndex = async (tabIndex) => {
    await t.click(Selector('*[class*="x-tab-inner"]:not([data-ref="btnInnerEl"])').nth(tabIndex))
}

export const clickToTabName= async (tabName) => {
    await t.click(Selector('*[class*="x-tab-inner"][id*="btnInnerEl"]').withText(tabName));
}




export const delReport = async () => {
    const elNumber = await Selectors.getReportCount() - 1
    await t.click(Selector('*[class*="x-tab-inner"]:not([data-ref="btnInnerEl"])').nth(elNumber))
    await t.click(Selector('span.x-tab-edit-btn-inner').nth(elNumber))
    await t.click(Selector('span.ul-btn-usual-icon-cls-remove').nth(0))
}