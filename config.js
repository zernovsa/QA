export const test_link = "https://ca2.webdev.uiscom.ru"
export const username  = "qa@uiscom.ru"
export const password  = ">bcrjvRjvtl;br"

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