'use strict';
const grpc = require('@grpc/grpc-js');
//const { IComment } = require('../MySQLCommentService/IComment');
const    CommentService   = require('../MySQLCommentService/CommentService');
 
  function Insert(call, callback) {
      
      var CommentInsert =  call.request.Comment;
      CommentService.Insert(CommentInsert).then((state) =>{
            if(state){
                callback(null,
                    {
                        CommentState : state ,
                        Status:{
                            StatusCode    : 0, // StatusCode.Status200  ,
                            StatusMessage : 0, // StatusMessage.SUCCESS,
                        }
                });
            }else {
                callback(null,
                    {
                        CommentState : state ,
                        Status:{
                            StatusCode    : 1,//  StatusCode.Status400  ,
                            StatusMessage : 1,//  StatusMessage.FAILED,
                        }
                });
            }
      });
      //.catch((e)=>{   callback('error', e); });

  }
  
  function GetByWhere(call, callback) {
     
    _CommentUserID = call.request.CommentUserID;
    _CommentProductID = call.request.CommentProductID;

       CommentService.GetByWhere(_CommentUserID,_CommentProductID).then((Comments) =>{
            if(Comments != null){
                Comments.forEach(function(_Comment) {
                    call.write({
                        Comment: _Comment,
                        Status:{
                            StatusCode    : 0,//StatusCode.Status200  ,
                            StatusMessage : 0,//StatusMessage.SUCCESS,
                        },
                    });
                });
                call.end();
                
            }else {
                callback(null,
                    {
                        Comment : null ,
                        Status:{
                            StatusCode    : 1,//StatusCode.Status400  ,
                            StatusMessage : 1,//StatusMessage.FAILED,
                        }
                });
                call.end();
            }
      });
      //.catch((e)=>{   callback('error');   call.end();});
  }


  module.exports={
    Insert,
    GetByWhere,
  }
