import {t, Selector, ClientFunction} from 'testcafe';
import * as Helper from '../helper.js';
import {test_link, username, password} from '../config.js';

fixture `Getting Started`
    .page(test_link);

test('login', async () => {
        await t.setTestSpeed(1);
        await t
	        .typeText('input[name="login"]', username)
	        .typeText('input[name="password"]', password)
	        .pressKey('enter')    }
);
