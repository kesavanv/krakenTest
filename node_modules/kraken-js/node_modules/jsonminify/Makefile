all: jshint test

jshint:
	./node_modules/jshint/bin/jshint --config .jshintrc .

test:
	./node_modules/.bin/mocha -r should test/test-*.js

.PHONY: all jshint test
