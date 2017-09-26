import { t, Selector, ClientFunction } from 'testcafe';
//////////////////////
import { getClick } from './ca_r6.7.0_helper';


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

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



const getView 	  = name => Selector('td[class*="ul-tree-node-depth-2"]').withText(name)
const getViewItem = name => Selector('td[class*="ul-tree-node-depth-3"]').withText(name)

const getAddSite = Selector ('*[class*="x-form-trigger x-form-trigger-cm-siteselector cm-siteselector-add cm-siteselector-add-cm-siteselector"]').nth(0)
const siteName = Selector('*[id*="textfield"][id*="inputEl"]').nth(0)
const phoneNumber = Selector('*[id*="textfield"][id*="inputEl"]').nth(1)
const siteTypePicker = Selector('*[id*="cm-sitetype-combo"][id*="trigger-picker"]').nth(0)
const boundListItem1 = Selector ('*[class*="x-boundlist-item"]').nth(0)
const siteBranch = Selector('*[id*="cm-sitebranch-combo"][id*=trigger-picker]').nth(0)
const boundListItem2 = name => Selector ('*[class*="x-boundlist-item"]').withText(name)
const saveSiteButton = Selector ('*[id*="ul-mainbutton"][id*="btnInnerEl"]').nth(0)

const getAddReport = Selector('*[id*="cm-drop-down-button"][id*="btnEl"]').nth(0)
const getMore = Selector('img.x-tree-expander:not([role="presentation"])', { visibilityCheck: true })

	const getMoreTree = 'img.x-tree-expander:not([role="presentation"])'

const groupCount = ClientFunction(() => document.querySelectorAll ('img.x-tree-expander:not([role="presentation"])').length)

const getChildItem = Selector ('img.x-tree-elbow-line:not([role="presentation"])')
	
	const getChildItemTree = 'img.x-tree-elbow-line:not([role="presentation"])'
	const getChildItemTree2 = 'img.x-tree-elbow:not([role="presentation"])'

const subGroupCount = ClientFunction(() => document.querySelectorAll ('img.x-tree-elbow-line:not([role="presentation"])').length)

	const getSubChildItem = Selector ('img.x-tree-elbow:not([class*="x-tree-elbow-plus"]):not([role*="presentation"]), img.x-tree-elbow-end:not([class*="x-tree-elbow-plus"]):not([role*="presentation"])')
const subChildItemCount = ClientFunction(() => document.querySelectorAll ('img.x-tree-elbow:not([class*="x-tree-elbow-plus"]):not([role*="presentation"]), img.x-tree-elbow-end:not([class*="x-tree-elbow-plus"]):not([role*="presentation"])').length)

const getReportTab= Selector('a[data-boundview*="cm-editabletabbar"]')
const getReportCount = ClientFunction(() => document.querySelectorAll ('a[data-boundview*="cm-editabletabbar"]').length)

const getPencil =Selector('*[id*="ul-editabledisplayfield"][id*=trigger1]')
const getReportInput = Selector('*[id*="ul-editabledisplayfield"][id*=inputEl]')

const add2Report = Selector ('*[id*="cm-drop-down-button"][id*="btnIconEl"]')

test('login', async () => {

})



const getStoreElCount  = ClientFunction(() => { 
	return Ext.ComponentQuery.query(name)[0].store.data.length
});

const getFirstNestElText = ClientFunction( () => { 
	return Ext.ComponentQuery.query(name)[0].store.data.items[index].data.text
});

const getFirstNestElCount = ClientFunction( () => { 
	return Ext.ComponentQuery.query(name)[0].store.data.items[index].childNodes.length
});

const getSecondNestElText = ClientFunction( () => { 
	return Ext.ComponentQuery.query(name)[0].store.data.items[index1].childNodes[index2].data.text
});

const getSecondNestElChildCount = ClientFunction( () => { 
	return Ext.ComponentQuery.query(name)[0].store.data.items[index1].childNodes[index2].childNodes.length
});

const getThirdNestElText = ClientFunction( () => { 
	return Ext.ComponentQuery.query(name)[0].store.data.items[index1].childNodes[index2].childNodes[index3].data.text
});


//Дерево для первого измерения
const storeName= 'cm-drop-down-button'
var firstNesting = [1,2,6,10]
var secondNesting = [0,1,2,6,10]
var tree=[]
var tree2=[]

test('test', async () => {
   
	await login();
 	await t.wait(1000);

	// await addSite();

	await t.click(getView('Общие отчёты'))
	await t.wait(1000);
    await t.click(getViewItem('Анализ трафика'))
    await t.wait(1000);

 	var storeElCount = await getStoreElCount.with({
 		  dependencies: {
            name: 'cm-drop-down-button'
        }
    })();

 	console.log('Всего элементов первой вложенности в store: ' + storeElCount)

 	//Дерево 1 измерения
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
	//Дерево 2 измерения
	for(var i=0; i<secondNesting.length;i++)
 	{
		tree2.push({id:secondNesting[i], selector: getMoreTree})

	  	var elCount = await getFirstNestElCount.with({
	        dependencies: {
	            name: storeName,
	            index: secondNesting[i]
	        }
	    })();

	    tree2[i].childsCount = elCount

	    var elText= await getFirstNestElText.with({
	        dependencies: {
	            name: storeName,
	            index: secondNesting[i]
	        }
	    })();
	    tree2[i].text = elText
	}


	//Дерево 1 измерения
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


	//Дерево 2 измерения
	for(var i=0; i<tree2.length;i++)
	{

		tree2[i].children = []

		for(var j=0; j<tree2[i].childsCount;j++)
		{
			var elText= await getSecondNestElText.with({
	        dependencies: {
	            name: storeName,
	            index1: tree2[i].id,
	            index2: j
	        }
	    })();

			var childsCount= await getSecondNestElChildCount.with({
	        dependencies: {
	            name: storeName,
	            index1: tree2[i].id,
	            index2: j
	        }
	    })();

	    //выбираем селектор второй вложенности в зависимости от наличия потомков
	    if (childsCount==0) tree2[i].children.push({id:j, text:elText, selector: getSubChildItem, childsCount: childsCount})
		else 
			{
				tree2[i].children.push({id:j, text:elText, selector: getMoreTree, childsCount: childsCount})

				tree2[i].children[j].children=[]

				for (var z=0; z<tree2[i].children[j].childsCount;z++)
				{

					var elText= await getThirdNestElText.with({
	       				dependencies: {
			            name: storeName,
			            index1: tree2[i].id,
			            index2: j,
			            index3: z

	        			}
	   				 })();

					tree2[i].children[j].children.push({id:z, text: elText, selector:getSubChildItem})
				}
			}
		}
	}

	//Вывод дерева 1
	console.log('Дерево 1: ')
 	for(var i=0; i<firstNesting.length;i++)
 	{
		console.log(tree[i])
 	}

 	//Вывод дерева 2
	console.log('Дерево 2: ')
 	for(var i=0; i<secondNesting.length;i++)
 	{
		console.log(tree2[i])
 	}

 	//Начинаем кликать по дереву

	for(var i=0; i<tree.length;i++)
 	{
 		await t.wait(1000);
		for(var j=0; j<tree[i].childsCount;j++)
 		{
 			//await t.wait(1000);						
			if (tree[i].children[j].childsCount==0)	
				{
					

					for (var i2=0;i2<tree2.length;i2++) 
					{
						await t.wait(1000);
						for(var j2=0; j2<tree2[i2].childsCount;j2++)
 						{
								await addReport()
								await t.wait(1000);
								var s1 = Selector(tree[i].selector).nth(i)
								await t.click(s1)
								await t.wait(1000);
								var s2 = Selector(tree[i].children[j].selector).nth(j)
								await t.click(s2)
								await t.wait(1000);
								await t.click(add2Report.nth(1))
								await t.wait(1000);	
								var sel = Selector(tree2[i2].selector).nth(4+i2)
								await t.click(sel)
								await t.wait(1000);	
								//var sel2 = Selector(tree2[i2].children[j2].selector).nth(6+j2)								
								var sel2 = Selector(tree2[i2].children[j2].selector).nth((Selector(tree2[i2].children[j2].selector).length-tree2[i2].childsCount)+j2)								
								await t.click(sel2)
								await t.wait(1000);
								await delReport()
								await t.wait(1000);
						}
					}

					
				}
			else
				{
					for(var z=0; z<tree[i].children[j].childsCount;z++)
 					{
						await addReport()
						await t.wait(1000);
						var s1 = Selector(tree[i].selector).nth(i)
						await t.click(s1)
						await t.wait(1000);

						var s2 = Selector(tree[i].selector).nth(i + j + 1)
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
