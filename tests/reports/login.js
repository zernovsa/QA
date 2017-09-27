import { t, Selector, ClientFunction } from 'testcafe';
import * as Helper from  '../../helper.js';

fixture `Getting Started`
    .page (test_link);

test('login', async () => {
	await t.setTestSpeed(1);
	await Helper.login();

}
);
