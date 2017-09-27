import { t, Selector, ClientFunction } from 'testcafe';
import * as Helper from './ca_r6.7.0_helper';
import * as Selectors from  './ca_r6.7.0_selectors.js';
import {test_link} from  '../../config.js';
import {addSite} from  '../../helper.js';


fixture `Getting Started`
    .page `https://ca1.webdev.uiscom.ru`;

//Дерево для первого измерения
var firstNesting = [1,2,6,10]
var secondNesting = [0,1,2,6,10]
var tree=[]
var tree2=[]

test('test', async () => {
	await t.setTestSpeed(1);
	await Helper.login();
 	await t.wait(1000);
	await t.click(Selectors.getView('Общие отчёты'))
	await t.wait(1000);
    await t.click(Selectors.getViewItem('Анализ трафика'))
    await t.wait(1000);

 	var storeElCount = await Selectors.getStoreElCount.with({
 		  dependencies: {
            name: Selectors.storeName
        }
    })();

 	console.log('Всего элементов первой вложенности в store: ' + storeElCount)

 	//Дерево 1 измерения
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
	//Дерево 2 измерения
	for(var i=0; i<secondNesting.length;i++)
 	{
		tree2.push({id:secondNesting[i], selector: Selectors.getMoreTree})

	  	var elCount = await Selectors.getFirstNestElCount.with({
	        dependencies: {
	            name: Selectors.storeName,
	            index: secondNesting[i]
	        }
	    })();

	    tree2[i].childsCount = elCount

	    var elText= await Selectors.getFirstNestElText.with({
	        dependencies: {
	            name: Selectors.storeName,
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


	//Дерево 2 измерения
	for(var i=0; i<tree2.length;i++)
	{

		tree2[i].children = []

		for(var j=0; j<tree2[i].childsCount;j++)
		{
			var elText= await Selectors.getSecondNestElText.with({
	        dependencies: {
	            name: Selectors.storeName,
	            index1: tree2[i].id,
	            index2: j
	        }
	    })();

			var childsCount= await Selectors.getSecondNestElChildCount.with({
	        dependencies: {
	            name: Selectors.storeName,
	            index1: tree2[i].id,
	            index2: j
	        }
	    })();

	    //выбираем селектор второй вложенности в зависимости от наличия потомков
	    if (childsCount==0) tree2[i].children.push({id:j, text:elText, selector: Selectors.getSubChildItem, childsCount: childsCount})
		else 
			{
				tree2[i].children.push({id:j, text:elText, selector: Selectors.getMoreTree, childsCount: childsCount})

				tree2[i].children[j].children=[]

				for (var z=0; z<tree2[i].children[j].childsCount;z++)
				{

					var elText= await Selectors.getThirdNestElText.with({
	       				dependencies: {
			            name: Selectors.storeName,
			            index1: tree2[i].id,
			            index2: j,
			            index3: z

	        			}
	   				 })();

					tree2[i].children[j].children.push({id:z, text: elText, selector:Selectors.getSubChildItem})
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
		for(var j=0; j<tree[i].childsCount;j++)
 		{					
			if (tree[i].children[j].childsCount==0)	
				{
					for (var i2=0; i2 < tree2.length;i2++) 
					{
						await t.wait(1000);
						for(var j2=0; j2 < tree2[i2].childsCount;j2++)
 						{

 							if (tree2[i2].children[j2].childsCount==0)	
								{
									await Helper.addReport()								
									var s1 = Selector(tree[i].selector).nth(i)
									await t.click(s1)
									var s2 = Selector(tree[i].children[j].selector).nth(j)
									await t.click(s2)
									await t.click(Selectors.add2Report.nth(1))
										if (i2==4) {var sel = Selector(tree2[i2].selector).nth( 10 + i2 + 6)}
										else var sel = Selector(tree2[i2].selector).nth( 10 + i2 )
									await t.click(sel)									
									var sel2 = Selector(tree2[i2].children[j2].selector).nth( tree[i].childsCount + j2)								
									await t.click(sel2)									
									await Helper.delReport()
								}
							else
							{
									for(var z=0; z<tree2[i2].children[j2].childsCount;z++)
 									{
										await Helper.addReport()										
										var s1 = Selector(tree[i].selector).nth(i)
										await t.click(s1)
										var s2 = Selector(tree[i].children[j].selector).nth(j)
										await t.click(s2)
										await t.click(Selectors.add2Report.nth(1))									
											
										if (i2==3)	
											{
												var sel2 = Selector(tree2[i2].selector).nth( 10 + i2 + 3 + j2 + 1)
												await t.click(sel2)												
												var s3 = Selector(tree2[i2].children[j2].children[z].selector).nth(tree[i].childsCount + z)
												await t.click(s3)
												await Helper.delReport()												
											}
										else 
											{
												var sel2 = Selector(tree2[i2].selector).nth( 10 + i2 + j2 + 1)
												await t.click(sel2)												
												var s3 = Selector(tree2[i2].children[j2].children[z].selector).nth(tree[i].childsCount + z)
												await t.click(s3)												
												await Helper.delReport()												
											}
									}
							}
						}
					}
				}
			else
				for(var z=0; z<tree[i].children[j].childsCount;z++)
 				{
 					for (var i2=0; i2 < tree2.length;i2++) 
					{
						await t.wait(1000);
						for(var j2=0; j2 < tree2[i2].childsCount;j2++)
 						{
 							if (tree2[i2].children[j2].childsCount==0)	
								{								
										await Helper.addReport()
											if (i == 2) {var s1 = Selector(tree[i].selector).nth(i + j + 4)}	
											else var s1 = Selector(tree[i].selector).nth(i + j + 1)
										await t.click(s1)
										var s3 = Selector(tree[i].children[j].children[z].selector).nth(z)
										await t.click(s3)
										await t.click(Selectors.add2Report.nth(1))
											if (i2==4) {var sel = Selector(tree2[i2].selector).nth( 10 + i2 + 6)}
											else var sel = Selector(tree2[i2].selector).nth( 10 + i2 )
										await t.click(sel)
										var sel2 = Selector(tree2[i2].children[j2].selector).nth( tree[i].children[j].childsCount + j2)								
										await t.click(sel2)
										await Helper.delReport()
									}
								else
								{
									for(var z2=0; z2<tree2[i2].children[j2].childsCount;z2++)
				 					{
										await Helper.addReport()
											if (i == 2) {var s1 = Selector(tree[i].selector).nth(i + j + 4)}	
											else var s1 = Selector(tree[i].selector).nth(i + j + 1)
										await t.click(s1)
										var s3 = Selector(tree[i].children[j].children[z].selector).nth(z)
										await t.click(s3)
										await t.click(Selectors.add2Report.nth(1))
											if (i2==3) {var sel = Selector(tree2[i2].selector).nth( 10 + i2 + j2 + 4)}
											else var sel = Selector(tree2[i2].selector).nth( 10 + i2 + j2 + 1)
										await t.click(sel)
										var sel2 = Selector(tree2[i2].children[j2].children[z2].selector).nth( tree[i].children[j].childsCount + z2)								
										await t.click(sel2)
										await Helper.delReport()
 									}

								}
						}
					}
				}
		}
	}

}
);
