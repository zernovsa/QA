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

export const getFiltersCount = ClientFunction(() => {
    return Ext.ComponentQuery.query(name)[1].items.items[0].filterListStore.data.items.length
});


export const readFilters = ClientFunction(() => {
    let list  = []
    let count = Ext.ComponentQuery.query(name)[1].items.items[0].filterListStore.data.items.length

    for (let i = 0; i < count; i++) {
        list.push(
            {
                el:   i,
                id:   Ext.ComponentQuery.query(name)[1].items.items[0].filterListStore.data.items[i].id,
                data: Ext.ComponentQuery.query(name)[1].items.items[0].filterListStore.data.items[i].data
            }
        )
    }

    return list
});

export const getArrowCount = ClientFunction(() => document.querySelectorAll('*[class*="x-form-arrow-trigger x-form-arrow-trigger-ul"]').length)

export const getParamArrow     = Selector('*[class*="x-form-arrow-trigger x-form-arrow-trigger-ul"]').nth(6);
export const getСonditionArrow = Selector('*[class*="x-form-arrow-trigger x-form-arrow-trigger-ul"]').nth(7);

export const getParamSelector     = Selector('*[class*="x-boundlist-item"]');
export const getСonditionSelector = Selector('*[class*="x-boundlist-item"]');

export const getValueSelector       = Selector('*[id*="inputEl"][id*=numberfield]');
export const getValueButtonSelector = Selector('*[id*="ul-usualbutton"][id*=btnInnerEl]').withText('Выбрать');

export const getApplyButtonSelector = Selector('*[class*="x-btn-button-ul-usual-medium"]').withText('Применить');

const getHighchartsExists = Selector('*[id*="highcharts"]');

test('ca_r6.8.0_visitorsource', async () => {

        await t.setTestSpeed(1);
        await Helper.login();
        await t.click(Selectors.getView('Общие отчёты'))
        await t.click(Selectors.getViewItem('Анализ трафика'))
        
        //timeout
        //await t.expect(getHighchartsExists).ok();
        await t.expect(getHighchartsExists.exists).eql(true, 'Waiting highcharts')

        await t.click(getAddFilter)
        await t.wait(1000)
        
        var filtersCount = await getFiltersCount.with({
            dependencies: {
                name: storeName
            }
        })();

        console.log('Количество фильтров в отчете: ' + filtersCount)

        var filters = await readFilters.with({
            dependencies: {
                name: storeName
            }
        })();

                        console.log(filters)

let step =1;
let nowTime = dateFormat(Date(), "isoDateTime");

for (let asd = 0; asd < 50; asd++)
        for (let filterIndex = 0; filterIndex < filters.length; filterIndex++)
            switch (filters[filterIndex].data.type) {
                case 'integer': {
                    
                    for (let conditionIndex = 0; conditionIndex < 4; conditionIndex++)
                    {

                        await t.click(getAddFilter)
                        await t.wait(1000)

                        const arrowCount = await getArrowCount()

                        let value = Helper.getRandomInt(1, 999);
                        let text = '.filter type: integer' + ' conditionIndex:' + conditionIndex + ' value: ' + value
                        console.log(text)

                        await t.click(getParamArrow)
                        await t.click(getParamSelector.nth(filterIndex))

                        await t.click(getСonditionArrow)
                        await t.click(getСonditionSelector.nth(filters.length + conditionIndex));

                        await t.click(getValueSelector)
                        await t.typeText(getValueSelector, value.toString());

                        await t.click(getValueButtonSelector)
                        await t.expect(getHighchartsExists.exists).eql(true, 'Waiting highcharts')

                        await t.click(getApplyButtonSelector)
                        await t.expect(getHighchartsExists.exists).eql(true, 'Waiting highcharts')

                        await t.takeScreenshot('./ca_r6.8.0-' + nowTime+'/'+ step++ +text)

                    }
                    break;
                }
                case 'numeric': {
                    console.log('filter type: numeric')


                    break;
                }
                case 'string': {
                    console.log('filter type: string')


                    break;
                }
                case 'array': {
                    console.log('filter type: array')


                    break;
                }

            }
    }
);


// Ext.ComponentQuery.query('cm-filter2panel')[0].filterListStore.data.items
// Ext.ComponentQuery.query('analytics-visitorsource-page cm-filter2panel')[0].filterListStore.data.items
// Ext.ComponentQuery.query('cm-menu')[2].items.items[0].filterListStore.data.items

// document.querySelectorAll('*[id*="ul-usualbutton"][class*="cm-filter2panel"]')


