module.exports = {
  layout: "post.njk",
  tags: "post",
  eleventyComputed: {
    // Drafts don't publish and don't appear in listings
    permalink: (data) =>
      data.draft ? false : `/blog/${data.page.fileSlug}/`,
    eleventyExcludeFromCollections: (data) =>
      data.draft === true ? true : (data.eleventyExcludeFromCollections || false),
  },
};
