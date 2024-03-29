[![Build Status](https://travis-ci.org/MikeMcl/bignumber.js.svg)](https://travis-ci.org/MikeMcl/bignumber.js)

# bignumber.js #

A JavaScript library for arbitrary-precision decimal and non-decimal arithmetic.  

*Note: This is version 2 of the library, for version 1.x.x see the tagged releases or switch to the 'original' branch. The advantages of version 2 are that it is considerably faster for numbers with many digits and that there are a few added methods (see Change Log below). The disadvantages are more lines of code and increased code complexity, and the loss of simplicity in no longer having the coefficient of a BigNumber stored in base 10. The 'original' version will continue to be supported.*

## Features

  - Faster, smaller, and perhaps easier to use than JavaScript versions of Java's BigDecimal
  - 6 KB minified and gzipped
  - Simple API but full-featured
  - Works with numbers with or without fraction digits in bases from 2 to 64 inclusive
  - Replicates the `toExponential`, `toFixed`, `toPrecision` and `toString` methods of JavaScript's Number type
  - Includes a `toFraction` and a correctly-rounded `squareRoot` method
  - No dependencies
  - ECMAScript 3 compliant
  - Comprehensive [documentation](http://mikemcl.github.io/bignumber.js/) and test set

If an even smaller and simpler library is required see [big.js](https://github.com/MikeMcl/big.js/).
It's half the size but only works with decimal numbers and only has half the methods.
It also does not allow `NaN` or `Infinity`, or have the configuration options of this library.  
See also [decimal.js](https://github.com/MikeMcl/decimal.js/).

## Load

The library is the single JavaScript file *bignumber.js* (or minified, *bignumber.min.js*).

It can be loaded via a script tag in an HTML document for the browser

    <script src='./relative/path/to/bignumber.js'></script>

or as a CommonJS, [Node.js](http://nodejs.org) or AMD module using `require`.

For Node, put the *bignumber.js* file into the same directory as the file that is requiring it and use

    var BigNumber = require('./bignumber.js');

or put it in a *node_modules* directory within the directory and use `require('bignumber.js')`.

The library is also available from the [npm](https://npmjs.org/) registry, so

    $ npm install bignumber.js

will install this directory in a *node_modules* directory within the current directory.  

To load with AMD loader libraries such as [requireJS](http://requirejs.org/):

    require(['path/to/bignumber'], function(BigNumber) {  
        // Use BigNumber here in local scope. No global BigNumber.
    });

## Use

*In all examples below, `var`, semicolons and `toString` calls are not shown.
If a commented-out value is in quotes it means `toString` has been called on the preceding expression.*

The library exports a single function: BigNumber, the constructor of BigNumber instances.
It accepts a value of type Number *(up to 15 significant digits only)*, String or BigNumber Object,

    x = new BigNumber(123.4567)
    y = BigNumber('123456.7e-3')                     // 'new' is optional
    z = new BigNumber(x)
    x.equals(y) && y.equals(z) && x.equals(z)        // true

and a base from 2 to 64 inclusive can be specified.

    x = new BigNumber(1011, 2)           // "11"
    y = new BigNumber('zz.9', 36)        // "1295.25"
    z = x.plus(y)                        // "1306.25"

A BigNumber is immutable in the sense that it is not changed by its methods.  

    0.3 - 0.1                     // 0.19999999999999998  
    x = new BigNumber(0.3)
    x.minus(0.1)                  // "0.2"
    x                             // "0.3"

The methods that return a BigNumber can be chained.

    x.dividedBy(y).plus(z).times(9).floor()
    x.times('1.23456780123456789e+9').plus(9876.5432321).dividedBy('4444562598.111772').ceil()

Many method names have a shorter alias.

    x.squareRoot().dividedBy(y).toPower(3).equals(x.sqrt().div(y).pow(3))         // true
    x.cmp(y.mod(z).neg()) == 1 && x.comparedTo(y.modulo(z).negated()) == 1        // true

Like JavaScript's Number type, there are `toExponential`, `toFixed` and `toPrecision` methods

    x = new BigNumber(255.5)
    x.toExponential(5)              // "2.55500e+2"
    x.toFixed(5)                    // "255.50000"
    x.toPrecision(5)                // "255.50"
    x.toNumber()                    // 255.5

 and a base can be specified for `toString`.

    x.toString(16)        // "ff.8"

There is also a `toFormat` method which may be useful for internationalisation

    y = new BigNumber('1234567.898765')
    y.toFormat(2)                   // "1,234,567.90"

The maximum number of decimal places of the result of an operation involving division (i.e. a division, square root, base conversion or negative power operation) is set using the `config` method of the `BigNumber` constructor.
The other arithmetic operations always give the exact result.

    BigNumber.config({ DECIMAL_PLACES: 10, ROUNDING_MODE: 4 })
    // Alternatively, BigNumber.config( 10, 4 );

    x = new BigNumber(2);
    y = new BigNumber(3);
    z = x.div(y)                 // "0.6666666667"
    z.sqrt()                     // "0.8164965809"
    z.pow(-3)                    // "3.3749999995"
    z.toString(2)                // "0.1010101011"
    z.times(z)                   // "0.44444444448888888889"
    z.times(z).round(10)         // "0.4444444445"

There is a `toFraction` method with an optional *maximum denominator* argument

    y = new BigNumber(355)
    pi = y.dividedBy(113)        // "3.1415929204"
    pi.toFraction()              // [ "7853982301", "2500000000" ]
    pi.toFraction(1000)          // [ "355", "113" ]

and `isNaN` and `isFinite` methods, as `NaN` and `Infinity` are valid `BigNumber` values.

    x = new BigNumber(NaN)                                           // "NaN"
    y = new BigNumber(Infinity)                                      // "Infinity"
    x.isNaN() && !y.isNaN() && !x.isFinite() && !y.isFinite()        // true

The value of a BigNumber is stored in a decimal floating point format in terms of a coefficient, exponent and sign.

    x = new BigNumber(-123.456);
    x.c                            // [ 123, 45600000000000 ]  coefficient (i.e. significand)
    x.e                            // 2                        exponent
    x.s                            // -1                       sign

For futher information see the [API](http://mikemcl.github.io/bignumber.js/) reference from the *doc* folder.

## Test

The *test* directory contains the test scripts for each method.

The tests can be run with Node or a browser. For Node use

    $ npm test

or

    $ node test/every-test

To test a single method

    $ node test/toFraction

For the browser, see *every-test.html* and *single-test.html* in the *test/browser* directory.  

*bignumber-vs-number.html* enables some of the methods of bignumber.js to be compared with those of JavaScript's Number type.  

## Performance

The *perf* directory contains two applications and a *lib* directory containing the BigDecimal libraries used by both.

*bignumber-vs-bigdecimal.html* tests the performance of bignumber.js against the JavaScript translations of two versions of BigDecimal, its use should be more or less self-explanatory.
(The GWT version doesn't work in IE 6.)  

* GWT: java.math.BigDecimal
<https://github.com/iriscouch/bigdecimal.js>
* ICU4J: com.ibm.icu.math.BigDecimal
<https://github.com/dtrebbien/BigDecimal.js>

The BigDecimal in Node's npm registry is the GWT version. Despite its seeming popularity I have found it to have some serious bugs, see the Node script *perf/lib/bigdecimal_GWT/bugs.js* for examples of flaws in its *remainder*, *divide* and *compareTo* methods.

*bigtime.js* is a Node command-line application which tests the performance of bignumber.js against the GWT version of BigDecimal from the npm registry.  

For example, to compare the time taken by the bignumber.js `plus` method and the BigDecimal `add` method:  

    $ node bigtime plus 10000 40

This will time 10000 calls to each, using operands of up to 40 random digits and will check that the results match.

For help:

    $ node bigtime -h

See the README in the directory for more information.

## Build

I.e. minify.

For Node, if uglify-js is installed globally ( `npm install uglify-js -g` ) then

    npm run build

will create *bignumber.min.js*.

## Feedback

Open an issue, or email  

Michael
<a href="mailto:M8ch88l@gmail.com">M8ch88l@gmail.com</a>

Bitcoin donation  
**1CauoGYrEoJFhcyxGVaiLTE6f3WCaSUjnm**  
Thank you

## Licence

MIT.

See LICENCE.

## Change Log

####2.0.0
* 29/12/2014
* Add `dividedToIntegerBy`, `isInteger` and `toFormat` methods.
* Remove the following short-forms: `isF`, `isZ`, `toE`, `toF`, `toFr`, `toN`, `toP`, `toS`.
* Store a BigNumber's coefficient in base 1e14, rather than base 10.
* Add fast path for integers to BigNumber constructor.
* Incorporate the library into the online documentation.

####1.5.0
* 13/11/2014
* Add `toJSON` and `decimalPlaces` methods.

####1.4.1
* 08/06/2014
* Amend README.

####1.4.0
* 08/05/2014
* Add `toNumber`.

####1.3.0
* 08/11/2013
* Ensure correct rounding of `sqrt` in all, rather than almost all, cases.
* Maximum radix to 64.

####1.2.1
* 17/10/2013
* Sign of zero when x < 0 and x + (-x) = 0.

####1.2.0
* 19/9/2013
* Throw Error objects for stack.

####1.1.1
* 22/8/2013
* Show original value in constructor error message.

####1.1.0
* 1/8/2013
* Allow numbers with trailing radix point.  

####1.0.1
* Bugfix: error messages with incorrect method name

####1.0.0
* 8/11/2012
* Initial release
