import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Project } from '../types';
import { INITIAL_PROJECTS } from '../data/initialProjects';

interface ProjectsContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  fetchProjects: () => Promise<void>;
  createProject: (project: Partial<Project>) => Promise<{ success: boolean; error?: string; project?: Project }>;
  updateProject: (id: string, project: Partial<Project>) => Promise<{ success: boolean; error?: string; project?: Project }>;
  deleteProject: (id: string) => Promise<{ success: boolean; error?: string }>;
  resetProjects: () => Promise<{ success: boolean; error?: string }>;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      if (data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
      }
    } catch (err: any) {
      console.warn('Fallback to local state projects:', err.message);
      // Fallback to local storage or initial seed
      try {
        const local = localStorage.getItem('k4oow_projects_cache');
        if (local) {
          setProjects(JSON.parse(local));
        } else {
          setProjects(INITIAL_PROJECTS);
        }
      } catch {
        setProjects(INITIAL_PROJECTS);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Sync to local cache whenever projects change
  useEffect(() => {
    try {
      localStorage.setItem('k4oow_projects_cache', JSON.stringify(projects));
    } catch {
      // ignore
    }
  }, [projects]);

  const createProject = async (projectData: Partial<Project>): Promise<{ success: boolean; error?: string; project?: Project }> => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });
      const data = await response.json();
      if (data.success && data.project) {
        setProjects(prev => [...prev, data.project]);
        return { success: true, project: data.project };
      } else {
        throw new Error(data.error || 'Failed to create project');
      }
    } catch (err: any) {
      // Fallback local create
      const newProj = {
        ...projectData,
        id: projectData.id || `project-${Date.now()}`,
        sortOrder: projectData.sortOrder || projects.length + 1,
        featured: projectData.featured ?? true,
        tags: projectData.tags || ['Web Development']
      } as Project;

      setProjects(prev => [...prev, newProj]);
      return { success: true, project: newProj };
    }
  };

  const updateProject = async (id: string, projectData: Partial<Project>): Promise<{ success: boolean; error?: string; project?: Project }> => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });
      const data = await response.json();
      if (data.success && data.project) {
        setProjects(prev => prev.map(p => (p.id === id ? data.project : p)));
        if (selectedProject?.id === id) {
          setSelectedProject(data.project);
        }
        return { success: true, project: data.project };
      } else {
        throw new Error(data.error || 'Failed to update project');
      }
    } catch (err: any) {
      // Fallback local update
      setProjects(prev =>
        prev.map(p => (p.id === id ? ({ ...p, ...projectData } as Project) : p))
      );
      return { success: true };
    }
  };

  const deleteProject = async (id: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        setProjects(prev => prev.filter(p => p.id !== id));
        if (selectedProject?.id === id) {
          setSelectedProject(null);
        }
        return { success: true };
      } else {
        throw new Error(data.error || 'Failed to delete project');
      }
    } catch (err: any) {
      setProjects(prev => prev.filter(p => p.id !== id));
      if (selectedProject?.id === id) {
        setSelectedProject(null);
      }
      return { success: true };
    }
  };

  const resetProjects = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/projects/reset', {
        method: 'POST'
      });
      const data = await response.json();
      if (data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
        return { success: true };
      } else {
        throw new Error(data.error || 'Failed to reset projects');
      }
    } catch (err: any) {
      setProjects(INITIAL_PROJECTS);
      return { success: true };
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        loading,
        error,
        selectedProject,
        setSelectedProject,
        activeCategory,
        setActiveCategory,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
        resetProjects
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};
