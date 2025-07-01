---
layout: post.njk
title: "Welcome to My 11ty Blog"
date: 2024-01-01
excerpt: "This is my first blog post using 11ty static site generator."
---

# Welcome to My 11ty Blog

This is my first blog post using the 11ty static site generator. 11ty is a fantastic tool for creating fast, static websites with minimal configuration.

## What is 11ty?

11ty (Eleventy) is a simpler static site generator. It's built on JavaScript and supports multiple template languages including:

- Nunjucks
- Liquid
- Handlebars
- Markdown
- And many more!

## Getting Started

To get started with 11ty, you just need to install it and start writing content. The learning curve is gentle, and you can be up and running quickly.

Thanks for reading my first post!
```

```markdown:src/posts/2024-01-02-second-post.md
---
layout: post.njk
title: "Building Static Sites with 11ty"
date: 2024-01-02
excerpt: "Learn about the benefits of static site generation and why 11ty is a great choice."
---

# Building Static Sites with 11ty

Static site generators have become increasingly popular for good reasons. They offer excellent performance, security, and simplicity.

## Benefits of Static Sites

1. **Fast Loading**: No database queries or server-side processing
2. **Secure**: Minimal attack surface
3. **Scalable**: Easy to deploy on CDNs
4. **Version Control**: Your entire site can be version controlled

## Why Choose 11ty?

11ty stands out because:

- Zero config to get started
- Flexible templating options
- Great performance out of the box
- Active community and excellent documentation

Static sites are perfect for blogs, documentation, portfolios, and many other use cases.
```

```markdown:src/posts/2024-01-03-third-post.md
---
layout: post.njk
title: "Advanced 11ty Features"
date: 2024-01-03
excerpt: "Explore some of the more advanced features that make 11ty powerful."
---

# Advanced 11ty Features

Once you're comfortable with the basics of 11ty, there are many advanced features to explore.

## Collections

11ty automatically creates collections from your content, making it easy to group and display related posts.

## Data Files

You can use data files (JSON, JS, or YAML) to store configuration and content that can be used across your site.

## Filters and Shortcodes

Create custom filters and shortcodes to extend 11ty's functionality and make your templates more powerful.

## Plugins

The 11ty ecosystem includes many plugins for:

- Syntax highlighting
- Image optimization
- RSS feeds
- And much more!

These features make 11ty suitable for complex sites while maintaining its simplicity for basic use cases.
```

Let me verify the structure was created correctly:

```bash
find src -type f -name "*.njk" -o -name "*.md" -o -name "*.css" | sort
```

```bash
ls -la
```

Now let's install the dependencies and test the build:

```bash
npm install
```

```bash
npm run build
```

Perfect! I've created a complete 11ty blog with:

## Structure Created:
1. **Homepage with pagination** (`src/index.njk`) - Shows 5 posts per page with navigation
2. **Post details** (`src/_layouts/post.njk`) - Individual post layout
3. **Base layout** (`src/_layouts/base.njk`) - Main HTML structure
4. **Pagination component** (`src/_includes/pagination.njk`) - Reusable pagination
5. **Styling** (`src/css/style.css`) - Clean, responsive CSS
6. **Sample posts** - Three example blog posts in Markdown
7. **Configuration** (`.eleventy.js`) - 11ty configuration
8. **Package.json** - Dependencies and scripts

## Features:
- ✅ Homepage with all posts and pagination (5 posts per page)
- ✅ Individual post detail pages
- ✅ Responsive design
- ✅ Clean URLs
- ✅ Date formatting
- ✅ Navigation between pages
- ✅ SEO-friendly structure

## To run the blog:
```bash
npm run serve