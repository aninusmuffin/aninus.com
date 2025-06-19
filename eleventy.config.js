export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("_src/styles/*.css");
  eleventyConfig.addPassthroughCopy("_src/assets/*");
  eleventyConfig.addWatchTarget("styles/**/*.css");
  return { config };
}

export const config = {
  dir: {
    input: "_src",
    output: "_site",
  },
};
