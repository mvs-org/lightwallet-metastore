exports.app = {
  "http" : {
    "port" : ( process.env.PORT ) ? process.env.PORT : "8090"
  }
};

exports.cors={
    origin: "*",
    headers: "x-access-token, Origin, X-Requested-With, Content-Type, Accept",
    methods: "GET, POST, PUT, DELETE, OPTIONS"
};
