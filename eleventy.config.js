import PostCSSPlugin from "./_config/PostCSSPlugin.js";
import { exec } from "node:child_process";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import MarkdownItObsidianCallouts from 'markdown-it-obsidian-callouts'
import MarkdownItAnchor from 'markdown-it-anchor'
import fontAwesomePlugin from "@11ty/font-awesome";
import pluginTOC from 'eleventy-plugin-nesting-toc';
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import path from "node:path";
import { rssPlugin } from "@11ty/eleventy-plugin-rss";


import pluginFilters from "./_config/filters.js";

export default async function(eleventyConfig) {
    exec("sugarcube generate");
    eleventyConfig.addLayoutAlias("base", "layouts/base.liquid");
    eleventyConfig.addLayoutAlias("minimal", "layouts/minimal.liquid");
    eleventyConfig.addPlugin(PostCSSPlugin);    
    eleventyConfig.addPlugin(pluginTOC);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
      formats: ["svg", "webp"],
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const names = path.basename(src, extension).replace("https%3A%2F%2F", "");
        return `${names}-${id}-${width}w.${format}`;
	    },

      sharpOptions: {
        animated: true
      },
      sharpWebpOptions: {
        lossless: true
      },
      htmlOptions: {
			  imgAttributes: {
				  loading: "lazy",
				  decoding: "async",
			  },
			  pictureAttributes: {}
		  },
    });


    eleventyConfig.addPlugin(fontAwesomePlugin, {
        shortcode: "icon",
        defaultAttributes: {class:"icon"}
    });
    eleventyConfig.addPlugin(rssPlugin);

    // Markdown
    eleventyConfig.amendLibrary("md",MarkdownItObsidianCallouts);
    eleventyConfig.amendLibrary("md",MarkdownItAnchor);
    eleventyConfig.addPassthroughCopy("_src/assets/**/*.svg");
    eleventyConfig.addPassthroughCopy("_src/assets/favicon.ico");
    eleventyConfig.addPassthroughCopy("_src/fonts/*");
    eleventyConfig.addPassthroughCopy("_src/**/*.js");


    eleventyConfig.addPairedShortcode('link-with-logo', (content, href) => {
        const encoded = encodeURIComponent(href);
        return `<a href="${href}"><img class="icon webfavicon" src="https://v1.indieweb-avatar.11ty.dev/${encoded}/" alt="${content}">${content}</a>`
    });

    // Filters
    eleventyConfig.addPlugin(pluginFilters);

};

export const config = {
  dir: {
    input: "_src",
    output: "_site"
  }
};
