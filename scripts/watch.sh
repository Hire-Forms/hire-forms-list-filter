#!/bin/sh

node_modules/.bin/watchify src/index.jsx \
	--detect-globals false \
	--extension=.jsx \
	--external react \
	--external react-dom \
	--external classnames \
	--outfile 'derequire > build/index.js' \
	--standalone HireFormsTextarea \
	--transform [ babelify ] \
	--verbose
