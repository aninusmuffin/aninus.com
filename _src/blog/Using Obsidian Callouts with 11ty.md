---
title: Using Obsidian Callouts with 11ty
favicon: https://avatars.githubusercontent.com/u/68734661?v=4
date: 2025-08-26
modified: 2025-12-23
tags:
  - 11ty
  - obsidian
  - markdown
description: A simple guide on how to make an Obsidian style Callout or Information box
image: /assets/img/blog/obisian-callouts-11ty/image.png
imgalt: An image showing an obsidian callout and an arrow pointing at a nicely rendered info box. 
---

When I decided to make this blog, one of my biggest annoyances was the creation of custom informational boxes. There are a lot of different ways to accomplish this in 11ty, you can use liquid's components (which I found to be cumbersome for blogs) and 11ty's own shortcodes are difficult to style with [html and Markdown at the same time](https://www.11ty.dev/docs/languages/markdown/#why-cant-i-return-markdown-from-paired-shortcodes-to-use-in-a-markdown-file).

As it turns out 11ty uses [markdown-it](https://github.com/markdown-it/markdown-it) for rendering, [which has plugin support](https://www.11ty.dev/docs/languages/markdown/#add-your-own-plugins) and allows you to add custom Markdown syntax.  

I found three similar plugins that have the same basic function:

## Option 1 : [markdown-it-container](https://github.com/markdown-it/markdown-it-container)
This is an official extension of the markdown-it project. You need to define your own  containers in JavaScript, and uses `:::` for syntax instead of blockquotes.

## Option 2 : [markdown-it-github-alerts](https://github.com/antfu/markdown-it-github-alerts)
A simple plug-and-play solution for the problem with some basic styling. By default, it only supports the basic five (NOTE, TIP, IMPORTANT, WARNING, DANGER), but it can be extended. It uses GitHub's icons for the boxes.

## Option 3 : [markdown-it-obsidian-callouts](https://github.com/ebullient/markdown-it-obsidian-callouts)
This plugin supports GitHub and [Obsidian callouts](https://help.obsidian.md/callouts), as well as codeblock admonitions supported by the [Admonition plugin](https://github.com/javalent/admonitions), uses [Lucide](https://lucide.dev/icons/) for the icons (Same as Obsidian) and it can also do nested callouts which is a nice bonus. It doesn't come with a style by default, but the repo includes a CSS file mimicking Obsidian's callout desgin. 

> [!info]
> In this guide I decided to use ebullient's markdown-it-obsidian-callouts as this is the plugin I ended up using to make this blog.


## Setup

I will assume that you already have an Eleventy project set up for this guide, if you don't you should check out [11ty's Documentation](https://www.11ty.dev/docs/) or the [Official Starting Project](https://github.com/11ty/eleventy-base-blog).


You will also need to install [markdown-it-obsidian-callouts](https://github.com/ebullient/markdown-it-obsidian-callouts) from NPM with the following command:

```
npm i markdown-it-obsidian-callouts
```

> [!info] 
> I am using ESM instead of CommonJS in this guide, you can learn about the differences here: [CommonJS vs ESM](https://www.11ty.dev/docs/cjs-esm/)

Right now our `eleventy.config.js` file looks something like this:

```js
export default async function (eleventyConfig) {
return {
	dir: {
	input: "_src",
	output: "_site",
	},
};
}
```

First we need to import `MarkdownItObsidianCallouts` then amend the library in eleventyConfig:

```diff-js
+import MarkdownItObsidianCallouts from 'markdown-it-obsidian-callouts'

export default async function (eleventyConfig) {
+eleventyConfig.amendLibrary("md", MarkdownItObsidianCallouts);

return {
    dir: {
    input: "_src",
    output: "_site",
    },
};
}
```

Now if you write a Markdown file like this:
```markdown
Your Markdown file

> [!info]
> This is an information box
```

It renders like this:

![A basic rendered markdown file showing : "Your markdown file  INFO ICON This is an information box"](/assets/img/blog/obisian-callouts-11ty/screenshot-less.png)

And you are almost done! Now you can create your own style for it or follow the guide for the obsidian style.

## Adding styles

First you need to download or copy the CSS from the plugin's GitHub repo to your style.
[Link to the file](https://github.com/ebullient/markdown-it-obsidian-callouts/blob/main/style/index.css)

I created a file called `index.css` and pasted the following:

{% render "partials/snippets/blog/callout-css.liquid", page:page %}

Link your stylesheet in your Markdown file:
```diff-html
+<link rel="stylesheet" type="text/css" href="/index.css">

Your markdown file

 > [!info]
 > This is an information box
```

> [!warning] 
> Don't forget to mark your new CSS file for passthrough in `eleventy.config.js`
> 
> ```diff-js
>import MarkdownItObsidianCallouts from 'markdown-it-obsidian-callouts'
>
>export default async function (eleventyConfig) {
>
>+eleventyConfig.addWatchTarget("_src/index.css");
>+eleventyConfig.addPassthroughCopy("_src/index.css");
>eleventyConfig.amendLibrary("md", MarkdownItObsidianCallouts);
>
>return {
>	dir: {
>	input: "_src",
>	output: "_site",
>	},
>};
>
>}
>```

And if we run eleventy again our file should look like this:

![A correctly rendered markdown file showing : "Your markdown file  INFO ICON This is an information box"](/assets/img/blog/obisian-callouts-11ty/screenshot-style.png)

And you are done! I hope that this was useful for at least one person :D
