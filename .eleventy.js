module.exports = function(eleventyConfig) {
  // Copy CSS files to output
  eleventyConfig.addPassthroughCopy("src/css");
  
  // Add date filter
  eleventyConfig.addFilter("date", function(date, format) {
    const d = new Date(date);
    
    if (format === 'YYYY-MM-DD') {
      return d.toISOString().split('T')[0];
    }
    
    if (format === 'MMMM DD, YYYY') {
      return d.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    
    // Default format
    return d.toLocaleDateString();
  });
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    }
  };
};
