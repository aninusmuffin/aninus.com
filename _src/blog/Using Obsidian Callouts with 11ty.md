---
title: Using Obsidian Callouts with 11ty
favicon: https://avatars.githubusercontent.com/u/68734661?v=4
date: 2025-08-26
tags:
  - 11ty
  - obsidian
  - markdown
description: A simple guide on how to make an Obsidian style Callout or Information box
image: /assets/img/blog/obisian-callouts-11ty/image.png
imgalt: An image showing an obsidian callout and an arrow pointing at a nicely rendered info box. 
---

When i decided to make this blog, one of my biggest annoyances was the creation of custom informational boxes. There are a lot of different ways to accomplish this in 11ty, you can use liquid's components (which I found to be cumbersome for blogs) and 11ty's own shortcodes are difficult to style with [html and markdown at the same time](https://www.11ty.dev/docs/languages/markdown/#why-cant-i-return-markdown-from-paired-shortcodes-to-use-in-a-markdown-file).

As it turns out 11ty uses [markdown-it](https://github.com/markdown-it/markdown-it) for rendering, [which has plugin support](https://www.11ty.dev/docs/languages/markdown/#add-your-own-plugins) and allows you to add custom markdown syntax.  

I found three similar plugins that have the same basic function:

## Option 1 : [markdown-it-container](https://github.com/markdown-it/markdown-it-container)
This is an official extension of the markdown-it project. You need to define your own  containers in javascript, and uses `:::` for syntax instead of blockquotes.

## Option 2 : [markdown-it-github-alerts](https://github.com/antfu/markdown-it-github-alerts)
A simple plug-and-play solution for the problem with some basic styling. by default it only supports the basic five (NOTE, TIP, IMPORTANT, WARNING, DANGER), but it can be extended. It uses Github's icons for the boxes.

## Option 3 : [markdown-it-obsidian-callouts](https://github.com/ebullient/markdown-it-obsidian-callouts)
This plugin supports GitHub and [Obsidian callouts](https://help.obsidian.md/callouts), as well as codeblock admonitions supported by the [Admonition plugin](https://github.com/javalent/admonitions), uses [Lucide](https://lucide.dev/icons/) for the icons (Same as Obsidian) and it can also do nested callouts which is a nice bonus. It doesn't come with a style by default, but the repo includes a css file mimicking Obsidian's callout desgin. 

> [!info] Info
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

```diff
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


Now if you write a markdown file like this:
```md

Your markdown file

> [!info]
> This is an information box

```

It renders like this:
![A basic rendered markdown file showing : "Your markdown file  INFO ICON This is an information box"](/assets/img/blog/obisian-callouts-11ty/screenshot-less.png)

And you are almost done! Now you can create your own style for it or follow the guide for the obsidian style.

## Adding styles

First you need to download or copy the css from the plugin's github repo to your style.
[Link to the file](https://github.com/ebullient/markdown-it-obsidian-callouts/blob/main/style/index.css)

I created a file called `index.css` and pasted the following:

```css
/**
 * This css file is generated.
 * Make changes to `scss` version.
 */
/**
 * Color about
 */
:root {
  --bold-modifier: 200;
  --line-height-tight: 1.3;
  --callout-border-width: 0px;
  --callout-border-opacity: 0.25;
  --callout-padding: 12px 12px 12px 24px;
  --callout-radius: 4px;
  --callout-title-color: inherit;
  --callout-title-padding: 0;
  --callout-title-size: inherit;
  --callout-title-weight: 600;
  --callout-content-padding: 0;
  --callout-content-background: transparent;
  --callout-blend-mode: var(darken);
  --callout-info: 8, 109, 221;
  --callout-todo: 8, 109, 221;
  --callout-default: 8, 109, 221;
  --callout-bug: 233, 49, 71;
  --callout-error: 233, 49, 71;
  --callout-fail: 233, 49, 71;
  --callout-success: 8, 185, 78;
  --callout-example: 120, 82, 238;
  --callout-important: 0, 191, 188;
  --callout-summary: 0, 191, 188;
  --callout-tip: 0, 191, 188;
  --callout-question: 236, 117, 0;
  --callout-warning: 236, 117, 0;
  --callout-quote: 158, 158, 158;
  --callout-collapse-icon: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0ibTkgMThsNi02bC02LTYiLz48L3N2Zz4=");
}

.theme-light {
  --callout-blend-mode: var(darken);
}

.theme-dark {
  --callout-blend-mode: var(lighten);
}

html[data-theme=light] #app {
  --callout-blend-mode: var(darken);
}

html[data-theme=dark] #app {
  --callout-blend-mode: var(lighten);
}

/**
 * Obsidian callout about
 *
 * The following style is exactly the same as in obsidian
 */
.callout {
  overflow: hidden;
  border-style: solid;
  border-color: rgba(var(--callout-color), var(--callout-border-opacity));
  border-width: var(--callout-border-width);
  border-radius: var(--callout-radius);
  margin: 1em 0;
  mix-blend-mode: var(--callout-blend-mode);
  background-color: rgba(var(--callout-color), 0.1);
  padding: var(--callout-padding);
  --callout-color: var(--callout-default);
  --callout-icon: lucide-pencil;
}
details.callout .callout-title {
  margin: 0;
  cursor: pointer;
}
details.callout .callout-title .callout-fold {
  background-color: rgb(var(--callout-color));
  mask-image: var(--callout-collapse-icon);
  mask-size: 100%;
  -webkit-mask-image: var(--callout-collapse-icon);
  -webkit-mask-size: 100%;
  height: 24px;
  width: 24px;
  transition: 100ms ease-in-out;
}

details[close].callout > .callout-title > .callout-fold {
  transform: rotate(-90deg);
}

details[open].callout > .callout-title > .callout-fold {
  transform: rotate(90deg);
}

.callout .callout-title {
  padding: var(--callout-title-padding);
  display: flex;
  gap: 4px;
  font-size: var(--callout-title-size);
  color: rgb(var(--callout-color));
  line-height: var(--line-height-tight);
  align-items: flex-start;
}
.callout .callout-title .callout-icon {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}
.callout .callout-title .callout-title-inner {
  --font-weight: var(--callout-title-weight);
  font-weight: var(--font-weight);
  color: var(--callout-title-color);
}
.callout .callout-title .callout-title-inner b,
.callout .callout-title .callout-title-inner strong {
  --font-weight: calc(var(--callout-title-weight) + var(--bold-modifier));
  font-weight: var(--font-weight);
}
.callout .callout-content {
  overflow-x: auto;
  padding: var(--callout-content-padding);
  background-color: var(--callout-content-background);
}
.callout[data-callout=todo] {
  --callout-color: var(--callout-todo);
  --callout-icon: lucide-check-circle-2;
}
.callout[data-callout=success], .callout[data-callout=check], .callout[data-callout=done] {
  --callout-color: var(--callout-success);
  --callout-icon: lucide-check;
}
.callout[data-callout=warning], .callout[data-callout=caution], .callout[data-callout=attention] {
  --callout-color: var(--callout-warning);
  --callout-icon: lucide-alert-triangle;
}
.callout[data-callout=danger], .callout[data-callout=error] {
  --callout-color: var(--callout-error);
  --callout-icon: lucide-zap;
}
.callout[data-callout=tip], .callout[data-callout=hint] {
  --callout-color: var(--callout-tip);
  --callout-icon: lucide-flame;
}
.callout[data-callout=example] {
  --callout-color: var(--callout-example);
  --callout-icon: lucide-list;
}
.callout[data-callout=abstract], .callout[data-callout=summary], .callout[data-callout=tldr] {
  --callout-color: var(--callout-summary);
  --callout-icon: lucide-clipboard-list;
}
.callout[data-callout=quote], .callout[data-callout=cite] {
  --callout-color: var(--callout-quote);
  --callout-icon: quote-glyph;
}

/*# sourceMappingURL=index.css.map */
```

Link your stylesheet in your markdown file:
```diff
+<link rel="stylesheet" type="text/css" href="/index.css">

Your markdown file

 > [!info]
 > This is an information box
```

> [!warning] 
> Dont forget to mark your new css file for passthrough in `eleventy.config.js`
> ```diff
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

Annddd you are done! I hope that this was useful for at least one person :D
