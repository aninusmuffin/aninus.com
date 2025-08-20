import fontAwesomePlugin from "@11ty/font-awesome";

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(fontAwesomePlugin);
  eleventyConfig.addBundle("customicons");
  eleventyConfig.addPassthroughCopy("_src/assets/styles/base.css")
  eleventyConfig.addPassthroughCopy("_src/assets/fonts/**/*")
  eleventyConfig.addPassthroughCopy("_src/assets/fonts/**/*")
  eleventyConfig.addPassthroughCopy("_src/assets/img/**/*")
  eleventyConfig.addWatchTarget("_src/assets/styles/**/*.css");
  return { config };
}

export const config = {
  dir: {
    input: "_src",
    output: "_site",
  },
};
