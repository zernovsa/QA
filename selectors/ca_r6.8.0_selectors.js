import {t, Selector, ClientFunction} from 'testcafe';

//export const storeName = 'cm-filter2panel'; 
export const storeName = 'cm-menu'; 

export const getAddFilter = Selector('*[class*="cm-filter2panel"]').nth(0);

export const getFiltersCount = ClientFunction(() => {
    //return Ext.ComponentQuery.query('cm-filter2panel')[0].filterListStore.data.length
    //return Ext.ComponentQuery.query('cm-menu')[1].items.items[0].filterListStore.data.items.length
    return Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items.length
});

export const getFiltersItem = ClientFunction((index) => {

    var item 

    // если valueElData массив
    if(Ext.isArray(Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.valueElData)) 
    {
        var count = Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.valueElData.length
        var list = []

        for(let i = 0; i < count; i++)
        {
            list.push(
                {
                    id: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.valueElData[i].data.id,
                    name: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.valueElData[i].data.name
                }
            )
        }
   
        item = {
            id: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].id,
            data_id: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.id,
            name: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.name,
            type: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.type,
            valueElData: list
        };
    }
    // если valueElData НЕ массив
    else if (Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.valueElData!=undefined)
    {
        var count = Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.valueElData.data.length
        var list = []

        for(let i = 0; i < count; i++)
        {
            list.push(
                {
                    id: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.valueElData.data[i].data.id,
                    name: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.valueElData.data[i].data.name
                }
            )
        }
   
        item = {
            id: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].id,
            data_id: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.id,
            name: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.name,
            type: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.type,
            valueElData: list
        };

     }

     else // если valueElData НЕ определена
     {
         item = {
            id: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].id,
            data_id: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.id,
            name: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.name,
            type: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.type,
            valueElData: null
        };
     }

return item
});

export const readFilters = async (storeName, report) => {
    let list  = []

    //количество фильтров в store
    var count = await getFiltersCount()

    //считываем все фильтры в объект
    for (let i = 0; i < count; i++) {
        
        let item = await getFiltersItem(i);

        list.push(
            {
                el: i,
                id: item.id,
                data:
                    {
                        id:          item.id,
                        name:        item.name,
                        type:        item.type,
                        valueElData: item.valueElData
                    }
            }
        )
    }

    //сортируем по названию фильтра
    list.sort(function (a, b) {
      if (a.data.name > b.data.name) {
        return 1;
      }
      if (a.data.name < b.data.name) {
        return -1;
      }
      // a должно быть равным b
      return 0;
    });

    // переписываем индексы фильтров
    for (let i = 0; i < list.length; i++) {
        list[i].el=i
    }

    //console.log(list)

    return list
};

export const getArrowCount = ClientFunction(() => document.querySelectorAll('*[class*="x-form-arrow-trigger x-form-arrow-trigger-ul"]').length);

export const getParamArrow    =  Selector('*[placeholder*="Параметр"][id*="inputEl"]').parent().parent().find('*[id*="trigger-picker"]')

export const getСonditionArrow = Selector('*[placeholder*="Условие"][id*="inputEl"]').parent().parent().find('*[id*="trigger-picker"]')

export const getValueArrow = Selector('*[placeholder*="Значение"][id*="inputEl"]').parent().parent().find('*[id*="trigger-picker"]')

export const getParamSelector     = Selector('*[class*="x-boundlist-item"]');

export const getСonditionSelector = Selector('*[class*="x-boundlist-item"]');

export const getValueNumberSelector = Selector('*[id*="inputEl"][id*=numberfield]');

export const getValueTextSelector   = Selector('*[placeholder*="Значение"][id*="inputEl"]');

export const getArrowSelectorForTime = Selector('*[id*="timefield"][id*=trigger-picker]');
export const getValueSelectorForTime = Selector('*[data-boundview*="timepicker"]');

export const getValueSelector = Selector('*[class*="x-boundlist-item"]');
export const getValueSelectorList = ClientFunction((text) => ('*[class*="x-boundlist-item"]').withText(text))

export const getValueButtonSelector = Selector('*[id*="ul-usualbutton"][id*=btnInnerEl]').withText('Выбрать');

export const getApplyButtonSelector = Selector('*[class*="x-btn-button-ul-usual-medium"]').withText('Применить');

export const getCancelNestingButtonSelector = Selector('*[id*="ul-usualbutton"][id*=btnIconEl][class*=cm-btn-icon-clear-second-dimension]');

export const getCancelButtonSelector = Selector('*[class*="cm-filter2panel-controlpanel-btn-cancel"]')

export const getHighchartsExists = Selector('*[id*="highcharts"]');

export const getAccountArrow = Selector('*[id*="main-actionbutton"][id*="btnWrap"]');
export const getAccountItem  = Selector('*[id*="menuitem"][id*="textEl"]')//.withText('Аккаунт');
