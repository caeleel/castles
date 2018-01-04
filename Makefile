make lint:
	yarn tslint -c tslint.json 'app/**/*.ts*'

deploy:
	yarn build
	scp index.html castles.css pieces.json .htaccess dist/bundle-castles.js favicon.ico golfsinteppadon.com:madcastles.com
