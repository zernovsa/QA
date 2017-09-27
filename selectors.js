import {Selector} from 'testcafe';

export const getView 	  = name => Selector('td[class*="ul-tree-node-depth-2"]').withText(name);
export const getViewItem = name => Selector('td[class*="ul-tree-node-depth-3"]').withText(name);