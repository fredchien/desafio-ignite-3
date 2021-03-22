const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return res.status(201).json(repository);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const updatedRepository = req.body;

  const repofind = repositories.find((repository) => repository.id === id);

  repositoryIndex = repositories.indexOf(repofind);

  // console.log(repositoryIndex);

  if (repositoryIndex < 0) {
    return res.status(404).json({ error: "Repository not found" });
  }

  req.body.likes = repofind.likes;

  const repository = { ...repositories[repositoryIndex], ...updatedRepository };

  repositories[repositoryIndex] = repository;

  return res.json(repository);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repo = repositories.find((repository) => repository.id === id);

  const repository = repositories.indexOf(repo);

  if (repository === -1) {
    return res.status(404).json({ error: 'Repository not found' });
  }

  repositories.splice(repository, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repo = repositories.find((repository) => repository.id === id);

  const repositoryIndex = repositories.indexOf(repo);

  if (repositoryIndex < 0) {
    return res.status(404).json({ error: "Repository not found" });
  }

  const likes = ++repositories[repositoryIndex].likes;

  return res.status(201).json(repo);
});

module.exports = app;
