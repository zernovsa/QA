import {t, Selector, ClientFunction} from 'testcafe';
import {username, password, test_link, site,  firstNestingTree, secondNestingTree} from './config.js';
import * as Helper_local from './helpers/ca_r6.7.0_Helper.js';
import * as Selectors from './selectors.js';
import * as Selectors_local from './selectors/ca_r6.7.0_selectors.js';
import * as Selectors_local2 from './selectors/ca_r6.8.0_selectors.js';

var colors = require('colors');

function loggerInit(name) 
{
    var log4js = require('log4js');
    log4js.configure({
      appenders: { cheese: { type: 'file', filename: name } },
      categories: { default: { appenders: ['cheese'], level: 'debug' } }
  });
    const logger = log4js.getLogger('cheese');

    return logger  
}

function log(type, message) {
    var logger = loggerInit('../logs/log.log')
    console.log(message);
    if (type =='error') logger.error(message)
        if (type == 'debug') logger.debug(message)
    }


// для создания скриншотов (текущая дата, время)
var dateFormat = require('dateformat');

// логин на страницу
export const login = async () => {
    await t.maximizeWindow( )
    //.navigateTo(`https://ca1.webdev.uiscom.ru`)
    await t.wait(3000)
    if (test_link=='http://app.comagic.ru/') await t.typeText(Selector('input[name="email"]').nth(1), username)
        else await t.typeText('input[name="login"]', username)
            await t
        .typeText('input[name="password"]', password)
        .pressKey('enter')

        // выбираем сайт siteapp.webdev.uiscom.ru - переменная site из config.js
        let siteArrow = Selector('*[class*="x-form-trigger x-form-trigger-cm-siteselector x-form-arrow-trigger x-form-arrow-trigger-cm-siteselector"]')
        await t.click(siteArrow)
        let siteClick = Selector('*[class*="x-boundlist-item"]').withText(site)
        await t.click(siteClick)

    await reloadPage()

    // выберем период "прошлый месяц"

    let pickercount = await Selector('*[class*="cm-main-container"] *[id*="cm-datecontrol"][id*="trigger-picker"]').count
    let picker = await Selector('*[class*="cm-main-container"] *[id*="cm-datecontrol"][id*="trigger-picker"]')
    await t.click(picker.nth(pickercount))

    let datecomboclick = await Selector('*[value*="Выбрать диапазон дат"]')
    await t.click(datecomboclick)

    let monthcclick = await Selector('*[class*="x-boundlist-item"]').withText('Прошлый месяц')
    await t.click(monthcclick)    

    let saveclick = await Selector('*[class*="x-btn-inner x-btn-inner-ul-main-small"]')
    await t.click(saveclick) 

    await reloadPage()
}

// случайное число
export function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// добавление сайта
export const addSite = async () => { 

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

// выбираем вкладку, в зависимости от отчета
export const clickToReport = async (menu1, menu2) => {

    await t.click(Selectors.getView(menu1))
    await t.wait(500);
    if (menu2 != '') await t.click(Selectors.getViewItem(menu2))

}

export const clickToTab = async (tabName) => {
    switch (tabName) {
        case '': {
            break;
        }
        case 'Рекламные кампании': {
            await Helper_local.clickToTabIndex(0)
            break;
        }
        case 'Источники': {
            await Helper_local.clickToTabIndex(1)
            break;
        }
        case 'Каналы': {
            await Helper_local.clickToTabIndex(2)
            break;
        }
        default: {
            await Helper_local.clickToTabName(tabName)
            break;
        }
    }
}

export const clickToMenu = async (menu1, menu2, tabName) => {
    if(menu1!=='') await clickToReport(menu1, menu2)
        await clickToTab(tabName)
    
    return [menu1, menu2, tabName]
}

export const tabTextContent = ClientFunction(() => document.querySelectorAll('div[class*="x-box-inner x-box-scroller-body-horizontal"] > div > a[class*="x-tab-active"][class*="x-tab x-unselectable"] > span > span[id*="btnEl"][id*="tab"] > span[id*="btnInnerEl"][id*="tab"][class*="x-tab-inner x-tab-inner-ul"]')[0].textContent)

export const getCurrentReportAndTab = async () => {

    let menu1, menu2, tabName

    menu2 = await Selectors_local2.whatReport()

    switch (menu2) {
        case 'Обзор': {
            menu1 = menu2
            menu2 = ''
            break;
        }
        case 'Сквозная аналитика': {
            menu1 = 'Общие отчёты'
            break;
        }
        case 'Анализ трафика': {
            menu1 = 'Общие отчёты'
            break;
        }
        case 'Аудитория': {
            menu1 = 'Общие отчёты'
            break;
        }
        case 'Содержание': {
            menu1 = 'Общие отчёты'
            break;
        }
        case 'Динамика обращений': {
            menu1 = 'Общие отчёты'
            break;
        }
        case 'Качество обращений': {
            menu1 = 'Общие отчёты'
            break;
        }
        case 'Обращения по сотрудникам': {
            menu1 = 'Общие отчёты'
            break;
        }
        case 'Распределение входящих звонков': {
            menu1 = 'Общие отчёты'
            break;
        }
        case 'Звонки': {
            menu1 = 'Список обращений'
            break;
        }
        case 'Чаты': {
            menu1 = 'Список обращений'
            break;
        }
        case 'Заявки': {
            menu1 = 'Список обращений'
            break;
        }
        case 'Цели': {
            menu1 = 'Список обращений'
            break;
        }
        case 'Лидогенерация': {
            menu1 = menu2
            menu2 = ''
            break;
        }
        case 'Запросы к API': {
            menu1 = 'Служебные'
            break;
        }
        case 'Уведомления': {
            menu1 = 'Служебные'
            break;
        }
        default: {
            menu1 = menu2
            menu2 = ''
            break;
        }
    }

    if(menu2!=='Анализ трафика' && menu2!='Заявки' && menu2!='Цели' ) tabName = await tabTextContent()
        else tabName=''

            return [menu1, menu2, tabName]
    }

    export const getCurrentSecondNesting = async () => {

        var result = null
        return result

    }

    export const clickToAccountTab = async (menu, tabName) => {
        await t.click(Selectors.getView(menu))
        await Helper_local.clickToTabName(tabName)

        return [menu, '', tabName]

    }

// включаем все колонки отчета
export const enableAllColumns = async () => {
    const getColumnsButton = Selector('*[id*="ul-usualbutton"][id*=btnInnerEl]').withText('Настроить столбцы');
    await t.click(getColumnsButton);

    const getUncheckedColumnsCount = ClientFunction(() => document.querySelectorAll('[role*="checkbox"]:not([class*="x-tree-checkbox-checked"]):not([id*="checkboxfield"])').length);
    var count                      = await getUncheckedColumnsCount()
    //console.log('Columns count: ' + count)

    while (count > 0) {
        var selector = await Selector('[role*="checkbox"]:not([class*="x-tree-checkbox-checked"]):not([id*="checkboxfield"])')
        await t.click(selector.nth(0))
        await t.wait(1000)
        count = await getUncheckedColumnsCount()
        //console.log(count + ' ')
    }

    let nowTime = dateFormat(Date(), "isoDateTime");
    let step    = 'enableAllColumns'
    // await t.takeScreenshot('./ca_r6.8.0-' + nowTime + '/' + step)

    const getSaveButton = Selector('*[id*="ul-mainbutton"][id*=btnInnerEl]').withText('Сохранить');
    await t.click(getSaveButton);
}


// включаем все измерения отчета
export const nestingConfigName = async (name) => {
    const getColumnsButton = Selector('*[id*="ul-usualbutton"][id*=btnInnerEl]').withText('Настроить измерения');
    await t.click(getColumnsButton);

    var selector = Selector('[class*="x-tree-node-text "]').withText(name);
    await t.click(selector)

    const getSaveButton = Selector('*[id*="ul-mainbutton"][id*=btnInnerEl]').withText('Сохранить');
    await t.click(getSaveButton);
}

// включаем все измерения отчета
export const nestingConfigIndex = async (index) => {

    var selector = await Selector(`tr:not([class *= x-grid-row-disabled]) [role*="checkbox"]:not([class*="x-tree-checkbox-checked"]):not([id*="checkboxfield"]`)
    var check = await selector.nth(index).getStyleProperty('display');

    if(check==="inline-block") await t.click(selector.nth(index))

}

// document.querySelectorAll('[role*="checkbox"][class*="x-tree-checkbox-checked"]:not([id*="checkboxfield"])')

// выключаем все измерения отчета
export const nestingConfigAllUnchecked = async (text) => {
    const getColumnsButton = Selector('*[id*="ul-usualbutton"][id*=btnInnerEl]').withText('Настроить измерения');
    await t.click(getColumnsButton);


    const getUncheckedColumnsCount = ClientFunction(() => document.querySelectorAll('tr:not([class*="x-hidden"]):not([class *= x-grid-row-disabled]) [role*="checkbox"][class*="x-tree-checkbox-checked"]').length);
    var count                      = await getUncheckedColumnsCount()
    console.log('Columns count: ' + count)

    var y=0;

    for(var i=0; i<count;i++) {
        var selector = await Selector('tr:not([class*="x-hidden"]):not([class *= x-grid-row-disabled]) [role*="checkbox"][class*="x-tree-checkbox-checked"]')
        var check = await selector.nth(y).getStyleProperty('display');

        if(check==="inline-block")
        {
            console.log(check)
            await t.click(selector.nth(y))
            await t.wait(1000)
        }   
        if(check==="none")
        {
            console.log(check)
            y++
        }
    }

    var getSaveButton = await Selector('*[id*="ul-mainbutton"][id*=btnInnerEl]').withText('Сохранить');

    if (typeof text == 'string') 
    {
        getSaveButton = await Selector('*[id*="cm-dimensionwindow"] a').withText(text);
    }   

    await t.click(getSaveButton.nth(0));

}

export const nestingExpandAll = async (text) => {

    const getColumnsButton = Selector('*[id*="ul-usualbutton"][id*=btnInnerEl]').withText('Настроить измерения');
    await t.click(getColumnsButton);

    var getExpandColumnsCount = ClientFunction(() => document.querySelectorAll(':-webkit-any([class*="x-tree-elbow-plus"], [class*="x-tree-elbow-end-plus"]):not([role="presentation"])').length);
    var count = await getExpandColumnsCount()

    var y=0;

    while (y < count) {
        var selector = await Selector(':-webkit-any([class*="x-tree-elbow-plus"], [class*="x-tree-elbow-end-plus"]):not([role="presentation"])')

        //console.log(await selector.count);

        var imageUrl = await selector.nth(y).getStyleProperty('background-image');

        //console.log(imageUrl);
        
        if (imageUrl.indexOf('plus.png') > -1) 
            await t.click(selector.nth(y))
        await t.wait(1000)
        
        y++;
    }

    var getSaveButton  = await  Selector('*[id*="ul-mainbutton"][id*=btnInnerEl]').withText('Сохранить');

    if (typeof text == 'string')  {

        getSaveButton = await  Selector('*[id*="cm-dimensionwindow"] a').withText(text);
    }

    await t.click(getSaveButton.nth(0));

}


export const nestingCollapseAll = async (text) => {

    const getColumnsButton = Selector('*[id*="ul-usualbutton"][id*=btnInnerEl]').withText('Настроить измерения');
    await t.click(getColumnsButton);

    const getUCollapseColumnsCount = ClientFunction(() => document.querySelectorAll(':-webkit-any([class*="x-tree-elbow-plus"], [class*="x-tree-elbow-end-plus"]):not([role="presentation"])').length);
    var count = await getUCollapseColumnsCount()

    while (count > 0) {
        var selector = await Selector(':-webkit-any([class*="x-tree-elbow-plus"], [class*="x-tree-elbow-end-plus"]):not([role="presentation"])')

        //console.log(await selector.count);

        var imageUrl = await selector.nth(count-1).getStyleProperty('background-image');

        //console.log(imageUrl);
        
        if (imageUrl.indexOf('minus.png') > -1) 
            await t.click(selector.nth(count-1))
        await t.wait(1000)
        
        count--;
    }

    var getSaveButton  = await  Selector('*[id*="ul-mainbutton"][id*=btnInnerEl]').withText('Сохранить');

    if (typeof text == 'string')  {

        getSaveButton = await  Selector('*[id*="cm-dimensionwindow"] a').withText(text);
    }

    await t.click(getSaveButton.nth(0));

}


// включаем все измерения отчета
export const nestingConfigAll = async () => {
    const getColumnsButton = Selector('*[id*="ul-usualbutton"][id*=btnInnerEl]').withText('Настроить измерения');
    await t.click(getColumnsButton);


    const getUncheckedColumnsCount = ClientFunction(() => document.querySelectorAll('[role*="checkbox"]:not([class*="x-tree-checkbox-checked"]):not([id*="checkboxfield"]):not([disabled])').length);
    var count                      = await getUncheckedColumnsCount()

    var y=0;

    for(var i=0; i<count;i++) {
        var selector = await Selector('[role*="checkbox"]:not([class*="x-tree-checkbox-checked"]):not([id*="checkboxfield"]):not([disabled])')
        var check = await selector.nth(y).getStyleProperty('display');

        if(check==="inline-block")
        {
            console.log(check)
            await t.click(selector.nth(y))
            await t.wait(1000)
        }   
        if(check==="none")
        {
            console.log(check)
            y++
        }

    }


    const getSaveButton = Selector('*[id*="ul-mainbutton"][id*=btnInnerEl]').withText('Сохранить');
    await t.click(getSaveButton);
}

export const tableColumnsSortrers = async() => {

        var scroll = ClientFunction((value) => document.querySelector('.x-grid-inner-normal .x-grid-view').scrollLeft = value) // вынести в функцию

        await reloadPage()

        var tmp = await Selector('*[class*=" cm-pageheader-text"]')
        await t.click(tmp.nth(0))

        const headerSelector = ClientFunction(() => document.querySelectorAll('*[class*="x-box-inner"][data-ref*="innerCt"][id*="headercontainer"]:not([style*="height: 0px"])[style] > div > div').length);
        
        var selector = await Selector('*[class*="x-box-inner"][data-ref*="innerCt"][id*="headercontainer"]:not([style*="height: 0px"])[style] > div > div').filter(el => el.childElementCount === 1)
        var count = await Selector('*[class*="x-box-inner"][data-ref*="innerCt"][id*="headercontainer"]:not([style*="height: 0px"])[style] > div > div').filter(el => el.childElementCount === 1).count

        var selector2 = await Selector(':-webkit-any([class*="x-column-header x-column-header-align-right x-group-sub-header x-box-item x-column-header-ul"], [class*="x-column-header-sort-DESC"],  [class*="x-column-header-sort-ASC"])')
        var count2 = await Selector(':-webkit-any([class*="x-column-header x-column-header-align-right x-group-sub-header x-box-item x-column-header-ul"], [class*="x-column-header-sort-DESC"],  [class*="x-column-header-sort-ASC"])').count

        console.log(count)

        for(var index=0; index < count; index++)
        {                 
         var scrollOffsetLeft = Selector('*[class*="x-box-inner"][data-ref*="innerCt"][id*="headercontainer"]:not([style*="height: 0px"])[style] > div > div').filter(el => el.childElementCount === 1).nth(index).offsetLeft
         var offset = await scrollOffsetLeft

         await scroll(offset)
         await t.wait(1000)
         await t.click(selector.nth(index))
         console.log('click to '+index+' ASC')

         await scroll(offset)
         await t.wait(1000)
         await t.click(selector.nth(index))
         console.log('click to '+index+' DESC')
     }

     console.log(count2)

     var selector3 = await Selector('*[class*="x-column-header ul-percent-column x-column-header-align-center x-box-item x-column-header-ul x-unselectable x-group-header x-box-layout-ct"]')
     var count3 = await Selector('*[class*="x-column-header ul-percent-column x-column-header-align-center x-box-item x-column-header-ul x-unselectable x-group-header x-box-layout-ct"]').count

     console.log('count3 = '+ count3)

     for(var index = 0; index < count3; index++)
     {                           

        var scrollOffsetLeft = ClientFunction((index) => document.querySelectorAll('*[class*="x-column-header ul-percent-column x-column-header-align-center x-box-item x-column-header-ul x-unselectable x-group-header x-box-layout-ct"]')[index].offsetLeft)
        var offset = await scrollOffsetLeft(index)
        console.log('offset = ' + offset)

        var getCount = ClientFunction((index) => document.querySelectorAll('*[class*="x-column-header ul-percent-column x-column-header-align-center x-box-item x-column-header-ul x-unselectable x-group-header x-box-layout-ct"]')[index].querySelectorAll('div[class*="x-box-inner"] > div > div').length)
        var count4 = await getCount(index)
        console.log('count4 = ' + count4)

        for(var index2 = 0; index2 < count4; index2++) 
        {
            await t.wait(2000)
            await scroll(offset)

            var  mySelector = (index, index2) => Selector('*[class*="x-column-header ul-percent-column x-column-header-align-center x-box-item x-column-header-ul x-unselectable x-group-header x-box-layout-ct"]').nth(index).find('div[class*="x-box-inner"] > div > div').nth(index2).find('span[class="x-column-header-sorter"]').nth(0)
            var getSelector = await mySelector(index, index2)

            await t.wait(2000)
            await t.click(getSelector)
            console.log('click to '+index2+' ASC')

            await t.wait(2000)
            await scroll(offset)
            await t.wait(2000)
            await t.click(getSelector)

            console.log('click to '+index2+' DESC')
        }
    }


}


export const clickUserFilters = async() => {

    var selector = await Selector('*[class*="x-btn-icon-el x-btn-icon-el-ul-usual-medium cm-filter2panel-userfilters-btn-icon"')

    console.log(await selector.count);

    var imageUrl = await selector.nth(0).getStyleProperty('background-image');

    console.log(imageUrl);

    if (imageUrl.indexOf('userfilters.png') > -1) 
        await t.click(selector.nth(0))
    await t.wait(1000)  

}

export const userFilters = async() => {

    await clickUserFilters();

    var filtersCount = ClientFunction(() =>  document.querySelectorAll('*[class*="x-boundlist cm-filter2panel-userfilters-boundlist x-fit-item x-boundlist-ul"] div ul div').length);
    var filterSelector = Selector('*[class*="x-boundlist cm-filter2panel-userfilters-boundlist x-fit-item x-boundlist-ul"] div ul div');

    var count = await filtersCount();
    console.log(count);

    for(var index=0; index < count; index++)
    {            
        if(index!=0) 
        {
            await clickUserFilters() 
        }
        await t.wait(1000)
        
        console.log(index)
        await t.click(filterSelector.nth(index))
        await t.wait(1000)

        await t.click(Selectors_local2.getApplyButtonSelector)
        var cancel = await Selector('*[class*="x-btn-icon-el x-btn-icon-el-ul-usual-medium cm-filter2panel-controlpanel-btn-cancel "]')
        await t.click(cancel.nth(0))
    }
}

export const delUserFilters = async() => {

    await clickUserFilters();

    var filtersCount = ClientFunction(() =>  document.querySelectorAll('*[class*="x-boundlist cm-filter2panel-userfilters-boundlist x-fit-item x-boundlist-ul"] div ul div').length);
    var filterSelector = Selector('*[class*="x-boundlist cm-filter2panel-userfilters-boundlist x-fit-item x-boundlist-ul"] div ul div');

    var count = await filtersCount();
    console.log(count);

    for(var index=0; index < count; index++)
    {            
        if(index!=0) 
        {
            await clickUserFilters()
        }
        await t.wait(1000)
        
        console.log(index)
        await t.click(filterSelector.nth(index))
        await t.wait(1000)

        await t.click(Selectors_local2.getApplyButtonSelector)
        var cancel = await Selector('*[class*="cm-filter2panel-userfilters-boundlist-removebtn"]')
    }
}


export const addUserFilters = async(report) => {

    let filters = await initFilters();
    console.log(filters)

    let value = getRandomInt(1, 999);

    await t.click(Selectors_local2.getAddFilter)
    await t.wait(1000)
     //кликаем на стрелку параметров
     let getParamArrow = await Selectors_local2.getParamArrow()
     await t.click(getParamArrow)

    //выбираем нужный параметр
    await t.click(Selectors_local2.getParamSelector.withText('Рекламная кампания'))

    //кликаем на стрелку условий
    let getСonditionArrow = await Selectors_local2.getСonditionArrow()
    await t.click(getСonditionArrow)
     //кликаем на условие 
     await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + 0));
      //кликаем на поле значение
      let getValueArrow = await Selectors_local2.getValueArrow()
      await t.click(getValueArrow)
    // выбираем первое значение списка значение 
    var q =  Selector('*[class*="x-boundlist-item"]').withText("zernov [выключена]")
    await t.click(q.nth(0));

    //кликаем применить
    await t.click(Selectors_local2.getValueButtonSelector)


    var selector = await Selector('*[class*="x-btn-icon-el x-btn-icon-el-ul-usual-medium cm-filter2panel-controlpanel-btn-save"')

    console.log(await selector.count);

    var imageUrl = await selector.nth(0).getStyleProperty('background-image');

    console.log(imageUrl);

    if (imageUrl.indexOf('save.png') > -1) {
        await t.click(selector.nth(0))
    }

    await t.wait(1000)  

    var filter_name = await Selector('*[name*="filter_name"')

    await t.click(filter_name.nth(0))
    await t.typeText(filter_name.nth(0), 'test');

    await t.wait(3000)  

    var save_button = await Selector('*[class*="x-btn-inner x-btn-inner-ul-main-medium"]')
    await t.click(save_button.nth(0))

}


export const errorExists = ClientFunction(() => document.querySelectorAll('*[id*="messagebox"][id*="innerCt"]').length);
export const reloadPage = ClientFunction(() => window.location.reload());

export const errorCheck = async () => {

    let flag=false
    let count = await errorExists()

    await t.wait(3000) 

    if (count != 0)
    {
        flag=true
        await t.click('*[id*="messagebox"][id*="toolbar-innerCt"]')
        await reloadPage()
    }

    return flag
}


export const clickConfigNestingButton = async (text) => {
 var getColumnsButton
 if(text)
 {
    getColumnsButton = Selector('*[id*="ul-usualbutton"][id*=btnInnerEl]').withText(text);
}
else 
{
    getColumnsButton = Selector('*[id*="ul-usualbutton"][id*=btnInnerEl]').withText('Настроить измерения');
}
await t.click(getColumnsButton);
}

export const clickSaveNestingButton = async (text) => {

    var getSaveButton  = await  Selector('*[id*="ul-mainbutton"][id*=btnInnerEl]').withText('Сохранить');
    if (typeof text == 'string')  {
        getSaveButton = await  Selector('*[id*="cm-dimensionwindow"] a').withText(text);
    }
    await t.click(getSaveButton.nth(0));
}


export const goalsOff = async () => {
    var selector = Selector('[id*="cm-goalsselector"][id*="btnWrap"]')
    await t.click(selector);

    await t.wait(1000)

    const getUCollapseColumnsCount = ClientFunction(() => document.querySelectorAll(':-webkit-any([class*="x-tree-elbow-plus"], [class*="x-tree-elbow-end-plus"]):not([role="presentation"])').length);
    var count = await getUCollapseColumnsCount()

    while (count > 0) {
        var selector = await Selector(':-webkit-any([class*="x-tree-elbow-plus"], [class*="x-tree-elbow-end-plus"]):not([role="presentation"])')

        //console.log(await selector.count);

        var imageUrl = await selector.nth(count-1).getStyleProperty('background-image');

        //console.log(imageUrl);
        
        if (imageUrl.indexOf('plus.png') > -1) 
            await t.click(selector.nth(count-1))
        await t.wait(1000)
        
        count--;
    }

    var selector = Selector('table[id*="cm-settings-treeview"] input[class*="x-tree-checkbox-checked"]');
    var checkCount =  ClientFunction(() => document.querySelectorAll('table[id*="cm-settings-treeview"] input[class*="x-tree-checkbox-checked"]').length);

    var count2 = await checkCount()

    while (count2>0)
    {
        await t.click(selector.nth(count2-1));
        console.log(count2)
        count2 = await checkCount()
    }

    var selector2 = Selector('[id*="cm-goalsselector"][id*="btnWrap"]')
    await t.click(selector2);
}



// инициализация фильтров
export const initFilters = async () => {

    var tree = [];   

    await t.click(Selectors_local2.getAddFilter)
    await t.wait(1000)

    var filtersCount = await Selectors_local2.getFiltersCount()

    //console.log('Количество фильтров в отчете: ' + filtersCount)

    var filters = await Selectors_local2.readFilters(Selectors_local2.storeName)

    return filters;
}

// перекликать все фильтры отчета (в зависимости от того каких колонки в отчете выбраны)
export const clickAllFilters = async (report, filters) => {
    var errors = []
    for (let filterIndex = 0; filterIndex < filters.length; filterIndex++) 
    {
        var err = await filtersWhatToDo(report, filters, filterIndex)
        if(err.length !== 0) errors.push(err)
    }
return errors
}

// что делать с фильтром в зависимости от его типа (выбрать фильтр, перебрать все значения условий, добавить случайное значение, применить фильтр и удалить его)
export const filtersWhatToDo = async (report, filters, filterIndex) => {

        // time
        // system_list
        // text
        // text_list
        // numeric
        // list
        // time_with_days
        // date
        // numeric_dict // числовой

        // system_tree

        let errors  = [];

        let nowTime = dateFormat(Date(), "isoDateTime");
        switch (filters[filterIndex].data.type) {
            // тип Числовой
            case 'numeric': {

                let conditionCount = 4

                for (let conditionIndex = 0; conditionIndex < conditionCount; conditionIndex++) {
                    //значение фильтра
                    let value = getRandomInt(1, 999);

                    try {
                        await t.click(Selectors_local2.getAddFilter)
                        await t.wait(1000)
                        //кликаем на стрелку параметров
                        let getParamArrow = await Selectors_local2.getParamArrow()
                        await t.click(getParamArrow)

                        //выбираем нужный параметр
                        await t.click(Selectors_local2.getParamSelector.withText(filters[filterIndex].data.name))

                        //кликаем на стрелку условий
                        let getСonditionArrow = await Selectors_local2.getСonditionArrow()
                        await t.click(getСonditionArrow)
                        //кликаем на условие 
                        await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));
                        //кликаем на поле значение
                        await t.click(Selectors_local2.getValueNumberSelector)
                        //вводим значение 
                        await t.typeText(Selectors_local2.getValueNumberSelector, value.toString());
                        //кликаем применить
                        await t.click(Selectors_local2.getValueButtonSelector)
                        //кликаем применить
                        await t.click(Selectors_local2.getApplyButtonSelector)

                        let flag = await errorCheck()
                        if (flag==true) 
                        {
                            await clickToMenu('', report[1], report[2]);

                            log('error', 'STEP FAILED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString() + ', value: ' + value.toString());
                            errors.push(
                            {
                                id: filterIndex,
                                report: report,
                                filter: filters[filterIndex].data.name, 
                                type: filters[filterIndex].data.type, 
                                condition: conditionIndex, 
                                value: value
                            }
                            )
                        }
                        else
                        {
                            log('debug', 'STEP PASSED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString() + ', value: ' + value.toString());
                            //кликаем отменить
                            await t.click(Selectors_local2.getCancelButtonSelector)
                        }

                    }
                    catch(err)
                    {
                        log('error', 'STEP FAILED [FILTER]: '+ ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString() );
                        errors.push(
                        {
                            id: filterIndex,
                            report: report,
                            filter: filters[filterIndex].data.name, 
                            type: filters[filterIndex].data.type, 
                            condition: conditionIndex
                        }
                        )
                    }
                }
                break;
            }

            case 'text': {

                let conditionCount = 4

                for (let conditionIndex = 0; conditionIndex < conditionCount; conditionIndex++) {
                    try 
                    {
                        await t.click(Selectors_local2.getAddFilter)
                        await t.wait(1000)

                        const arrowCount = await Selectors_local2.getArrowCount

                        let value = getRandomInt(1, 999);

                        //кликаем на стрелку параметров
                        let getParamArrow = await Selectors_local2.getParamArrow()
                        await t.click(getParamArrow)

                        //выбираем нужный параметр
                        await t.click(Selectors_local2.getParamSelector.withText(filters[filterIndex].data.name))
                        //кликаем на стрелку условий
                        let getСonditionArrow = await Selectors_local2.getСonditionArrow()
                        await t.click(getСonditionArrow)
                        //кликаем на условие
                        await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));
                        //кликаем на поле значение
                        await t.click(Selectors_local2.getValueTextSelector)
                        //вводим значение 
                        await t.typeText(Selectors_local2.getValueTextSelector, value.toString());
                        //кликаем применить
                        await t.click(Selectors_local2.getValueButtonSelector)
                        //кликаем применить
                        await t.click(Selectors_local2.getApplyButtonSelector)

                        let flag = await errorCheck()
                        if (flag==true) 
                        {
                            await clickToMenu('', report[1], report[2]);

                            log('error', 'STEP FAILED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString() + ', value: ' + value.toString());
                            errors.push(
                            {
                                id: filterIndex,
                                report: report,
                                filter: filters[filterIndex].data.name, 
                                type: filters[filterIndex].data.type, 
                                condition: conditionIndex, 
                                value: value
                            }
                            )
                        }
                        else
                        {
                            log('debug', 'STEP PASSED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString() + ', value: ' + value.toString());
                            //кликаем отменить
                            await t.click(Selectors_local2.getCancelButtonSelector)
                        }
                    }
                    catch(err)
                    {
                        log('error', 'STEP FAILED [FILTER]: '+ ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString() );
                        errors.push(
                        {
                            id: filterIndex,
                            report: report,
                            filter: filters[filterIndex].data.name, 
                            type: filters[filterIndex].data.type, 
                            condition: conditionIndex
                        }
                        )
                    }
                }
                break;
            }
            
            case 'text_list': {

                let conditionCount = 4

                for (let conditionIndex = 0; conditionIndex < conditionCount; conditionIndex++) {
                    try 
                    {
                        await t.click(Selectors_local2.getAddFilter)
                        await t.wait(1000)

                        const arrowCount = await Selectors_local2.getArrowCount

                        let value = getRandomInt(1, 999);

                        //кликаем на стрелку параметров
                        let getParamArrow = await Selectors_local2.getParamArrow()
                        await t.click(getParamArrow)

                        //выбираем нужный параметр
                        await t.click(Selectors_local2.getParamSelector.withText(filters[filterIndex].data.name))
                        //кликаем на стрелку условий
                        let getСonditionArrow = await Selectors_local2.getСonditionArrow()
                        await t.click(getСonditionArrow)
                        //кликаем на условие
                        await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));
                        //кликаем на поле значение
                        await t.click(Selectors_local2.getValueTextSelector)
                        // пауза
                        await t.wait(3000)
                        //вводим значение 
                        await t.typeText(Selectors_local2.getValueTextSelector, value.toString());
                        //кликаем применить
                        await t.click(Selectors_local2.getValueButtonSelector)
                        //кликаем применить
                        await t.click(Selectors_local2.getApplyButtonSelector)

                        let flag = await errorCheck()
                        if (flag==true) 
                        {
                            await clickToMenu('', report[1], report[2]);

                            log('error', 'STEP FAILED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString());
                            errors.push(
                            {
                                id: filterIndex,
                                report: report,
                                filter: filters[filterIndex].data.name, 
                                type: filters[filterIndex].data.type, 
                                condition: conditionIndex
                            }
                            )
                        }
                        else
                        {
                            log('debug', 'STEP PASSED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString());
                            //кликаем отменить
                            await t.click(Selectors_local2.getCancelButtonSelector)
                        }
                    }
                    catch(err)
                    {
                        log('error', 'STEP FAILED [FILTER]: '+ ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString() );
                        errors.push(
                        {
                            id: filterIndex,
                            report: report,
                            filter: filters[filterIndex].data.name, 
                            type: filters[filterIndex].data.type, 
                            condition: conditionIndex
                        }
                        )
                    }
                }
                break;
            }

            case 'system_list': {

                let conditionCount = 2

                for (let conditionIndex = 0; conditionIndex < conditionCount; conditionIndex++) {
                    try 
                    {
                        await t.click(Selectors_local2.getAddFilter)
                        await t.wait(1000)

                        const arrowCount = await Selectors_local2.getArrowCount

                        let value = getRandomInt(1, 999);

                        //кликаем на стрелку параметров
                        let getParamArrow = await Selectors_local2.getParamArrow()
                        await t.click(getParamArrow)

                        //выбираем нужный параметр
                        await t.click(Selectors_local2.getParamSelector.withText(filters[filterIndex].data.name))
                        //кликаем на стрелку условий
                        let getСonditionArrow = await Selectors_local2.getСonditionArrow()
                        await t.click(getСonditionArrow)
                        //кликаем на условие
                        await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));
                        //кликаем на поле значение
                        let getValueArrow = await Selectors_local2.getValueArrow()
                        await t.click(getValueArrow)
                         // выбираем первое значение списка значение 
                         await t.click(Selectors_local2.getValueSelector.nth(filters.length + conditionCount));
                        //кликаем применить
                        await t.click(Selectors_local2.getValueButtonSelector)
                        //кликаем применить
                        await t.click(Selectors_local2.getApplyButtonSelector)

                        let flag = await errorCheck()
                        if (flag==true) 
                        {
                            await clickToMenu('', report[1], report[2]);

                            log('error', 'STEP FAILED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString());
                            errors.push(
                            {
                                id: filterIndex,
                                report: report,
                                filter: filters[filterIndex].data.name, 
                                type: filters[filterIndex].data.type, 
                                condition: conditionIndex
                            }
                            )
                        }
                        else
                        {
                            log('debug', 'STEP PASSED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString());
                            //кликаем отменить
                            await t.click(Selectors_local2.getCancelButtonSelector)
                        }
                    }
                    catch(err)
                    {
                        log('error', 'STEP FAILED [FILTER]: '+ ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString() );
                        errors.push(
                        {
                            id: filterIndex,
                            report: report,
                            filter: filters[filterIndex].data.name, 
                            type: filters[filterIndex].data.type, 
                            condition: conditionIndex
                        }
                        )
                    }
                }
                break;
            }

            case 'time': {
                let conditionCount = 4

                for (let conditionIndex = 0; conditionIndex < conditionCount; conditionIndex++) {
                    try 
                    {
                        await t.click(Selectors_local2.getAddFilter)
                        await t.wait(1000)

                        const arrowCount = await Selectors_local2.getArrowCount

                        let getParamArrow = await Selectors_local2.getParamArrow()
                        await t.click(getParamArrow)

                        //выбираем нужный параметр
                        await t.click(Selectors_local2.getParamSelector.withText(filters[filterIndex].data.name))

                        let getСonditionArrow = await Selectors_local2.getСonditionArrow()
                        await t.click(getСonditionArrow)
                        await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));

                        await t.click(Selectors_local2.getArrowSelectorForTime)
                        await t.click(Selectors_local2.getValueSelectorForTime.nth(0))

                        await t.click(Selectors_local2.getValueButtonSelector)
                        await t.click(Selectors_local2.getApplyButtonSelector)

                        
                        let flag = await errorCheck()
                        if (flag==true) 
                        {
                            await clickToMenu('', report[1], report[2]);

                            log('error', 'STEP FAILED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString());
                            errors.push(
                            {
                                id: filterIndex,
                                report: report,
                                filter: filters[filterIndex].data.name, 
                                type: filters[filterIndex].data.type, 
                                condition: conditionIndex
                            }
                            )
                        }
                        else
                        {
                            log('debug', 'STEP PASSED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString());
                            //кликаем отменить
                            await t.click(Selectors_local2.getCancelButtonSelector)
                        }
                    }
                    catch(err)
                    {
                        log('error', 'STEP FAILED [FILTER]: '+ ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString() );
                        errors.push(
                        {
                            id: filterIndex,
                            report: report,
                            filter: filters[filterIndex].data.name, 
                            type: filters[filterIndex].data.type, 
                            condition: conditionIndex
                        }
                        )
                    }
                }
                break;
            }

            case 'list': {
                let conditionCount = 4

                for (let conditionIndex = 0; conditionIndex < conditionCount; conditionIndex++) {
                    try 
                    {
                        await t.click(Selectors_local2.getAddFilter)
                        await t.wait(1000)

                        const arrowCount = await Selectors_local2.getArrowCount

                        let getParamArrow = await Selectors_local2.getParamArrow()
                        await t.click(getParamArrow)

                        //выбираем нужный параметр
                        await t.click(Selectors_local2.getParamSelector.withText(filters[filterIndex].data.name))

                        let getСonditionArrow = await Selectors_local2.getСonditionArrow()
                        await t.click(getСonditionArrow)

                        //кликаем на условие
                        await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));
                        //кликаем на поле значение
                        let getValueArrow = await Selectors_local2.getValueArrow()
                        await t.click(getValueArrow)
                         // выбираем первое значение списка значение 
                         await t.click(Selectors_local2.getValueSelector.nth(filters.length + conditionCount));

                         await t.click(Selectors_local2.getValueButtonSelector)
                         await t.click(Selectors_local2.getApplyButtonSelector)


                         let flag = await errorCheck()
                         if (flag==true) 
                         {
                            await clickToMenu('', report[1], report[2]);

                            log('error', 'STEP FAILED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString());
                            errors.push(
                            {
                                id: filterIndex,
                                report: report,
                                filter: filters[filterIndex].data.name, 
                                type: filters[filterIndex].data.type, 
                                condition: conditionIndex
                            }
                            )
                        }
                        else
                        {
                            log('debug', 'STEP PASSED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString());
                            //кликаем отменить
                            await t.click(Selectors_local2.getCancelButtonSelector)
                        }
                    }
                    catch(err)
                    {
                        log('error', 'STEP FAILED [FILTER]: '+ ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString() );
                        errors.push(
                        {
                            id: filterIndex,
                            report: report,
                            filter: filters[filterIndex].data.name, 
                            type: filters[filterIndex].data.type, 
                            condition: conditionIndex
                        }
                        )
                    }
                }
                break;
            }

            case 'time_with_days': {
                let conditionCount = 4

                for (let conditionIndex = 0; conditionIndex < conditionCount; conditionIndex++) {
                    try 
                    {
                        await t.click(Selectors_local2.getAddFilter)
                        await t.wait(1000)

                        const arrowCount = await Selectors_local2.getArrowCount

                        let getParamArrow = await Selectors_local2.getParamArrow()
                        await t.click(getParamArrow)

                        //выбираем нужный параметр
                        await t.click(Selectors_local2.getParamSelector.withText(filters[filterIndex].data.name))

                        let getСonditionArrow = await Selectors_local2.getСonditionArrow()
                        await t.click(getСonditionArrow)
                        await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));

                        // прибавляем день
                        await t.click(Selectors_local2.getArrowSelectorForTimeWithDays)

                        // выбираем первое значение времени
                        await t.click(Selectors_local2.getArrowSelectorForTime)
                        await t.click(Selectors_local2.getValueSelectorForTime.nth(0))

                        // применяем фильтр
                        await t.click(Selectors_local2.getValueButtonSelector)
                        await t.click(Selectors_local2.getApplyButtonSelector)

                        
                        let flag = await errorCheck()
                        if (flag==true) 
                        {
                            await clickToMenu('', report[1], report[2]);

                            log('error', 'STEP FAILED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString());
                            errors.push(
                            {
                                id: filterIndex,
                                report: report,
                                filter: filters[filterIndex].data.name, 
                                type: filters[filterIndex].data.type, 
                                condition: conditionIndex
                            }
                            )
                        }
                        else
                        {
                            log('debug', 'STEP PASSED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString());
                            //кликаем отменить
                            await t.click(Selectors_local2.getCancelButtonSelector)
                        }
                    }
                    catch(err)
                    {
                        log('error', 'STEP FAILED [FILTER]: '+ ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString() );
                        errors.push(
                        {
                            id: filterIndex,
                            report: report,
                            filter: filters[filterIndex].data.name, 
                            type: filters[filterIndex].data.type, 
                            condition: conditionIndex
                        }
                        )
                    }
                }
                break;
            }

            case 'date': {
                let conditionCount = 4

                for (let conditionIndex = 0; conditionIndex < conditionCount; conditionIndex++) {
                    try 
                    {
                        await t.click(Selectors_local2.getAddFilter)
                        await t.wait(1000)

                        const arrowCount = await Selectors_local2.getArrowCount

                        let getParamArrow = await Selectors_local2.getParamArrow()
                        await t.click(getParamArrow)

                        //выбираем нужный параметр
                        await t.click(Selectors_local2.getParamSelector.withText(filters[filterIndex].data.name))

                        let getСonditionArrow = await Selectors_local2.getСonditionArrow()
                        await t.click(getСonditionArrow)
                        await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));

                        // клик на календарик
                        //await t.click(Selectors_local2.getValueSelectorForDate);

                        //кликаем на поле значение
                        await t.click(Selectors_local2.getValueTextSelector2)

                        //вводим значение 
                        await t.typeText(Selectors_local2.getValueTextSelector2, '23.11.2017');

                        // применяем фильтр
                        await t.click(Selectors_local2.getValueButtonSelector)
                        await t.click(Selectors_local2.getApplyButtonSelector)

                        
                        let flag = await errorCheck()
                        if (flag==true) 
                        {
                            await clickToMenu('', report[1], report[2]);

                            log('error', 'STEP FAILED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString());
                            errors.push(
                            {
                                id: filterIndex,
                                report: report,
                                filter: filters[filterIndex].data.name, 
                                type: filters[filterIndex].data.type, 
                                condition: conditionIndex
                            }
                            )
                        }
                        else
                        {
                            log('debug', 'STEP PASSED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString());
                            //кликаем отменить
                            await t.click(Selectors_local2.getCancelButtonSelector)
                        }
                    }
                    catch(err)
                    {
                        log('error', 'STEP FAILED [FILTER]: '+ ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString() );
                        errors.push(
                        {
                            id: filterIndex,
                            report: report,
                            filter: filters[filterIndex].data.name, 
                            type: filters[filterIndex].data.type, 
                            condition: conditionIndex
                        }
                        )
                    }
                }
                break;
            }

            case 'numeric_dict': {

                let conditionCount = 4

                for (let conditionIndex = 0; conditionIndex < conditionCount; conditionIndex++) {
                    //значение фильтра
                    let value = getRandomInt(1, 999);

                    try {
                        await t.click(Selectors_local2.getAddFilter)
                        await t.wait(1000)
                        //кликаем на стрелку параметров
                        let getParamArrow = await Selectors_local2.getParamArrow()
                        await t.click(getParamArrow)

                        //выбираем нужный параметр
                        await t.click(Selectors_local2.getParamSelector.withText(filters[filterIndex].data.name))

                        //кликаем на стрелку условий
                        let getСonditionArrow = await Selectors_local2.getСonditionArrow()
                        await t.click(getСonditionArrow)
                        //кликаем на условие 
                        await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));
                        //кликаем на поле значение
                        await t.click(Selectors_local2.getValueNumberSelector)
                        //вводим значение 
                        await t.typeText(Selectors_local2.getValueNumberSelector, value.toString());
                        //кликаем применить
                        await t.click(Selectors_local2.getValueButtonSelector)
                        //кликаем применить
                        await t.click(Selectors_local2.getApplyButtonSelector)

                        let flag = await errorCheck()
                        if (flag==true) 
                        {
                            await clickToMenu('', report[1], report[2]);

                            //console.log('STEP FAILED: '.red + ' report: '+ reportName + ' filter: ' + filters[filterIndex].data.name.yellow + ' type: '+ filters[filterIndex].data.type.yellow + ' conditionIndex: ' + conditionIndex.toString().yellow + ' value: ' + value.toString().yellow)
                            log('error', 'STEP FAILED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString() + ', value: ' + value.toString());
                            errors.push(
                            {
                                id: filterIndex,
                                report: report,
                                filter: filters[filterIndex].data.name, 
                                type: filters[filterIndex].data.type, 
                                condition: conditionIndex, 
                                value: value
                            }
                            )
                        }
                        else
                        {
                            log('debug', 'STEP PASSED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString() + ', value: ' + value.toString());
                            //кликаем отменить
                            await t.click(Selectors_local2.getCancelButtonSelector)
                        }

                    }
                    catch(err)
                    {
                        log('error', 'STEP FAILED [FILTER]: '+ ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString() );
                        errors.push(
                        {
                            id: filterIndex,
                            report: report,
                            filter: filters[filterIndex].data.name, 
                            type: filters[filterIndex].data.type, 
                            condition: conditionIndex
                        }
                        )
                    }
                }
                break;
            }

            case 'system_tree1': { // ЧТОБЫ ВКЛЮЧИТЬ ФИЛЬТР В НАЗВАНИИ ТИПА ФИЛЬТРА НУЖНО УБРАТЬ 1
                let conditionCount = 2

                for (let conditionIndex = 0; conditionIndex < conditionCount; conditionIndex++) {
                    try {
                        await t.click(Selectors_local2.getAddFilter)
                        await t.wait(1000)
                        //кликаем на стрелку параметров
                        let getParamArrow = await Selectors_local2.getParamArrow()
                        await t.click(getParamArrow)

                        //выбираем нужный параметр
                        await t.click(Selectors_local2.getParamSelector.withText(filters[filterIndex].data.name))

                        //кликаем на стрелку условий
                        let getСonditionArrow = await Selectors_local2.getСonditionArrow()
                        await t.click(getСonditionArrow)
                        //кликаем на условие 
                        await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));
                        //кликаем на поле значение
                        await t.wait(3000)
                        let getValueArrow = await Selectors_local2.getValueArrow()
                        await t.click(getValueArrow)

                        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        /// ЕСТЫ НАПИСАТЬ НЕЛЬЗЯ Т.К. СРАБАТВЫАЕТ СКРЫТИЕ ФИЛЬТРА НА ДЕЙСТВИЕ ПОЛЬЗОВАТЕЛЯ, НАПРИМЕР, ДВИЖЕНИЕ КОЛЕСИКОМ  ///
                        /// ПОЧЕМУ ТО СРАБАТВАЕТ НА TESTCAFE, ПРИ КЛИКЕ НА СТРЕЛКУ ВЫПАДАЮЩЕГО ДЕРЕВА И ЭЛЕМЕНТ дерева                    ///
                        /// НУЖНО НАПИСАТЬ КОСТЫЛЬ НА ВЕБЕ, ЧТОБЫ НЕ СКРЫВАТЬ ВЫПАДАЮЩИЙ СПИСОК ИМЕННО ДЛЯ ФИЛЬТРА ОПЕРАЦИИ               ///
                        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                        //кликаем применить
                        await t.click(Selectors_local2.getValueButtonSelector)
                        //кликаем применить
                        await t.click(Selectors_local2.getApplyButtonSelector)

                        let flag = await errorCheck()
                        if (flag==true) 
                        {
                            await clickToMenu('', report[1], report[2]);

                            log('error', 'STEP FAILED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString() + ', value: ' + value.toString());
                            errors.push(
                            {
                                id: filterIndex,
                                report: report,
                                filter: filters[filterIndex].data.name, 
                                type: filters[filterIndex].data.type, 
                                condition: conditionIndex, 
                                value: value
                            }
                            )
                        }
                        else
                        {
                            log('debug', 'STEP PASSED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString() + ', value: ' + value.toString());
                            //кликаем отменить
                            await t.click(Selectors_local2.getCancelButtonSelector)
                        }

                    }
                    catch(err)
                    {
                        log('error', 'STEP FAILED [FILTER]: '+ ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString() );
                        errors.push(
                        {
                            id: filterIndex,
                            report: report,
                            filter: filters[filterIndex].data.name, 
                            type: filters[filterIndex].data.type, 
                            condition: conditionIndex
                        }
                        )
                    }
                }
                break;
            }

            case 'array_list': {
                let conditionCount = 4

                for (let conditionIndex = 0; conditionIndex < conditionCount; conditionIndex++) {
                    try 
                    {
                        await t.click(Selectors_local2.getAddFilter)
                        await t.wait(1000)

                        const arrowCount = await Selectors_local2.getArrowCount

                        let getParamArrow = await Selectors_local2.getParamArrow()
                        await t.click(getParamArrow)

                        //выбираем нужный параметр
                        await t.click(Selectors_local2.getParamSelector.withText(filters[filterIndex].data.name))

                        let getСonditionArrow = await Selectors_local2.getСonditionArrow()
                        await t.click(getСonditionArrow)

                        //кликаем на условие
                        await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));
                        //кликаем на поле значение
                        let getValueArrow = await Selectors_local2.getValueArrow()
                        await t.click(getValueArrow)
                         // выбираем первое значение списка значение 
                         await t.click(Selectors_local2.getValueSelector.nth(filters.length + conditionCount));

                         await t.click(Selectors_local2.getValueButtonSelector)
                         await t.click(Selectors_local2.getApplyButtonSelector)


                         let flag = await errorCheck()
                         if (flag==true) 
                         {
                            await clickToMenu('', report[1], report[2]);

                            log('error', 'STEP FAILED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString());
                            errors.push(
                            {
                                id: filterIndex,
                                report: report,
                                filter: filters[filterIndex].data.name, 
                                type: filters[filterIndex].data.type, 
                                condition: conditionIndex
                            }
                            )
                        }
                        else
                        {
                            log('debug', 'STEP PASSED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString());
                            //кликаем отменить
                            await t.click(Selectors_local2.getCancelButtonSelector)
                        }
                    }
                    catch(err)
                    {
                        log('error', 'STEP FAILED [FILTER]: '+ ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString() );
                        errors.push(
                        {
                            id: filterIndex,
                            report: report,
                            filter: filters[filterIndex].data.name, 
                            type: filters[filterIndex].data.type, 
                            condition: conditionIndex
                        }
                        )
                    }
                }
                break;
            }
            
            case 'duration': {

                let conditionCount = 4

                for (let conditionIndex = 0; conditionIndex < conditionCount; conditionIndex++) {
                    try 
                    {
                        await t.click(Selectors_local2.getAddFilter)
                        await t.wait(1000)

                        const arrowCount = await Selectors_local2.getArrowCount

                        let getParamArrow = await Selectors_local2.getParamArrow()
                        await t.click(getParamArrow)

                        //выбираем нужный параметр
                        await t.click(Selectors_local2.getParamSelector.withText(filters[filterIndex].data.name))

                        let getСonditionArrow = await Selectors_local2.getСonditionArrow()
                        await t.click(getСonditionArrow)

                        //кликаем на условие
                        await t.click(Selectors_local2.getСonditionSelector.nth(filters.length + conditionIndex));
                        //кликаем на поле значение
                        let getValueArrow = await Selectors_local2.getValueArrowDuration()
                        await t.click(getValueArrow)
                         // выбираем первое значение списка значение 
                         await t.click(Selectors_local2.getValueSelector.nth(filters.length + conditionCount));

                         await t.click(Selectors_local2.getValueButtonSelector)
                         await t.click(Selectors_local2.getApplyButtonSelector)


                         let flag = await errorCheck()
                         if (flag==true) 
                         {
                            await clickToMenu('', report[1], report[2]);

                            log('error', 'STEP FAILED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString());
                            errors.push(
                            {
                                id: filterIndex,
                                report: report,
                                filter: filters[filterIndex].data.name, 
                                type: filters[filterIndex].data.type, 
                                condition: conditionIndex
                            }
                            )
                        }
                        else
                        {
                            log('debug', 'STEP PASSED [FILTER]: ' + ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString());
                            //кликаем отменить
                            await t.click(Selectors_local2.getCancelButtonSelector)
                        }
                    }
                    catch(err)
                    {
                        log('error', 'STEP FAILED [FILTER]: '+ ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type + ', conditionIndex: ' + conditionIndex.toString() );
                        errors.push(
                        {
                            id: filterIndex,
                            report: report,
                            filter: filters[filterIndex].data.name, 
                            type: filters[filterIndex].data.type, 
                            condition: conditionIndex
                        }
                        )
                    }
                }
                break;
            }

            default: {
                log('error', 'STEP [FILTER] UNKNOWN RESULT: '+ ' report: ['+ report + '], filter: ' + filters[filterIndex].data.name + ', type: '+ filters[filterIndex].data.type)
                break;
            }           
        }

        return errors;
    }

// функция выбирающая что передали в фильтр Индекс или Название фильтра, и вызываем filtersWhatToDo - что делать в зависимости от типа фильтра
export const filtersConditionIndexOrName = async (report, filters, value) => {
    var errors
    switch (typeof value) {
        case 'number': { // если передали индекс  фильтра
            errors = await filtersWhatToDo(report, filters, value)
            break;
        }
        case 'string': { // если передали название  фильтра
            for (let filterIndex = 0; filterIndex < filters.length; filterIndex++) 
                if (filters[filterIndex].data.name == value) 
                {
                    errors = await filtersWhatToDo(report, filters, filterIndex)
                }
                break;
            }
        }
        return errors
    }

// чтобы выбрать не включение подстроки, а конкретную строку дерева
import escapeRegExp from 'lodash/escapeRegExp';

function getWholeTextRe(text) {
    return new RegExp(`^${escapeRegExp(text)}$`);
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

export const delReport = async () => {
    const elNumber = await Selectors_local.getReportCount() - 1
    await t.click(Selector('*[class*="x-tab-inner"]:not([data-ref="btnInnerEl"])').nth(elNumber))
    await t.click(Selector('span.x-tab-edit-btn-inner').nth(elNumber))
    await t.click(Selector('span.ul-btn-usual-icon-cls-remove').nth(0))
}

//инициализация дерева первого измерения
export const initFirstNestingTree = async () => {

    await addReport();

    // считываем индексы стора для первого измерения
    let firstNesting = firstNestingTree()

    // количество элементов первой вложенности в store
    let storeName = Selectors_local.storeNameFirst
    let storeElCount = await Selectors_local.getStoreLength(storeName);
    //console.log('Всего элементов первой вложенности в store: ' + storeElCount)


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

// вывод дерева в консоль
export const consolelogFirstNestingTree = async (tree) => {
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
    // console.log('Всего элементов первой вложенности в store: ' + storeElCount)

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

// функция добавляет первое измерения
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
                console.log('STEP PASSED [FIRST NESTING]: ' + tree[index1].text + ' / '+ tree[index1].children[index2].text)
            }
                else // если 3 уровня вложенности
                {

                    await addReportWithName(tree[index1].text+'/'+tree[index1].children[index2].text+'/'+tree[index1].children[index2].children[index3].text);

                    if (tree[index1].expanded == true)
                    {
                        await t.click(Selector('*[class*="x-tree-node-text"').withText(tree[index1].children[index2].text).parent().find('img.x-tree-expander:not([role="presentation"])'))
                    }
                    let a = getWholeTextRe(tree[index1].children[index2].children[index3].text)
                    await t.click(Selector('*[class*="x-tree-node-text"').withText(a).parent().find('img'))
                    flag = true
                    console.log('STEP PASSED [FIRST NESTING]: ' + tree[index1].text + ' / ' + tree[index1].children[index2].text + ' / '+  tree[index1].children[index2].children[index3].text)
                }
                return flag   
            }

// функция перебирающая все вторые измерения и фильyр по этому измерению
export const addSecondNesting = async (tree2, index1, index2, index3) => {

    var flag = false
    var errors = []

               if (tree2[index1].children[index2].childsCount == 0)  // если 2 уровня вложенности
               {
                if (tree2[index1].children[index2].disabled == false)
                {
                    try 
                    {
                        await t.click(Selectors_local.add2Report)

                        if (tree2[index1].expanded == false)
                            await t.click(Selector('*[class*="x-tree-node-text"').withText(tree2[index1].text).parent().find('img.x-tree-expander:not([role="presentation"])'))

                        let a = getWholeTextRe(tree2[index1].children[index2].text)
                        await t.click(Selector('*[class*="x-tree-node-text"').withText(a).parent().find('img'))
                        flag = true
                        console.log('STEP PASSED [SECOND NESTING]: '.green + tree2[index1].text + ' / '+ tree2[index1].children[index2].text)
                    }
                    catch(err) 
                    {
                        console.log('STEP FAILED [SECOND NESTING]: '.red + tree2[index1].text + ' / '+  tree2[index1].children[index2].text)
                        errors.push(
                        {
                            index: [index1, index2],
                            text:  tree2[index1].children[index2].text
                        }
                        )
                    }
                }
            }
                else // если 3 уровня вложенности
                {
                    if (tree2[index1].children[index2].disabled == false)
                    {
                        try
                        {
                            await t.click(Selectors_local.add2Report)

                            if (tree2[index1].expanded == false)
                                await t.click(Selector('*[class*="x-tree-node-text"').withText(tree2[index1].text).parent().find('img.x-tree-expander:not([role="presentation"])'))

                            if (tree2[index1].children[index2].expanded == false)
                                await t.click(Selector('*[class*="x-tree-node-text"').withText(tree2[index1].children[index2].text).parent().find('img.x-tree-expander:not([role="presentation"])'))

                            let a = getWholeTextRe(tree2[index1].children[index2].children[index3].text)
                            await t.click(Selector('*[class*="x-tree-node-text"').withText(a).parent().find('img'))
                            flag = true
                            console.log('STEP PASSED [SECOND NESTING]: '.green + tree2[index1].text + ' / ' + tree2[index1].children[index2].text + ' / '+  tree2[index1].children[index2].children[index3].text)
                        } 
                        catch(err) 
                        {
                            console.log('STEP FAILED [SECOND NESTING]: '.red + tree2[index1].text + ' / ' + tree2[index1].children[index2].text + ' / '+  tree2[index1].children[index2].children[index3].text)
                            errors.push(
                            {
                                index: [index1, index2, index3],
                                text:  tree2[index1].children[index2].children[index3].text
                            }
                            )
                        }
                    }
                }
                return [flag, errors]
            }

// функция которая перебирает все значения первого  измерения
export const allFirstNesting = async (tree) => {
 for (var index1 = 0; index1 < tree.length; index1++) 
    for (var index2 = 0; index2 < tree[index1].childsCount; index2++) 
    {
            if (tree[index1].children[index2].childsCount==0) // если два уровня вложенности
            {

                let clearSecondNesting = await addFirstNesting(tree, index1, index2, -1)
                if(clearSecondNesting==true) 
                {
                    console.log ('STEP PASSED [FIRST NESTING]: ' + tree[index1].text +' / '+tree[index1].children[index2].text)
                    await delReport();
                }
                else console.log ('STEP FAILED [FIRST NESTING]: ' + tree[index1].text +' / '+tree[index1].children[index2].text)
            }
            else // если три уровня вложенности
            {
                for (var index3 = 0; index3 < tree[index1].children[index2].childsCount; index3++) 
                {
                    let clearSecondNesting = await addFirstNesting(tree, index1, index2, index3)
                    if(clearSecondNesting==true) 
                    {
                        console.log ('STEP PASSED [FIRST NESTING]: ' + tree[index1].text +' / ' + tree[index1].children[index2].text + ' / ' + tree[index1].children[index2].children[index3].text)
                        await delReport();
                    }
                    else console.log ('STEP FAILED [FIRST NESTING]: ' + tree[index1].text +' / ' + tree[index1].children[index2].text + ' / ' + tree[index1].children[index2].children[index3].text)
                }

        }

    }
}

// функция которая перебирает все значения первого  измерения и фильтрыы
export const allFirstNestingWithFilters = async (report, tree) => {
 for (var index1 = 0; index1 < tree.length; index1++) 
    for (var index2 = 0; index2 < tree[index1].childsCount; index2++) 
    {
            if (tree[index1].children[index2].childsCount==0) // если два уровня вложенности
            {

                let clearSecondNesting = await addFirstNesting(tree, index1, index2, -1)
                if(clearSecondNesting==true) 
                {
                    let filters = await initFilters();
                        //console.log(filters)
                        let errors = await clickAllFilters(report, filters);
                        //console.log(errors)
                        console.log ('STEP PASSED [FILTER]: ' + tree[index1].text +' / '+tree[index1].children[index2].text)
                        await delReport();
                    }
                    else console.log ('STEP FAILED [FILTER]: ' + tree[index1].text +' / '+tree[index1].children[index2].text)
                }
            else // если три уровня вложенности
            {
                for (var index3 = 0; index3 < tree[index1].children[index2].childsCount; index3++) 
                {
                    let clearSecondNesting = await addFirstNesting(tree, index1, index2, index3)
                    if(clearSecondNesting==true) 
                    {
                        let filters = await initFilters();
                        //console.log(filters)
                        let errors = await clickAllFilters(report, filters);
                        //console.log(errors)
                        console.log ('STEP PASSED [FILTER]: ' + tree[index1].text +' / ' + tree[index1].children[index2].text + ' / ' + tree[index1].children[index2].children[index3].text)
                        await delReport();
                    }
                    else console.log ('STEP FAILED [FILTER]: ' + tree[index1].text +' / ' + tree[index1].children[index2].text + ' / ' + tree[index1].children[index2].children[index3].text)
                }

        }

    }
}


export const allFirstNestingsAndFirstFilters = async (report, tree) => {

    var errors = []

    for (var index1 = 0; index1 < tree.length; index1++) 
        for (var index2 = 0; index2 < tree[index1].childsCount; index2++) 
        {
            if (tree[index1].children[index2].childsCount==0) // если два уровня вложенности
            {

                let clearSecondNesting = await addFirstNesting(tree, index1, index2, -1)
                if(clearSecondNesting==true) 
                {
                    let filters = await initFilters();
                        //console.log(filters)
                        //let errors = await filtersConditionIndexOrName(report, filters, tree[index1].children[index2].text);
                        //console.log(errors)
                        console.log ('STEP [FILTER] PASSED: ' + tree[index1].text +' / '+tree[index1].children[index2].text)
                        await delReport();
                    }
                    else console.log ('STEP [FILTER] FAILED: ' + tree[index1].text +' / '+tree[index1].children[index2].text)
                }
            else // если три уровня вложенности
            {
                for (var index3 = 0; index3 < tree[index1].children[index2].childsCount; index3++) 
                {
                    let clearSecondNesting = await addFirstNesting(tree, index1, index2, index3)
                    if(clearSecondNesting==true) 
                    {
                        let filters = await initFilters();
                        //console.log(filters)
                        //let errors = await filtersConditionIndexOrName(report, filters, tree[index1].children[index2].children[index3].text);
                        //console.log(errors)
                        console.log ('STEP [FILTER] PASSED: ' + tree[index1].text +' / ' + tree[index1].children[index2].text + ' / ' + tree[index1].children[index2].children[index3].text)
                        await delReport();
                    }
                    else console.log ('STEP [FILTER] FAILED: ' + tree[index1].text +' / ' + tree[index1].children[index2].text + ' / ' + tree[index1].children[index2].children[index3].text)
                }

        }

    }

    return errors
} 

// функция которая перебирает все значения второго измерения и перекликивает фильтр по этому измерению
export const allSecondNesting = async (report, tree2) => {

    var errors = []

    for (var index1 = 0; index1 < tree2.length; index1++) 
        for (var index2 = 0; index2 < tree2[index1].childsCount; index2++) 
            if (tree2[index1].children[index2].childsCount==0) // если два уровня вложенности
            {
                let res = await addSecondNesting(tree2, index1, index2, -1)
                if(res[0]==true) 
                {
                    await t.click(Selectors_local2.getCancelNestingButtonSelector)
                }
                if(res[1].length !== 0) errors.push(res[1])
            }
            else // если три уровня вложенности
            {
                for (var index3 = 0; index3 < tree2[index1].children[index2].childsCount; index3++) 
                {
                    let res = await addSecondNesting(tree2, index1, index2, index3)
                    if(res[0]==true) 
                    {
                        await t.click(Selectors_local2.getCancelNestingButtonSelector)
                    }
                    if(res[1].length !== 0) errors.push(res[1])
                }

        }
        return errors
    }

// функция которая перебирает все значения второго измерения и перекликивает фильтр по этому измерению
export const secondNestingFilters = async (report, tree2) => {

    let errors = []

    for (var index1 = 0; index1 < tree2.length; index1++) 
        for (var index2 = 0; index2 < tree2[index1].childsCount; index2++) 
            if (tree2[index1].children[index2].childsCount==0) // если два уровня вложенности
            {
                let res = await addSecondNesting(tree2, index1, index2, -1)

                if(res[0]==true)
                {
                    let filters = await initFilters();
                    //console.log(filters)
                    await filtersConditionIndexOrName(report, filters, tree2[index1].children[index2].text)
                    await t.click(Selectors_local2.getCancelNestingButtonSelector)
                }
            }
            else // если три уровня вложенности
            {
                for (var index3 = 0; index3 < tree2[index1].children[index2].childsCount; index3++) 
                {
                    let res = await addSecondNesting(tree2, index1, index2, index3)
                    
                    if(res[0]==true)
                    {
                        let filters = await initFilters();
                        //onsole.log(filters)
                        await filtersConditionIndexOrName(report, filters, tree2[index1].children[index2].children[index3].text)
                        await t.click(Selectors_local2.getCancelNestingButtonSelector)
                    }
                }

            }
            return errors            
        }