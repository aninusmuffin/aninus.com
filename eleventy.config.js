import fontAwesomePlugin from "@11ty/font-awesome";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import MarkdownItObsidianCallouts from 'markdown-it-obsidian-callouts'
import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItContainer from "markdown-it-container";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import pluginTOC from 'eleventy-plugin-nesting-toc';
import PostCSSPlugin from "eleventy-plugin-postcss";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import { fileURLToPath } from "node:url";
import pluginWebc from "@11ty/eleventy-plugin-webc";
import { RenderPlugin } from "@11ty/eleventy";


import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginFilters from "./_config/filters.js";
import pluginSyntaxHighlight from "./_config/syntaxHighlightPlugin.js";


function resolveModule(name) {
    return fileURLToPath(import.meta.resolve(name));
}

export default async function (eleventyConfig) {
  let options = {
		html: true,
		breaks: true,
		linkify: true,
	};
    // Layouts
    eleventyConfig.addLayoutAlias("main", "layouts/main.liquid");
    eleventyConfig.addLayoutAlias("article", "layouts/article.liquid");

    // Plugins
    eleventyConfig.addPlugin(pluginSyntaxHighlight);
    eleventyConfig.addPlugin(fontAwesomePlugin, {
        shortcode: "icon",
        defaultAttributes: {class:"icon"}
    });
    // eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(eleventyImageTransformPlugin);
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginTOC);
    eleventyConfig.addPlugin(PostCSSPlugin);
    eleventyConfig.addBundle("customicons");
    eleventyConfig.addPlugin(RenderPlugin);

    eleventyConfig.addPlugin(pluginWebc, {
        components: "_src/_includes/components/**/*.webc",
    });



    eleventyConfig.addPassthroughCopy({
        [resolveModule("@zachleat/line-numbers")]: `static/line-numbers.js`
    })
    eleventyConfig.addPassthroughCopy("_src/assets/**/*");
    eleventyConfig.addPassthroughCopy('_src/assets/scripts');
    eleventyConfig.addWatchTarget("_src/assets/styles/**/*.css");

    // Markdown
    eleventyConfig.amendLibrary("md",MarkdownItObsidianCallouts);

    eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(MarkdownItAnchor, {tabIndex: false}));
    eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(MarkdownItContainer, "responsive-table"));
    eleventyConfig.addPairedShortcode('responsive-table', (content) => {
        return `<div class="responsive-table">${content}</div>`
    })

    eleventyConfig.addPairedShortcode('link-with-logo', (content, href) => {
        const encoded = encodeURIComponent(href);
        return `<a href="${href}"><img class="webfavicon" sizes="1em" src="https://v1.indieweb-avatar.11ty.dev/${encoded}/" alt="${content}">${content}</a>`
    })

  //Filters
  eleventyConfig.addPlugin(pluginFilters);

  return { config };
}


export const config = {
  dir: {
    input: "_src",
    output: "_site",
  },
};
