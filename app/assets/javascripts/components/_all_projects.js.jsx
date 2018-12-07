const AllProjects = (props) => {

  var projects = props.projects.map((project) => {
    return(
      <div key={project.id}>
        <Project
          project={project}
          handleUpdate={props.handleUpdate}
          handleDelete={props.handleDelete}
        />
      </div>
    )
  })

  return(
      <div>
        {projects}
      </div>
    )
}
