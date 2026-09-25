import Image from "@11ty/eleventy-img";
import path from "node:path";

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "node_modules/alpinejs/dist/cdn.min.js": "assets/js/alpine.min.js"
  });

  // Passthrough static assets and Decap admin directory
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy("src/assets/css");

  // 11ty Image Shortcode (Optimized AVIF/WebP generation with responsive sizes)
  eleventyConfig.addAsyncShortcode("image", async function(src, alt, sizes = "100vw") {
    let fullSrc = path.join("src", src);
    let metadata = await Image(fullSrc, {
      widths: [300, 600, 900],
      formats: ["avif", "webp", "jpeg"],
      outputDir: "./_site/img/",
      urlPath: "/img/",
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};