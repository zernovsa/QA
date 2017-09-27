import {t, Selector} from 'testcafe';
import {getClick} from './helper';


fixture `Getting Started`
    .page `https://aasi2.webdev.uiscom.ru/`;

const login = async () => {
    await t
        .typeText('input[name="login"]', 'qa@uiscom.ru')
        .typeText('input[name="password"]', '>bcrjvRjvtl;br')
        .pressKey('enter')
}

const getView     = name => Selector('td[class*="ul-tree-node-depth-2"]').withText(name);
const getViewItem = name => Selector('td[class*="ul-tree-node-depth-3"]').withText(name);

test('My first test', async () => {
    await login();
    await t.click(getView('Теги'));
    await t.click(Selector('td div').withText('234234234234').parent().parent().find('img').nth(0))
    await t.click(Selector('td div').withText('234234234234').parent().parent().find('img').nth(1))
    await t.click(Selector('td div').withText('234234234234').parent().parent().find('img').nth(1))
    await t.wait(5000);
});

