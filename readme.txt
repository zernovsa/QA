Необходимо установить npm
	Ссылка https://nodejs.org/en/download/
Необходимо установить testcafe
	npm install -g testcafe
	npm install dateformat (выполнить в папке ./testcafe)
Запуск теста командой
	testcafe chrome ca_r6.7.0_getstore.js 
Запуск всех тестов одновременно
	testcafe chrome ./tests/
Запуск тестов со скриншотами 
	testcafe chrome click_all_reports.js --screenshots ../../screenshots