export class Responses {
  constructor(
    public timestamp: Date,
    public username: String,
    public phone: String,
    public nps: number,
    public resolution: number,
    public satisfaction: number,
    public verbatim: String
  ) {}
}
