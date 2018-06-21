import {t, Selector} from 'testcafe';
import * as Selectors from '../selectors/ca_r6.7.0_selectors.js';
import {username, password} from '../config.js';


export async function getClick (t) {
    await t.click('.new-btn');
}

export const addReport = async () => {
    const reportCount = await Selectors.getReportCount()
    if (reportCount < 15) {
        await t
        .click(Selectors.getAddReport)
        // .click(getPencil)
        // .wait(1000)
        // .pressKey('delete')
        // .wait(1000)
        // .typeText(getReportInput, 'Report-'+getRandomInt(10000,99999))
        // .wait(1000)
        // .click(getPencil)
        // .wait(1000)
    }
    else {
    }
}

export const clickToTabIndex = async (tabIndex) => {
    await t.click(Selector('*[class*="x-tab-inner"]:not([data-ref="btnInnerEl"])').nth(tabIndex))
}

export const clickToTabName = async (tabName) => {
    await t.click(Selector('*[class*="x-tab-inner"][id*="btnInnerEl"]').withText(tabName));
}


export const delReport = async () => {
    const elNumber = await Selectors.getReportCount() - 1
    await t.click(Selector('*[class*="x-tab-inner"]:not([data-ref="btnInnerEl"])').nth(elNumber))
    await t.click(Selector('span.x-tab-edit-btn-inner').nth(elNumber))
    await t.click(Selector('span.ul-btn-usual-icon-cls-remove').nth(0))
}

export const firstNestingTree = async (storeIndex) => {
    
    var firstNesting = [1, 2, 6, 10];
    var tree         = [];

    var storeElCount = await Selectors.getStoreElCount.with({
        dependencies: {
            name: Selectors.storeName,
            storeIndex : storeIndex
        }
    })();

    console.log('Всего элементов первой вложенности в store: ' + storeElCount)

    for (var i = 0; i < firstNesting.length; i++) {
        tree.push({ id: firstNesting[i], selector: Selectors.getFirstNestingMoreTree })

        var elCount = await Selectors.getFirstNestElCount.with({
            dependencies: {
                name:  Selectors.storeName,
                index: firstNesting[i],
                storeIndex : storeIndex
            }
        })();

        tree[i].childsCount = elCount

        var elText   = await Selectors.getFirstNestElText.with({
            dependencies: {
                name:  Selectors.storeName,
                index: firstNesting[i],
                storeIndex : storeIndex
            }
        })();
        tree[i].text = elText
    }

    for (var i = 0; i < tree.length; i++) {

        tree[i].children = []

        for (var j = 0; j < tree[i].childsCount; j++) {
            var elText = await Selectors.getSecondNestElText.with({
                dependencies: {
                    name:   Selectors.storeName,
                    index1: tree[i].id,
                    index2: j,
                    storeIndex : storeIndex
                }
            })();

            var childsCount = await Selectors.getSecondNestElChildCount.with({
                dependencies: {
                    name:   Selectors.storeName,
                    index1: tree[i].id,
                    index2: j,
                    storeIndex : storeIndex
                }
            })();

                //выбираем селектор второй вложенности в зависимости от наличия потомков
                if (childsCount == 0) tree[i].children.push({
                    id:          j,
                    text:        elText,
                    selector:    Selectors.getSubChildItem,
                    childsCount: childsCount
                })
                    else {
                        tree[i].children.push({
                            id:          j,
                            text:        elText,
                            selector:    Selectors.getFirstNestingMoreTree,
                            childsCount: childsCount
                        })
                        tree[i].children[j].children = []
                        for (var z = 0; z < tree[i].children[j].childsCount; z++) {

                            var elText = await Selectors.getThirdNestElText.with({
                                dependencies: {
                                    name:   Selectors.storeName,
                                    index1: tree[i].id,
                                    index2: j,
                                    index3: z,
                                    storeIndex : storeIndex
                                }
                            })();

                            tree[i].children[j].children.push({
                                id:       z,
                                text:     elText,
                                selector: Selectors.getSubChildItem
                            })
                        }
                    }
                }
            }

        //Вывод дерева
        console.log('Дерево: ')
        for (var i = 0; i < firstNesting.length; i++) {
            console.log(tree[i])
        }


        return tree
    }