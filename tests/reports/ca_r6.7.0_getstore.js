import {test_link} from  '../../config.js';
import { t, Selector, ClientFunction } from 'testcafe';
import * as Helper from  '../../helper.js';
import * as Helper_local from '../../helpers/ca_r6.7.0_helper';
import * as Selectors from  '../../selectors.js';
import * as Selectors_local from  '../../selectors/ca_r6.7.0_selectors.js';

fixture `Getting Started`
    .page (test_link);

var firstNesting = [1,2,6,10]
var tree=[]

test('test', async () => {
	await t.setTestSpeed(1);
	await Helper.login();
	await Helper.addSite();
	await t.click(Selectors.getView('Общие отчёты'))
    await t.click(Selectors.getViewItem('Анализ трафика'))

 	var storeElCount = await Selectors_local.getStoreElCount.with({
 		  dependencies: {
            name: Selectors_local.storeName
        }
    })();

 	console.log('Всего элементов первой вложенности в store: ' + storeElCount)

 	for(var i=0; i<firstNesting.length;i++)
 	{
		tree.push({id:firstNesting[i], selector: Selectors_local.getMoreTree})

	  	var elCount = await Selectors_local.getFirstNestElCount.with({
	        dependencies: {
	            name: Selectors_local.storeName,
	            index: firstNesting[i]
	        }
	    })();

	    tree[i].childsCount = elCount

	    var elText= await Selectors_local.getFirstNestElText.with({
	        dependencies: {
	            name: Selectors_local.storeName,
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
			var elText= await Selectors_local.getSecondNestElText.with({
	        dependencies: {
	            name: Selectors_local.storeName,
	            index1: tree[i].id,
	            index2: j
	        }
	    })();

			var childsCount= await Selectors_local.getSecondNestElChildCount.with({
	        dependencies: {
	            name: Selectors_local.storeName,
	            index1: tree[i].id,
	            index2: j
	        }
	    })();

	    //выбираем селектор второй вложенности в зависимости от наличия потомков
	    if (childsCount==0) tree[i].children.push({id:j, text:elText, selector: Selectors_local.getSubChildItem, childsCount: childsCount})
		else 
			{
				tree[i].children.push({id:j, text:elText, selector: Selectors_local.getMoreTree, childsCount: childsCount})
				tree[i].children[j].children=[]
				for (var z=0; z<tree[i].children[j].childsCount;z++)
				{

					var elText= await Selectors_local.getThirdNestElText.with({
	       				dependencies: {
			            name: Selectors_local.storeName,
			            index1: tree[i].id,
			            index2: j,
			            index3: z
	        			}
	   				 })();

					tree[i].children[j].children.push({id:z, text: elText, selector:Selectors_local.getSubChildItem})
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
					await Helper_local.addReport()
					var s1 = Selector(tree[i].selector).nth(i)
					await t.click(s1)
					var s2 = Selector(tree[i].children[j].selector).nth(j)
					await t.click(s2)
					await Helper_local.delReport()
				}
			else
				{
					for(var z=0; z<tree[i].children[j].childsCount;z++)
 					{
						await Helper_local.addReport()
						if (i == 2) {var s2 = Selector(tree[i].selector).nth(i + j + 4)}
						else var s2 = Selector(tree[i].selector).nth(i + j + 1)
						await t.click(s2)
						var s3 = Selector(tree[i].children[j].children[z].selector).nth(z)
						await t.click(s3)
						await Helper_local.delReport()
					}
				}

		}
	}

}
);
