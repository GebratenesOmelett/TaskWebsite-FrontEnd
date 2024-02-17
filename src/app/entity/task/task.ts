export class Task {
  constructor(public id: number,
              public title: string,
              public importance: string,
              public description: string,
              public creationDate: string,
              public deadLine: Date) {
  }
}
