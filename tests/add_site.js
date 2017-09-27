import {t, Selector, ClientFunction} from 'testcafe';
import * as Helper from '../helper.js';
import {test_link} from '../config.js';

fixture `Getting Started`
    .page(test_link);

test('add_site', async () => {
        await t.setTestSpeed(1);
        await Helper.login();






        
    }
);
