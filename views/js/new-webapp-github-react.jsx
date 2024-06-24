var cloneid = Math.round(Math.random() * 100)
// progressbar
var circle = new ProgressBar.Circle('#status', {
  color: '#2980b9',
  strokeWidth: 3,
  trailWidth: 1,
  duration: 1500,
  text: {
    value: '0'
  },
  step: function(state, bar) {
    bar.path.setAttribute('stroke', state.color);
    if (bar.value() === 1) {
      bar.setText('<i class="fa fa-check done-status"></i>').toFixed(0);
    } else {
      bar.setText((bar.value() * 100).toFixed(0));
    }
  }
});

circle.animate(0.5, {
  from: {color: '#2980b9'},
  to: {color: '#2980b9'}
})

// React modal
var ErrModal = React.createClass({
  render: function () {
    return (
      <div id="err-modal" className="modal fade" tabindex="-1" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h1>Error</h1>
            </div>
            <div className="modal-body">
              <h3>{this.props.err}</h3>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary btn-outline"><i className="fa fa-arrow-left"></i>Go back</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
// Socket.io
var socket = io.connect();
socket.emit('clonerepo', {repo: <%=repo%>, id: cloneid})
socket.on('clonerepofinish', function (data) {
  if (data.id === cloneid) {
    circle.animate(1, {
      from: {color: '#2980b9'},
      to: {color: '#27ae60'}
    })
  }
  console.log("Done");
})
socket.on('clonerepoerr', function (err) {
  if (err.id === cloneid) {
    console.log(err.err.message);
    ReactDOM.render(
      <ErrModal err={err.err.message} />,
      document.getElementById('err-modal-react')
    )
    $('#err-modal-button').trigger('click')
  }
})
