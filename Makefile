build_prod:
	yarn build:prod
	cp -R package.json ../fe-deploy
	cp -R out ../fe-deploy

# build_staging:
# 	yarn build:staging
# 	cp -R package.json ../fe-deploy
# 	cp -R out ../fe-deploy

build_dev:
	yarn build:dev
	cp -R package.json ../fe-deploy
	cp -R out ../fe-deploy

build_staging:
	yarn build:staging
	cp -R package.json ../fe-deploy-2
	cp -R out ../fe-deploy-2