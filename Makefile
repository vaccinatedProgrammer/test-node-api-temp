GRAPHQL ?= $(shell bash -c 'read -p "Do you need a GraphQL Server? (y/N) " graphql; echo $$graphql')
MONGO ?= $(shell bash -c 'read -p "Do you need a MongoDB Connection? (y/N) " mongo; echo $$mongo')
GITHUB_ACTIONS ?= $(shell bash -c 'read -p "Will your project deploy with GitHub Actions? (y/N) " githubActions; echo $$githubActions')

# Initialise a new project from the template

init:
	@if [ "$(GRAPHQL)" = "y" ]; then \
		git grep -l '\/\* graphql-start \*\/' | xargs sed -i -e '/\/\* graphql-start \*\//d' ;\
		git grep -l '\/\* graphql-end \*\/' | xargs sed -i -e '/\/\* graphql-end \*\//d' ;\
	else \
		git grep -l '\/\* graphql-start \*\/' | xargs sed -i -e '/\/\* graphql-start \*\//,/\/\* graphql-end \*\//d' ;\
		rm -rf src/data-sources src/schema infrastructure/utilities/graphql ;\
		npm uninstall graphql graphql-voyager @graphql-tools/merge @graphql-tools/schema apollo-server-express apollo-datasource-rest apollo-server-errors  ;\
	fi
	@if [ "$(MONGO)" = "y" ]; then \
		git grep -l '\/\* mongo-start \*\/' | xargs sed -i -e '/\/\* mongo-start \*\//d' ;\
		git grep -l '\/\* mongo-end \*\/' | xargs sed -i-e '/\/\* mongo-end \*\//d' ;\
	else \
		git grep -l '\/\* mongo-start \*\/' | xargs sed -i -e '/\/\* mongo-start \*\//,/\/\* mongo-end \*\//d' ;\
		rm -rf infrastructure/utilities/mongodb src/database ;\
		npm uninstall mongoose mongodb-memory-server ;\
	fi
	@if [ "$(GITHUB_ACTIONS)" != "y" ]; then \
		rm .github/workflows/main.yaml ;\
	fi
	rm -rf .git ;\
	git init ;\
	git add . ;\
	git commit -m "Feat (init)" ;\
	npm i ;\
	npm run test
	@echo All done and ready to go ✅ 🎉
.PHONY: init
