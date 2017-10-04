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

export const clickAllFilters = async (menu1, menu2, tabName) => {

        var tree = [];

        await t.click(Selectors.getView(menu1))
        await t.click(Selectors.getViewItem(menu2))
        await t.expect(Selectors_local2.getHighchartsExists.exists).eql(true, 'Waiting highcharts')

        if (tabName != '') await Helper_local.clickToTabName(tabName)

        await Helper.enableAllColumns()

        await t.click(Selectors_local2.getAddFilter)
        await t.wait(1000)
        
        var storeElCount = await Selectors_local2.getStoreEl.with({
            dependencies: {
                name: Selectors_local2.storeName
            }
        })();

        var filtersCount = await Selectors_local2.getFiltersCount.with({
            dependencies: {
                name: Selectors_local2.storeName,
                index: storeElCount-1
            }
        })();

        console.log('Количество фильтров в отчете: ' + filtersCount)

        var filters = await Selectors_local2.readFilters.with({
            dependencies: {
                name: Selectors_local2.storeName,
                index: storeElCount-1
            }
        })();

        console.log(filters)

        for (let filterIndex = 0; filterIndex < filters.length; filterIndex++)
             await Helper.filtersWhatToDo(filters, filterIndex)

}

test('ca_r6.8.0_visitorsource', async () => {

    await t.setTestSpeed(1);
    await Helper.login();
    //await clickAllFilters('Общие отчёты', 'Сквозная аналитика', -1); // нужно сделать -1 для стрелок
    //await clickAllFilters('Общие отчёты', 'Анализ трафика', 0); // работает
    //await clickAllFilters('Общие отчёты', 'Анализ трафика', 1); // работает
    //await clickAllFilters('Общие отчёты', 'Анализ трафика', 2); // работает

    await clickAllFilters('Общие отчёты', 'Аудитория', 'Информация по сегментам'); // Информация по сегментам
    await clickAllFilters('Общие отчёты', 'Аудитория', 5); // Список всех посетителей

    }
);



test('ca_r6.8.0_visitorsource_secondNesting', async () => {

var secondNesting = [0, 1, 2, 6, 10]
var tree2 = [];
        await t.setTestSpeed(1);
        await Helper.login();
        await t.click(Selectors.getView('Общие отчёты'))
        await t.click(Selectors.getViewItem('Анализ трафика'))
        await t.expect(Selectors_local2.getHighchartsExists.exists).eql(true, 'Waiting highcharts')

        await t.click(Selectors_local.add2Report.nth(1))

        var storeElCount = await Selectors_local.getStoreElCount.with({
            dependencies: {
                name: Selectors_local.storeName
            }
        })();

        console.log('Всего элементов первой вложенности в store: ' + storeElCount)

        for (var i = 0; i < secondNesting.length; i++) {
            tree2.push({ index: secondNesting[i], selector: Selectors_local.getMoreTree })

            var elCount = await Selectors_local.getFirstNestElCount.with({
                dependencies: {
                    name:  Selectors_local.storeName,
                    index: secondNesting[i]
                }
            })();

            var elText   = await Selectors_local.getFirstNestElText.with({
                dependencies: {
                    name:  Selectors_local.storeName,
                    index: secondNesting[i]
                }
            })();
            
            var expandable   = await Selectors_local.getFirstNestExpandable.with({
                dependencies: {
                    name:  Selectors_local.storeName,
                    index: secondNesting[i]
                }
            })();
           
            var expanded   = await Selectors_local.getFirstNestExpanded.with({
                dependencies: {
                    name:  Selectors_local.storeName,
                    index: secondNesting[i]
                }
            })();
            
            var disabled   = await Selectors_local.getFirstNestDisabled.with({
                dependencies: {
                    name:  Selectors_local.storeName,
                    index: secondNesting[i]
                }
            })(); 

            tree2[i].childsCount = elCount
            tree2[i].text = elText
            tree2[i].expandable = expandable
            tree2[i].expanded = expanded
            tree2[i].disabled = disabled
            
        }

        for (var i = 0; i < tree2.length; i++) {

            tree2[i].children = []

            for (var j = 0; j < tree2[i].childsCount; j++) {
                var elText = await Selectors_local.getSecondNestElText.with({
                    dependencies: {
                        name:   Selectors_local.storeName,
                        index1: tree2[i].index,
                        index2: j
                    }
                })();

                var childsCount = await Selectors_local.getSecondNestElChildCount.with({
                    dependencies: {
                        name:   Selectors_local.storeName,
                        index1: tree2[i].index,
                        index2: j
                    }
                })();

                var expandable   = await Selectors_local.getSecondNestExpandable.with({
                    dependencies: {
                         name:  Selectors_local.storeName,
                         index1: tree2[i].index,
                         index2: j
                }
                })();

                var expanded   = await Selectors_local.getSecondNestExpanded.with({
                    dependencies: {
                        name:  Selectors_local.storeName,
                        index1: tree2[i].index,
                        index2: j
                    }
                })();

                var disabled   = await Selectors_local.getSecondNestDisabled.with({
                    dependencies: {
                        name:  Selectors_local.storeName,
                        index1: tree2[i].index,
                        index2: j
                    }
                })();

                //выбираем селектор второй вложенности в зависимости от наличия потомков
                if (childsCount == 0) 
                    tree2[i].children.push(
                    {
                        index:          j,
                        text:        elText,
                        selector:    Selectors_local.getSubChildItem,
                        childsCount: childsCount,
                        expandable : expandable,
                        expanded: expanded,
                        disabled: disabled
                    })
                else {
                    tree2[i].children.push(
                    {
                        index:          j,
                        text:        elText,
                        selector:    Selectors_local.getMoreTree,
                        childsCount: childsCount,
                        expandable : expandable,
                        expanded: expanded,
                        disabled: disabled
                    })
                
                tree2[i].children[j].children = []

                    for (var z = 0; z < tree2[i].children[j].childsCount; z++) {

                        var elText = await Selectors_local.getThirdNestElText.with({
                            dependencies: {
                                name:   Selectors_local.storeName,
                                index1: tree2[i].index,
                                index2: j,
                                index3: z
                            }
                        })();

                        tree2[i].children[j].children.push({
                            index:       z,
                            text:     elText,
                            selector: Selectors_local.getSubChildItem
                        })
                    }
                }
            }
        }

        //Вывод дерева
        console.log('Дерево: ')
        for (var i = 0; i < secondNesting.length; i++) {
            console.log(tree2[i])
        }

        //Начинаем кликать по дереву
        let step =1;
        let nowTime = dateFormat(Date(), "isoDateTime");

        for (var i = 0; i < tree2.length; i++) {
            for (var j = 0; j < tree2[i].childsCount; j++) {
                if (tree2[i].children[j].childsCount == 0) {
                    if (tree2[i].children[j].disabled == false) 
                    {
                        await t.click(Selectors_local.add2Report.nth(1))
                        
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
                        
                        var s2 = Selector(tree2[i].children[j].selector).nth(j)
                        await t.click(s2)

                        await t.click(Selectors_local2.getAddFilter)
                        await t.wait(1000)

                        var storeElCount = await Selectors_local2.getStoreEl.with({
                            dependencies: {
                                name: Selectors_local2.storeName
                            }
                        })();

                        var filtersCount = await Selectors_local2.getFiltersCount.with({
                            dependencies: {
                                name: Selectors_local2.storeName,
                                index: storeElCount-1
                            }
                        })();

                        console.log('Количество фильтров в отчете: ' + filtersCount)

                        var filters = await Selectors_local2.readFilters.with({
                            dependencies: {
                                name: Selectors_local2.storeName,
                                index: storeElCount-1
                            }
                        })();

                        console.log(filters)

                            for (var filterIndex = 0; filterIndex < filters.length; filterIndex++)
                                if (tree2[i].children[j].text == filters[filterIndex].data.name)              
                                    await Helper.filtersWhatToDo(filters, filterIndex)

                         await t.click(Selectors_local2.getCancelNestingButtonSelector)
                    }



                }
                else {
                    for (var z = 0; z < tree2[i].children[j].childsCount; z++) {
                         if (tree2[i].children[j].disabled == false) 
                        {
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
                                    name: Selectors_local2.storeName,
                                    index: storeElCount-1
                                }
                            })();

                            console.log('Количество фильтров в отчете: ' + filtersCount)

                            var filters = await Selectors_local2.readFilters.with({
                                dependencies: {
                                    name: Selectors_local2.storeName,
                                    index: storeElCount-1
                                }
                            })();

                            console.log(filters)

                            for (let filterIndex = 0; filterIndex < filters.length; filterIndex++)
                                if (tree2[i].children[j].text == filters[filterIndex].data.name)
                                    await Helper.filtersWhatToDo(filters, filterIndex)

                             await t.click(Selectors_local2.getCancelNestingButtonSelector)
                        }


                    }
                }

            }
        }



    }
);

