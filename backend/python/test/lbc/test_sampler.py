'''
Created on 3 juin 2019

@author: neo
'''
import unittest
from lbc.signal import toFrequencies
from lbc.palier import Palier


class Test(unittest.TestCase):

	def testToSignal(self):
		
		signal = [[1, False], [2, False], [3, True], [4, True]]
		expected_frequencies = [Palier(s, e, v) for (s, e, v) in ([1, 3, False], [3, 4, True])]
		result = toFrequencies(signal, Palier)
		self.assertSequenceEqual(result, expected_frequencies)
		print(result[0], result[0].duration)


if __name__ == "__main__":
	#import sys;sys.argv = ['', 'Test.testToSignal']
	unittest.main()