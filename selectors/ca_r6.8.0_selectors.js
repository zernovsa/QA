import {t, Selector, ClientFunction} from 'testcafe';

//export const storeName = 'cm-filter2panel'; 

export const whatReport    = ClientFunction(() => document.querySelectorAll('*[class*="x-grid-item x-grid-item-selected"]')[document.querySelectorAll('*[class*="x-grid-item x-grid-item-selected"]').length-1].textContent);

export const storeName = 'cm-menu'; 

export const getAddFilter = Selector('*[class*="cm-filter2panel"]').nth(0);

export const getFiltersCount = ClientFunction(() => {
    //return Ext.ComponentQuery.query('cm-filter2panel')[0].filterListStore.data.length
    //return Ext.ComponentQuery.query('cm-menu')[1].items.items[0].filterListStore.data.items.length
    return Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items.length
});

export const getFiltersItem = ClientFunction((index) => {

    var item = {
        id: null,
        data_id: null,
        name: null,
        type: null,
        valueElData: null
    }

    
        var element = Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.valueElData
        if (typeof (element) == undefined && typeof (element) == null && typeof (element) == 'undefined') 
        {
             item = {
                id: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].id,
                data_id: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.id,
                name: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.name,
                type: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.type,
                valueElData: null
            };
        }
        else
        {
            item = {
                id: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].id,
                data_id: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.id,
                name: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.name,
                type: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.type,
                valueElData: null
            };

            // // если valueElData массив
            // if(Ext.isArray(Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.valueElData)) 
            // {
            //     var count = Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.valueElData.length
            //     var list = []
            //     var id, name
            //     for(let i = 0; i < count; i++)
            //     {
            //         if (Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.type=="list")
            //         {
            //             id = Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.valueElData[i].data.id
            //             name = Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.valueElData[i].data.name
            //         }
            //         else 
            //         {
            //             id=-1
            //             name=''
            //         }
            //         list.push(
            //             {
            //                 id: id,
            //                 name: name        
                        
            //             }
            //         )
            //     }
           
            //     item = {
            //         id: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].id,
            //         data_id: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.id,
            //         name: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.name,
            //         type: Ext.ComponentQuery.query('cm-menu')[Ext.ComponentQuery.query('cm-menu').length-1].items.items[0].filterListStore.data.items[index].data.type,
            //         valueElData: list
            //     };
            // }
        }

    // }  
return item
});

export const readFilters = async (storeName) => {
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

export const getAccountItem = Selector('*[id*="menuitem"][id*="textEl"]').nth(0);
export const getAccountItem1  = Selector('*[id*="menuitem"][id*="textEl"]').withText('Аккаунт');
export const getAccountItem2 = Selector('*').withText('Аккаунт')

export const getAccountIte3 = ClientFunction(() => {
    var list = []
    for(var i = 0; i < document.querySelectorAll('*[id*="menuitem"][id*="textEl"]').length; i++)
        list.push({
            id: document.querySelectorAll('*[id*="menuitem"][id*="textEl"]')[i].id,
            textContent: document.querySelectorAll('*[id*="menuitem"][id*="textEl"]')[i].textContent
        })

   return list
});



