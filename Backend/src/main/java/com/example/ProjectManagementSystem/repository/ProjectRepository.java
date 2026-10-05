package com.example.ProjectManagementSystem.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ProjectManagementSystem.entity.Project;



public interface ProjectRepository extends JpaRepository<Project, Long> {

}


