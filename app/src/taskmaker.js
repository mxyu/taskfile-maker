/** @jsx React.DOM */

// name:,
// durationMin:,
// durationMax:,
// chance:,
// objectsInState:,
// tRestAfter:
// tasks: []

var Taskmaker = React.createClass({
  getInitialState: function() {
    return {
      navSelection: 'flow',
      task: {
        setup: {
          duration: 600,
          numTrials: 5,
          numObjects: 0
        },
        flow: {
          tasks: [],
          selected: null
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

  onTaskNameChange: function(task) {

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

  onNumObjectsChange: function(e) {
    var setup = _.clone(this.props.data);
    setup.numObjects = e.target.value;
    this.props.onSetupChange(setup);
  },

  render: function() {
    return (
      <div className='SetupView'>
        <div className='setup-item'>Duration <input type='text' value={this.props.data.duration} onChange={this.onDurationChange} /></div>
        <div className='setup-item'># Trials <input type='text' value={this.props.data.numTrials} onChange={this.onNumTrialsChange} /></div>
        <div className='setup-item'># Objects <input type='text' value={this.props.data.numObjects} onChange={this.onNumObjectsChange} /></div>
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
    var newTask = {
      name: 'Task ' + flow.tasks.length,
      durationMin: null,
      durationMax: null,
      chance: null,
      objectsInState: null,
      tRestAfter: null
    };
    flow.tasks.push(newTask);
    flow.selected = newTask;
    this.props.onFlowChange(flow);
  },

  removeTask: function(i) {
    var flow = _.clone(this.props.data);
    flow.tasks.splice(i, 1);
    this.props.onFlowChange(flow);
  },

  editProperties: function(t) {
    var flow = _.clone(this.props.data);
    flow.selected = t;
    this.props.onFlowChange(flow);
  },

  render: function() {
    return (
      <div className='FlowView row'>
        <div className='col-xs-4'> 
        <FlowList data={this.props.data} removeTask={this.removeTask} editProperties={this.editProperties} />
          <div className='btn add-task-button' onClick={this.onAddNewTask}>Add task <b>+</b></div>
        </div>
        <div className='col-xs-8'>
          {this.props.data.selected ? <FlowPropertiesView data={this.props.data.selected} /> : null}
        </div>
      </div>
    );
  }
});

var FlowList = React.createClass({
  render: function() {
    var self = this;
    function createItem(task, i) {
        return (
          <li key={i}>
            <span onClick={self.props.editProperties.bind(null, task)}>{task}</span>
            <a onClick={self.props.removeTask.bind(null, i)}>&times;</a>
          </li>
        );
      };
    return (
      <ul className='FlowList'>{this.props.data.tasks.map(createItem)}</ul>
    );
  }
});

var FlowPropertiesView = React.createClass({
  onTaskNameChange: function() {
    var task = _.clone(this.props.data);
    task['name'] = e.target.value;
    this.props.onTaskNameChange(task);
  },

  render: function() {
    var self = this;
    return (
      <ul className='FlowList'>
        <li><input type='text' value={self.props.data.name} onChange={this.onTaskNameChange} /></li>
      </ul>
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