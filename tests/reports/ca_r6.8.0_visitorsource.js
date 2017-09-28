import {test_link} from '../../config.js';
import {t, Selector, ClientFunction} from 'testcafe';
import * as Helper from '../../helper.js';
import * as Helper_local from '../../helpers/ca_r6.7.0_helper';
import * as Selectors from '../../selectors.js';
import * as Selectors_local from '../../selectors/ca_r6.7.0_selectors.js';

fixture `Getting Started`
    .page(test_link);

var firstNesting = [1, 2, 6, 10];
var tree         = [];

test('test', async () => {
        await t.setTestSpeed(1);
        await Helper.login();
        

// Ext.ComponentQuery.query('cm-filter2panel')[0].filterListStore.data.items
// Ext.ComponentQuery.query('analytics-visitorsource-page cm-filter2panel')[0].filterListStore.data.items
// Ext.ComponentQuery.query('cm-menu')[2].items.items[0].filterListStore.data.items







    }    
);
