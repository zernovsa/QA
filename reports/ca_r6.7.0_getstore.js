import { t, Selector, ClientFunction } from 'testcafe';
import { getRandomInt } from './ca_r6.7.0_helper';
import * as Selectors from  './ca_r6.7.0_selectors.js';

// const args = process.argv;
// console.log(args[4]);


fixture `Getting Started`
    .page `https://ca1.webdev.uiscom.ru`;

const login = async () => {
	await t
       	//.navigateTo(`https://ca1.webdev.uiscom.ru`)
        .typeText('input[name="login"]', 'qa@uiscom.ru')
        .typeText('input[name="password"]', '>bcrjvRjvtl;br')
        .pressKey('enter')
}

const addReport = async () => {
	const reportCount = await getReportCount()
   	if (reportCount<15)
   	{
       	await t
       		.click(getAddReport)
       		.wait(1000)
			// .click(getPencil)
			// .wait(1000)
			// .pressKey('delete')
			// .wait(1000)
			// .typeText(getReportInput, 'Report-'+getRandomInt(10000,99999))
			// .wait(1000)
			// .click(getPencil)
			// .wait(1000)
	}
}

const clickToReport = async () => {
	const elNumber = await getReportCount() - 1
	await t.click(Selector('*[class*="x-tab-inner"]:not([data-ref="btnInnerEl"])').nth(elNumber))
	await t.wait(1000);	
}

const delReport = async () => {
	const elNumber = await getReportCount() - 1
	//await t.hover(getAddSite)
	//await t.wait(1000);
	await t.click(Selector('*[class*="x-tab-inner"]:not([data-ref="btnInnerEl"])').nth(elNumber))
	await t.wait(1000);	
	await t.click(Selector('span.x-tab-edit-btn-inner').nth(elNumber))
	await t.wait(1000);	
	await t.click(Selector('span.ul-btn-usual-icon-cls-remove').nth(0))
	await t.wait(1000);	
}

var firstNesting = [1,2,6,10]
var tree=[]

test('test', async () => {
   
	await login();
 	await t.wait(1000);

	// await addSite();

	await t.click(Selectors.getView('Общие отчёты'))
	await t.wait(1000);
    await t.click(Selectors.getViewItem('Анализ трафика'))
    await t.wait(1000);

 	var storeElCount = await getStoreElCount.with({
 		  dependencies: {
            name: storeName
        }
    })();

 	console.log('Всего элементов первой вложенности в store: ' + storeElCount)

 	for(var i=0; i<firstNesting.length;i++)
 	{
		tree.push({id:firstNesting[i], selector: getMoreTree})

	  	var elCount = await getFirstNestElCount.with({
	        dependencies: {
	            name: storeName,
	            index: firstNesting[i]
	        }
	    })();

	    tree[i].childsCount = elCount

	    var elText= await getFirstNestElText.with({
	        dependencies: {
	            name: storeName,
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
			var elText= await getSecondNestElText.with({
	        dependencies: {
	            name: storeName,
	            index1: tree[i].id,
	            index2: j
	        }
	    })();

			var childsCount= await getSecondNestElChildCount.with({
	        dependencies: {
	            name: storeName,
	            index1: tree[i].id,
	            index2: j
	        }
	    })();

	    //выбираем селектор второй вложенности в зависимости от наличия потомков
	    if (childsCount==0) tree[i].children.push({id:j, text:elText, selector: getSubChildItem, childsCount: childsCount})
		else 
			{
				tree[i].children.push({id:j, text:elText, selector: getMoreTree, childsCount: childsCount})
				tree[i].children[j].children=[]
				for (var z=0; z<tree[i].children[j].childsCount;z++)
				{

					var elText= await getThirdNestElText.with({
	       				dependencies: {
			            name: storeName,
			            index1: tree[i].id,
			            index2: j,
			            index3: z
	        			}
	   				 })();

					tree[i].children[j].children.push({id:z, text: elText, selector:getSubChildItem})
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
 		await t.wait(1000);
		for(var j=0; j<tree[i].childsCount;j++)
 		{					
			if (tree[i].children[j].childsCount==0)	
				{
					await addReport()
					await t.wait(1000);
					var s1 = Selector(tree[i].selector).nth(i)
					await t.click(s1)
					await t.wait(1000);
					var s2 = Selector(tree[i].children[j].selector).nth(j)
					await t.click(s2)
					await t.wait(1000);
					await delReport()
					await t.wait(1000);
				}
			else
				{
					for(var z=0; z<tree[i].children[j].childsCount;z++)
 					{
						await addReport()
						await t.wait(1000);
						
						if (i == 2) {var s2 = Selector(tree[i].selector).nth(i + j + 4)}
						else var s2 = Selector(tree[i].selector).nth(i + j + 1)
						
						await t.click(s2)
						await t.wait(1000);
						var s3 = Selector(tree[i].children[j].children[z].selector).nth(z)
						await t.click(s3)
						await t.wait(1000);
						await delReport()
						await t.wait(1000);
					}
				}

		}
	}

}
);
