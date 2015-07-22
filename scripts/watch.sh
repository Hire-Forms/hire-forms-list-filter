#!/bin/sh

node_modules/.bin/watchify src/index.jsx \
	--detect-globals false \
	--extension=.jsx \
	--external react \
	--outfile 'derequire > build/index.js' \
	--standalone HireFormsTextarea \
	--transform [ babelify --plugins object-assign ] \
	--verbose