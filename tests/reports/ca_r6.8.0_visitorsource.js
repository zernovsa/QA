import {test_link} from '../../config.js';
import {t, Selector, ClientFunction} from 'testcafe';
import * as Helper from '../../helper.js';
import * as Helper_local from '../../helpers/ca_r6.7.0_helper';
import * as Selectors from '../../selectors.js';
import * as Selectors_local from '../../selectors/ca_r6.7.0_selectors.js';

var dateFormat = require('dateformat');

fixture `Getting Started`
    .page(test_link);

var tree = [];

const storeName = 'cm-menu'

export const getAddFilter = Selector('*[class*="cm-filter2panel"]').nth(0);

export const getStoreEl= ClientFunction(() => {
    return Ext.ComponentQuery.query(name).length
});


export const getFiltersCount = ClientFunction(() => {
    return Ext.ComponentQuery.query(name)[index].items.items[0].filterListStore.data.items.length
});


export const readFilters = ClientFunction(() => {
    let list  = []
    let count = Ext.ComponentQuery.query(name)[index].items.items[0].filterListStore.data.items.length

    for (let i = 0; i < count; i++) {
        list.push(
            {
                el:   i,
                id:   Ext.ComponentQuery.query(name)[index].items.items[0].filterListStore.data.items[i].id,
                data: Ext.ComponentQuery.query(name)[index].items.items[0].filterListStore.data.items[i].data
            }
        )
    }

    return list
});

export const enableAllColumns = async () => {
    const getColumnsButton = Selector('*[id*="ul-usualbutton"][id*=btnInnerEl]').withText('Настроить столбцы');
    await t.click(getColumnsButton);

    const getUncheckedColumnsCount = ClientFunction(() => document.querySelectorAll('[role*="checkbox"]:not([class*="x-tree-checkbox-checked"]):not([id*="checkboxfield"])').length);
    var count = await getUncheckedColumnsCount()
    console.log('Columns count: ' + count)

    while (count > 0) 
    { 
        var selector = await Selector('[role*="checkbox"]:not([class*="x-tree-checkbox-checked"]):not([id*="checkboxfield"])')
        await t.click(selector.nth(0))
        await t.wait(1000)
        count = await getUncheckedColumnsCount()
        console.log(count+' ')
    }
    

    const getSaveButton = Selector('*[id*="ul-mainbutton"][id*=btnInnerEl]').withText('Сохранить');
    await t.click(getSaveButton);


}

export const getArrowCount = ClientFunction(() => document.querySelectorAll('*[class*="x-form-arrow-trigger x-form-arrow-trigger-ul"]').length)

export const getParamArrow     = Selector('*[class*="x-form-arrow-trigger x-form-arrow-trigger-ul"]').nth(6);
export const getСonditionArrow = Selector('*[class*="x-form-arrow-trigger x-form-arrow-trigger-ul"]').nth(7);
export const getValueArrow = Selector('*[class*="x-form-arrow-trigger x-form-arrow-trigger-ul"]').nth(8);

export const getParamSelector     = Selector('*[class*="x-boundlist-item"]');
export const getСonditionSelector = Selector('*[class*="x-boundlist-item"]');

export const getValueNumberSelector       = Selector('*[id*="inputEl"][id*=numberfield]');
export const getValueTextSelector       = Selector('*[id*="inputEl"][id*=textfield]')

export const getArrowSelectorForTime = Selector('*[id*="timefield"][id*=trigger-picker]')
export const getValueSelectorForTime = Selector('*[data-boundview*="timepicker"]')

export const getValueSelector = Selector('*[class*="x-boundlist-item"]');

export const getValueButtonSelector = Selector('*[id*="ul-usualbutton"][id*=btnInnerEl]').withText('Выбрать');

export const getApplyButtonSelector = Selector('*[class*="x-btn-button-ul-usual-medium"]').withText('Применить');

export const getCancelButtonSelector = Selector('*[class*="cm-filter2panel-controlpanel-btn-cancel"]')

const getHighchartsExists = Selector('*[id*="highcharts"]');

test('ca_r6.8.0_visitorsource', async () => {

        await t.setTestSpeed(1);
        await Helper.login();
        await t.click(Selectors.getView('Общие отчёты'))
        await t.click(Selectors.getViewItem('Анализ трафика'))
        //await t.click(Selectors.getViewItem('Аудитория'))
        // await t.click(Selectors.getView('Общие отчёты'))
        // await t.click(Selectors.getViewItem('Содержание'))
        
        //timeout
        //await t.expect(getHighchartsExists).ok();
        await t.expect(getHighchartsExists.exists).eql(true, 'Waiting highcharts')

        await enableAllColumns()

        await t.click(getAddFilter)
        await t.wait(1000)
        
        var storeElCount = await getStoreEl.with({
            dependencies: {
                name: storeName
            }
        })();

        var filtersCount = await getFiltersCount.with({
            dependencies: {
                name: storeName,
                index: storeElCount-1
            }
        })();

        console.log('Количество фильтров в отчете: ' + filtersCount)

        var filters = await readFilters.with({
            dependencies: {
                name: storeName,
                index: storeElCount-1
            }
        })();

        console.log(filters)

let step =1;
let nowTime = dateFormat(Date(), "isoDateTime");

//for (let asd = 0; asd < 50; asd++)
        for (let filterIndex = 0; filterIndex < filters.length; filterIndex++)
            switch (filters[filterIndex].data.type) {
                case 'integer': {
                    
                    for (let conditionIndex = 0; conditionIndex < 4; conditionIndex++)
                    {
                        await t.click(getAddFilter)
                        await t.wait(1000)

                        const arrowCount = await getArrowCount()

                        let value = Helper.getRandomInt(1, 999);
                        let text = '.filter text: '+ filters[filterIndex].data.name +' type: integer' + ' conditionIndex:' + conditionIndex + ' value: ' + value
                        console.log(text)

                        await t.click(getParamArrow)
                        await t.click(getParamSelector.nth(filterIndex))

                        await t.click(getСonditionArrow)
                        await t.click(getСonditionSelector.nth(filters.length + conditionIndex));

                        await t.click(getValueNumberSelector)
                        await t.typeText(getValueNumberSelector, value.toString());

                        await t.click(getValueButtonSelector)
                        await t.expect(getHighchartsExists.exists).eql(true, 'Waiting highcharts')

                        await t.click(getApplyButtonSelector)
                        await t.expect(getHighchartsExists.exists).eql(true, 'Waiting highcharts')

                        await t.click(getCancelButtonSelector)

                        await t.takeScreenshot('./ca_r6.8.0-' + nowTime+'/'+ step++ +text)

                    }
                    break;
                }
                case 'numeric': {
                    for (let conditionIndex = 0; conditionIndex < 4; conditionIndex++)
                    {

                        await t.click(getAddFilter)
                        await t.wait(1000)

                        const arrowCount = await getArrowCount()

                        let value = Helper.getRandomInt(1, 999);
                        let text = '.filter text: '+ filters[filterIndex].data.name +' type: integer' + ' conditionIndex:' + conditionIndex + ' value: ' + value
                        console.log(text)

                        await t.click(getParamArrow)
                        await t.click(getParamSelector.nth(filterIndex))

                        await t.click(getСonditionArrow)
                        await t.click(getСonditionSelector.nth(filters.length + conditionIndex));

                        await t.click(getValueNumberSelector)
                        await t.typeText(getValueNumberSelector, value.toString());

                        await t.click(getValueButtonSelector)
                        await t.expect(getHighchartsExists.exists).eql(true, 'Waiting highcharts')

                        await t.click(getApplyButtonSelector)
                        await t.expect(getHighchartsExists.exists).eql(true, 'Waiting highcharts')

                        await t.click(getCancelButtonSelector)

                        await t.takeScreenshot('./ca_r6.8.0-' + nowTime+'/'+ step++ +text)

                    }
                    break;
                }
                case 'string': {
                    for (let conditionIndex = 0; conditionIndex < 3; conditionIndex++)
                    {

                        await t.click(getAddFilter)
                        await t.wait(1000)

                        const arrowCount = await getArrowCount()

                        let value = Helper.getRandomInt(1, 999);
                        let text = '.filter text: '+ filters[filterIndex].data.name +' type: integer' + ' conditionIndex:' + conditionIndex + ' value: ' + value
                        console.log(text)

                        await t.click(getParamArrow)
                        await t.click(getParamSelector.nth(filterIndex))

                        await t.click(getСonditionArrow)
                        await t.click(getСonditionSelector.nth(filters.length + conditionIndex));

                        await t.click(getValueTextSelector)
                        await t.typeText(getValueTextSelector, value.toString());

                        await t.click(getValueButtonSelector)
                        await t.expect(getHighchartsExists.exists).eql(true, 'Waiting highcharts')

                        await t.click(getApplyButtonSelector)
                        await t.expect(getHighchartsExists.exists).eql(true, 'Waiting highcharts')

                        await t.click(getCancelButtonSelector)

                        await t.takeScreenshot('./ca_r6.8.0-' + nowTime+'/'+ step++ +text)

                    }
                    break;
                }
                case 'array': {
                    let conditionCount = 2
                    for (let conditionIndex = 0; conditionIndex < conditionCount; conditionIndex++)
                    {
                        for (let valueIndex = 0; valueIndex < filters[filterIndex].data.valueElData.length; valueIndex++)
                        {
                            await t.click(getAddFilter)
                            await t.wait(1000)

                            const arrowCount = await getArrowCount()

                            let value = Helper.getRandomInt(1, 999);
                            let text = '.filter text: '+ filters[filterIndex].data.name +' type: integer' + ' conditionIndex:' + conditionIndex + ' value: ' + value
                            console.log(text)

                            await t.click(getParamArrow)
                            await t.click(getParamSelector.nth(filterIndex))

                            await t.click(getСonditionArrow)
                            await t.click(getСonditionSelector.nth(filters.length + conditionIndex));

                            await t.click(getValueArrow)
                            await t.click(getValueSelector.nth(filters.length + conditionCount + valueIndex));

                            await t.click(getValueButtonSelector)
                            await t.expect(getHighchartsExists.exists).eql(true, 'Waiting highcharts')

                            await t.click(getApplyButtonSelector)
                            await t.expect(getHighchartsExists.exists).eql(true, 'Waiting highcharts')

                            await t.click(getCancelButtonSelector)

                            await t.takeScreenshot('./ca_r6.8.0-' + nowTime+'/'+ step++ +'.'+text)
                        }
                    }
                    break;
                }
                case 'time': {
                    let conditionCount = 4
                    let valueCount = 96
                    for (let conditionIndex = 0; conditionIndex < conditionCount; conditionIndex++)
                    {
                        for (let valueIndex = 0; valueIndex < valueCount; valueIndex++)
                        {
                            await t.click(getAddFilter)
                            await t.wait(1000)

                            const arrowCount = await getArrowCount()

                            let value = Helper.getRandomInt(1, 999);
                            let text = '.filter text: '+ filters[filterIndex].data.name +' type: integer' + ' conditionIndex:' + conditionIndex + ' value: ' + value
                            console.log(text)

                            await t.click(getParamArrow)
                            await t.click(getParamSelector.nth(filterIndex))

                            await t.click(getСonditionArrow)
                            await t.click(getСonditionSelector.nth(filters.length + conditionIndex));
                            
                            await t.click(getArrowSelectorForTime)
                            await t.click(getValueSelectorForTime.nth(valueIndex))

                            await t.click(getValueButtonSelector)
                            await t.expect(getHighchartsExists.exists).eql(true, 'Waiting highcharts')

                            await t.click(getApplyButtonSelector)
                            await t.expect(getHighchartsExists.exists).eql(true, 'Waiting highcharts')

                            await t.click(getCancelButtonSelector)

                            await t.takeScreenshot('./ca_r6.8.0-' + nowTime+'/'+ step++ +text)
                    }
                    }
                    break;
                }

            }
    }
);

