// This line is deleted
/**
 * React stuff
 * Action should be from server
*/
var actions = [
    {
      "text": "New web app",
      "url": "/dashboard/new/app"
    },
    {
      "text": "Make a note",
      "url": "/dashboard/note"
    },
    {
      "text": "Stats",
      "url": "/dashboard/stats"
    },
    {
      "text": "Help...",
      "url": "/help"
    }
  ]
var tasktest = {
  name: "t",
  colour: "progress-bar progress-bar-info",
  percent: "0"
}
/**
 * Quick action
*/
var QuickAction = React.createClass({
  render: function () {
    return (
      <a href={this.props.url}><button type="button" className="btn btn-primary btn-outline open-sans-normal">{this.props.children}</button></a>
    )
  }
});
/**
 * Render all quick actions
*/
var QuickActions = React.createClass({
  render: function () {
    var actionNodes = actions.map(function (action) {
      return (
        <QuickAction url={action.url}>{action.text}</QuickAction>
      )
    })
    return (
      <div>
        {actionNodes}
      </div>
    )
  }
})
ReactDOM.render(
  <QuickActions />,
  document.getElementById('quickactions-react')
)
// Task
var Task = React.createClass({
  render: function () {
    return (
      <div>
        <a href="#">
            <div>
                <p>
                    <strong>{this.props.name}</strong>
                    <span class="pull-right text-muted">{this.props.percent}%</span>
                </p>
                <div class="progress progress-striped active">
                    <div className={this.props.colour} role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
                        <span class="sr-only">{this.props.percent}%</span>
                    </div>
                </div>
            </div>
        </a>
      </div>
    )
  }
})
// Socket.io
var socket = io.connect();
socket.on('task', function(task) {
  console.log(task);
  $('#tasks-react').prepend(`
    <div>
      <a href="#">
          <div>
              <p>
                  <strong>${task.name}</strong>
                  <span class="pull-right text-muted">${task.percent}%</span>
              </p>
              <div class="progress progress-striped active">
                  <div className=${task.colour} role="progressbar" aria-valuenow="${task.percent}" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
                      <span class="sr-only">${task.percent}%</span>
                  </div>
              </div>
          </div>
      </a>
    </div>
    `)
})
