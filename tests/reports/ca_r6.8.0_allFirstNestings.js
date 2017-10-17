import {test_link, secondNestingTree} from '../../config.js';
import {t, Selector, ClientFunction} from 'testcafe';
import * as Helper from '../../helper.js';
import * as Helper_local from '../../helpers/ca_r6.7.0_helper';
import * as Selectors from '../../selectors.js';
import * as Selectors_local from '../../selectors/ca_r6.7.0_selectors.js';
import * as Selectors_local2 from '../../selectors/ca_r6.8.0_selectors.js';


fixture `Getting Started`
    .page(test_link);


// логин на страницу
export const login = async () => {
    await t.setTestSpeed(1);
    await Helper.login();
}

// выбираем вкладку, в зависимости от отчета
export const clickToTab = async (menu1, menu2, tabName) => {
    await Helper.clickToTab(menu1, menu2, tabName);
}

// включаем все колонки отчета
export const enableAllColumns = async () => {
    await Helper.enableAllColumns()
}


export const addReport = async () => {
    const reportCount = await Selectors_local.getReportCount()
    if (reportCount < 15) {
        await t
            .click(Selectors_local.getAddReport)
            .click(Selectors_local.getPencil)
            .wait(1000)
            .pressKey('delete')
            .wait(1000)
            .typeText(Selectors_local.getReportInput, 'Report-'+Helper.getRandomInt(10000,99999))
            .wait(1000)
            .click(Selectors_local.getPencil)
            .wait(1000)
    }
    else {
    }
}


export const delReport = async () => {
    const elNumber = await Selectors.getReportCount() - 1
    await t.click(Selector('*[class*="x-tab-inner"]:not([data-ref="btnInnerEl"])').nth(elNumber))
    await t.click(Selector('span.x-tab-edit-btn-inner').nth(elNumber))
    await t.click(Selector('span.ul-btn-usual-icon-cls-remove').nth(0))
}

test('ca_r6.8.0_allFirstNestings_report_1', async () => {
        await login();
        await clickToTab('Общие отчёты', 'Анализ трафика', '');
        await enableAllColumns();
        await addReport();

    }
);