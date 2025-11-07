import fontAwesomePlugin from "@11ty/font-awesome";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import MarkdownItObsidianCallouts from 'markdown-it-obsidian-callouts'
import MarkdownItAnchor from 'markdown-it-anchor';
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
    eleventyConfig.amendLibrary("md",MarkdownItAnchor);
    eleventyConfig.addPairedShortcode('responsive-table', (content) => {
        return `<div style="overflow-x: auto; margin-block: calc(var(--spacing)*5);">${content}</div>`
    })
  //Filters
  eleventyConfig.addPlugin(pluginFilters);


  	/* eleventyConfig.addPlugin(feedPlugin, {
		type: "atom",
		outputPath: "/feed.xml",
		collection: {
			name: "posts", 
			limit: 10,     
		},
		metadata: {
			language: "en",
			title: "Aninus' blog",
			subtitle: "Who knows, one day i might post something really interesting here...",
			base: "https://aninus.com/",
			author: {
				name: "Aninus Partikler",
				email: "muffin@aninus.com",
			}
		}
	}); */



  return { config };
}


export const config = {
  dir: {
    input: "_src",
    output: "_site",
  },
};
