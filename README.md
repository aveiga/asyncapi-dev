# AsyncAPI dev setup

## Setup

* clone the repo
* run `npm install` to install all dev dependencies

## How to develop and generate HTML documentation

* run `npm run dev:html` to start the dev server
* in your browser, go to `http://localhost:8080`
* write your AsyncAPI spec in the `./api/api.yml` file

## How to develop and generate Markdown documentation

* run `npm run dev:md` to start the dev server
* the markdown will be generated and continously updated in the `./docs/md/asyncapi.md`
* write your AsyncAPI spec in the `./api/api.yml` file