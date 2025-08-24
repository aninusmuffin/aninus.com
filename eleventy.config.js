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
  eleventyConfig.addPassthroughCopy("_src/assets/**/*");
  eleventyConfig.addWatchTarget("_src/assets/styles/**/*.css");
  eleventyConfig.amendLibrary("md",MarkdownItObsidianCallouts);
  eleventyConfig.addFilter("lastPosts", function(posts) {
    return posts
    .slice(-4);
  });
  eleventyConfig.addFilter("reverse", function(post) {
    return post
    .reverse();
  });
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return dateObj.toLocaleString("en-gb", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  });

  

  return { config };
}

export const config = {
  dir: {
    input: "_src",
    output: "_site",
  },
};
