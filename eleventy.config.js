import fontAwesomePlugin from "@11ty/font-awesome";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import MarkdownItObsidianCallouts from 'markdown-it-obsidian-callouts'
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginFilters from "./_config/filters.js";


export default async function (eleventyConfig) {
  let options = {
		html: true,
		breaks: true,
		linkify: true,
	};
  
  // Plugins
  eleventyConfig.addPlugin(fontAwesomePlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addBundle("customicons");
  
  eleventyConfig.addPassthroughCopy("_src/assets/**/*");
  eleventyConfig.addWatchTarget("_src/assets/styles/**/*.css");

  // Markdown
  eleventyConfig.amendLibrary("md",MarkdownItObsidianCallouts);

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
