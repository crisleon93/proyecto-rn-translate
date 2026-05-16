import { create } from 'zustand';

interface SavedProject {
  id: string;
  projectName: string;
  clientName: string;
  sourceLanguage: string;
  targetLanguage: string;
  translatorName: string;
  status: string;
  wordCount: number;
  deadline: string;
  category: string;
  imageUrl: string;
}

interface SavedStore {
  savedProjects: SavedProject[];
  addProject: (project: SavedProject) => void;
  removeProject: (id: string) => void;
  clearAll: () => void;
  isSaved: (id: string) => boolean;
}

export const useSavedStore = create<SavedStore>((set, get) => ({
  savedProjects: [],

  addProject: (project) => {
    const current = get().savedProjects;
    if (!current.find((p) => p.id === project.id)) {
      set({ savedProjects: [...current, project] });
    }
  },

  removeProject: (id) => {
    const current = get().savedProjects;
    set({ savedProjects: current.filter((p) => p.id !== id) });
  },

  clearAll: () => set({ savedProjects: [] }),

  isSaved: (id) => {
    return get().savedProjects.some((p) => p.id === id);
  },
}));