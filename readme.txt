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
Запуск тестов со скриншотами и со скриншотом при падении
	testcafe chrome ca_r6.8.0_visitorsource.js --screenshots ../../screenshots --screenshots-on-fails 
Запуск тестов с удаленным браузером
	testcafe remote ca_r6.8.0_visitorsource.js
Запусе отдельного теста из файла
	testcafe chrome ca_r6.8.0_visitorsource.js --screenshots ../../screenshots --screenshots-on-fails ../../screenshots -t ca_r6.8.0_visitorsource
	testcafe chrome ca_r6.8.0_visitorsource.js --screenshots ../../screenshots --screenshots-on-fails ../../screenshots -t ca_r6.8.0_visitorsource_secondNesting