���������� ���������� npm
	������ https://nodejs.org/en/download/
���������� ���������� testcafe
	npm install -g testcafe
	npm install dateformat (��������� � ����� ./testcafe)
������ ����� ��������
	testcafe chrome ca_r6.7.0_getstore.js 
������ ���� ������ ������������
	testcafe chrome ./tests/
������ ������ �� ����������� 
	testcafe chrome click_all_reports.js --screenshots ../../screenshots
������ ������ �� ����������� � �� ���������� ��� �������
	testcafe chrome ca_r6.8.0_visitorsource.js --screenshots ../../screenshots --screenshots-on-fails 
������ ������ � ��������� ���������
	testcafe remote ca_r6.8.0_visitorsource.js
������ ���������� ����� �� �����
	testcafe chrome ca_r6.8.0_visitorsource.js --screenshots ../../screenshots --screenshots-on-fails ../../screenshots -t ca_r6.8.0_visitorsource
	testcafe chrome ca_r6.8.0_visitorsource.js --screenshots ../../screenshots --screenshots-on-fails ../../screenshots -t ca_r6.8.0_visitorsource_secondNesting

������ ����������� �����
testcafe "chrome --headless --remote-debugging-port=9330 -user-agent='\"Mozilla/5.0 (X11; Linux x86_64^^^) AppleWebKit/537.36 (KHTML, like Gecko^^^) Chrome/60.0.3112.50 Safari/537.36\"'"
testcafe "chrome --window-size='1920,1080' --headless --remote-debugging-port=9330 -user-agent='\"Mozilla/5.0 (X11; Linux x86_64^^^) AppleWebKit/537.36 (KHTML, like Gecko^^^) Chrome/60.0.3112.50 Safari/537.36\"'" ia-tests.js
����������� � ���� http://localhost:9330
���� ����� ���� �����