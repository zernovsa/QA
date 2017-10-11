import {test_link} from '../../config.js';
import {t, Selector, ClientFunction} from 'testcafe';
import * as Helper from '../../helper.js';
import * as Helper_local from '../../helpers/ca_r6.7.0_helper';
import * as Selectors from '../../selectors.js';
import * as Selectors_local from '../../selectors/ca_r6.7.0_selectors.js';
import * as Selectors_local2 from '../../selectors/ca_r6.8.0_selectors.js';

var dateFormat = require('dateformat');

fixture `Getting Started`
    .page(test_link);

// логин на страницу
export const login = async () => {
	await t.setTestSpeed(1);
	await Helper.login();
}

// включаем все колонки отчета
export const enableAllColumns = async () => {
	await Helper.enableAllColumns()
}

// инициализация фильтров
export const initFilters = async (menu2) => {

    var tree = [];   

    await t.click(Selectors_local2.getAddFilter)
    await t.wait(1000)

    var storeElCount = await Selectors_local2.getStoreEl(Selectors_local2.storeName)

    var filtersCount = await Selectors_local2.getFiltersCount(Selectors_local2.storeName, storeElCount - 1)

    console.log('Количество фильтров в отчете: ' + filtersCount)

    var index
    switch (menu2) {
        case 'Звонки': {
            index = 0;
            break;
        }
        case 'Запросы к API': {
            index = 0;
            break;
        }
        default: {
            index = storeElCount - 1;
            break;
        }
    }

	var filters = await Selectors_local2.readFilters(Selectors_local2.storeName, index, menu2)

    console.log(filters)

	return filters;
}

// выбрать фильтр по индексу или по названию и перебрать все его условия
export const filtersConditionIndexOrName = async (filters, value) => {
	await Helper.filtersConditionIndexOrName(filters, value)
}

// перекликать все фильтры отчета (в зависимости от того каких колонки в отчете выбраны)
export const clickAllFilters = async (filters) => {
    for (let filterIndex = 0; filterIndex < filters.length; filterIndex++) 
    	await Helper.filtersWhatToDo(filters, filterIndex)
}

// выбираем вкладку, в зависимости от отчета
export const clickToTab = async (menu1, menu2, tabName) => {
    await Helper.clickToTab(menu1, menu2, tabName);
}

        // выбрать фильтр по индексу и выбрать фильтр по названию
        test('ca_r6.8.0_filterIndexAndName', async () => {
                await login();
        		await clickToTab('Общие отчёты', 'Сквозная аналитика', '');
        		await enableAllColumns();
                let filters = await initFilters('Сквозная аналитика');
                await filtersConditionIndexOrName(filters, 0);
                await filtersConditionIndexOrName(filters, 'CTR');
            }
        );

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_1', async () => {
        await login();
		await clickToTab('Общие отчёты', 'Сквозная аналитика', '');
		await enableAllColumns();
        let filters = await initFilters('Сквозная аналитика');
        await clickAllFilters(filters);
    }
);

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_2_1', async () => {
        await login();
		await clickToTab('Общие отчёты', 'Анализ трафика', 'Рекламные кампании');
		await enableAllColumns();
        let filters = await initFilters('Анализ трафика');
        await clickAllFilters(filters);
    }
);

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_2_2', async () => {
        await login();
		await clickToTab('Общие отчёты', 'Анализ трафика', 'Источники');
		await enableAllColumns();
        let filters = await initFilters('Анализ трафика');
        await clickAllFilters(filters);
    }
);

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_2_3', async () => {
        await login();
		await clickToTab('Общие отчёты', 'Анализ трафика', 'Каналы');
		await enableAllColumns();
        let filters = await initFilters('Анализ трафика');
        await clickAllFilters(filters);
    }
);

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_3_1', async () => {
        await login();
		await clickToTab('Общие отчёты', 'Аудитория', 'Информация по сегментам');
        let filters = await initFilters('Аудитория');
        await clickAllFilters(filters);
    }
);

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_3_2', async () => {
        await login();
		await clickToTab('Общие отчёты', 'Аудитория', 'Список всех посетителей');
        let filters = await initFilters('Аудитория');
        await clickAllFilters(filters);
    }
);

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_4_1', async () => {
        await login();
		await clickToTab('Общие отчёты', 'Содержание', 'Все страницы сайта');
        let filters = await initFilters('Содержание');
        await clickAllFilters(filters);
    }
);

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_4_2', async () => {
        await login();
		await clickToTab('Общие отчёты', 'Содержание', 'Входные страницы');
        let filters = await initFilters('Содержание');
        await clickAllFilters(filters);
    }
);

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_5', async () => {
        await login();
		await clickToTab('Общие отчёты', 'Обращения по сотрудникам',  'Статистика');
        let filters = await initFilters('Обращения по сотрудникам');
        await clickAllFilters(filters);
    }
);

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_6_1', async () => {
        await login();
		await clickToTab('Общие отчёты', 'Распределение входящих звонков', 'По номерам ВАТС');
        let filters = await initFilters('Распределение входящих звонков');
        await clickAllFilters(filters);
    }
);

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_6_2', async () => {
        await login();
		await clickToTab('Общие отчёты', 'Распределение входящих звонков', 'По сотрудникам');
        let filters = await initFilters('Распределение входящих звонков');
        await clickAllFilters(filters);
    }
);

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_6_3', async () => {
        await login();
		await clickToTab('Общие отчёты', 'Распределение входящих звонков', 'По сценариям');
        let filters = await initFilters('Распределение входящих звонков');
        await clickAllFilters(filters);
    }
);

        // выбрать фильтр по индексу и выбрать фильтр по названию
        test('ca_r6.8.0_filterIndexAndName_2', async () => {
                await login();
                await clickToTab('Список обращений', 'Звонки', 'По сайтам');
                await enableAllColumns();
                let filters = await initFilters('Звонки');
                await filtersConditionIndexOrName(filters, 'Номер абонента');
            }
        );

                // выбрать фильтр по индексу и выбрать фильтр по названию
        test('ca_r6.8.0_filterIndexAndName_3', async () => {
                await login();
                await clickToTab('Список обращений', 'Звонки', 'По сайтам');
                await enableAllColumns();
                let filters = await initFilters('Звонки');
                await filtersConditionIndexOrName(filters, 'Трансфер');
            }
        );

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_7_1', async () => {
        await login();
		await clickToTab('Список обращений', 'Звонки', 'По сайтам');
        await enableAllColumns();
        let filters = await initFilters('Звонки');
        await clickAllFilters(filters);
    }
);

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_7_2', async () => {
        await login();
		await clickToTab('Список обращений', 'Звонки', 'Все звонки');
        await enableAllColumns();
        let filters = await initFilters('Звонки');
        await clickAllFilters(filters);
    }
);

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_7_3', async () => {
        await login();
		await clickToTab('Список обращений', 'Звонки', 'Входящие');
        await enableAllColumns();
        let filters = await initFilters('Звонки');
        await clickAllFilters(filters);
    }
);

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_7_4', async () => {
        await login();
		await clickToTab('Список обращений', 'Звонки', 'Исходящие');
        await enableAllColumns();
        let filters = await initFilters('Звонки');
        await clickAllFilters(filters);
    }
);

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_8', async () => {
        await login();
		await clickToTab('Список обращений', 'Чаты', 'Чаты');
        await enableAllColumns();
        let filters = await initFilters('Чаты');
        await clickAllFilters(filters);
    }
);

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_9', async () => {
        await login();
		await clickToTab('Список обращений', 'Заявки', '');
        await enableAllColumns();
        let filters = await initFilters('Заявки');
        await clickAllFilters(filters);
    }
);

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_10', async () => {
        await login();
		await clickToTab('Список обращений', 'Цели', '');
        await enableAllColumns();
        let filters = await initFilters('Цели');
        await clickAllFilters(filters);
    }
);

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_11_1', async () => {
        await login();
		await clickToTab('Список сделок', '', 'Дата обращения');
        await enableAllColumns();
        let filters = await initFilters('');
        await clickAllFilters(filters);
    }
);

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_11_2', async () => {
        await login();
		await clickToTab('Список сделок', '', 'Дата сделки');
        await enableAllColumns();
        let filters = await initFilters('');
        await clickAllFilters(filters);
    }
);

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_12', async () => {
        await login();
		await clickToTab('Служебные', 'Запросы к API', '');
        await enableAllColumns();
        let filters = await initFilters('Запросы к API');
        await clickAllFilters(filters);
    }
);

// перебрать все фильтры отчета
test('ca_r6.8.0_allFilters_report_13', async () => {
        await login();
		await clickToTab('Служебные', 'Уведомления', '');
        await enableAllColumns();
        let filters = await initFilters('Уведомления');
        await clickAllFilters(filters);
    }
);