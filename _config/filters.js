export default function(eleventyConfig) {
    eleventyConfig.addFilter("lastPosts", function(posts) {
    return posts
        .slice(-4);
  });

    eleventyConfig.addFilter("postDate", (dateObj) => {
    return dateObj.toLocaleString("en-gb", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  });

  	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
	});

	eleventyConfig.addFilter("sortAlphabetically", strings =>
		(strings || []).sort((b, a) => b.localeCompare(a))
	);


};