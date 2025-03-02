export interface Task 
{
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  editing?: boolean;
}