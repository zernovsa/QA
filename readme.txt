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