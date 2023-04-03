import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  pathPrefix: '/pizza',
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: 'https://gatsby.pizza',
    description: 'The best pizza place in Hamilton!',
    twitter: '@slicksSlices',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      // this is the name of the plugin you are adding
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'qoelpaq8',
        dataset: 'production',
        watchMode: true,
        token:
          'skFHgDpv5wauZmTpT6w1zuqhfHQD6F9jsBqHSS8UFZphmwXAHnwMRPB4LCM3aExVxaa2YmJdAI5Va2EbOP5D4N4d2On5q45FQi0UfMckkk1D3wr8hFtyh9p8hkWwPZ2ItljFukme2xAkJd7FL7OB4zE7QPYTMYtI4xV98WM3xxCeom7LO82X',
      },
    },
  ],
};
