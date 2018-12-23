lint:
	yarn tslint -c tslint.json 'app/**/*.ts*'

deploy:
	yarn build
	scp index.html castles.css .htaccess dist/bundle-castles.js favicon.ico golfsinteppadon.com:/var/www/madcastles.com

deploy-images:
	ssh golfsinteppadon.com "mkdir /var/www/madcastles.com/public"
	scp public/* golfsinteppadon.com:/var/www/madcastles.com/public
