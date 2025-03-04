export type Priority = 'low' | 'medium' | 'high';
export interface Task 
{
  id: number;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
  showDescription?: boolean;
}