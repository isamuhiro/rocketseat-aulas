const express = require("express")

const app = express()

app.use(express.json());

let projects = [
    { id: "1", title: 'Novo projeto', tasks: [] },
    { id: "2", title: 'Antigo projeto', tasks: [] }
];

app.get("/projects", (req, res) => {
    res.json(projects)
})

app.post("/project", (req, res) => {
    const { id, title } = req.body;

    projects.push({ id, title, tasks: [] })
    res.json(projects);
})

app.post("/project/:id/tasks", (req, res) => {
    const { title } = req.body;
    const { id } = req.params;

    projects.map(project => {
        if (project.id == id) project.tasks.push(title)
    });
    
    res.json(projects);
})

app.put("/project/:id", (req, res) => {
    const { title } = req.body;
    const { id } = req.params;

    projects.map(project => {
        if (project.id == id) project.title = title
    });

    res.json(projects);
});

app.delete("/project/:id", (req, res) => {
    const { id } = req.params;

    projects = projects.filter((project) => {
        if (project.id != id) return !!project;
    });

    res.json(projects);
});


app.listen(3000, () => console.log("puto"))