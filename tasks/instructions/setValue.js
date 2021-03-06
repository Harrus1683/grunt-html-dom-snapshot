'use strict'

module.exports = {
  detect: function (command) {
    return !!command.setValue
  },

  perform: function (grunt, target, client, command) {
    const setValue = command.setValue
    const selector = setValue.selector
    const value = setValue.value
    grunt.verbose.writeln('Set value of "' + selector +
                          '" to "' + value + '".')
    return client.setValue(selector, value)
  }
}
