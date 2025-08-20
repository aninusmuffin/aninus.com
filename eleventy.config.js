import fontAwesomePlugin from "@11ty/font-awesome";
import MarkdownItObsidianCallouts from 'markdown-it-obsidian-callouts'


export default async function (eleventyConfig) {
  let options = {
		html: true,
		breaks: true,
		linkify: true,
	};
  
  eleventyConfig.addPlugin(fontAwesomePlugin);
  eleventyConfig.addBundle("customicons");
  eleventyConfig.addPassthroughCopy("_src/assets/styles/base.css")
  eleventyConfig.addPassthroughCopy("_src/assets/fonts/**/*")
  eleventyConfig.addPassthroughCopy("_src/assets/fonts/**/*")
  eleventyConfig.addPassthroughCopy("_src/assets/img/**/*")
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
