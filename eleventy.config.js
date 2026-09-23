module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.ignores.add("src/admin/**");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/favicon-180.png");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // --- Date filters ---
  eleventyConfig.addFilter("dateISO", (d) =>
    new Date(d || Date.now()).toISOString().slice(0, 10)
  );
  eleventyConfig.addFilter("dateReadable", (d) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  );

  // --- Conservative HTML tidy (safe: never touches inline whitespace) ---
  // Only strips HTML comments and collapses blank lines. Netlify serves
  // everything gzip/brotli-compressed, so aggressive minification adds little.
  eleventyConfig.addTransform("htmlmin", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      return content
        .replace(/<!--(?!\[if)[\s\S]*?-->/g, "") // strip comments (keep IE conditionals)
        .replace(/\n\s*\n+/g, "\n")              // collapse blank lines
        .trim();
    }
    return content;
  });

  return {
    dir: { input: "src", output: "_site", data: "_data" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
