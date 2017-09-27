import { t, Selector, ClientFunction } from 'testcafe';
import * as Helper from  '../../helper.js';
import * as Selectors from  '../../selectors.js';

fixture `Getting Started`
    .page (test_link);

test('review', async () => {
	await t.setTestSpeed(1);
	await Helper.login();
	await t.click(Selectors.getView('Обзор'))
}
);
