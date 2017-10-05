import {Selector} from 'testcafe';

// Перемещение по меню
export const getView     = name => Selector('td[class*="ul-tree-node-depth-2"]').withText(name);
export const getViewItem = name => Selector('td[class*="ul-tree-node-depth-3"]').withText(name);

// Добавление сайта
export const getAddSite     = Selector('*[class*="x-form-trigger x-form-trigger-cm-siteselector cm-siteselector-add cm-siteselector-add-cm-siteselector"]').nth(0);
export const siteName       = Selector('*[id*="textfield"][id*="inputEl"]').nth(0);
export const phoneNumber    = Selector('*[id*="textfield"][id*="inputEl"]').nth(1);
export const siteTypePicker = Selector('*[id*="cm-sitetype-combo"][id*="trigger-picker"]').nth(0);
export const boundListItem1 = Selector('*[class*="x-boundlist-item"]').nth(0);
export const siteBranch     = Selector('*[id*="cm-sitebranch-combo"][id*=trigger-picker]').nth(0);
export const boundListItem2 = name => Selector('*[class*="x-boundlist-item"]').withText(name);
export const saveSiteButton = Selector('*[id*="ul-mainbutton"][id*="btnInnerEl"]').nth(0);

