import * as assert from "assert";

function fizzbuzz(number: number) {
    if (number % 15 == 0)
    {
        return "FizzBuzz";
    }
    if (number % 3 == 0)
    {
        return "Fizz";
    }
    if (number % 5 == 0)
    {
        return "Buzz";
    }
    return number.toString();
}

describe("FizzBuzz", function() {
    it('should say 1 for 1', function() {
        // Arrange-Act-Assert

        let actual = fizzbuzz(1);
        assert.strictEqual(actual, "1");
    })
    it('should say 2 for 2', function() {
        // Arrange-Act-Assert

        let actual = fizzbuzz(2);
        assert.strictEqual(actual, "2");
    })
    it('should say Fizz for 3', function() {
        // Arrange-Act-Assert

        let actual = fizzbuzz(3);
        assert.strictEqual(actual, "Fizz");
    })
    it('should say 4 for 4', function() {
        // Arrange-Act-Assert

        let actual = fizzbuzz(4);
        assert.strictEqual(actual, "4");
    })
    it('should say 5 for Buzz', function() {
        // Arrange-Act-Assert

        let actual = fizzbuzz(5);
        assert.strictEqual(actual, "Buzz");
    })
    it('should say Fizz for 6', function() {
        // Arrange-Act-Assert

        let actual = fizzbuzz(6);
        assert.strictEqual(actual, "Fizz");
    })
    it('should say 7 for 7', function() {
        // Arrange-Act-Assert

        let actual = fizzbuzz(7);
        assert.strictEqual(actual, "7");
    })
    it('should say 8 for 8', function() {
        // Arrange-Act-Assert

        let actual = fizzbuzz(8);
        assert.strictEqual(actual, "8");
    })
    it('should say Fizz for 9', function() {
        // Arrange-Act-Assert

        let actual = fizzbuzz(9);
        assert.strictEqual(actual, "Fizz");
    })
    it('should say FizzBuzz for 15', function() {
        // Arrange-Act-Assert

        let actual = fizzbuzz(15);
        assert.strictEqual(actual, "FizzBuzz");
    })
})
