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
export const nestingExpandAll = async (text) => {
    await Helper.nestingExpandAll(text)
}

// включаем все колонки отчета
export const nestingCollapseAll = async (text) => {
    await Helper.nestingCollapseAll(text)
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
export const nestingConfigAllUnchecked = async (text) => {
    await Helper.nestingConfigAllUnchecked(text)
}

// включаем все измерения отчета
export const nestingConfigAll = async () => {
    await Helper.nestingConfigAll()
}

// включаем все измерения отчета
export const tableColumnsSortrers = async () => {
    await Helper.tableColumnsSortrers()
}

// включаем все измерения отчета
export const userFilters = async () => {
    await Helper.userFilters()
}

// включаем все измерения отчета
export const delUserFilters = async () => {
    await Helper.delUserFilters()
}

// включаем все измерения отчета
export const addUserFilters = async (report) => {
    await Helper.addUserFilters(report)
}

// включаем все измерения отчета
export const clickConfigNestingButton = async () => {
    await Helper.clickConfigNestingButton()
}

// включаем все измерения отчета
export const clickSaveNestingButton = async (text) => {
    await Helper.clickSaveNestingButton(text)
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

// включаем все измерения отчета
export const goToReport = async () => {
    await login();
    let report = await clickToMenu('Общие отчёты', 'Содержание', 'Входные страницы');
    return report
}

// включаем все измерения отчета
export const goalsOff = async () => {
    await Helper.goalsOff()
}

// перебрать все фильтры отчета
test('ca_r7.2.0_addUserFilters', async () => {

    let report = await goToReport()

    await addUserFilters(report);

    // добавить метод , который включает созданный фильтр
    

}
);

// перебрать все фильтры отчета
test('ca_r7.2.0_userFilters', async () => {

    let report = await goToReport()

    await userFilters();
}
);

// перебрать все фильтры отчета
test('ca_r7.2.0_goalsOff', async () => {

    let report = await goToReport()

    await goalsOff();
}
);


// перебрать все фильтры отчета
test('ca_r7.2.0_tableColumnsSortrers', async () => {

    let report = await goToReport()

    await enableAllColumns();   
    await nestingExpandAll();
    await nestingConfigAll();
    await goalsOff();
    await tableColumnsSortrers(true);
}
);


// перебрать все фильтры отчета
test('ca_r7.2.0_checkAll_allFilters', async () => {

    let report = await goToReport()

    await enableAllColumns();   
    await nestingConfigAll();

    await goalsOff();

    let filters = await initFilters();
    console.log(filters)
    let errors = await clickAllFilters(report, filters);
    console.log(errors)
    if(errors.length !== 0) throw 'TEST FAILED'
}
);


// перебрать все фильтры отчета
test('ca_r7.2.0_nestingName_allFilters', async () => {

    let report = await goToReport()

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
test('ca_r7.2.0_indexAll', async () => {

    let report = await goToReport()

    await nestingExpandAll();
    await nestingConfigAllUnchecked(); 
    await clickConfigNestingButton()

    const getUncheckedColumnsCount = ClientFunction(() => document.querySelectorAll(`tr:not([class *= x-grid-row-disabled]) [role*="checkbox"]:not([class*="x-tree-checkbox-checked"]):not([id*="checkboxfield"]`).length);
    var count = await getUncheckedColumnsCount()

    console.log(count)

    for(var index = 0; index < count; index++)
    {

        var selector = await Selector(`tr:not([class *= x-grid-row-disabled]) [role*="checkbox"]:not([class*="x-tree-checkbox-checked"]):not([id*="checkboxfield"]`);
        var check = await selector.nth(index).getStyleProperty('display');

        if(check==="inline-block") 
        {
            await t.click(selector.nth(index))
            await clickSaveNestingButton()
            await nestingConfigAllUnchecked(); 
            await clickConfigNestingButton()
        }
    }
}
);

// перебрать все фильтры отчета ДРИЛДАУН
test('ca_r7.2.0_indexAll_DD', async () => {

    let report = await goToReport()

    // проавлиться в интегрированную РК

    var selector = Selector('a').withText('[интегрированная]')
    await t.click(selector.nth(0))

    var layer=['Кампании', 'Группы объявлений','Объявления','Ключевые слова','Рекламные площадки','Аудитории ретаргетинга']

    for(var i = 0; i < layer.length; i++)
    {
        var s = Selector('*[id*="tab"][id*="btnInnerEl"]').withText(layer[i])
        await  t.click(s.nth(0))

        await nestingExpandAll('Применить');
        await nestingConfigAllUnchecked('Применить'); 
        await clickConfigNestingButton()

        const getUncheckedColumnsCount = ClientFunction(() => document.querySelectorAll(`tr:not([class *= x-grid-row-disabled]) [role*="checkbox"]:not([class*="x-tree-checkbox-checked"]):not([id*="checkboxfield"]`).length);
        var count = await getUncheckedColumnsCount()

        console.log(count)

        for(var index = 0; index < count; index++)
        {

            var selector = await Selector(`tr:not([class *= x-grid-row-disabled]) [role*="checkbox"]:not([class*="x-tree-checkbox-checked"]):not([id*="checkboxfield"]`);
            var check = await selector.nth(index).getStyleProperty('display');

            if(check==="inline-block") 
            {
                await t.click(selector.nth(index))
                await clickSaveNestingButton('Применить')
                await nestingConfigAllUnchecked('Применить'); 
                await clickConfigNestingButton()
            }
        }
    }
}
);


// перебрать все фильтры отчета
test('ca_r7.2.0_indexAll_allFilters', async () => {

    let report = await goToReport()

    await nestingExpandAll();
    await nestingConfigAllUnchecked(); 
    await clickConfigNestingButton()

    const getUncheckedColumnsCount = ClientFunction(() => document.querySelectorAll(`tr:not([class *= x-grid-row-disabled]) [role*="checkbox"]:not([class*="x-tree-checkbox-checked"]):not([id*="checkboxfield"]`).length);
    var count = await getUncheckedColumnsCount()


    console.log(count)

    for(var index = 0; index < count; index++)
    {
        console.log(index)
        var selector = await Selector(`tr:not([class *= x-grid-row-disabled]) [role*="checkbox"]:not([class*="x-tree-checkbox-checked"]):not([id*="checkboxfield"]`);
        var check = await selector.nth(index).getStyleProperty('display');

        if(check==="inline-block") 
        {

            await t.click(selector.nth(index))
            await clickSaveNestingButton()

            let filters = await initFilters();
            console.log(filters)
            let errors = await clickAllFilters(report, filters);
            console.log(errors)
            if(errors.length !== 0) throw 'TEST FAILED'


            await nestingConfigAllUnchecked(); 
            await clickConfigNestingButton()
        }


    }
}

);
