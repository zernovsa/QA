test('ca_r6.8.0_secondNestingFilters_withAllFirstNestings', async () => {

        await t.setTestSpeed(1);
        await Helper.login();

        await Helper.addSite();
        await t.click(Selectors.getView('Общие отчёты'))
        await t.click(Selectors.getViewItem('Анализ трафика'))

        var tree = await Helper_local.firstNestingTree(0)

        //Начинаем кликать по дереву

        for (var i = 0; i < tree.length; i++) {
            for (var j = 0; j < tree[i].childsCount; j++) {
                if (tree[i].children[j].childsCount == 0) {
                    await Helper_local.addReport()
                    var s1 = Selector(tree[i].selector).nth(i)
                    await t.click(s1)
                    var s2 = Selector(tree[i].children[j].selector).nth(j)
                    await t.click(s2)

                    	await secondNestingFilters('', '', '', 1)

                    await Helper_local.delReport()
                }
                else {
                    for (var z = 0; z < tree[i].children[j].childsCount; z++) {
                        await Helper_local.addReport()
                        if (i == 2) {
                            var s2 = Selector(tree[i].selector).nth(i + j + 4)
                        }
                        else var s2 = Selector(tree[i].selector).nth(i + j + 1)
                        await t.click(s2)
                        var s3 = Selector(tree[i].children[j].children[z].selector).nth(z)

    	                    await secondNestingFilters('', '', '', 1)

                        await t.click(s3)
                        await Helper_local.delReport()
                    }
                }

            }
        }


        

    }
);