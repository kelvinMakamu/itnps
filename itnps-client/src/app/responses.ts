export class Responses {

    // constructor(
    //     public timestamp: Date,
    //     public username: String,
    //     public phone: String,
    //     public nps: number,
    //     public resolution: number,
    //     public satisfaction: number,
    //     public verbatim: String
    //   ) {}

      constructor(
        public date: Date,
        public agent: String,
        public channel: String,
        public resolution: number,
        public satisfaction: number,
        public nps: number,
        public verbatim: String
      ) {}
}
