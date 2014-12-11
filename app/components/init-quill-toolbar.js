import Ember from 'ember';

export default Ember.Component.extend({
  initQuillToolbar: function() {
    window.quillEditor.addModule('toolbar', { container: '#toolbar' });
    //var anchors;
    //if (anchors = this.fetchAnchors(this.fetchToolbar())) {
      //for (var i = 0; i < anchors.length; i++) {
        //var a = anchors[i];
        //a.addEventListener('mouseup', (function(e, _this) {
          //return function() {
            //$(e).addClass('active');
            //_this.disableOtherActives(e);
            //_this.enableStyle(e.innerHTML);
          //}
        //})(a, this));
      //}
    //}
  }.on('didInsertElement'),

  disableOtherActives: function(e) {
    var a = this.fetchAnchors(this.fetchToolbar());
    for (var i = 0; i < a.length; i++) {
      if (e !== a[i]) {
        $(a[i]).removeClass('active');
      }
    }
  },

  enableStyle: function(style) {
    switch(style) {
      case "Title":
        console.log('title');
        window.quillEditor.focus();
        window.quillEditor.prepareFormat('bold', true);
        window.quillEditor.prepareFormat('align', 'center');
        window.quillEditor.focus();
        break;
      case "Credits":
        console.log('credits');
        window.quillEditor.focus();
        window.quillEditor.prepareFormat('bold', true);
        window.quillEditor.prepareFormat('bold', false);
        window.quillEditor.prepareFormat('align', 'center');
        window.quillEditor.focus();
        break;
      case "Slugline":
        console.log('slugline');
        window.quillEditor.focus();
        window.quillEditor.prepareFormat('bold', true);
        window.quillEditor.prepareFormat('bold', false);
        window.quillEditor.prepareFormat('align', 'left');
        window.quillEditor.focus();
        break;
      case "Action":
        console.log('action');
        window.quillEditor.focus();
        window.quillEditor.prepareFormat('bold', true);
        window.quillEditor.prepareFormat('bold', false);
        window.quillEditor.prepareFormat('align', 'left');
        window.quillEditor.focus();
        break;
      case "Dialogue":
        console.log('dialogue');
        window.quillEditor.focus();
        window.quillEditor.prepareFormat('bold', true);
        window.quillEditor.prepareFormat('bold', false);
        window.quillEditor.prepareFormat('align', 'center');
        window.quillEditor.focus();
        break;
    }
  },

  fetchAnchors: function(toolbar) {
    if (!toolbar) return false;

    return Array.prototype.slice.call(toolbar.childNodes, 0).filter(function(e) {
      return e.tagName && e.tagName === "A";
    });
  },

  fetchToolbar: function() {
    return document.getElementById('toolbar') || false;
  },

  editor: window.quillEditor
});
