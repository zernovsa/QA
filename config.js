// export const test_link = "http://ca3.webdev.uiscom.ru/"
// export const site  = 'siteapp.webdev.uiscom.ru'
export const test_link = "http://app2.comagic.ru/"
export const site  = 'siteapp2.webdev.uiscom.ru'
export const username  = "qa@uiscom.ru"
export const password  = ">bcrjvRjvtl;br"

export function firstNestingTree() {
    let firstNesting = [1, 2, 6, 10]  
    return firstNesting
}

export function secondNestingTree(menu2) {
	var secondNesting=[]
	switch (menu2) {
        case 'Сквозная аналитика': {
        	secondNesting = [0, 1]
            break;
        }
        default: {
     		secondNesting = [0, 1, 2, 6, 10]
            break;
        }
      }
return secondNesting
}