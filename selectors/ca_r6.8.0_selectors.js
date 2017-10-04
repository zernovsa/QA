import {Selector, ClientFunction} from 'testcafe';

export const storeName = 'cm-menu';

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

export const getCancelNestingButtonSelector = Selector('*[id*="ul-usualbutton"][id*=btnIconEl][class*=cm-btn-icon-clear-second-dimension]')

export const getCancelButtonSelector = Selector('*[class*="cm-filter2panel-controlpanel-btn-cancel"]')

export const getHighchartsExists = Selector('*[id*="highcharts"]');