import { t, Selector, ClientFunction } from 'testcafe';
import * as Helper from './ca_r6.7.0_helper';
import * as Selectors from  './ca_r6.7.0_selectors.js';
import {test_link} from  '../../config.js';
import {addSite} from  '../../helper.js';

fixture `Getting Started`
    .page `https://ca1.webdev.uiscom.ru`;

var firstNesting = [1,2,6,10]
var tree=[]

test('test', async () => {
	await t.setTestSpeed(1);
	await Helper.login();
	await addSite();
	await t.click(Selectors.getView('Общие отчёты'))
    await t.click(Selectors.getViewItem('Анализ трафика'))

 	var storeElCount = await Selectors.getStoreElCount.with({
 		  dependencies: {
            name: Selectors.storeName
        }
    })();

 	console.log('Всего элементов первой вложенности в store: ' + storeElCount)

 	for(var i=0; i<firstNesting.length;i++)
 	{
		tree.push({id:firstNesting[i], selector: Selectors.getMoreTree})

	  	var elCount = await Selectors.getFirstNestElCount.with({
	        dependencies: {
	            name: Selectors.storeName,
	            index: firstNesting[i]
	        }
	    })();

	    tree[i].childsCount = elCount

	    var elText= await Selectors.getFirstNestElText.with({
	        dependencies: {
	            name: Selectors.storeName,
	            index: firstNesting[i]
	        }
	    })();
	    tree[i].text = elText
	}

	for(var i=0; i<tree.length;i++)
	{

		tree[i].children = []

		for(var j=0; j<tree[i].childsCount;j++)
		{
			var elText= await Selectors.getSecondNestElText.with({
	        dependencies: {
	            name: Selectors.storeName,
	            index1: tree[i].id,
	            index2: j
	        }
	    })();

			var childsCount= await Selectors.getSecondNestElChildCount.with({
	        dependencies: {
	            name: Selectors.storeName,
	            index1: tree[i].id,
	            index2: j
	        }
	    })();

	    //выбираем селектор второй вложенности в зависимости от наличия потомков
	    if (childsCount==0) tree[i].children.push({id:j, text:elText, selector: Selectors.getSubChildItem, childsCount: childsCount})
		else 
			{
				tree[i].children.push({id:j, text:elText, selector: Selectors.getMoreTree, childsCount: childsCount})
				tree[i].children[j].children=[]
				for (var z=0; z<tree[i].children[j].childsCount;z++)
				{

					var elText= await Selectors.getThirdNestElText.with({
	       				dependencies: {
			            name: Selectors.storeName,
			            index1: tree[i].id,
			            index2: j,
			            index3: z
	        			}
	   				 })();

					tree[i].children[j].children.push({id:z, text: elText, selector:Selectors.getSubChildItem})
				}
			}
		}
	}

	//Вывод дерева
	console.log('Дерево: ')
 	for(var i=0; i<firstNesting.length;i++)
 	{
		console.log(tree[i])
 	}

 	//Начинаем кликать по дереву

	for(var i=0; i<tree.length;i++)
 	{
		for(var j=0; j<tree[i].childsCount;j++)
 		{					
			if (tree[i].children[j].childsCount==0)	
				{
					await Helper.addReport()
					var s1 = Selector(tree[i].selector).nth(i)
					await t.click(s1)
					var s2 = Selector(tree[i].children[j].selector).nth(j)
					await t.click(s2)
					await Helper.delReport()
				}
			else
				{
					for(var z=0; z<tree[i].children[j].childsCount;z++)
 					{
						await Helper.addReport()
						if (i == 2) {var s2 = Selector(tree[i].selector).nth(i + j + 4)}
						else var s2 = Selector(tree[i].selector).nth(i + j + 1)
						await t.click(s2)
						var s3 = Selector(tree[i].children[j].children[z].selector).nth(z)
						await t.click(s3)
						await Helper.delReport()
					}
				}

		}
	}

}
);
