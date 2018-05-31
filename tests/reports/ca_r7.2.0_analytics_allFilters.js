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
export const nestingExpandAll = async () => {
    await Helper.nestingExpandAll()
}

// включаем все колонки отчета
export const enableAllColumns = async () => {
	await Helper.enableAllColumns()
}

// включаем все измерения отчета
export const nestingConfigName = async (name) => {
    await Helper.nestingConfigName(name)
}

// включаем все измерения отчета
export const nestingConfigIndex = async (index) => {
    await Helper.nestingConfigIndex(index)
}

// включаем все измерения отчета
export const nestingConfigAllUnchecked = async () => {
    await Helper.nestingConfigAllUnchecked()
}

// включаем все измерения отчета
export const nestingConfigAll = async () => {
    await Helper.nestingConfigAll()
}

// инициализация фильтров
export const initFilters = async (menu2) => {
    let filters = await Helper.initFilters(menu2)
    return filters;
}

// выбрать фильтр по индексу или по названию и перебрать все его условия
export const filtersConditionIndexOrName = async (report, filters, value) => {
	var errors = await Helper.filtersConditionIndexOrName(report, filters, value)
    return errors
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
export const clickToMenu = async (menu1, menu2, tabName) => {
    let report = await Helper.clickToMenu(menu1, menu2, tabName);
    return report
}

// перебрать все фильтры отчета
test('ca_r7.2.0_allFilters', async () => {
        await login();
		let report = await clickToMenu('Общие отчёты', 'Сквозная аналитика', '');
		
        await enableAllColumns();   

        await nestingConfigAll();

        let filters = await initFilters();
        console.log(filters)
        let errors = await clickAllFilters(report, filters);
        console.log(errors)
        if(errors.length !== 0) throw 'TEST FAILED'
    }
);


// перебрать все фильтры отчета
test('ca_r7.2.0_nesting_1', async () => {
        await login();
        let report = await clickToMenu('Общие отчёты', 'Сквозная аналитика', '');
        
        await enableAllColumns();   

        await nestingConfigAllUnchecked();
        await nestingConfigName('География');

        let filters = await initFilters();
        console.log(filters)
        let errors = await clickAllFilters(report, filters);
        console.log(errors)
        if(errors.length !== 0) throw 'TEST FAILED'
    }
);


// перебрать все фильтры отчета
test('ca_r7.2.0_nestingAll_allFilters', async () => {
        await login();
        let report = await clickToMenu('Общие отчёты', 'Сквозная аналитика', '');
        
        //await enableAllColumns();   

            const getColumnsButton = Selector('*[id*="ul-usualbutton"][id*=btnInnerEl]').withText('Настроить измерения');
            await t.click(getColumnsButton);

            await nestingExpandAll();

            const getUncheckedColumnsCount = ClientFunction(() => document.querySelectorAll('[role*="checkbox"]:not([class*="x-tree-checkbox-checked"]):not([id*="checkboxfield"])').length);
            var count = await getUncheckedColumnsCount()

            count = await getUncheckedColumnsCount()

            for(var i = 0; i < count; i++)
            {

               await nestingConfigAllUnchecked();

               await nestingConfigIndex(i)
            
                // let filters = await initFilters();
                // console.log(filters)
                // let errors = await clickAllFilters(report, filters);
                // console.log(errors)
                // if(errors.length !== 0) throw 'TEST FAILED'

            }
    }
);

