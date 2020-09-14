'''
Created on 3 juin 2019

@author: neo
'''
import unittest
from alfred.lbc.log_parser import get_date, parse_log
from datetime import datetime, timedelta
from dateutil.tz.tz import tzlocal


class TestLogParser(unittest.TestCase):


	def testParseDate(self):
		dt = "Tue May 28 13:10:00 CEST 2019"
		self.assertEqual(get_date(dt), datetime(2019, 5, 28, 13, 10, 0).replace(tzinfo=tzlocal()))
		
	def testParseLog(self):
		res=parse_log("/tmp/lbc.log")
		duration_ok = sum([p.duration for p in res if p.value], timedelta(0))
		for p in [p for p in res]:
			print(p[2], p.duration)
		duration_nok = sum([p.duration for p in res if not p.value], timedelta(0))
		print(duration_ok.days, duration_ok.seconds)
		print(duration_nok.days, duration_nok.seconds)


if __name__ == "__main__":
	#import sys;sys.argv = ['', 'Test.testName']
	unittest.main()