class Body extends React.Component {

  constructor(props) {
    super(props);
    this.state = { projects: [] };
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addNewProject = this.addNewProject.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.deleteProject = this.deleteProject.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateProject = this.updateProject.bind(this)
  }

  handleFormSubmit(name, description){
    let body = JSON.stringify({project: {name: name, description:   description} })

    fetch('http://localhost:3000/api/v1/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    })
    .then((response) => {return response.json()})
    .then((project)=>{ this.addNewProject(project) })
  }


  handleUpdate(project){
    fetch(`http://localhost:3000/api/v1/projects/${project.id}`,
    {
      method: 'PUT',
      body: JSON.stringify({project: project}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
        this.updateProject(project)
      })
  }
  updateProject(project){
    let newProjects = this.state.projects.filter((f) => f.id !== project.id)
    newProjects.push(project)
    this.setState({
      projects: newProjects
    })
  }

  handleDelete(id){
    fetch(`http://localhost:3000/api/v1/projects/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
        console.log('Project was deleted!')
        this.deleteProject(id)
      })
  }

  deleteProject(id){
    newProjects = this.state.projects.filter((project) => project.id !== id)
    this.setState({ projects: newProjects })
  }

  addNewProject(project){
    this.setState({ projects: this.state.projects.concat(project) })
  }

  componentDidMount(){
    fetch('/api/v1/projects.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ projects: data }) });
  }

  render(){
    return(
      <div>
        <NewProject handleFormSubmit={this.handleFormSubmit} />
        <AllProjects
          projects={this.state.projects}
          handleDelete={this.handleDelete}
          handleUpdate = {this.handleUpdate}
        />
      </div>
    )
  }
}
