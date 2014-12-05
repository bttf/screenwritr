import Ember from 'ember';

export default Ember.Component.extend({
  initQuillToolbar: function() {
    var formats = [
      'bold',
      'italic',
      'underline',
      'align-left',
      'align-center',
      'align-right'
    ];

    for (var i = 0; i < formats.length; i++) {
      var f = formats[i];
      var e = document.getElementsByClassName('fa-' + f)[0];
      if (e) {
        var a = document.createElement('a');
        a.addEventListener('mouseup', (function(f, e) {
          return function() {
            if (f.indexOf('align') > -1) {
              window.quillEditor.formatText(0, window.quillEditor.getLength(), f.split('-')[0], f.split('-')[1]); 
            } else {
              console.log('f is ' + f);
              console.log('and blah is ' + !(e.className.indexOf('ql-active') > -1));
              window.quillEditor.formatText(0, window.quillEditor.getLength(), f, !(e.className.indexOf('ql-active') > -1)); 
            }
          }
        })(f, e));
        e.parentNode.parentNode.insertBefore(a, e.parentNode);
        a.appendChild(e.parentNode);
      }
    }
  }.on('didInsertElement')
});
