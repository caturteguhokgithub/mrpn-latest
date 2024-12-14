build_prod:
	yarn build:prod
	cp -R package.json /Users/ash/Documents/Work/Bappenas/mrpn/2024/source-v2/fe-deploy
	cp -R out /Users/ash/Documents/Work/Bappenas/mrpn/2024/source-v2/fe-deploy

build_staging:
	yarn build:staging
	cp -R package.json /Users/ash/Documents/Work/Bappenas/mrpn/2024/source-v2/fe-deploy
	cp -R out /Users/ash/Documents/Work/Bappenas/mrpn/2024/source-v2/fe-deploy

build_dev:
	yarn build:dev
	cp -R package.json /Users/ash/Documents/Work/Bappenas/mrpn/2024/source-v2/fe-deploy
	cp -R out /Users/ash/Documents/Work/Bappenas/mrpn/2024/source-v2/fe-deploy