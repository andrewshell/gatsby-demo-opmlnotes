const dayjs = require('dayjs'),
  path = require('path');

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
    let created = dayjs(node.frontmatter.created),
      timeid = 'a' + created.format('HHmmss'),
      slug = (node.frontmatter || {}).slug || (node.frontmatter.title === '' ? timeid : slugify(node.frontmatter.title)),
      date = created.format('YYYY-MM-DD');

    actions.createNodeField({
      node,
      name: `date`,
      value: date
    });

    actions.createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  }
}

exports.createPages = ({ graphql, actions }) => {
  return new Promise((resolve, reject) => {
    const indexPages = {};

    graphql(`{
      allMarkdownRemark {
        edges {
          node {
            fields {
              sourceInstanceName,
              slug,
              date
            }
            frontmatter {
              created
            }
          }
        }
      }
    }`).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        if (!indexPages[node.fields.date]) {
          actions.createPage({
            path: node.fields.date,
            component: path.resolve(`./src/templates/${node.fields.sourceInstanceName}-date.js`),
            context: {
              date: node.fields.date
            },
          });
          indexPages[node.fields.date] = true;
        }

        actions.createPage({
          path: `${node.fields.date}/${node.fields.slug}`,
          component: path.resolve(`./src/templates/${node.fields.sourceInstanceName}.js`),
          context: {
            slug: node.fields.slug,
            date: node.fields.date
          },
        });
      })
      resolve();
    })
  })
}

function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}
