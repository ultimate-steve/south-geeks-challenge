class Params {
  document = "";
  collection = "";
  page = 1;
  perPage = 30;
  data = {};

  constructor(req) {
    switch (req.method) {
      case "GET": {
        if (req.query.page) {
          this.page = parseInt(req.query.page, 10);
        }
        if (req.query.perPage) {
          this.perPage = parseInt(req.query.perPage, 10);
        }
        if(req.params.id)
        {
          this.id = req.params.id;
        }
        break;
      }
      case "POST": 
      case "PUT": {
        const keys = Object.keys(req.body);
        keys.forEach((key) => {
          this.data[key] = req.body[key];
        });
        break;
      }
      default:
        break;
    }
  }
}

module.exports = Params;
