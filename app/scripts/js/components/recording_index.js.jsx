(function(root) {
  'use strict';
  root.RecordingIndex = React.createClass({
    render: function () {
      return (
        <div className="recording-index">
          <Recording name="hi"/>
          <Recording name="hello"/>
          <Recording name="howdy"/>
        </div>
      );
    }
  });
}(this));
