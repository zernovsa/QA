import {t, Selector, ClientFunction} from 'testcafe';
import {username, password} from './config.js';
import * as Selectors_local2 from './selectors/ca_r6.8.0_selectors.js';

var dateFormat = require('dateformat');

export async function getClick (t) {
    await t.click('.new-btn');
}

export const login = async () => {
    await t
    //.navigateTo(`https://ca1.webdev.uiscom.ru`)
        .typeText('input[name="login"]', username)
        .typeText('input[name="password"]', password)
        .pressKey('enter')
}

export function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const addSite = async () => {

}

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

export const filtersWhatToDo = async (filters, filterIndex, amendment) => {
    let arrow   = 5;
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

                await t.click(Selectors_local2.getParamArrow.nth(arrow + amendment))
                await t.click(Selectors_local2.getParamSelector.nth(filterIndex))

                await t.click(Selectors_local2.getСonditionArrow.nth(arrow + 1 + amendment))
                await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));

                await t.click(Selectors_local2.getValueNumberSelector)
                await t.typeText(Selectors_local2.getValueNumberSelector, value.toString());

                await t.click(Selectors_local2.getValueButtonSelector)
                // await t.expect(Selectors_local2.getHighchartsExists.exists).eql(true, 'Waiting highcharts')

                await t.click(Selectors_local2.getApplyButtonSelector)
                // await t.expect(Selectors_local2.getHighchartsExists.exists).eql(true, 'Waiting highcharts')

                await t.takeScreenshot('./ca_r6.8.0-' + nowTime + '/' + step++ + text)

                await t.click(Selectors_local2.getCancelButtonSelector)
            }
            break;
        }
        case 'numeric': {
            for (let conditionIndex = 0; conditionIndex < 4; conditionIndex++) {

                await t.click(Selectors_local2.getAddFilter)
                await t.wait(1000)

                const arrowCount = await Selectors_local2.getArrowCount

                let value = getRandomInt(1, 999);
                let text  = '.filter text: ' + filters[filterIndex].data.name + ' type: numeric' + ' conditionIndex:' +
                            conditionIndex + ' value: ' + value
                console.log(text)

                await t.click(Selectors_local2.getParamArrow.nth(arrow + amendment))
                await t.click(Selectors_local2.getParamSelector.nth(filterIndex))

                await t.click(Selectors_local2.getСonditionArrow.nth(arrow + 1 + amendment))
                await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));

                await t.click(Selectors_local2.getValueNumberSelector)
                await t.typeText(Selectors_local2.getValueNumberSelector, value.toString());

                await t.click(Selectors_local2.getValueButtonSelector)
                // await t.expect(Selectors_local2.getHighchartsExists.exists).eql(true, 'Waiting highcharts')

                await t.click(Selectors_local2.getApplyButtonSelector)
                // await t.expect(Selectors_local2.getHighchartsExists.exists).eql(true, 'Waiting highcharts')

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

                await t.click(Selectors_local2.getParamArrow.nth(arrow + amendment))
                await t.click(Selectors_local2.getParamSelector.nth(filterIndex))

                await t.click(Selectors_local2.getСonditionArrow.nth(arrow + 1 + amendment))
                await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));

                await t.click(Selectors_local2.getValueTextSelector)
                await t.typeText(Selectors_local2.getValueTextSelector, value.toString());

                await t.click(Selectors_local2.getValueButtonSelector)
                // await t.expect(Selectors_local2.getHighchartsExists.exists).eql(true, 'Waiting highcharts')

                await t.click(Selectors_local2.getApplyButtonSelector)
                // await t.expect(Selectors_local2.getHighchartsExists.exists).eql(true, 'Waiting highcharts')

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

                    await t.click(Selectors_local2.getParamArrow.nth(arrow + amendment))
                    await t.click(Selectors_local2.getParamSelector.nth(filterIndex))

                    await t.click(Selectors_local2.getСonditionArrow.nth(arrow + 1 + amendment))
                    await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));

                    await t.click(Selectors_local2.getValueArrow.nth(arrow + 2 + amendment))
                    await t.click(Selectors_local2.getValueSelector.nth(filters.length + conditionCount + valueIndex));

                    await t.click(Selectors_local2.getValueButtonSelector)
                    // await t.expect(Selectors_local2.getHighchartsExists.exists).eql(true, 'Waiting highcharts')

                    await t.click(Selectors_local2.getApplyButtonSelector)
                    // await t.expect(Selectors_local2.getHighchartsExists.exists).eql(true, 'Waiting highcharts')

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

                    await t.click(Selectors_local2.getParamArrow.nth(arrow + amendment))
                    await t.click(Selectors_local2.getParamSelector.nth(filterIndex))

                    await t.click(Selectors_local2.getСonditionArrow.nth(arrow + 1 + amendment))
                    await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));

                    await t.click(Selectors_local2.getArrowSelectorForTime)
                    await t.click(Selectors_local2.getValueSelectorForTime.nth(valueIndex))

                    await t.click(Selectors_local2.getValueButtonSelector)
                    // await t.expect(Selectors_local2.getHighchartsExists.exists).eql(true, 'Waiting highcharts')

                    await t.click(Selectors_local2.getApplyButtonSelector)
                    // await t.expect(Selectors_local2.getHighchartsExists.exists).eql(true, 'Waiting highcharts')

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

                    await t.click(Selectors_local2.getParamArrow.nth(arrow + amendment))
                    await t.click(Selectors_local2.getParamSelector.nth(filterIndex))

                    await t.click(Selectors_local2.getСonditionArrow.nth(arrow + 1 + amendment))
                    await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));

                    await t.click(Selectors_local2.getValueArrow.nth(arrow + 2 + amendment))
                    await t.click(Selectors_local2.getValueSelector.nth(filters.length + conditionCount + valueIndex));

                    await t.click(Selectors_local2.getValueButtonSelector)
                    // await t.expect(Selectors_local2.getHighchartsExists.exists).eql(true, 'Waiting highcharts')

                    await t.click(Selectors_local2.getApplyButtonSelector)
                    // await t.expect(Selectors_local2.getHighchartsExists.exists).eql(true, 'Waiting highcharts')

                    await t.takeScreenshot('./ca_r6.8.0-' + nowTime + '/' + step++ + '.' + text)

                    await t.click(Selectors_local2.getCancelButtonSelector)


                }
            }
            break;
        }
    }
}
