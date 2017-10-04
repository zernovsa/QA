import {Selector, ClientFunction} from 'testcafe';

export const storeName = 'cm-drop-down-button'

export const getStoreElCount = ClientFunction(() => {
    return Ext.ComponentQuery.query(name)[0].store.data.length
});

export const getFirstNestElText = ClientFunction(() => {
    return Ext.ComponentQuery.query(name)[0].store.data.items[index].data.text
});

export const getFirstNestExpandable = ClientFunction(() => {
    return Ext.ComponentQuery.query(name)[0].store.data.items[index].data.expandable
});

export const getFirstNestExpanded = ClientFunction(() => {
    return Ext.ComponentQuery.query(name)[0].store.data.items[index].data.expanded
});

export const getFirstNestDisabled = ClientFunction(() => {
    return Ext.ComponentQuery.query(name)[0].store.data.items[index].data.disabled
});

export const getFirstNestElCount = ClientFunction(() => {
    return Ext.ComponentQuery.query(name)[0].store.data.items[index].childNodes.length
});

export const getSecondNestElText = ClientFunction(() => {
    return Ext.ComponentQuery.query(name)[0].store.data.items[index1].childNodes[index2].data.text
});

export const getSecondNestElChildCount = ClientFunction(() => {
    return Ext.ComponentQuery.query(name)[0].store.data.items[index1].childNodes[index2].childNodes.length
});

export const getSecondNestExpandable = ClientFunction(() => {
    return Ext.ComponentQuery.query(name)[0].store.data.items[index1].childNodes[index2].data.expandable
});

export const getSecondNestExpanded = ClientFunction(() => {
    return Ext.ComponentQuery.query(name)[0].store.data.items[index1].childNodes[index2].data.expanded
});

export const getSecondNestDisabled = ClientFunction(() => {
    return Ext.ComponentQuery.query(name)[0].store.data.items[index1].childNodes[index2].data.disabled
});

export const getThirdNestElText = ClientFunction(() => {
    return Ext.ComponentQuery.query(name)[0].store.data.items[index1].childNodes[index2].childNodes[index3].data.text
});

export const getAddSite        = Selector('*[class*="x-form-trigger x-form-trigger-cm-siteselector cm-siteselector-add cm-siteselector-add-cm-siteselector"]').nth(0);
export const siteName          = Selector('*[id*="textfield"][id*="inputEl"]').nth(0);
export const phoneNumber       = Selector('*[id*="textfield"][id*="inputEl"]').nth(1);
export const siteTypePicker    = Selector('*[id*="cm-sitetype-combo"][id*="trigger-picker"]').nth(0);
export const boundListItem1    = Selector('*[class*="x-boundlist-item"]').nth(0);
export const siteBranch        = Selector('*[id*="cm-sitebranch-combo"][id*=trigger-picker]').nth(0);
export const boundListItem2    = name => Selector('*[class*="x-boundlist-item"]').withText(name);
export const saveSiteButton    = Selector('*[id*="ul-mainbutton"][id*="btnInnerEl"]').nth(0);
export const getAddReport      = Selector('*[id*="cm-drop-down-button"][id*="btnEl"]').nth(0);
export const getMore           = Selector('img.x-tree-expander:not([role="presentation"])', { visibilityCheck: true });
export const getMoreTree       = 'img.x-tree-expander:not([role="presentation"])';
export const groupCount        = ClientFunction(() => document.querySelectorAll('img.x-tree-expander:not([role="presentation"])').length);
export const getChildItem      = Selector('img.x-tree-elbow-line:not([role="presentation"])');
export const getChildItemTree  = 'img.x-tree-elbow-line:not([role="presentation"])';
export const getChildItemTree2 = 'img.x-tree-elbow:not([role="presentation"])';
export const subGroupCount     = ClientFunction(() => document.querySelectorAll('img.x-tree-elbow-line:not([role="presentation"])').length);
export const getSubChildItem   = Selector('img.x-tree-elbow:not([class*="x-tree-elbow-plus"]):not([role*="presentation"]), img.x-tree-elbow-end:not([class*="x-tree-elbow-plus"]):not([role*="presentation"])')
export const subChildItemCount = ClientFunction(() => document.querySelectorAll('img.x-tree-elbow:not([class*="x-tree-elbow-plus"]):not([role*="presentation"]), img.x-tree-elbow-end:not([class*="x-tree-elbow-plus"]):not([role*="presentation"])').length)
export const getReportTab      = Selector('a[data-boundview*="cm-editabletabbar"]')
export const getReportCount    = ClientFunction(() => document.querySelectorAll('a[data-boundview*="cm-editabletabbar"]').length)
export const getPencil         = Selector('*[id*="ul-editabledisplayfield"][id*=trigger1]')
export const getReportInput    = Selector('*[id*="ul-editabledisplayfield"][id*=inputEl]')
export const add2Report        = Selector('*[id*="cm-drop-down-button"][id*="btnIconEl"]')