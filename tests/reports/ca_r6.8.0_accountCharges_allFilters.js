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

    var tree = [];   

    await t.click(Selectors_local2.getAddFilter)
    await t.wait(1000)

    var storeElCount = await Selectors_local2.getStoreEl(Selectors_local2.storeName)
    var filtersCount = await Selectors_local2.getFiltersCount(Selectors_local2.storeName, storeElCount - 1)

    console.log('Количество фильтров в отчете: ' + filtersCount)

    var index
    switch (menu2) {
        case 'Звонки': {
            index = 0;
            break;
        }
        case 'Запросы к API': {
            index = 0;
            break;
        }
        default: {
            index = storeElCount - 1;
            break;
        }
    }

	var filters = await Selectors_local2.readFilters(Selectors_local2.storeName, index, menu2)

    console.log(filters)

	return filters;
}

// выбрать фильтр по индексу или по названию и перебрать все его условия
export const filtersConditionIndexOrName = async (filters, value) => {
	await Helper.filtersConditionIndexOrName(filters, value)
}

// перекликать все фильтры отчета (в зависимости от того каких колонки в отчете выбраны)
export const clickAllFilters = async (filters) => {
    for (let filterIndex = 0; filterIndex < filters.length; filterIndex++) 
    	await Helper.filtersWhatToDo(filters, filterIndex)
}

// выбираем вкладку, в зависимости от отчета
export const clickToTab = async (menu1, menu2, tabName) => {
    await Helper.clickToTab(menu1, menu2, tabName);
}

// выбираем вкладку, в зависимости от отчета
export const clickToAccountTab = async (menu, tabName) => {
    await Helper.clickToAccountTab(menu, tabName);
}

// переход в аккаунт
export const clickToAccount = async () => {
        await t.click(Selectors_local2.getAccountArrow)
        await t.click(Selectors_local2.getAccountItem)
}

// переход в аккаунт, переход в отчет, перебираем все фильтры отчета
test('ca_r6.8.0_accountCharges_report_1', async () => {
        await login();
        await clickToAccount();
        await clickToAccountTab('История списаний', 'Номера');
        let filters = await initFilters('История списаний');
        await clickAllFilters(filters);
    }
);

// переход в аккаунт, переход в отчет, перебираем все фильтры отчета
test('ca_r6.8.0_accountCharges_report_2', async () => {
        await login();
        await clickToAccount();
        await clickToAccountTab('История списаний', 'Звонки');
        let filters = await initFilters('История списаний');
        await clickAllFilters(filters);
    }
);