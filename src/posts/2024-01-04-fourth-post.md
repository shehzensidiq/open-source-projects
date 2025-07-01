---
layout: post.njk
title: "Deploying Your 11ty Site"
date: 2024-01-04
excerpt: "Learn different ways to deploy your 11ty blog to production."
---

# Deploying Your 11ty Site

Once your 11ty blog is ready, you'll want to deploy it to production. Here are several popular options.

## Netlify

Netlify offers seamless deployment from Git repositories:

1. Connect your GitHub repo
2. Set build command: `npm run build`
3. Set publish directory: `_site`
4. Deploy automatically on every push

## Vercel

Similar to Netlify, Vercel provides:
- Automatic deployments
- Preview deployments for PRs
- Edge network distribution
- Custom domains

## GitHub Pages

For free hosting directly from GitHub:
- Enable GitHub Pages in repository settings
- Use GitHub Actions for build process
- Perfect for personal blogs and documentation

Choose the platform that best fits your needs and workflow!
```

```markdown:src/posts/2024-01-05-fifth-post.md
---
layout: post.njk
title: "Customizing Your 11ty Blog"
date: 2024-01-05
excerpt: "Tips and tricks for customizing your 11ty blog to make it unique."
---

# Customizing Your 11ty Blog

Making your blog unique is important for standing out. Here are some customization ideas.

## Custom CSS

Beyond the basic styling, consider:
- Custom color schemes
- Typography choices
- Dark mode support
- Animations and transitions

## Adding Features

Enhance your blog with:
- Search functionality
- Comments system
- Social media integration
- Newsletter signup
- Analytics tracking

## Content Organization

Structure your content with:
- Categories and tags
- Series of related posts
- Featured posts
- Archive pages

## Performance Optimization

Keep your site fast with:
- Image optimization
- Minified CSS/JS
- Lazy loading
- Service workers

These customizations will help make your blog truly yours!
```

```markdown:src/posts/2024-01-06-sixth-post.md
---
layout: post.njk
title: "11ty vs Other Static Site Generators"
date: 2024-01-06
excerpt: "Compare 11ty with other popular static site generators like Gatsby, Next.js, and Hugo."
---

# 11ty vs Other Static Site Generators

Let's compare 11ty with other popular static site generators to help you choose the right tool.

## 11ty vs Gatsby

**11ty Advantages:**
- Simpler setup and configuration
- Multiple template languages
- Faster build times
- Less JavaScript overhead

**Gatsby Advantages:**
- Rich plugin ecosystem
- GraphQL data layer
- React-based components
- Image optimization built-in

## 11ty vs Next.js

**11ty:**
- Pure static generation
- Minimal JavaScript
- Template flexibility

**Next.js:**
- Hybrid static/server rendering
- React ecosystem
- API routes
- More complex applications

## 11ty vs Hugo

**11ty:**
- JavaScript-based
- More template options
- Easier for JS developers

**Hugo:**
- Extremely fast builds
- Go-based (single binary)
- Built-in image processing
- Larger community

## Conclusion

Choose based on your needs:
- **11ty**: Simple blogs, flexibility, JS familiarity
- **Gatsby**: React projects, rich plugins
- **Next.js**: Complex apps, hybrid rendering
- **Hugo**: Speed, large sites, Go preference

Each has its strengths - pick what fits your project best!
```

Now let's rebuild to include the new posts:

```bash
npm run build
```

Let's check the pagination is working with more posts:

```bash
ls -la _site/page/
```

```bash
find _site -name "index.html" | grep -E "(page|^_site/index)"
```

Let's also verify the individual post pages were created:

```bash
ls -la _site/posts/
```

Perfect! Your 11ty blog is now fully functional with:

## ✅ What's Working:
1. **Homepage** at `/` showing latest posts with pagination
2. **Pagination pages** at `/page/2/`, `/page/3/`, etc.
3. **Individual post pages** at `/posts/[post-name]/`
4. **6 sample blog posts** with different topics
5. **Responsive design** with clean CSS
6. **Development server** running on localhost:8080

## 📁 Final File Structure:
```
├── .eleventy.js          # 11ty configuration
├── package.json          # Dependencies and scripts
├── src/
│   ├── index.njk         # Homepage with pagination
│   ├── css/
│   │   └── style.css     # Styles
│   ├── _layouts/
│   │   ├── base.njk      # Base HTML template
│   │   └── post.njk      # Post detail template
│   ├── _includes/
│   │   └── pagination.njk # Pagination component
│   └── posts/
│       ├── 2024-01-01-first-post.md
│       ├── 2024-01-02-second-post.md
│       ├── 2024-01-03-third-post.md
│       ├── 2024-01-04-fourth-post.md
│       ├── 2024-01-05-fifth-post.md
│       └── 2024-01-06-sixth-post.md
└── _site/                # Generated static files