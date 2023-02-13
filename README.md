# node-api-boilerplate

## Getting Started ⚡️

### Creating a new project from the template

1. Create a new repository using this template
2. Clone your newly created repo locally
3. If you're setting up a new repo, run `make init`
4. Run `npm run dev` and your new project should start responding to HTTP requests on port 3001 🏆

### Initialisation Options

When you run `make init` you will be asked a series of questions which will bootstrap your project for you.

"What do you want the service to be called?" - It should generally match the repository name.

"Do you need a GraphQL Server?" - if you enter 'y', a runnable GraphQL server will be provided out of the box.

"Do you need a MongoDB Connection?" - if you enter 'y', bootstrapping for MongoDB will be provided out of the box.

"Will your service deploy with Github Actions" - if you enter 'y', the service will be bootstrapped for deployment with GitHub Actions.

### Starting the service

- `npm run dev`

## Assumptions and Requirements

Your machine has the following installed:

- Node v14+
- nvm (_optional_)
- [Make](https://www.gnu.org/software/make/manual/make.html) (_optional_)

## Install dependencies

First, **ensure you're running node version 14**, you may use a tool like [nvm](https://github.com/nvm-sh/nvm) to manage this, which allows you to set your node version by using the following command:

`nvm use 14`

Once you're happy that you're running on the expected node version, you can **install the packages** by running the following command.

Run: `npm i`

#### TODO

- Mongo Seeding
