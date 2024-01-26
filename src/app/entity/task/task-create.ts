export class TaskCreate {
  public title: string
  public importance: string
  public description: string
  public deadLine: Date
  // @ts-ignore
  public email : string

  constructor(title: string,
              importance: string,
              description: string,
              deadLine: Date) {
    this.title = title;
    this.importance = importance;
    this.description = description;
    this.deadLine = deadLine;
  }
}
