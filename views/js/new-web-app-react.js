/**
 * jQuery
*/
/**
 * React logic for new app page
*/
var Header = React.createClass({displayName: "Header",
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, "Let's get started with making a great web app."), 
        React.createElement("h3", null, "Just click an option below...")
      )
    )
  }
})
var GithubForm = React.createClass({displayName: "GithubForm",
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("h2", null, "Type the repo name in the format author/name (i.e. ", React.createElement("a", {href: "https://github.com/nodejs/node"}, "nodejs/node"), ") and we'll clone it immediately"), 
        React.createElement("form", {role: "form", action: "/dashboard/new/app/github-handler", method: "post", className: "form-inline"}, 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("input", {type: "text", className: "form-control", id: "repo", name: "repo", placeholder: "Repo, in format of author/name", required: true}), 
            React.createElement("button", {type: "submit", name: "button", className: "btn btn-primary btn-lg"}, React.createElement("i", {className: "fa fa-arrow-right"}))
          )
        )
      )
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
    React.createElement(GithubForm, null),
    document.getElementById('form-area-react')
  )
})
/*ReactDOM.render(
  <Header />,
  document.getElementById('header')
)*/