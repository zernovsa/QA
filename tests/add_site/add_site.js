import {t, Selector, ClientFunction} from 'testcafe';
import * as Helper from '../../helper.js';
import {test_link} from '../../config.js';
import * as Selectors from '../../selectors.js';

fixture `Getting Started`
    .page(test_link);



test('add_site', async () => {
        await t.setTestSpeed(1);
        await Helper.login();
 		await t.click(Selectors.getAddSite)
 		await t.click(Selectors.siteName)
 		await t.typeText(Selectors.siteName, 'test.test')
		await t.click(Selectors.phoneNumber)
 		await t.typeText(Selectors.phoneNumber, '7123456789')
		await t.click(Selectors.siteTypePicker)
		await t.click(Selectors.boundListItem1)
		await t.click(Selectors.siteBranch)
		await t.click(Selectors.boundListItem2('Авто'))
		await t.click(Selectors.saveSiteButton)
    }
);
