import {t, Selector, ClientFunction} from 'testcafe';
import {username, password, secondNestingTree} from './config.js';
import * as Helper_local from './helpers/ca_r6.7.0_Helper.js';
import * as Selectors from './selectors.js';
import * as Selectors_local from './selectors/ca_r6.7.0_selectors.js';
import * as Selectors_local2 from './selectors/ca_r6.8.0_selectors.js';

var colors = require('colors');

function loggerInit(name) 
{
    var log4js = require('log4js');
    log4js.configure({
      appenders: { cheese: { type: 'file', filename: name } },
      categories: { default: { appenders: ['cheese'], level: 'debug' } }
    });
    const logger = log4js.getLogger('cheese');

return logger  
}

function log(type, message) {
    var logger = loggerInit('../logs/log.log')
    console.log(message);
    if (type =='error') logger.error(message)
    if (type == 'debug') logger.debug(message)
}


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



export const clickToAccountTab = async (menu, tabName) => {
    await t.click(Selectors.getView(menu))
    await Helper_local.clickToTabName(tabName)

}

// включаем все колонки отчета
export const enableAllColumns = async () => {
    const getColumnsButton = Selector('*[id*="ul-usualbutton"][id*=btnInnerEl]').withText('Настроить столбцы');
    await t.click(getColumnsButton);

    const getUncheckedColumnsCount = ClientFunction(() => document.querySelectorAll('[role*="checkbox"]:not([class*="x-tree-checkbox-checked"]):not([id*="checkboxfield"])').length);
    var count                      = await getUncheckedColumnsCount()
    //console.log('Columns count: ' + count)

    while (count > 0) {
        var selector = await Selector('[role*="checkbox"]:not([class*="x-tree-checkbox-checked"]):not([id*="checkboxfield"])')
        await t.click(selector.nth(0))
        await t.wait(1000)
        count = await getUncheckedColumnsCount()
        //console.log(count + ' ')
    }

    let nowTime = dateFormat(Date(), "isoDateTime");
    let step    = 'enableAllColumns'
    // await t.takeScreenshot('./ca_r6.8.0-' + nowTime + '/' + step)

    const getSaveButton = Selector('*[id*="ul-mainbutton"][id*=btnInnerEl]').withText('Сохранить');
    await t.click(getSaveButton);
}

export const errorExists = ClientFunction(() => document.querySelectorAll('*[id*="messagebox"][id*="innerCt"]').length);
export const reloadPage = ClientFunction(() => window.location.reload());

export const errorCheck = async () => {

    let flag=false
    let count = await errorExists()
    
    await t.wait(3000) 

    if (count != 0)
    {
        flag=true
        await t.click('*[id*="messagebox"][id*="toolbar-innerCt"]')
        await reloadPage()
    }



return flag
}
// что делать с фильтром в зависимости от его типа (выбрать фильтр, перебрать все значения условий, добавить случайное значение, применить фильтр и удалить его)
export const filtersWhatToDo = async (filters, filterIndex) => {

        
        // time
        // time_with_days
        // date
        // system_list
        // system_tree
        // list
        // text
        // text_list
        // numeric
        // numeric_dict

        let errors  = [];

        let nowTime = dateFormat(Date(), "isoDateTime");
        switch (filters[filterIndex].data.type) {
            // тип Числовой
            case 'numeric': {
                for (let conditionIndex = 0; conditionIndex < 4; conditionIndex++) {
                    //значение фильтра
                    let value = getRandomInt(1, 999);

                    try {
                        await t.click(Selectors_local2.getAddFilter)
                        await t.wait(1000)
                        //кликаем на стрелку параметров
                        let getParamArrow = await Selectors_local2.getParamArrow()
                        await t.click(getParamArrow)
                        //выбираем нужный параметр
                        await t.click(Selectors_local2.getParamSelector.nth(filterIndex))
                        //кликаем на стрелку условий
                        let getСonditionArrow = await Selectors_local2.getСonditionArrow()
                        await t.click(getСonditionArrow)
                        //кликаем на условие 
                        await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));
                        //кликаем на поле значение
                        await t.click(Selectors_local2.getValueNumberSelector)
                        //вводим значение 
                        await t.typeText(Selectors_local2.getValueNumberSelector, value.toString());
                        //кликаем применить
                        await t.click(Selectors_local2.getValueButtonSelector)

                        var reportName = await Selectors_local2.whatReport()
                        //кликаем применить
                        await t.click(Selectors_local2.getApplyButtonSelector)

                        let flag = await errorCheck()
                        if (flag==true) 
                        {
                            //console.log('STEP FAILED: '.red + ' report: '+ reportName + ' filter: ' + filters[filterIndex].data.name.yellow + ' type: '+ filters[filterIndex].data.type.yellow + ' conditionIndex: ' + conditionIndex.toString().yellow + ' value: ' + value.toString().yellow)
                            log('error', 'STEP  FAILED: ' + ' report:  '+ reportName + ' filter: ' + filters[filterIndex].data.name + ' type: '+ filters[filterIndex].data.type + ' conditionIndex: ' + conditionIndex.toString() + ' value: ' + value.toString());
                            errors.push(
                                {
                                    id: filterIndex,
                                    report: reportName,
                                    filter: filters[filterIndex].data.name, 
                                    type: filters[filterIndex].data.type, 
                                    condition: conditionIndex, 
                                    value: value
                                }
                            )
                        }
                        else
                        {
                            //console.log('STEP PASSED: '.green + ' report: '+ reportName + ' filter: ' + filters[filterIndex].data.name.yellow + ' type: '+ filters[filterIndex].data.type.yellow + ' conditionIndex: ' + conditionIndex.toString().yellow + ' value: ' + value.toString().yellow)
                            log('debug', 'STEP PASSED: ' + ' report:  '+ reportName + ' filter: ' + filters[filterIndex].data.name + ' type: '+ filters[filterIndex].data.type + ' conditionIndex: ' + conditionIndex.toString() + ' value: ' + value.toString());
                            //кликаем отменить
                            await t.click(Selectors_local2.getCancelButtonSelector)
                        }

                    }
                    catch(err)
                    {
                        log('error', 'STEP  FAILED: '+ ' report:  '+ reportName + ' filter: ' + filters[filterIndex].data.name + ' type: '+ filters[filterIndex].data.type + ' conditionIndex: ' + conditionIndex.toString() + ' value: ' + value.toString());
                        //console.log('STEP FAILED: '.red + ' report: '+ reportName + ' filter: ' + filters[filterIndex].data.name.yellow + ' type: '+ filters[filterIndex].data.type.yellow + ' conditionIndex: ' + conditionIndex.toString().yellow + ' value: ' + value.toString().yellow)
                        //console.log('error', 'TEST  FAILED: '.red + ' filter text: ' + filters[filterIndex].data.name.yellow + ' type: '+ filters[filterIndex].data.type.yellow + ' conditionIndex: ' + conditionIndex.toString().yellow + ' value: ' + value.toString().yellow)
                        errors.push(
                            {
                                id: filterIndex,
                                report: reportName,
                                filter: filters[filterIndex].data.name, 
                                type: filters[filterIndex].data.type, 
                                condition: conditionIndex, 
                                value: value
                            }
                        )
                    }
                }
                break;
            }

            case 'text': {
                for (let conditionIndex = 0; conditionIndex < 3; conditionIndex++) {
                    try 
                    {
                        await t.click(Selectors_local2.getAddFilter)
                        await t.wait(1000)

                        const arrowCount = await Selectors_local2.getArrowCount

                        let value = getRandomInt(1, 999);

                        //кликаем на стрелку параметров
                        let getParamArrow = await Selectors_local2.getParamArrow()
                        await t.click(getParamArrow)
                        //выбираем нужный параметр
                        await t.click(Selectors_local2.getParamSelector.nth(filterIndex))
                        //кликаем на стрелку условий
                        let getСonditionArrow = await Selectors_local2.getСonditionArrow()
                        await t.click(getСonditionArrow)
                        //кликаем на условие
                        await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));
                        //кликаем на поле значение
                        await t.click(Selectors_local2.getValueTextSelector)
                        //вводим значение 
                        await t.typeText(Selectors_local2.getValueTextSelector, value.toString());
                        //кликаем применить
                        await t.click(Selectors_local2.getValueButtonSelector)

                        var reportName = await Selectors_local2.whatReport()
                        //кликаем применить
                        await t.click(Selectors_local2.getApplyButtonSelector)

                        let flag = await errorCheck()
                        if (flag==true) 
                        {
                            //console.log('STEP FAILED: '.red + ' report: '+ reportName + ' filter: ' + filters[filterIndex].data.name.yellow + ' type: '+ filters[filterIndex].data.type.yellow + ' conditionIndex: ' + conditionIndex.toString().yellow + ' value: ' + value.toString().yellow)
                            log('error', 'STEP  FAILED: ' + ' report:  '+ reportName + ' filter: ' + filters[filterIndex].data.name + ' type: '+ filters[filterIndex].data.type + ' conditionIndex: ' + conditionIndex.toString() + ' value: ' + value.toString());
                            errors.push(
                                {
                                    id: filterIndex,
                                    report: reportName,
                                    filter: filters[filterIndex].data.name, 
                                    type: filters[filterIndex].data.type, 
                                    condition: conditionIndex, 
                                    value: value
                                }
                            )
                        }
                        else
                        {
                            //console.log('STEP PASSED: '.green + ' report: '+ reportName + ' filter: ' + filters[filterIndex].data.name.yellow + ' type: '+ filters[filterIndex].data.type.yellow + ' conditionIndex: ' + conditionIndex.toString().yellow + ' value: ' + value.toString().yellow)
                            log('debug', 'STEP PASSED: ' + ' report:  '+ reportName + ' filter: ' + filters[filterIndex].data.name + ' type: '+ filters[filterIndex].data.type + ' conditionIndex: ' + conditionIndex.toString() + ' value: ' + value.toString());
                            //кликаем отменить
                            await t.click(Selectors_local2.getCancelButtonSelector)
                        }
                    }
                    catch(err)
                    {
                        log('error', 'STEP  FAILED: '+ ' report:  '+ reportName + ' filter: ' + filters[filterIndex].data.name + ' type: '+ filters[filterIndex].data.type + ' conditionIndex: ' + conditionIndex.toString() + ' value: ' + value.toString());
                        //console.log('STEP FAILED: '.red + ' report: '+ reportName + ' filter: ' + filters[filterIndex].data.name.yellow + ' type: '+ filters[filterIndex].data.type.yellow + ' conditionIndex: ' + conditionIndex.toString().yellow + ' value: ' + value.toString().yellow)
                        //console.log('error', 'TEST  FAILED: '.red + ' filter text: ' + filters[filterIndex].data.name.yellow + ' type: '+ filters[filterIndex].data.type.yellow + ' conditionIndex: ' + conditionIndex.toString().yellow + ' value: ' + value.toString().yellow)
                        errors.push(
                            {
                                id: filterIndex,
                                report: reportName,
                                filter: filters[filterIndex].data.name, 
                                type: filters[filterIndex].data.type, 
                                condition: conditionIndex, 
                                value: value
                            }
                        )
                    }
                    //await t.takeScreenshot('./ca_r6.8.0-' + nowTime + '/' + step++ + text)
                }
                break;
            }

            // case 'integer': {

            //     for (let conditionIndex = 0; conditionIndex < 4; conditionIndex++) {
            //         await t.click(Selectors_local2.getAddFilter)
            //         await t.wait(1000)

            //         const arrowCount = await Selectors_local2.getArrowCount

            //         let value = getRandomInt(1, 999);
            //         let text  = '.filter text: ' + filters[filterIndex].data.name + ' type: integer' + ' conditionIndex:' +
            //                     conditionIndex + ' value: ' + value
            //         console.log(text)

            //         let getParamArrow = await Selectors_local2.getParamArrow()
            //         await t.click(getParamArrow)
            //         await t.click(Selectors_local2.getParamSelector.nth(filterIndex))

            //         let getСonditionArrow = await Selectors_local2.getСonditionArrow()
            //         await t.click(getСonditionArrow)
            //         await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));

            //         await t.click(Selectors_local2.getValueNumberSelector)
            //         await t.typeText(Selectors_local2.getValueNumberSelector, value.toString());

            //         await t.click(Selectors_local2.getValueButtonSelector)
            //         await t.click(Selectors_local2.getApplyButtonSelector)

            //         await t.takeScreenshot('./ca_r6.8.0-' + nowTime + '/' + step++ + text)

            //         await t.click(Selectors_local2.getCancelButtonSelector)
            //     }
            //     break;
            // }
            

            // case 'array': {
            //     let conditionCount = 2
            //     for (let conditionIndex = 0; conditionIndex < conditionCount; conditionIndex++) {
            //         for (let valueIndex = 0; valueIndex < filters[filterIndex].data.valueElData.length; valueIndex++) {
            //             await t.click(Selectors_local2.getAddFilter)
            //             await t.wait(1000)

            //             const arrowCount = await Selectors_local2.getArrowCount

            //             let value = getRandomInt(1, 999);
            //             let text  = '.filter text: ' + filters[filterIndex].data.name + ' type: array' +
            //                         ' conditionIndex:' + conditionIndex + ' value: ' + filters[filterIndex].data.value
            //             console.log(text)

            //             let getParamArrow = await Selectors_local2.getParamArrow()
            //             await t.click(getParamArrow)
            //             await t.click(Selectors_local2.getParamSelector.nth(filterIndex))

            //             let getСonditionArrow = await Selectors_local2.getСonditionArrow()
            //             await t.click(getСonditionArrow)
            //             await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));

            //             let getValueArrow = await Selectors_local2.getValueArrow()
            //             await t.click(getValueArrow)

            //             await t.click(Selectors_local2.getValueSelector.nth(filters.length + conditionCount + valueIndex));

            //             await t.click(Selectors_local2.getValueButtonSelector)
            //             await t.click(Selectors_local2.getApplyButtonSelector)

            //             await t.takeScreenshot('./ca_r6.8.0-' + nowTime + '/' + step++ + '.' + text)

            //             await t.click(Selectors_local2.getCancelButtonSelector)


            //         }
            //     }
            //     break;
            // }
            // case 'time': {
            //     let conditionCount = 4
            //     // let valueCount = 96
            //     let valueCount     = 1
            //     for (let conditionIndex = 0; conditionIndex < conditionCount; conditionIndex++) {
            //         for (let valueIndex = 0; valueIndex < valueCount; valueIndex++) {
            //             await t.click(Selectors_local2.getAddFilter)
            //             await t.wait(1000)

            //             const arrowCount = await Selectors_local2.getArrowCount

            //             let value = 'None'
            //             let text  = '.filter text: ' + filters[filterIndex].data.name + ' type: time' + ' conditionIndex:' +
            //                         conditionIndex + ' value: ' + value
            //             console.log(text)

            //              let getParamArrow = await Selectors_local2.getParamArrow()
            //             await t.click(getParamArrow)
            //             await t.click(Selectors_local2.getParamSelector.nth(filterIndex))

            //             let getСonditionArrow = await Selectors_local2.getСonditionArrow()
            //             await t.click(getСonditionArrow)
            //             await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));

            //             await t.click(Selectors_local2.getArrowSelectorForTime)
            //             await t.click(Selectors_local2.getValueSelectorForTime.nth(valueIndex))

            //             await t.click(Selectors_local2.getValueButtonSelector)
            //             await t.click(Selectors_local2.getApplyButtonSelector)

            //             await t.takeScreenshot('./ca_r6.8.0-' + nowTime + '/' + step++ + text)

            //             await t.click(Selectors_local2.getCancelButtonSelector)
            //         }
            //     }
            //     break;
            // }
            // case 'list': {
            //     let conditionCount = 2
            //     for (let conditionIndex = 0; conditionIndex < conditionCount; conditionIndex++) {
            //         for (let valueIndex = 0; valueIndex < filters[filterIndex].data.valueElData.length; valueIndex++) {
            //             await t.click(Selectors_local2.getAddFilter)
            //             await t.wait(1000)

            //             const arrowCount = await Selectors_local2.getArrowCount

            //             let value = getRandomInt(1, 999);
            //             let text  = '.filter text: ' + filters[filterIndex].data.name + ' type: list' + ' conditionIndex:' +
            //                         conditionIndex + ' value: ' + filters[filterIndex].data.value
            //             console.log(text)

            //             let getParamArrow = await Selectors_local2.getParamArrow()
            //             await t.click(getParamArrow)
            //             await t.click(Selectors_local2.getParamSelector.nth(filterIndex))

            //             let getСonditionArrow = await Selectors_local2.getСonditionArrow()
            //             await t.click(getСonditionArrow)
            //             await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));

            //             let getValueArrow = await Selectors_local2.getValueArrow()
            //             await t.click(getValueArrow)

            //             await t.click(Selectors_local2.getValueSelector.nth(filters.length + conditionCount + valueIndex));

            //             await t.click(Selectors_local2.getValueButtonSelector)
            //             await t.click(Selectors_local2.getApplyButtonSelector)

            //             await t.takeScreenshot('./ca_r6.8.0-' + nowTime + '/' + step++ + '.' + text)

            //             await t.click(Selectors_local2.getCancelButtonSelector)


            //         }
            //     }
            //     break;
            // }
        }

return errors;
}

// функция выбирающая что передали в фильтр Индекс или Название фильтра, и вызываем filtersWhatToDo - что делать в зависимости от типа фильтра
export const filtersConditionIndexOrName = async (filters, value) => {
    var errors
    switch (typeof value) {
        case 'number': { // если передали индекс  фильтра
            errors = await filtersWhatToDo(filters, value)
            break;
        }
        case 'string': { // если передали название  фильтра
            for (let filterIndex = 0; filterIndex < filters.length; filterIndex++) 
                if (filters[filterIndex].data.name == value) 
                {
                    errors = await filtersWhatToDo(filters, filterIndex)

                }
        break;
        }
    }
return errors
}

// инициализация фильтров
export const initFilters = async () => {

    var tree = [];   

    await t.click(Selectors_local2.getAddFilter)
    await t.wait(1000)

    var filtersCount = await Selectors_local2.getFiltersCount()

    console.log('Количество фильтров в отчете: ' + filtersCount)

    var filters = await Selectors_local2.readFilters(Selectors_local2.storeName)

    return filters;
}


// чтобы выбрать не включение подстроки, а конкретную строку дерева
import escapeRegExp from 'lodash/escapeRegExp';

function getWholeTextRe(text) {
    return new RegExp(`^${escapeRegExp(text)}$`);
}

// функция перебирающая все вторые измерения и фильyр по этому измерению
export const addSecondNesting = async (tree2, index1, index2, index3) => {

    var flag = false
    var errors = []

               if (tree2[index1].children[index2].childsCount == 0)  // если 2 уровня вложенности
               {
                        if (tree2[index1].children[index2].disabled == false)
                        {
                            try 
                            {
                                await t.click(Selectors_local.add2Report)
                                              
                                 if (tree2[index1].expanded == false)
                                        await t.click(Selector('*[class*="x-tree-node-text"').withText(tree2[index1].text).parent().find('img.x-tree-expander:not([role="presentation"])'))
                                
                                    let a = getWholeTextRe(tree2[index1].children[index2].text)
                                    await t.click(Selector('*[class*="x-tree-node-text"').withText(a).parent().find('img'))
                                    flag = true
                                    console.log('STEP PASSED: '.green + tree2[index1].text + ' / '+ tree2[index1].children[index2].text)
                            }
                            catch(err) 
                            {
                                console.log('STEP  FAILED: '.red + tree2[index1].text + ' / '+  tree2[index1].children[index2].text)
                                errors.push(
                                    {
                                        index: [index1, index2],
                                        text:  tree2[index1].children[index2].text
                                    }
                                )
                            }
                        }
                }
                else // если 3 уровня вложенности
                {
                    if (tree2[index1].children[index2].disabled == false)
                    {
                        try
                        {
                            await t.click(Selectors_local.add2Report)

                            if (tree2[index1].expanded == false)
                                await t.click(Selector('*[class*="x-tree-node-text"').withText(tree2[index1].text).parent().find('img.x-tree-expander:not([role="presentation"])'))

                            if (tree2[index1].children[index2].expanded == false)
                                await t.click(Selector('*[class*="x-tree-node-text"').withText(tree2[index1].children[index2].text).parent().find('img.x-tree-expander:not([role="presentation"])'))

                            let a = getWholeTextRe(tree2[index1].children[index2].children[index3].text)
                            await t.click(Selector('*[class*="x-tree-node-text"').withText(a).parent().find('img'))
                            flag = true
                            console.log('STEP PASSED: '.green + tree2[index1].text + ' / ' + tree2[index1].children[index2].text + ' / '+  tree2[index1].children[index2].children[index3].text)
                        } 
                        catch(err) 
                        {
                            console.log('STEP  FAILED: '.red + tree2[index1].text + ' / ' + tree2[index1].children[index2].text + ' / '+  tree2[index1].children[index2].children[index3].text)
                             errors.push(
                                {
                                    index: [index1, index2, index3],
                                    text:  tree2[index1].children[index2].children[index3].text
                                }
                            )
                        }
                    }
                }
return [flag, errors]
}

//инициализация дерева второго измерения
export const initSecondNestingTree = async (menu1, menu2, tabName) => {
    
    // открыть второе измерение, чтобы disabled элемента было заполнено
    await t.click(Selectors_local.add2Report)

    // считываем индексы стора для второго измерения
    let secondNesting = secondNestingTree(menu2)

    // количество элементов первой вложенности в store
    let storeName = Selectors_local.storeNameSecond
    let storeElCount = await Selectors_local.getStoreLength(storeName);
    // console.log('Всего элементов первой вложенности в store: ' + storeElCount)

    // обяъвляем объект дерева
    var tree2 = [];

    // Записываем селекторы первой вложенности
    for (var index1 = 0; index1 < secondNesting.length; index1++) {
        switch (menu2)
        {
            case 'Анализ трафика': 
            {
                tree2.push({ index: secondNesting[index1], selector: Selectors_local.getSecondNestingMoreTree })
                break;
            }
            default: 
            {
                tree2.push({ index: secondNesting[index1], selector: Selectors_local.getMoreTree})
                break;
            }
        }

        tree2[index1].childsCount = await Selectors_local.getFirstNestElCount(storeName, secondNesting[index1])
        tree2[index1].disabled    = await Selectors_local.getFirstNestDisabled(storeName, secondNesting[index1])
        tree2[index1].expandable  = await Selectors_local.getFirstNestExpandable(storeName, secondNesting[index1])
        tree2[index1].expanded    = await Selectors_local.getFirstNestExpanded(storeName, secondNesting[index1])
        tree2[index1].text        = await Selectors_local.getFirstNestElText(storeName, secondNesting[index1])
    }

    // Записываем селекторы второй вложенности
    for (var index1 = 0; index1 < tree2.length; index1++) {

        tree2[index1].children = []

        for (var j = 0; j < tree2[index1].childsCount; j++) {
            
            //выбираем селектор второй вложенности в зависимости от наличия потомков
            var selector
            var childsCount = await Selectors_local.getSecondNestElChildCount(storeName, tree2[index1].index, j)
            
            if (childsCount == 0) selector = Selectors_local.getSubChildItem
                else selector = Selectors_local.getSecondNestingMoreTree
            
            var elText = await Selectors_local.getSecondNestElText(storeName, tree2[index1].index, j)
            var expandable = await Selectors_local.getSecondNestExpandable(storeName, tree2[index1].index, j)
            var expanded = await Selectors_local.getSecondNestExpanded(storeName, tree2[index1].index, j)
            var disabled = await Selectors_local.getSecondNestDisabled(storeName, tree2[index1].index, j)

            tree2[index1].children.push(
            {
                index:       j,
                text:        elText,
                selector:    selector,
                childsCount: childsCount,
                expandable:  expandable,
                expanded:    expanded,
                disabled:    disabled
            })

                // Записываем селекторы третей вложенности
                tree2[index1].children[j].children = []

                for (var z = 0; z < tree2[index1].children[j].childsCount; z++) {

                    var elText = await Selectors_local.getThirdNestElText(storeName, tree2[index1].index, j, z)

                    tree2[index1].children[j].children.push({
                        index:    z,
                        text:     elText,
                        selector: Selectors_local.getSubChildItem
                    })
                }
            }
        
    }

    return tree2
}

// функция которая перебирает все значения второго измерения и перекликивает фильтр по этому измерению
export const allSecondNesting = async (tree2) => {

    var errors = []

    for (var index1 = 0; index1 < tree2.length; index1++) 
        for (var index2 = 0; index2 < tree2[index1].childsCount; index2++) 
            if (tree2[index1].children[index2].childsCount==0) // если два уровня вложенности
            {
                    let res = await addSecondNesting(tree2, index1, index2, -1)
                    if(res[0]==true) 
                        {
                            await t.click(Selectors_local2.getCancelNestingButtonSelector)
                         }
                    if(res[1].length !== 0) errors.push(res[1])
            }
            else // если три уровня вложенности
            {
                for (var index3 = 0; index3 < tree2[index1].children[index2].childsCount; index3++) 
                {
                    let res = await addSecondNesting(tree2, index1, index2, index3)
                    if(res[0]==true) 
                    {
                        await t.click(Selectors_local2.getCancelNestingButtonSelector)
                    }
                    if(res[1].length !== 0) errors.push(res[1])
                }

            }
    return errors
}

// функция которая перебирает все значения второго измерения и перекликивает фильтр по этому измерению
export const secondNestingFilters = async (tree2) => {

    for (var index1 = 0; index1 < tree2.length; index1++) 
        for (var index2 = 0; index2 < tree2[index1].childsCount; index2++) 
            if (tree2[index1].children[index2].childsCount==0) // если два уровня вложенности
            {
                let res = await addSecondNesting(tree2, index1, index2, -1)
                    
                if(res[0]==true)
                {
                    let filters = await initFilters();
                    //console.log(filters)
                    await filtersConditionIndexOrName(filters, tree2[index1].children[index2].text)
                    await t.click(Selectors_local2.getCancelNestingButtonSelector)
                }
            }
            else // если три уровня вложенности
            {
                for (var index3 = 0; index3 < tree2[index1].children[index2].childsCount; index3++) 
                {
                    await console.log(index1 + ' ' + index2+' '+ index3)
                }

            }
}