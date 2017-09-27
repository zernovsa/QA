import {test_link} from '../../config.js';
import {t, Selector, ClientFunction} from 'testcafe';
import * as Helper from '../../helper.js';
import * as Selectors from '../../selectors.js';

fixture `Getting Started`
    .page(test_link);

test('review', async () => {
        await t.setTestSpeed(1);
        await Helper.login();
        await t.click(Selectors.getView('Обзор'))

        await t.click(Selectors.getView('Общие отчёты'))
        await t.click(Selectors.getViewItem('Сквозная аналитика'))
        await t.click(Selectors.getViewItem('Анализ трафика'))
        await t.click(Selectors.getViewItem('Аудитория'))
        await t.click(Selectors.getViewItem('Содержание'))
		await t.click(Selectors.getViewItem('Динамика обращений'))
		await t.click(Selectors.getViewItem('Качество обращений'))
		await t.click(Selectors.getViewItem('Обращения по сотрудникам'))
		await t.click(Selectors.getViewItem('Распределение входящих звонков'))

 		await t.click(Selectors.getView('Список обращений'))
        await t.click(Selectors.getViewItem('Звонки'))
        await t.click(Selectors.getViewItem('Чаты'))
        await t.click(Selectors.getViewItem('Заявки'))
        await t.click(Selectors.getViewItem('Цели'))

		await t.click(Selectors.getView('Лидогенерация'))

		await t.click(Selectors.getView('Служебные'))
		await t.click(Selectors.getViewItem('Запросы к API'))
		await t.click(Selectors.getViewItem('Уведомления'))



    }
);
