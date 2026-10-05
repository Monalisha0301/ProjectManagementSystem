package com.example.ProjectManagementSystem.controller;


import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.ProjectManagementSystem.entity.Project;
import com.example.ProjectManagementSystem.service.ProjectService;


@RestController
@RequestMapping("/api/projects")
@CrossOrigin("*")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // Get all projects
    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    // Get project by ID
    @GetMapping("/{id}")
    public Project getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id);
    }

    // Add project
    @PostMapping
    public Project addProject(@RequestBody Project project) {
        return projectService.saveProject(project);
    }

    // Update project
    @PutMapping("/{id}")
    public Project updateProject(@PathVariable Long id,
                                 @RequestBody Project project) {

        Project existingProject = projectService.getProjectById(id);

        if (existingProject != null) {

            existingProject.setName(project.getName());
            existingProject.setDescription(project.getDescription());
            existingProject.setStatus(project.getStatus());
            existingProject.setPriority(project.getPriority());
            existingProject.setStartDate(project.getStartDate());
            existingProject.setEndDate(project.getEndDate());

            return projectService.saveProject(existingProject);
        }

        return null;
    }

    // Delete project
    @DeleteMapping("/{id}")
    public String deleteProject(@PathVariable Long id) {

        projectService.deleteProject(id);

        return "Project deleted successfully";
    }
}

