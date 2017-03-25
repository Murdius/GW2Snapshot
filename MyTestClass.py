import unittest

from wallet import wallet_id_to_name


class MyTestClass(unittest.TestCase):
    # initialization logic for the test suite declared in the test module
    # code that is executed before all tests in one test run
    @classmethod
    def setUpClass(cls):
        pass

    # clean up logic for the test suite declared in the test module
    # code that is executed after all tests in one test run
    @classmethod
    def tearDownClass(cls):
        pass

    # initialization logic
    # code that is executed before each test
    def setUp(self):
        pass

    # clean up logic
    # code that is executed after each test
    def tearDown(self):
        pass

    # test method
    def test_equal_numbers(self):
        name = wallet_id_to_name(1);
        print(name)
        self.assertEqual(name, "Coin")


# runs the unit tests in the module
if __name__ == '__main__':
    unittest.main()
