# Luna-Backend-intervew

Please build the backend boilerplate project for NFT metadata([use opensea metadata standard](https://docs.opensea.io/docs/metadata-standards)) server using node.js/typescript.

For database, plz use the PostgreSQL and Knex.js(NPM package that can intereact with sql).

Backend should have CRUD functions for metadata.

No authentication needed.

Please fork this repo and send forked repo url once it's done.


## How to Start Project Locally

- Clone the [repository](git+https://github.com/DahKulEhmbeey/luna-backend-code-interview.git).
- Ensure you have `Node >=v14` installed
- Ensure you have `yarn` or `npm` installed.
- Run `yarn install`
- Run `yarn migrate` to run the migrations
- Provide PostgreSQL database credentials and other config in a `.env` file. `sample.env` file is a good reference
- To start the API server locally, run `yarn start:dev` in the project root directory.
- To run the tests: run `yarn test`

## Documentation
Postman collection [here](https://www.getpostman.com/collections/f184c623bdc7e8754e26)
