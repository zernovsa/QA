import {test_link, secondNestingTree} from '../../config.js';
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
export const initFilters = async () => {

    var tree = [];   

    await t.click(Selectors_local2.getAddFilter)
    await t.wait(1000)

    var storeElCount = await Selectors_local2.getStoreEl(Selectors_local2.storeName)

    var filtersCount = await Selectors_local2.getFiltersCount(Selectors_local2.storeName, storeElCount - 1)

    console.log('Количество фильтров в отчете: ' + filtersCount)

    var index
    var menu2
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

// вывод дерева в консоль
export const consolelogSecondNestingTree = async (tree) => {
    //Вывод дерева
    console.log('Дерево: ')
    for (var i = 0; i < tree.length; i++) {
        console.log(tree[i])
    }
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
    console.log('Всего элементов первой вложенности в store: ' + storeElCount)

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

// функция перебирающая все вторые измерения и фильyр по этому измерению
export const addSecondNesting = async (tree2, index1, index2, index3) => {

    var flag = false

               if (tree2[index1].children[index2].childsCount == 0)  // если 2 уровня вложенности
               {
                        if (tree2[index1].children[index2].disabled == false)
                        {
                            await t.click(Selectors_local.add2Report)
                                              
                            if (tree2[index1].expanded == false)
                            {
                                await t.click(Selector('*[class*="x-tree-node-text"').withText(tree2[index1].text).parent().find('img.x-tree-expander:not([role="presentation"])'))
                            }
                            await t.click(Selector('*[class*="x-tree-node-text"').withText(tree2[index1].children[index2].text).parent().find('img'))
                            flag = true
                        }
                }
                else // если 3 уровня вложенности
                {





                }
return flag   
}

// функция которая перебирает все значения второго измерения и перекликивает фильтр по этому измерению
export const allSecondNesting = async (tree2) => {

    for (var index1 = 0; index1 < tree2.length; index1++) 
        for (var index2 = 0; index2 < tree2[index1].childsCount; index2++) 
            if (tree2[index1].children[index2].childsCount==0) // если два уровня вложенности
            {
                    let clearSecondNesting = await addSecondNesting(tree2, index1, index2, -1)
                    if(clearSecondNesting==true) await t.click(Selectors_local2.getCancelNestingButtonSelector)
            }
            else // если три уровня вложенности
            {
                for (var index3 = 0; index3 < tree2[index1].children[index2].childsCount; index3++) 
                {
                    await console.log(index1 + ' ' + index2+' '+ index3)


                }

            }
}

// функция которая перебирает все значения второго измерения и перекликивает фильтр по этому измерению
export const secondNestingFilters = async (tree2) => {

    for (var index1 = 0; index1 < tree2.length; index1++) 
        for (var index2 = 0; index2 < tree2[index1].childsCount; index2++) 
            if (tree2[index1].children[index2].childsCount==0) // если два уровня вложенности
            {
                let clearSecondNesting = await addSecondNesting(tree2, index1, index2, -1)
                    
                if(clearSecondNesting==true)
                {
                    let filters = await initFilters();
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

        test('ca_r6.8.0_allSecondNesting_report_1', async () => {
                await login();
                await clickToTab('Общие отчёты', 'Сквозная аналитика', '');
                //await enableAllColumns();
                let tree2 = await initSecondNestingTree('Общие отчёты', 'Сквозная аналитика', '')
                await consolelogSecondNestingTree(tree2)
                await allSecondNesting(tree2)

            }
        );

        test('ca_r6.8.0_allSecondNesting_report_2_1', async () => {
                await login();
                await clickToTab('Общие отчёты', 'Анализ трафика', 'Рекламные кампании');
                //await enableAllColumns();
                let tree2 = await initSecondNestingTree('Общие отчёты', 'Анализ трафика', 'Рекламные кампании')
                await consolelogSecondNestingTree(tree2)
                await allSecondNesting(tree2)
            }
        );

