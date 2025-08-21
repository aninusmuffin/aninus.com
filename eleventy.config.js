import fontAwesomePlugin from "@11ty/font-awesome";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import MarkdownItObsidianCallouts from 'markdown-it-obsidian-callouts'


export default async function (eleventyConfig) {
  let options = {
		html: true,
		breaks: true,
		linkify: true,
	};
  
  eleventyConfig.addPlugin(fontAwesomePlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addBundle("customicons");
  eleventyConfig.setServerPassthroughCopyBehavior("copy");
  eleventyConfig.addPassthroughCopy("_src/assets/**/*", {filter: ["!**/*tailwind.css",]});
  eleventyConfig.addWatchTarget("_src/assets/styles/**/*.css");
  eleventyConfig.amendLibrary("md",MarkdownItObsidianCallouts);
  return { config };
}

export const config = {
  dir: {
    input: "_src",
    output: "_site",
  },
};
