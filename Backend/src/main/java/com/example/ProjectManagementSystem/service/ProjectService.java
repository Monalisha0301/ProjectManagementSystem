package com.example.ProjectManagementSystem.service;



import java.util.List;

import org.springframework.stereotype.Service;

import com.example.ProjectManagementSystem.entity.Project;
import com.example.ProjectManagementSystem.repository.ProjectRepository;


@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    // Get all projects
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // Get project by ID
    public Project getProjectById(Long id) {
        return projectRepository.findById(id).orElse(null);
    }

    // Add project
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    // Delete project
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}

