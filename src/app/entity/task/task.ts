export class Task {
  constructor(public title: string,
              public importance: string,
              public description: string,
              public creationDate: Date,
              public deadLine: Date) {
  }
}
