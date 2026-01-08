.PHONY: help
help: ## Show this help
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install
	@npm install
	@hugo mod get -u

cache: ## Clean the cache
	@hugo --gc
	@hugo gen chromastyles --style=catppuccin-frappe > assets/code-highlight.css

clean: cache gomodule ## Clean the directory of the project of cache e meta file and other things
	@find . -type d -empty -delete

.PHONY: run
run:  ## Build the site for showing
	@hugo server --disableFastRender --renderToMemory

.PHONY: gomodule
gomodule: ## Update Go Module
	@hugo mod get -u ./...
	@hugo mod tidy
	@hugo mod get -u

update: clean ## Update the site requirements
	@npm update


hugo: ## Run the site local
	@hugo server --disableFastRender --renderToMemory

develop: ## Run the site local
	@hugo server --disableFastRender --renderToMemory

developfuture: ## Run the site local with all the future article
	@hugo server --disableFastRender --buildFuture --renderToMemory

developall: ## Run the site local with all the article, future or drafts
	@hugo server --disableFastRender --buildFuture --buildDrafts --renderToMemory

.PHONY: build
build: clean ## Build for dev
	@hugo mod get -u
	@hugo

deploy: update characters meet webmention syndication## Ready to deploy
	@hugo --minify

broadcast: clean ## broadcast the site
	@hugo server --disableFastRender --buildFuture --buildDrafts -bind=0.0.0.0

deploy_prod: ## Ready to deploy
	@npm update
	@hugo mod get -u
	@hugo --minify


.PHONY: submodule
submodule: ## Get submodule for this repo
	git submodule update --init --recursive
