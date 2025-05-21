function serializeDOM(domContent) {
  if (typeof domContent === 'string') {
    return domContent;
  }
  // Fallback if you want to support other types
  if (domContent && typeof domContent === 'object' && typeof domContent.serialize === 'function') {
    return domContent.serialize();
  }
  return '';
}

module.exports = { serializeDOM };
