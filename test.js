import { t, Selector, ClientFunction } from 'testcafe';

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

const addSite = async () => {
    await t
    	.click(getAddSite)
    	.wait(1000)
 		.typeText(siteName, 'test-'+getRandomInt(1,9999999)+'.ru')
		.wait(1000)
 		.typeText(phoneNumber, '7'+getRandomInt(1000000000,9999999999))
    	.wait(1000)
		.click(siteTypePicker)
		.wait(1000)
		.click(boundListItem1)
		.wait(1000)
		.click(siteBranch)
		.wait(1000)
		.click(boundListItem2('Авто, мото'))
		.wait(1000)
		.click(saveSiteButton)
		.wait(1000)
}

const addReport = async () => {
	const reportCount = await getReportCount()
   	if (reportCount<15)
   	{
       	await t
       		.click(getAddReport)
       		.wait(1000)
			.click(getPencil)
			.wait(1000)
			.pressKey('delete')
			.wait(1000)
			.typeText(getReportInput, 'Report-'+getRandomInt(10000,99999))
			.wait(1000)
			.click(getPencil)
			.wait(1000)
	}
}

const clickToReport = async () => {
	const elNumber = await getReportCount() - 1
	await t.click(Selector('*[class*="x-tab-inner"]:not([data-ref="btnInnerEl"])').nth(elNumber))
	await t.wait(1000);	
}

const delReport = async () => {
	const elNumber = await getReportCount() - 1
	await t.hover(getAddSite)
	await t.wait(1000);
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
const groupCount = ClientFunction(() => document.querySelectorAll ('img.x-tree-expander:not([role="presentation"])').length)

const getChildItem = Selector ('img.x-tree-elbow-line:not([role="presentation"])')
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

test('test', async () => {
   
	await login();
 	await t.wait(1000);

	// await addSite();

	await t.click(getView('Общие отчёты'))
	await t.wait(1000);
    await t.click(getViewItem('Анализ трафика'))
    await t.wait(1000);
	await addReport()

	const iCount = await groupCount()

    for (var i=0;i<iCount;i++)
    {
    	if (i==2||i==3)
    	{
    		await addReport()
	  		await t.wait(1000);
			await t.click(getMore.nth(i))
    		await t.wait(1000);

    		const i2Count = await subGroupCount();

    		for (var i2=0;i2<i2Count;i2++) 
 			{
   				if(i2==0)
   				{
   					await t.click(getMore.nth(i+i2+1))
    				await t.wait(1000);
				}
				else
				{
					await addReport()
	  				await t.wait(1000);
					await t.click(getMore.nth(i))
    				await t.wait(1000);
    				await t.click(getMore.nth(i+i2+1))
    				await t.wait(1000);
				}

				const i3Count = await subChildItemCount();

				for (var i3=0;i3<i3Count;i3++) 
				{
					if (i3!=0)
					{
						await addReport()						
	  					await t.wait(1000);
						await t.click(getMore.nth(i))
    					await t.wait(1000);
    					await t.click(getMore.nth(i+i2+1))
    					await t.wait(1000);+
    					await t.click(getSubChildItem.nth(i3))
						await t.wait(1000);
						await clickToReport()
						await delReport()
					}
					else
					{
						await t.click(getSubChildItem.nth(i3))
						await t.wait(1000);
						await clickToReport()
						await delReport()
					}
				}
    		}
    	}
    	else
    	{
			 if (i!=0) 	
				{
					await addReport()
	    			await t.wait(1000);

	    		}
	    		await t.click(getMore.nth(i))
    			await t.wait(1000);
				const jCount = await subGroupCount();
		   	for (var j=0;j<jCount;j++) 
   			{
   				const reportCount = await getReportCount();
   		  		if (j!=0) 
    				{
	    				await addReport()
	    				await t.wait(1000);
	    				await t.click(getMore.nth(i))
    					await t.wait(1000);
    				}
    			await t.click(getChildItem.nth(j))
				await t.wait(1000);		
				await clickToReport()
				//добавляем второе мзмерение

						for (var qwe=0;qwe<5;qwe++) 
						{

							if (qwe==0)
							{
								await t.click(add2Report.nth(1))
								await t.wait(1000);	
								await t.click(Selector('img.x-tree-elbow-line:not([role="presentation"])').nth(7+qwe))
								await t.wait(1000);	
							}
							else
							{

								if (i==0&j==0)
								{	
									await addReport()
		    						await t.wait(1000);
		    						await t.click(getMore.nth(i))
	    							await t.wait(1000);
	    							await t.click(getChildItem.nth(j))
									await t.wait(1000);		
									await clickToReport()
									await t.wait(1000);
									await t.click(add2Report.nth(1))
									await t.wait(1000);
									await t.click(Selector('img.x-tree-expander:not([role="presentation"])').nth(6))
									await t.wait(1000);	
									await t.click(Selector('img.x-tree-elbow-line:not([role="presentation"])').nth(7+qwe))
									await t.wait(1000);	
								}
								else 
								{
									await addReport()
		    						await t.wait(1000);
		    						await t.click(getMore.nth(i))
	    							await t.wait(1000);
	    							await t.click(getChildItem.nth(j))
									await t.wait(1000);		
									await clickToReport()
									await t.wait(1000);
									await t.click(add2Report.nth(1))
									await t.wait(1000);
									await t.click(Selector('img.x-tree-expander:not([role="presentation"])').nth(6))
									await t.wait(1000);	
									await t.click(Selector('img.x-tree-elbow-line:not([role="presentation"])').nth(7+qwe))
									await t.wait(1000);	
								}
							}
						}



				await delReport()
			}
		}
	}

});

