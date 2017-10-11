import {t, Selector, ClientFunction} from 'testcafe';
import {username, password} from './config.js';
import * as Helper_local from './helpers/ca_r6.7.0_Helper.js';
import * as Selectors from './selectors.js';
import * as Selectors_local2 from './selectors/ca_r6.8.0_selectors.js';


// для создания скриншотов (текущая дата, время)
var dateFormat = require('dateformat');

// логин на страницу
export const login = async () => {
    await t
    //.navigateTo(`https://ca1.webdev.uiscom.ru`)
        .typeText('input[name="login"]', username)
        .typeText('input[name="password"]', password)
        .pressKey('enter')
}

// случайное число
export function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// добавление сайта
export const addSite = async () => { 

}

// выбираем вкладку, в зависимости от отчета
export const clickToTab = async (menu1, menu2, tabName) => {

        await t.click(Selectors.getView(menu1))
        
        if (menu2 != '') await t.click(Selectors.getViewItem(menu2))

        switch (tabName) {
            case '': {
                break;
            }
            case 'Рекламные кампании': {
                await Helper_local.clickToTabIndex(0)
                break;
            }
            case 'Источники': {
                await Helper_local.clickToTabIndex(1)
                break;
            }
            case 'Каналы': {
                await Helper_local.clickToTabIndex(2)
                break;
            }
            default: {
                await Helper_local.clickToTabName(tabName)
                break;
            }
        }
}

// включаем все колонки отчета
export const enableAllColumns = async () => {
    const getColumnsButton = Selector('*[id*="ul-usualbutton"][id*=btnInnerEl]').withText('Настроить столбцы');
    await t.click(getColumnsButton);

    const getUncheckedColumnsCount = ClientFunction(() => document.querySelectorAll('[role*="checkbox"]:not([class*="x-tree-checkbox-checked"]):not([id*="checkboxfield"])').length);
    var count                      = await getUncheckedColumnsCount()
    console.log('Columns count: ' + count)

    while (count > 0) {
        var selector = await Selector('[role*="checkbox"]:not([class*="x-tree-checkbox-checked"]):not([id*="checkboxfield"])')
        await t.click(selector.nth(0))
        await t.wait(1000)
        count = await getUncheckedColumnsCount()
        console.log(count + ' ')
    }

    let nowTime = dateFormat(Date(), "isoDateTime");
    let step    = 'enableAllColumns'
    await t.takeScreenshot('./ca_r6.8.0-' + nowTime + '/' + step)

    const getSaveButton = Selector('*[id*="ul-mainbutton"][id*=btnInnerEl]').withText('Сохранить');
    await t.click(getSaveButton);
}

// что делать с фильтром в зависимости от его типа (выбрать фильтр, перебрать все значения условий, добавить случайное значение, применить фильтр и удалить его)
export const filtersWhatToDo = async (filters, filterIndex) => {
    
        let step    = 1;

        let nowTime = dateFormat(Date(), "isoDateTime");
        switch (filters[filterIndex].data.type) {
            case 'integer': {

                for (let conditionIndex = 0; conditionIndex < 4; conditionIndex++) {
                    await t.click(Selectors_local2.getAddFilter)
                    await t.wait(1000)

                    const arrowCount = await Selectors_local2.getArrowCount

                    let value = getRandomInt(1, 999);
                    let text  = '.filter text: ' + filters[filterIndex].data.name + ' type: integer' + ' conditionIndex:' +
                                conditionIndex + ' value: ' + value
                    console.log(text)

                    let getParamArrow = await Selectors_local2.getParamArrow()
                    await t.click(getParamArrow)
                    await t.click(Selectors_local2.getParamSelector.nth(filterIndex))

                    let getСonditionArrow = await Selectors_local2.getСonditionArrow()
                    await t.click(getСonditionArrow)
                    await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));

                    await t.click(Selectors_local2.getValueNumberSelector)
                    await t.typeText(Selectors_local2.getValueNumberSelector, value.toString());

                    await t.click(Selectors_local2.getValueButtonSelector)
                    await t.click(Selectors_local2.getApplyButtonSelector)

                    await t.takeScreenshot('./ca_r6.8.0-' + nowTime + '/' + step++ + text)

                    await t.click(Selectors_local2.getCancelButtonSelector)
                }
                break;
            }
            case 'numeric': {
                for (let conditionIndex = 0; conditionIndex < 4; conditionIndex++) {

                    await t.click(Selectors_local2.getAddFilter)
                    await t.wait(1000)

                    let value = getRandomInt(1, 999);
                    let text  = '.filter text: ' + filters[filterIndex].data.name + ' type: integer' + ' conditionIndex:' +
                                conditionIndex + ' value: ' + value
                    console.log(text)

                    let getParamArrow = await Selectors_local2.getParamArrow()
                    await t.click(getParamArrow)
                    await t.click(Selectors_local2.getParamSelector.nth(filterIndex))

                    let getСonditionArrow = await Selectors_local2.getСonditionArrow()
                    await t.click(getСonditionArrow)
                    await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));

                    await t.click(Selectors_local2.getValueNumberSelector)
                    await t.typeText(Selectors_local2.getValueNumberSelector, value.toString());

                    await t.click(Selectors_local2.getValueButtonSelector)
                    await t.click(Selectors_local2.getApplyButtonSelector)

                    await t.takeScreenshot('./ca_r6.8.0-' + nowTime + '/' + step++ + text)

                    await t.click(Selectors_local2.getCancelButtonSelector)
                }
                break;
            }
            case 'string': {
                for (let conditionIndex = 0; conditionIndex < 3; conditionIndex++) {

                    await t.click(Selectors_local2.getAddFilter)
                    await t.wait(1000)

                    const arrowCount = await Selectors_local2.getArrowCount

                    let value = getRandomInt(1, 999);
                    let text  = '.filter text: ' + filters[filterIndex].data.name + ' type: string' + ' conditionIndex:' +
                                conditionIndex + ' value: ' + value
                    console.log(text)

                     let getParamArrow = await Selectors_local2.getParamArrow()
                    await t.click(getParamArrow)
                    await t.click(Selectors_local2.getParamSelector.nth(filterIndex))

                    let getСonditionArrow = await Selectors_local2.getСonditionArrow()
                    await t.click(getСonditionArrow)
                    await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));

                    await t.click(Selectors_local2.getValueTextSelector)
                    await t.typeText(Selectors_local2.getValueTextSelector, value.toString());

                    await t.click(Selectors_local2.getValueButtonSelector)
                    await t.click(Selectors_local2.getApplyButtonSelector)

                    await t.takeScreenshot('./ca_r6.8.0-' + nowTime + '/' + step++ + text)

                    await t.click(Selectors_local2.getCancelButtonSelector)
                }
                break;
            }
            case 'array': {
                let conditionCount = 2
                for (let conditionIndex = 0; conditionIndex < conditionCount; conditionIndex++) {
                    for (let valueIndex = 0; valueIndex < filters[filterIndex].data.valueElData.length; valueIndex++) {
                        await t.click(Selectors_local2.getAddFilter)
                        await t.wait(1000)

                        const arrowCount = await Selectors_local2.getArrowCount

                        let value = getRandomInt(1, 999);
                        let text  = '.filter text: ' + filters[filterIndex].data.name + ' type: array' +
                                    ' conditionIndex:' + conditionIndex + ' value: ' + filters[filterIndex].data.value
                        console.log(text)

                        let getParamArrow = await Selectors_local2.getParamArrow()
                        await t.click(getParamArrow)
                        await t.click(Selectors_local2.getParamSelector.nth(filterIndex))

                        let getСonditionArrow = await Selectors_local2.getСonditionArrow()
                        await t.click(getСonditionArrow)
                        await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));

                        let getValueArrow = await Selectors_local2.getValueArrow()
                        await t.click(getValueArrow)

                        await t.click(Selectors_local2.getValueSelector.nth(filters.length + conditionCount + valueIndex));

                        await t.click(Selectors_local2.getValueButtonSelector)
                        await t.click(Selectors_local2.getApplyButtonSelector)

                        await t.takeScreenshot('./ca_r6.8.0-' + nowTime + '/' + step++ + '.' + text)

                        await t.click(Selectors_local2.getCancelButtonSelector)


                    }
                }
                break;
            }
            case 'time': {
                let conditionCount = 4
                // let valueCount = 96
                let valueCount     = 1
                for (let conditionIndex = 0; conditionIndex < conditionCount; conditionIndex++) {
                    for (let valueIndex = 0; valueIndex < valueCount; valueIndex++) {
                        await t.click(Selectors_local2.getAddFilter)
                        await t.wait(1000)

                        const arrowCount = await Selectors_local2.getArrowCount

                        let value = 'None'
                        let text  = '.filter text: ' + filters[filterIndex].data.name + ' type: time' + ' conditionIndex:' +
                                    conditionIndex + ' value: ' + value
                        console.log(text)

                         let getParamArrow = await Selectors_local2.getParamArrow()
                        await t.click(getParamArrow)
                        await t.click(Selectors_local2.getParamSelector.nth(filterIndex))

                        let getСonditionArrow = await Selectors_local2.getСonditionArrow()
                        await t.click(getСonditionArrow)
                        await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));

                        await t.click(Selectors_local2.getArrowSelectorForTime)
                        await t.click(Selectors_local2.getValueSelectorForTime.nth(valueIndex))

                        await t.click(Selectors_local2.getValueButtonSelector)
                        await t.click(Selectors_local2.getApplyButtonSelector)

                        await t.takeScreenshot('./ca_r6.8.0-' + nowTime + '/' + step++ + text)

                        await t.click(Selectors_local2.getCancelButtonSelector)
                    }
                }
                break;
            }
            case 'list': {
                let conditionCount = 2
                for (let conditionIndex = 0; conditionIndex < conditionCount; conditionIndex++) {
                    for (let valueIndex = 0; valueIndex < filters[filterIndex].data.valueElData.length; valueIndex++) {
                        await t.click(Selectors_local2.getAddFilter)
                        await t.wait(1000)

                        const arrowCount = await Selectors_local2.getArrowCount

                        let value = getRandomInt(1, 999);
                        let text  = '.filter text: ' + filters[filterIndex].data.name + ' type: list' + ' conditionIndex:' +
                                    conditionIndex + ' value: ' + filters[filterIndex].data.value
                        console.log(text)

                        let getParamArrow = await Selectors_local2.getParamArrow()
                        await t.click(getParamArrow)
                        await t.click(Selectors_local2.getParamSelector.nth(filterIndex))

                        let getСonditionArrow = await Selectors_local2.getСonditionArrow()
                        await t.click(getСonditionArrow)
                        await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));

                        let getValueArrow = await Selectors_local2.getValueArrow()
                        await t.click(getValueArrow)

                        await t.click(Selectors_local2.getValueButtonSelector)
                        await t.click(Selectors_local2.getApplyButtonSelector)

                        await t.takeScreenshot('./ca_r6.8.0-' + nowTime + '/' + step++ + '.' + text)

                        await t.click(Selectors_local2.getCancelButtonSelector)


                    }
                }
                break;
            }
        }
    
}

// функция выбирающая что передали в фильтр Индекс или Название фильтра, и вызываем filtersWhatToDo - что делать в зависимости от типа фильтра
export const filtersConditionIndexOrName = async (filters, value) => {
    
    switch (typeof value) {
        case 'number': { // если передали индекс  фильтра
            await filtersWhatToDo(filters, value)
            break;
        }
        case 'string': { // если передали название  фильтра
            for (let filterIndex = 0; filterIndex < filters.length; filterIndex++) 
                if (filters[filterIndex].data.name = value) 
                {
                    await filtersWhatToDo(filters, filterIndex)

                }
        break;
        }
    }

}