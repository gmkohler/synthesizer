(function(root) {
  'use strict';
  root.Recording = React.createClass({
    render: function () {
      return (
        <div>
          <span>{this.props.name}</span>
        </div>
      );
    }
  });
}(this));
