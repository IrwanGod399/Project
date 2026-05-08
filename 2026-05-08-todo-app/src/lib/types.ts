export type Priority = "low" | "medium" | "high";
export type Status = "active" | "completed";

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  categoryId: string;
  createdAt: string;
  dueDate?: string;
  completedAt?: string;
  tags: string[];
}
