class Project extends React.Component{

  render(){
    return (
      <div>
        <h1>{this.props.project.name}</h1>
        <p>{this.props.project.description}</p>
        <button onClick={() => this.props.handleDelete(this.props.project.id)}>Delete</button>
      </div>
    )
  }
}
