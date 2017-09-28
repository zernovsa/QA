import {test_link} from '../../config.js';
import {t, Selector, ClientFunction} from 'testcafe';
import * as Helper from '../../helper.js';
import * as Helper_local from '../../helpers/ca_r6.7.0_helper';
import * as Selectors from '../../selectors.js';
import * as Selectors_local from '../../selectors/ca_r6.7.0_selectors.js';

fixture `Getting Started`
    .page(test_link);

var tree  = [];

export const getStoreElCount = ClientFunction(() => {
    return Ext.ComponentQuery.query(name)[2].items.items[0].filterListStore.data.items.length
});

export const getAddFilter = Selector('*[class*="cm-filter2panel"]').nth(0);



const storeName = 'cm-menu'

test('test', async () => {
        await t.setTestSpeed(1);
        await Helper.login();
        await t.click(Selectors.getView('Общие отчёты'))
        await t.click(Selectors.getViewItem('Анализ трафика'))

        await t.click(getAddFilter)

		var storeElCount = await getStoreElCount.with({
            dependencies: {
                name: storeName
            }
        })();

		console.log (storeElCount)

// Ext.ComponentQuery.query('cm-filter2panel')[0].filterListStore.data.items
// Ext.ComponentQuery.query('analytics-visitorsource-page cm-filter2panel')[0].filterListStore.data.items
// Ext.ComponentQuery.query('cm-menu')[2].items.items[0].filterListStore.data.items

// document.querySelectorAll('*[id*="ul-usualbutton"][class*="cm-filter2panel"]')





    }    
);
