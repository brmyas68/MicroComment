'use strict';
const PROTO_PATH = './pb/Comment.proto';
const PORT = 5000;

var  pbCommentService = require("./pb/pbCommentService")
var  protoLoader = require('@grpc/proto-loader');
var  grpc = require('@grpc/grpc-js');

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  };

const    packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const    protoDescriptor   = grpc.loadPackageDefinition(packageDefinition);
const    protoCommentService   = protoDescriptor.protoCommentService;

const server = new grpc.Server();

server.addService(protoCommentService.CommentService.service, {
    Insert     : pbCommentService.Insert,
    GetByWhere : pbCommentService.GetByWhere
});

server.bindAsync(`127.0.0.1:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log( `Server running at  127.0.0.1:${PORT}` );
    server.start();
  });