import fontAwesomePlugin from "@11ty/font-awesome";

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(fontAwesomePlugin);
  eleventyConfig.addBundle("customicons");
  eleventyConfig.addPassthroughCopy("_src/styles/*.css");
  eleventyConfig.addPassthroughCopy("_src/img/*");
  eleventyConfig.addPassthroughCopy("_src/CNAME");
  eleventyConfig.addWatchTarget("_src/styles/**/*.css");
  return { config };
}

export const config = {
  dir: {
    input: "_src",
    output: "_site",
  },
};
