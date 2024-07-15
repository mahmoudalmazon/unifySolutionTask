export interface IRepository<T> {
  findById(id: string): Promise<T | null>;
  find(filter: any): Promise<T[]>;
  create(item: Partial<T>): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
