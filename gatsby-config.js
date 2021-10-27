module.exports = {
  siteMetadata: {
    title: `OPML Notes Demo`,
    titleTemplate: `%s - OPML Notes Demo`,
    description: `Site generated from Little Outliner OPML`,
    author: `Andrew Shell`,
    twitterUsername: `@andrewshell`,
    siteUrl: 'http://localhost:8000',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-opmlnote`,
      options: {
        url: `http://lo2.geekity.com/andrewshell/electric/hello.opml`,
        name: 'posts',
        timezone: 'America/Chicago'
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: []
      }
    },
    'gatsby-source-instance-name-for-remark',
  ],
}
