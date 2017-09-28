import {test_link} from '../../config.js';
import {t, Selector, ClientFunction} from 'testcafe';
import * as Helper from '../../helper.js';
import * as Helper_local from '../../helpers/ca_r6.7.0_helper';
import * as Selectors from '../../selectors.js';
import * as Selectors_local from '../../selectors/ca_r6.7.0_selectors.js';

fixture `Getting Started`
    .page(test_link);

var tree  = [];

const storeName = 'cm-menu'

export const getAddFilter = Selector('*[class*="cm-filter2panel"]').nth(0);

export const getFiltersCount = ClientFunction(() => {
	//return Ext.ComponentQuery.query('cm-menu').length
	return Ext.ComponentQuery.query(name)[1].items.items[0].filterListStore.data.items.length
});


export const readFilters = ClientFunction(() => {
	let list = []
	let count  = Ext.ComponentQuery.query(name)[1].items.items[0].filterListStore.data.items.length

	for( let i=0; i<count;i++) 
	{
		 list.push(
		 	{
		 	 	el: i, 
		 	 	id: Ext.ComponentQuery.query(name)[1].items.items[0].filterListStore.data.items[i].id,
		 	 	data: Ext.ComponentQuery.query(name)[1].items.items[0].filterListStore.data.items[i].data
		 	}
		 )
	}

	return list
});

test('test', async () => {
        await t.setTestSpeed(1);
        await Helper.login();
        await t.click(Selectors.getView('Общие отчёты'))
        await t.click(Selectors.getViewItem('Анализ трафика'))

        await t.click(getAddFilter)
 		
 		await t.wait(1000)

		var filtersCount = await getFiltersCount.with({
            dependencies: {
                name: storeName
            }
        })();

		console.log ('Количество фильтров в отчете: ' + filtersCount)

		var filters = await readFilters.with({
            dependencies: {
                name: storeName
            }
        })();

		
		console.log (filters)

		for(let i = 0; i < filters.length; i++)
			switch(filters[i].data.type) {
				case 'integer':
				{
					console.log ('integer')
					break;
				}
				case 'numeric':
				{
					console.log ('numeric')
					break;
				}
				case 'string':
				{
					console.log ('string')
					break;
				}
				case 'array':
				{
					console.log ('array')
					break;
				}

			}












// Ext.ComponentQuery.query('cm-filter2panel')[0].filterListStore.data.items
// Ext.ComponentQuery.query('analytics-visitorsource-page cm-filter2panel')[0].filterListStore.data.items
// Ext.ComponentQuery.query('cm-menu')[2].items.items[0].filterListStore.data.items

// document.querySelectorAll('*[id*="ul-usualbutton"][class*="cm-filter2panel"]')





    }    
);
