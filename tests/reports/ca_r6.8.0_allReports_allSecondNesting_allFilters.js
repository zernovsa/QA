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


export const login = async () => {
	await t.setTestSpeed(1);
	await Helper.login();
}

export const enableAllColumns = async () => {
	await Helper.enableAllColumns()
}

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

export const filtersConditionIndexOrName = async (filters, value) => {
	await Helper.filtersConditionIndexOrName(filters, value)
}

export const clickAllFilters = async (filters) => {
    for (let filterIndex = 0; filterIndex < filters.length; filterIndex++) 
    	await Helper.filtersWhatToDo(filters, filterIndex)
}

export const clickToTab = async (menu1, menu2, tabName) => {
    await Helper.clickToTab(menu1, menu2, tabName);
}

export const initSecondNestingTree = async (menu1, menu2, tabName, storeIndex) => {

    let amendment
 	let secondNesting=[]

	switch (menu2) {

        case '': {
            break;
        }
        case 'Сквозная аналитика': {
        	secondNesting = [0, 1]
            amendment = 0
            break;
        }
        case 'Аудитория': {
            amendment = 0
            break;
        }
        case 'Содержание': {
            amendment = 0
            break;
        }
        default: {
     		secondNesting = [0, 1, 2, 6, 10]
        	amendment = 1
            break;
        }
      }

    await t.click(Selectors_local.add2Report.nth(amendment))

    var storeElCount = await Selectors_local.getStoreElCount(Selectors_local.storeName, storeIndex);

    console.log('Всего элементов первой вложенности в store: ' + storeElCount)

    var tree2 = [];

    // Записываем селекторы первой вложенности

    for (var i = 0; i < secondNesting.length; i++) {
        
        switch (menu2)
        {
	        case 'Анализ трафика': 
	        {
	            tree2.push({ index: secondNesting[i], selector: Selectors_local.getSecondNestingMoreTree })
	            break;
	        }
	        default: 
	        {
	            tree2.push({ index: secondNesting[i], selector: Selectors_local.getMoreTree})
	            break;
	        }
        }

        let elCount = await Selectors_local.getFirstNestElCount(Selectors_local.storeName, secondNesting[i], storeIndex)
        let elText = await Selectors_local.getFirstNestElText(Selectors_local.storeName, secondNesting[i], storeIndex)
        let expandable = await Selectors_local.getFirstNestExpandable(Selectors_local.storeName, secondNesting[i], storeIndex)
        let expanded = await Selectors_local.getFirstNestExpanded(Selectors_local.storeName, secondNesting[i], storeIndex)
        let disabled = await Selectors_local.getFirstNestDisabled(Selectors_local.storeName, secondNesting[i], storeIndex)

        tree2[i].childsCount = elCount
        tree2[i].text        = elText
        tree2[i].expandable  = expandable
        tree2[i].expanded    = expanded
        tree2[i].disabled    = disabled

    }

	// Записываем селекторы второй вложенности

    for (var i = 0; i < tree2.length; i++) {

        tree2[i].children = []

        for (var j = 0; j < tree2[i].childsCount; j++) {
            
            var elText = await Selectors_local.getSecondNestElText(Selectors_local.storeName, tree2[i].index, j, storeIndex)
            var childsCount = await Selectors_local.getSecondNestElChildCount(Selectors_local.storeName, tree2[i].index, j, storeIndex)
            var expandable = await Selectors_local.getSecondNestExpandable(Selectors_local.storeName, tree2[i].index, j, storeIndex)
            var expanded = await Selectors_local.getSecondNestExpanded(Selectors_local.storeName, tree2[i].index, j, storeIndex)
            var disabled = await Selectors_local.getSecondNestDisabled(Selectors_local.storeName, tree2[i].index, j, storeIndex)

        //выбираем селектор второй вложенности в зависимости от наличия потомков
            if (childsCount == 0)
                tree2[i].children.push(
                    {
                        index:       j,
                        text:        elText,
                        selector:    Selectors_local.getSubChildItem,
                        childsCount: childsCount,
                        expandable:  expandable,
                        expanded:    expanded,
                        disabled:    disabled
                    })
            else {
                tree2[i].children.push(
                    {
                        index:       j,
                        text:        elText,
                        selector:    Selectors_local.getSecondNestingMoreTree,
                        childsCount: childsCount,
                        expandable:  expandable,
                        expanded:    expanded,
                        disabled:    disabled
                    })

    // Записываем селекторы третей вложенности

                tree2[i].children[j].children = []

                for (var z = 0; z < tree2[i].children[j].childsCount; z++) {

                    var elText = await Selectors_local.getThirdNestElText(Selectors_local.storeName, tree2[i].index, j, z,storeIndex)

                    tree2[i].children[j].children.push({
                        index:    z,
                        text:     elText,
                        selector: Selectors_local.getSubChildItem,
                		storeIndex : storeIndex
                    })
                }
            }
        }
    }

	return tree2
}


export const consolelogSecondNestingTree = async (tree) => {
    //Вывод дерева
    console.log('Дерево: ')
    for (var i = 0; i < tree.length; i++) {
        console.log(tree[i])
    }
}

export const secondNestingFilters = async (tree2, menu1, menu2, tabName, storeIndex) => {

        let step    = 1;
        let nowTime = dateFormat(Date(), "isoDateTime");

        let amendment

        switch (menu2) {
	        case '': {
	            break;
	        }
	        case 'Сквозная аналитика': {
	            amendment = 0
	            break;
	        }
	        case 'Аудитория': {
	            amendment = 0
	            break;
	        }
	        case 'Содержание': {
	            amendment = 0
	            break;
	        }
	        default: {
	        	amendment = 1
	            break;
	        }
      	}

        for (var i = 0; i < tree2.length; i++) {
            for (var j = 0; j < tree2[i].childsCount; j++) {
                if (tree2[i].children[j].childsCount == 0) {
                    if (tree2[i].children[j].disabled == false) {
                        await t.click(Selectors_local.add2Report.nth(amendment))


                        switch (menu2) {
                            case 'Сквозная аналитика': {
                            
                                var s1 = Selector(tree2[i].selector).nth(i)
                                await t.click(s1)

                                var s2 = Selector(tree2[i].children[j].selector).nth(j)
                                await t.click(s2)

                                await t.click(Selectors_local2.getAddFilter)
                                await t.wait(1000)

                                break;
                            }
                     
                            default: {
                            
                                ////////////////////////////////////////////////////////////////////
                                // Костыли, т.к. у нас дерево появляется развернутым в двух узлах //
                                ////////////////////////////////////////////////////////////////////
                                if (i == 4) {
                                    var s1 = Selector(tree2[i].selector).nth(i + 6)
                                }
                                else {
                                    var s1 = Selector(tree2[i].selector).nth(i)
                                }
                                ////////////////////////////////////////////////////////////////////
                                await t.click(s1)

                                s2 = Selector(tree2[i].children[j].selector).nth(j)
                                await t.click(s2)

                                await t.click(Selectors_local2.getAddFilter)
                                await t.wait(1000)

                                break;
                            }
                        }

                        var storeElCount = await Selectors_local2.getStoreEl(Selectors_local2.storeName)
                        var filtersCount = await Selectors_local2.getFiltersCount(Selectors_local2.storeName, storeElCount - 1)                       

                        console.log('Количество фильтров в отчете: ' + filtersCount)

                        var filters = await Selectors_local2.readFilters(Selectors_local2.storeName, storeElCount - 1, menu2)

                        console.log(filters)

                        for (var filterIndex = 0; filterIndex < filters.length; filterIndex++)
                            if (tree2[i].children[j].text == filters[filterIndex].data.name)
                                await Helper.filtersWhatToDo(filters, filterIndex, amendment)

                        await t.click(Selectors_local2.getCancelNestingButtonSelector)
                    }


                }
                else {
                    for (var z = 0; z < tree2[i].children[j].childsCount; z++) {
                        if (tree2[i].children[j].disabled == false) {
                            await t.click(Selectors_local.add2Report.nth(1))

                            ////////////////////////////////////////////////////////////////////
                            // Костыли, т.к. у нас дерево появляется развернутым в двух узлах //
                            ////////////////////////////////////////////////////////////////////
                            if (i == 2) {
                                var s2 = Selector(tree2[i].selector).nth(i + j + 1)
                            }
                            if (i == 3) {
                                var s2 = Selector(tree2[i].selector).nth(i + j + 4)
                            }
                            ////////////////////////////////////////////////////////////////////

                            await t.click(s2)
                            var s3 = Selector(tree2[i].children[j].children[z].selector).nth(z)
                            await t.click(s3)

                            await t.click(getAddFilter)
                            await t.wait(1000)

                            var storeElCount = await Selectors_local2.getStoreEl.with({
                                dependencies: {
                                    name: storeName
                                }
                            })();

                            var filtersCount = await Selectors_local2.getFiltersCount.with({
                                dependencies: {
                                    name:  Selectors_local2.storeName,
                                    index: storeElCount - 1
                                }
                            })();

                            console.log('Количество фильтров в отчете: ' + filtersCount)

                            var filters = await Selectors_local2.readFilters.with({
                                dependencies: {
                                    name:  Selectors_local2.storeName,
                                    index: storeElCount - 1
                                }
                            })();

                            console.log(filters)

                            for (let filterIndex = 0; filterIndex < filters.length; filterIndex++)
                                if (tree2[i].children[j].text == filters[filterIndex].data.name)
                                    await Helper.filtersWhatToDo(filters, filterIndex, amendment)

                            await t.click(Selectors_local2.getCancelNestingButtonSelector)
                        }


                    }
                }

            }
        }

}


test('ca_r6.8.0_secondNestingFilters_report_1', async () => {
   		await login();
		await Helper.clickToTab('Общие отчёты', 'Сквозная аналитика', '');

		await enableAllColumns();

		let tree2 = await initSecondNestingTree('Общие отчёты', 'Сквозная аналитика', '', 0)
		
		await consolelogSecondNestingTree(tree2)

        await secondNestingFilters(tree2, 'Общие отчёты', 'Сквозная аналитика', '')

    }
);


test('ca_r6.8.0_secondNestingFilters_report_2_1', async () => {

        await t.setTestSpeed(1);
        await Helper.login();

        await secondNestingFilters('Общие отчёты', 'Анализ трафика', 'Рекламные кампании')

    }
);


test('ca_r6.8.0_secondNestingFilters_report_2_2', async () => {

        await t.setTestSpeed(1);
        await Helper.login();

        await secondNestingFilters('Общие отчёты', 'Анализ трафика', 'Источники')

    }
);


test('ca_r6.8.0_secondNestingFilters_report_2_3', async () => {

        await t.setTestSpeed(1);
        await Helper.login();

        await secondNestingFilters('Общие отчёты', 'Анализ трафика', 'Каналы')

    }
);

test('ca_r6.8.0_secondNestingFilters_report_3_1', async () => {

        await t.setTestSpeed(1);
        await Helper.login();

        await secondNestingFilters('Общие отчёты', 'Аудитория', 'Информация по сегментам')

    }
);


test('ca_r6.8.0_secondNestingFilters_report_3_2', async () => {

        await t.setTestSpeed(1);
        await Helper.login();

        await secondNestingFilters('Общие отчёты', 'Аудитория', 'Список всех посетителей')

    }
);

test('ca_r6.8.0_secondNestingFilters_report_4_2', async () => {

        await t.setTestSpeed(1);
        await Helper.login();

        await secondNestingFilters('Общие отчёты', 'Содержание', 'Входные страницы', 0)

    }
);


test('ca_r6.8.0_secondNestingFilters_withAllFirstNestings', async () => {

        await t.setTestSpeed(1);
        await Helper.login();

        await Helper.addSite();
        await t.click(Selectors.getView('Общие отчёты'))
        await t.click(Selectors.getViewItem('Анализ трафика'))

        var tree = await Helper_local.firstNestingTree(0)

        //Начинаем кликать по дереву

        for (var i = 0; i < tree.length; i++) {
            for (var j = 0; j < tree[i].childsCount; j++) {
                if (tree[i].children[j].childsCount == 0) {
                    await Helper_local.addReport()
                    var s1 = Selector(tree[i].selector).nth(i)
                    await t.click(s1)
                    var s2 = Selector(tree[i].children[j].selector).nth(j)
                    await t.click(s2)

                    	await secondNestingFilters('', '', '', 1)

                    await Helper_local.delReport()
                }
                else {
                    for (var z = 0; z < tree[i].children[j].childsCount; z++) {
                        await Helper_local.addReport()
                        if (i == 2) {
                            var s2 = Selector(tree[i].selector).nth(i + j + 4)
                        }
                        else var s2 = Selector(tree[i].selector).nth(i + j + 1)
                        await t.click(s2)
                        var s3 = Selector(tree[i].children[j].children[z].selector).nth(z)

    	                    await secondNestingFilters('', '', '', 1)

                        await t.click(s3)
                        await Helper_local.delReport()
                    }
                }

            }
        }


        

    }
);



