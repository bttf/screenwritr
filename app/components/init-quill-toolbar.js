import Ember from 'ember';

export default Ember.Component.extend({
  initQuillToolbar: function() {
    window.quillEditor.addModule('toolbar', { container: '#toolbar' });

    var anchors = this.fetchAnchors(this.fetchToolbar('align-toolbar'));

    if (anchors) {
      for(var i = 0; i < anchors.length; i++) {
        var a = anchors[i];
        console.log('adding events for anchor:', a.className);
        a.addEventListener('mouseup', (function(a, _this) {
          return function() {
            _this.enableStyle(a.childNodes[0].className);
          };
        })(a, this));
      }
    }
  }.on('didInsertElement'),

  disableOtherActives: function(list, item) {
    for (var i = 0; i < list.length; i++) {
      if (item !== list[i]) {
        $(list[i]).removeClass('ql-active');
      }
    }
  },

  enableStyle: function(className) {
    console.log('debug, enableStyle');
    console.log('debug, enableStyle, className', className);
    if (className.indexOf('align-left') > -1) {
      window.quillEditor.focus();
      window.quillEditor.prepareFormat('align', 'left');
      window.quillEditor.focus();
    } else if (className.indexOf('align-center') > -1) {
      window.quillEditor.focus();
      window.quillEditor.prepareFormat('align', 'center');
      window.quillEditor.focus();
    } else if (className.indexOf('align-right') > -1) {
      console.log('debug, enableStyle right');
      window.quillEditor.focus();
      window.quillEditor.prepareFormat('align', 'right');
      window.quillEditor.focus();
    }
  },

  fetchAnchors: function(toolbar) {
    if (!toolbar) return false;

    return Array.prototype.slice.call(toolbar.childNodes, 0).filter(function(e) {
      return e.tagName && e.tagName === "A";
    });
  },

  fetchToolbar: function(id) {
    return document.getElementById(id) || false;
  },

  editor: window.quillEditor
});
