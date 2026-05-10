export interface Project {
  id: string;
  clientName: string;
  projectName: string;
  sourceLanguage: string;
  targetLanguage: string;
  translatorName: string;
  status: 'Pendiente' | 'En progreso' | 'En revisión' | 'Completado';
  wordCount: number;
  deadline: string;
  category: string;
  imageUrl: string;
}