/** @jsx React.DOM */

var Taskmaker = React.createClass({displayName: 'Taskmaker',
	getInitialState: function() {
		return {
			navSelection: 'setup',
			task: {
				setup: {
					duration: 100,
					numTrials: 5
				},
				flow: {
					tasks:[]
				},
				export: {
					name: null
				}
			}
		};
	},

	onNavClick: function(navId) {
		this.setState({
			navSelection: navId
		});
	},

	onSetupChange: function(setup) {
		var task = _.cloneDeep(this.state.task);
		task.setup = setup;
		this.setState({
			task: task
		});
	},

	onFlowChange: function(flow) {
		var task = _.cloneDeep(this.state.task);
		task.flow = flow;
		this.setState({
			task: task
		});
	},

  render: function() {
  	var self = this;

  	function getCurrentView() {
  		return {
  			'setup': SetupView({data: self.state.task.setup, onSetupChange: self.onSetupChange}),
  			'flow': FlowView({data: self.state.task.flow, onFlowChange: self.onFlowChange}),
  			'export': ExportView({data: self.state.task.export})
  		}[self.state.navSelection];
  	}

    return (
    	React.DOM.div({className: "Taskmaker"}, 
    		React.DOM.div({className: "banner"}, "Taskmaker"), 
    		Navigation({onNavClick: this.onNavClick, navSelection: this.state.navSelection}), 
    		React.DOM.div({className: "current-view"}, 
    			getCurrentView()
    		)
			)
   	);
  }
});

var Navigation = React.createClass({displayName: 'Navigation',
	render: function() {
		var self = this;

		function getSelectedClass(navId) {
			return self.props.navSelection === navId ? 'selected' : '';
		}

		return (
			React.DOM.ul({className: "Navigation"}, 
				React.DOM.li({className: getSelectedClass('setup'), onClick: this.props.onNavClick.bind(null,'setup')}, React.DOM.a({href: "#"}, "Setup")), 
				React.DOM.li({className: getSelectedClass('flow'), onClick: this.props.onNavClick.bind(null,'flow')}, React.DOM.a({href: "#"}, "Flow")), 
				React.DOM.li({className: getSelectedClass('export'), onClick: this.props.onNavClick.bind(null,'export')}, React.DOM.a({href: "#"}, "export"))
			)
		);
	}
});

var SetupView = React.createClass({displayName: 'SetupView',
	onDurationChange: function(e) {
		var setup = _.clone(this.props.data);
		setup.duration = e.target.value;
		this.props.onSetupChange(setup);
	},

	onNumTrialsChange: function(e) {
		var setup = _.clone(this.props.data);
		setup.numTrials = e.target.value;
		this.props.onSetupChange(setup);
	},

	render: function() {
		return (
			React.DOM.div({className: "SetupView"}, 
				React.DOM.div({className: "setup-item"}, "Duration ", React.DOM.input({type: "text", value: this.props.data.duration, onChange: this.onDurationChange})), 
				React.DOM.div({className: "setup-item"}, "# Trials ", React.DOM.input({type: "text", value: this.props.data.numTrials, onChange: this.onNumTrialsChange}))
			)
		);
	}
});

var FlowView = React.createClass({displayName: 'FlowView',
	onInputKeyUp: function(e) {
		if (e.keyCode === 13) {
			this.onAddNewTask();
		}
	},

	onAddNewTask: function() {
		var flow = _.clone(this.props.data);
		flow.tasks.push(this.refs.taskInput.getDOMNode().value);
		this.props.onFlowChange(flow);
		this.refs.taskInput.getDOMNode().value = '';
	},

	removeTask: function(i) {
		var flow = _.clone(this.props.data);
		flow.tasks.splice(i, 1);
		this.props.onFlowChange(flow);
	},

	render: function() {
		return (
			React.DOM.div({className: "FlowView row"}, 
				React.DOM.div({className: "col-xs-4"}, 
	        React.DOM.div({className: "btn add-task-button", onClick: this.onAddNewTask}, "Add task ", React.DOM.b(null, "+"))
	      ), 
	      React.DOM.div({className: "col-xs-8"}
	      )
      )
		);
	}
});

var FlowList = React.createClass({displayName: 'FlowList',
	editProperties: function() {
	},

	render: function() {
		var self = this;
		function createItem(task, i) {
     	return (
     		React.DOM.li({key: i}, 
     			React.DOM.span({onClick: self.editProperties}, task), 
     			React.DOM.a({onClick: self.props.removeTask.bind(null, i)}, "×")
     		)
     );
    };
		return (
    	React.DOM.ul({className: "FlowList"}, this.props.data.tasks.map(createItem))
		);
	}
});


var ExportView = React.createClass({displayName: 'ExportView',
	render: function() {
		return (
			React.DOM.div(null)
		);
	}
});

React.renderComponent(Taskmaker({name: "Michelle"}), document.getElementById('taskmaker'));