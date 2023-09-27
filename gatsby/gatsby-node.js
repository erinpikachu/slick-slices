import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each pizza and create a page for the pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`, // the url
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const toppingsTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. Query all Toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `);
  // 3. create page for that topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`, // the url
      component: toppingsTemplate,
      context: {
        topping: topping.name,
        // TODO regex for topping
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
  // Pass topping to Pizza.js
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // 1. fetch a list of beers
  const res = await fetch('https://api.sampleapis.com/beers/ale');
  const beers = await res.json();
  // 2. loop over each one
  for (const beer of beers) {
    // create a node for each beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    // 3. create a node for that beer
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

export async function sourceNodes(params) {
  // fetch a list of beers and source them into our gatsbr API
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // Create Pages dynamically
  // wait for all pomises to be resolved before finishing  this function
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ]);
  // 1. Pizzas
  // 2. Toppings
  // 3. Slicemasters
}
