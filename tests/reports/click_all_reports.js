import {test_link} from '../../config.js';
import {t, Selector, ClientFunction, runner} from 'testcafe';
import * as Helper from '../../helper.js';
import * as Selectors from '../../selectors.js';

var dateFormat = require('dateformat');

fixture `Getting Started`
    .page(test_link);



test('review', async () => {
        let step =1;
        let nowTime = dateFormat(Date(), "isoDateTime");

        await t.setTestSpeed(1);
        await Helper.login();
        await t.click(Selectors.getView('Обзор'))
        
        await t.takeScreenshot('./review-' + nowTime+'/'+ step++ +'.Обзорный')

        await t.click(Selectors.getView('Общие отчёты'))
        await t.takeScreenshot('./review-' + nowTime+'/'+ step++ +'.Общие отчёты')
        await t.click(Selectors.getViewItem('Сквозная аналитика'))
        await t.takeScreenshot('./review-' + nowTime+'/'+ step++ +'.Сквозная аналитика')
        await t.click(Selectors.getViewItem('Анализ трафика'))
        await t.takeScreenshot('./review-' + nowTime+'/'+ step++ +'.Анализ трафика')
        await t.click(Selectors.getViewItem('Аудитория'))
        await t.takeScreenshot('./review-' + nowTime+'/'+ step++ +'.Аудитория')
        await t.click(Selectors.getViewItem('Содержание'))
        await t.takeScreenshot('./review-' + nowTime+'/'+ step++ +'.Содержание')
		await t.click(Selectors.getViewItem('Динамика обращений'))
        await t.takeScreenshot('./review-' + nowTime+'/'+ step++ +'.Динамика обращений')
		await t.click(Selectors.getViewItem('Качество обращений'))
        await t.takeScreenshot('./review-' + nowTime+'/'+ step++ +'.Качество обращений')
		await t.click(Selectors.getViewItem('Обращения по сотрудникам'))
        await t.takeScreenshot('./review-' + nowTime+'/'+ step++ +'.Обращения по сотрудникам')
		await t.click(Selectors.getViewItem('Распределение входящих звонков'))
        await t.takeScreenshot('./review-' + nowTime+'/'+ step++ +'.Распределение входящих звонков')

 		await t.click(Selectors.getView('Список обращений'))
        await t.takeScreenshot('./review-' + nowTime+'/'+ step++ +'.Список обращений')
        await t.click(Selectors.getViewItem('Звонки'))
        await t.takeScreenshot('./review-' + nowTime+'/'+ step++ +'.Звонки')
        
        await t.click(Selectors.getViewItem('Чаты'))
        await t.takeScreenshot('./review-' + nowTime+'/'+ step++ +'.Чаты')
        await t.click(Selectors.getViewItem('Заявки'))
        await t.takeScreenshot('./review-' + nowTime+'/'+ step++ +'.Заявки')
        await t.click(Selectors.getViewItem('Цели'))
        await t.takeScreenshot('./review-' + nowTime+'/'+ step++ +'.Цели')

		await t.click(Selectors.getView('Лидогенерация'))
        await t.takeScreenshot('./review-' + nowTime+'/'+ step++ +'.Лидогенерация')

		await t.click(Selectors.getView('Служебные'))
        await t.takeScreenshot('./review-' + nowTime+'/'+ step++ +'.Служебные')
		await t.click(Selectors.getViewItem('Запросы к API'))
        await t.takeScreenshot('./review-' + nowTime+'/'+ step++ +'.Запросы к API')
		await t.click(Selectors.getViewItem('Уведомления'))
        await t.takeScreenshot('./review-' + nowTime+'/'+ step++ +'.Уведомления')



    }
);
