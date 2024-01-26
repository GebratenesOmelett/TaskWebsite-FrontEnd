export class TaskCreate {
  constructor(public title: string,
              public importance: string,
              public description: string,
              public deadLine: Date,
              public email: string) {
  }
}
