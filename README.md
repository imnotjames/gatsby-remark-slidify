# gatsby-remark-slidify

This is a plugin for [`gatsby-transformer-remark`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark), which is in turn a plugin for [GatsbyJS](https://www.gatsbyjs.org/).

This plugin mutates the markdown of files with a specified frontmatter key (default `reveal`) to allow them to be used
with [reveal.js](https://revealjs.com/), the HTML presentation framework.

When using this plugin you'll be using Gatsby's Markdown engine, `remark`, instead of the one provided by `reveal.js`,
`marked`.

## Installation

```bash
# npm:
npm install gatsby-remark-slidify
# or yarn:
yarn add gatsby-remark-slidify
```

## Usage:

If you haven't already installed [`gatsby-transformer-remark`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark), you should install it.

Then in your `gatsby-config.js`, add this plugin to the list of plugins for `gatsby-transformer-remark`.

```javascript
module.exports = {
  // other configs ...
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-slidify',
            options: {
              key: 'reveal',
              revealOptions: {
                transition: "fade"
              }
            }
          },
          // ... other plugins ...
        ]
      }
    }
  ]
}
```

At this point you should be able to create a markdown slide such as

```markdown
---
reveal: true
---

# Hello World
## This is my First Slide

Note:
These are the notes for my slide and won't show up during presentation.

---

# Hello Reveal.js
## This is my Second Slide

+++

This is a vertical slide that occurs below the `Hello Reveal.js` slide.

```

## Configuration

This plugin merges the plugin option `revealOptions` as well as the `reveal` frontmatter key
and should pass them to the [`reveal.js constructor`](https://github.com/hakimel/reveal.js#configuration).

## License

MIT License

Copyright (c) 2020 James Ward