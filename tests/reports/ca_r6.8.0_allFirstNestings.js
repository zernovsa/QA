import {test_link, firstNestingTree, secondNestingTree} from '../../config.js';
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
    }
    else {
    }
}

export const addReportWithName = async (name) => {
    const reportCount = await Selectors_local.getReportCount()
    if (reportCount < 15) {
        await t
            .click(Selectors_local.getAddReport)
            .click(Selectors_local.getPencil)
            .wait(1000)
            .pressKey('delete')
            .wait(1000)
            .typeText(Selectors_local.getReportInput, name)
            .wait(1000)
            .click(Selectors_local.getPencil)
            .wait(1000)
    }
    else {
    }
}

export const delReport = async () => {
    const elNumber = await Selectors_local.getReportCount() - 1
    await t.click(Selector('*[class*="x-tab-inner"]:not([data-ref="btnInnerEl"])').nth(elNumber))
    await t.click(Selector('span.x-tab-edit-btn-inner').nth(elNumber))
    await t.click(Selector('span.ul-btn-usual-icon-cls-remove').nth(0))
}

// вывод дерева в консоль
export const consolelogFirstNestingTree = async (tree) => {
    //Вывод дерева
    console.log('Дерево: ')
    for (var i = 0; i < tree.length; i++) {
        console.log(tree[i])
    }
}

//инициализация дерева первого измерения
export const initFirstNestingTree = async ( ) => {

    await addReport();
   
    // считываем индексы стора для первого измерения
    let firstNesting = firstNestingTree()

    // количество элементов первой вложенности в store
    let storeName = Selectors_local.storeNameFirst
    let storeElCount = await Selectors_local.getStoreLength(storeName);
    console.log('Всего элементов первой вложенности в store: ' + storeElCount)


    let tree = []

    // Записываем селекторы первой вложенности
    for (var index1 = 0; index1 < firstNesting.length; index1++) {
        
        tree.push({ index: firstNesting[index1], selector: Selectors_local.getMoreTree })
                
        tree[index1].childsCount = await Selectors_local.getFirstNestElCount(storeName, firstNesting[index1])
        tree[index1].disabled    = await Selectors_local.getFirstNestDisabled(storeName, firstNesting[index1])
        tree[index1].expandable  = await Selectors_local.getFirstNestExpandable(storeName, firstNesting[index1])
        tree[index1].expanded    = await Selectors_local.getFirstNestExpanded(storeName, firstNesting[index1])
        tree[index1].text        = await Selectors_local.getFirstNestElText(storeName, firstNesting[index1])
    }


    // Записываем селекторы второй вложенности
    for (var index1 = 0; index1 < tree.length; index1++) {

        tree[index1].children = []

        for (var j = 0; j < tree[index1].childsCount; j++) {
            
            //выбираем селектор второй вложенности в зависимости от наличия потомков
            var selector
            var childsCount = await Selectors_local.getSecondNestElChildCount(storeName, tree[index1].index, j)
            
            if (childsCount == 0) selector = Selectors_local.getSubChildItem
                else selector = Selectors_local.getSecondNestingMoreTree
            
            var elText = await Selectors_local.getSecondNestElText(storeName, tree[index1].index, j)
            var expandable = await Selectors_local.getSecondNestExpandable(storeName, tree[index1].index, j)
            var expanded = await Selectors_local.getSecondNestExpanded(storeName, tree[index1].index, j)
            var disabled = await Selectors_local.getSecondNestDisabled(storeName, tree[index1].index, j)

            tree[index1].children.push(
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
                tree[index1].children[j].children = []

                for (var z = 0; z < tree[index1].children[j].childsCount; z++) {

                    var elText = await Selectors_local.getThirdNestElText(storeName, tree[index1].index, j, z)

                    tree[index1].children[j].children.push({
                        index:    z,
                        text:     elText,
                        selector: Selectors_local.getSubChildItem
                    })
                }
            }
        
    }

    consolelogFirstNestingTree(tree)
    return tree
}

// чтобы выбрать не включение подстроки, а конкретную строку дерева
import escapeRegExp from 'lodash/escapeRegExp';

function getWholeTextRe(text) {
    return new RegExp(`^${escapeRegExp(text)}$`);
}

// функция перебирающая все вторые измерения и фильyр по этому измерению
export const addFirstNesting = async (tree, index1, index2, index3) => {
    var flag = false

               if (tree[index1].children[index2].childsCount == 0)  // если 2 уровня вложенности
               {
                            await addReportWithName(tree[index1].text+'/'+tree[index1].children[index2].text);
                                              
                            if (tree[index1].expanded == false)
                            {
                                await t.click(Selector('*[class*="x-tree-node-text"').withText(tree[index1].text).parent().find('img.x-tree-expander:not([role="presentation"])'))
                            }
                            let a = getWholeTextRe(tree[index1].children[index2].text)
                            await t.click(Selector('*[class*="x-tree-node-text"').withText(a).parent().find('img'))
                            flag = true
                }
                else // если 3 уровня вложенности
                {

                    await addReportWithName(tree[index1].text+'/'+tree[index1].children[index2].text+'/'+tree[index1].children[index2].children[index3].text);



                }
    return flag   
}



export const allFirstNesting = async (tree) => {
     for (var index1 = 0; index1 < tree.length; index1++) 
        for (var index2 = 0; index2 < tree[index1].childsCount; index2++) 
         {
            if (tree[index1].children[index2].childsCount==0) // если два уровня вложенности
            {
                console.log ('click ' +tree[index1].text +' / '+tree[index1].children[index2].text)
                    let clearSecondNesting = await addFirstNesting(tree, index1, index2, -1)
                    //if(clearSecondNesting==true) await t.click(Selectors_local2.getCancelNestingButtonSelector)
                    await delReport();
            }
            else // если три уровня вложенности
            {
                for (var index3 = 0; index3 < tree[index1].children[index2].childsCount; index3++) 
                {
                    console.log ('click ' +tree[index1].text +' / '+tree[index1].children[index2].text + '/' + tree[index1].children[index2].childrem[index3].text )
                    console.log(index1 +' '+index2 +' '+index3)
                }

            }
            
        }
}


test('ca_r6.8.0_allFirstNestings_report_1', async () => {
        await login();
        await clickToTab('Общие отчёты', 'Анализ трафика', '');
        //await enableAllColumns();
        let tree = await initFirstNestingTree()
        await allFirstNesting(tree)
    }
);