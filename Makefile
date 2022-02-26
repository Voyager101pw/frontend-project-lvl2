install:
	npm ci

publish:
	npm publish --dry-run

link:
	npm link

lint:
	npx eslint .

gendiff:
	node bin/gendiff.js ${path1} ${path2}

start:
	node bin/gendiff.js -h
