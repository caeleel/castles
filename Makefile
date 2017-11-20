make lint:
	yarn tslint -c tslint.json 'app/**/*.ts*'

deploy:
	yarn build
	scp index.html castles.css pieces.json .htaccess dist/bundle-castles.js dist/bundle-castles.js.map favicon.ico golfsinteppadon.com:madcastles.com
