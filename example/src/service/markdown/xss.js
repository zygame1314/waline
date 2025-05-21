const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const DOMPurify = createDOMPurify(new JSDOM('').window);

/**
 * Add a hook to make all links open a new window
 * and force their rel to be 'nofollow noreferrer noopener'
 */
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  // set all elements owning target to target=_blank
  if ('target' in node && node.href && !node.href.startsWith('about:blank#')) {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'nofollow noreferrer noopener');
  }

  // set non-HTML/MathML links to xlink:show=new
  if (
    !node.hasAttribute('target') &&
    (node.hasAttribute('xlink:href') || node.hasAttribute('href'))
  ) {
    node.setAttribute('xlink:show', 'new');
  }

  if ('preload' in node) {
    node.setAttribute('preload', 'none');
  }
});

const sanitize = (content) =>
  DOMPurify.sanitize(
    content,
    Object.assign(
      {
        FORBID_TAGS: ['form', 'input', 'style'],
        FORBID_ATTR: ['autoplay', 'style'],
      },
      think.config('domPurify') || {},
    ),
  );

module.exports = {
  sanitize,
};
