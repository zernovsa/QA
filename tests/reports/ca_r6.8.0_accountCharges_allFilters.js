import {test_link} from '../../config.js';
import {t, Selector, ClientFunction} from 'testcafe';
import * as Helper from '../../helper.js';
import * as Helper_local from '../../helpers/ca_r6.7.0_helper';
import * as Selectors from '../../selectors.js';
import * as Selectors_local from '../../selectors/ca_r6.7.0_selectors.js';
import * as Selectors_local2 from '../../selectors/ca_r6.8.0_selectors.js';

var dateFormat = require('dateformat');

fixture `Getting Started`
    .page(test_link);

// логин на страницу
export const login = async () => {
	await t.setTestSpeed(1);
	await Helper.login();
}

// включаем все колонки отчета
export const enableAllColumns = async () => {
	await Helper.enableAllColumns()
}

// инициализация фильтров
export const initFilters = async (menu2) => {
    let filters = await Helper.initFilters(menu2)
    return filters;
}

// выбрать фильтр по индексу или по названию и перебрать все его условия
export const filtersConditionIndexOrName = async (filters, value) => {
	await Helper.filtersConditionIndexOrName(filters, value)
}

// перекликать все фильтры отчета (в зависимости от того каких колонки в отчете выбраны)
export const clickAllFilters = async (report, filters) => {
	var errors = []
	for (let filterIndex = 0; filterIndex < filters.length; filterIndex++) 
    {
		var err = await Helper.filtersWhatToDo(report, filters, filterIndex)
		if(err.length !== 0) errors.push(err)
    }
return errors
}

// выбираем вкладку, в зависимости от отчета
export const clickToAccountTab = async (menu, tabName) => {
    let report = await Helper.clickToAccountTab(menu, tabName);
    return report
}

// переход в аккаунт
export const clickToAccount = async () => {
    await t.click(Selectors_local2.getAccountArrow)
    await t.wait(3000)
    await t.click(Selectors_local2.getAccountItem)
    await t.wait(3000)
}

// переход в аккаунт, переход в отчет, перебираем все фильтры отчета
test('ca_r6.8.0_accountCharges_report_1', async () => {
        await login();
        await clickToAccount();    
        let report = await clickToAccountTab('История списаний', 'Номера');
        let filters = await initFilters('История списаний');
		console.log(filters)
        let errors = await clickAllFilters(report, filters);
        console.log(errors)
        if(errors.length !== 0) throw 'TEST FAILED'
    }
);

// переход в аккаунт, переход в отчет, перебираем все фильтры отчета
test('ca_r6.8.0_accountCharges_report_2', async () => {
        await login();
        await clickToAccount();
        let report = await clickToAccountTab('История списаний', 'Звонки');
        let filters = await initFilters('История списаний');
		console.log(filters)
        let errors = await clickAllFilters(report, filters);
        console.log(errors)
        if(errors.length !== 0) throw 'TEST FAILED'
    }
);