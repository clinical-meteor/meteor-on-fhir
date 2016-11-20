export default {
  commands: [{
    selectLink(elementId) {
      return this
        .verify.elementPresent(elementId)
        .click(elementId);
    }
  }],
  elements: {}
};
