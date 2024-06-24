// This line is removed
/**
 * jQuery
*/
/**
 * React logic for new app page
*/
var Header = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Let's get started with making a great web app.</h1>
        <h3>Just click an option below...</h3>
      </div>
    )
  }
})
var GithubForm = React.createClass({
  render: function () {
    return (
      <div>
        <h2>Type the repo name in the format author/name (i.e. <a href="https://github.com/nodejs/node">nodejs/node</a>) and we'll clone it immediately</h2>
        <form role="form" action="/dashboard/new/app/github-handler" method="post" className="form-inline">
          <div className="form-group">
            <input type="text" className="form-control" id="repo" name="repo" placeholder="Repo, in format of author/name" required></input>
            <button type="submit" name="button" className="btn btn-primary btn-lg"><i className="fa fa-arrow-right"></i></button>
          </div>
        </form>
      </div>
    )
  }
})

$('.button-choice a button').click(function () {
  if ($(this).hasClass('active')) {
    $(this).removeClass('active')
  } else {
    $(this).addClass('active')
  }
})
$('.button-choice a #github').click(function () {
  ReactDOM.render(
    <GithubForm />,
    document.getElementById('form-area-react')
  )
})
/*ReactDOM.render(
  <Header />,
  document.getElementById('header')
)*/
