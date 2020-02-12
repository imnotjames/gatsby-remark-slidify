const escapeStringRegexp = require('escape-string-regexp');

const REVEAL_FRONTMATTER_KEY = 'reveal';

const DELIMITER_HORIZONTAL_TOKEN = '---';

const DELIMITER_VERTICAL_TOKEN = '+++';

const DELIMITER_NOTES_TOKEN = 'Note:';


function getDelimiterRegex(token) {
  return new RegExp('^\\s*' + escapeStringRegexp(token) + '(?:$|\\s)', 'gmi');
}

function mutateSlides(markdown) {
  let delimiter = getDelimiterRegex(DELIMITER_HORIZONTAL_TOKEN);

  return markdown.split(delimiter)
      .map(mutateSlide)
      .join("\n")
}


function mutateSlide(markdown) {
  let noteDelimiter = getDelimiterRegex(DELIMITER_NOTES_TOKEN);
  let verticalDelimiter = getDelimiterRegex(DELIMITER_VERTICAL_TOKEN);

  if (markdown.match(verticalDelimiter)) {
    markdown = markdown.split(verticalDelimiter).map(mutateSlide).join("\n");
  }

  if (markdown.match(noteDelimiter)) {
    let [content, ...notes] = markdown.split(noteDelimiter);

    let notesText = notes.join("\n");

    markdown = `${content}\n\n<aside class="notes">\n\n${notesText}\n\n</aside>`
  }

  return `<section>\n\n${markdown}\n\n</section>`;
}


function mutateSource({ markdownNode }) {
  if (!Object.keys(markdownNode.frontmatter).includes(REVEAL_FRONTMATTER_KEY)) {
    return;
  }

  markdownNode.internal.content = mutateSlides(markdownNode.internal.content);
}

module.exports = {};

module.exports.mutateSource = mutateSource;