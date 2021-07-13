const stringToHTML = (html) => document.createRange().createContextualFragment(html);

export default stringToHTML;