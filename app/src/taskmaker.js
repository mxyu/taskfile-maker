/** @jsx React.DOM */

var Taskmaker = React.createClass({
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
  			'setup': <SetupView data={self.state.task.setup} onSetupChange={self.onSetupChange} />,
  			'flow': <FlowView data={self.state.task.flow} onFlowChange={self.onFlowChange}/>,
  			'export': <ExportView data={self.state.task.export} />
  		}[self.state.navSelection];
  	}

    return (
    	<div className='Taskmaker'>
    		<div className='banner'>Taskmaker</div>
    		<Navigation onNavClick={this.onNavClick} navSelection={this.state.navSelection} />
    		<div className='current-view'>
    			{getCurrentView()}
    		</div>
			</div>
   	);
  }
});

var Navigation = React.createClass({
	render: function() {
		var self = this;

		function getSelectedClass(navId) {
			return self.props.navSelection === navId ? 'selected' : '';
		}

		return (
			<ul className='Navigation'>
				<li className={getSelectedClass('setup')} onClick={this.props.onNavClick.bind(null,'setup')}><a href="#">Setup</a></li>
				<li className={getSelectedClass('flow')} onClick={this.props.onNavClick.bind(null,'flow')}><a href="#">Flow</a></li>
				<li className={getSelectedClass('export')} onClick={this.props.onNavClick.bind(null,'export')}><a href="#">export</a></li>
			</ul>
		);
	}
});

var SetupView = React.createClass({
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
			<div className='SetupView'>
				<div className='setup-item'>Duration <input type='text' value={this.props.data.duration} onChange={this.onDurationChange} /></div>
				<div className='setup-item'># Trials <input type='text' value={this.props.data.numTrials} onChange={this.onNumTrialsChange} /></div>
			</div>
		);
	}
});

var FlowView = React.createClass({
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
			<div className='FlowView row'>
				<div className='col-xs-4'> 
	        <div className='btn add-task-button' onClick={this.onAddNewTask}>Add task <b>+</b></div>
	      </div>
	      <div className='col-xs-8'>
	      </div>
      </div>
		);
	}
});

var FlowList = React.createClass({
	editProperties: function() {
	},

	render: function() {
		var self = this;
		function createItem(task, i) {
     	return (
     		<li key={i}>
     			<span onClick={self.editProperties}>{task}</span>
     			<a onClick={self.props.removeTask.bind(null, i)}>&times;</a>
     		</li>
     );
    };
		return (
    	<ul className="FlowList">{this.props.data.tasks.map(createItem)}</ul>
		);
	}
});


var ExportView = React.createClass({
	render: function() {
		return (
			<div></div>
		);
	}
});

React.renderComponent(<Taskmaker name='Michelle' />, document.getElementById('taskmaker'));