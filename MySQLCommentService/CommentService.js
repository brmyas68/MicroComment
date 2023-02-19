      
   
    // const { IComment }  = require('./IComment');
     const  dbMysql      = require('./db');
     
    // var    Comment      = new IComment();

   async function Insert( _IComment )   {
          //  Comment =_IComment; 
            const insertSql = 'INSERT INTO  tbl_comment (Comment_UserID,Comment_ProductID,Comment_Text,Comment_DateTime) VALUES (?,?,?,?)'
            const state = await new Promise((resolve, reject) => {
                            dbMysql.query(insertSql, [_IComment.CommentUserID, _IComment.CommentProductID, _IComment.CommentText,_IComment.CommentDateTime], function (err, result, fields){
                                if (err) throw err;
                                if ((parseInt(result["affectedRows"])) > 0) { 
                                    resolve(true);
                                }else{
                                    resolve(false);
                                }
                            });
                        });
            return  state;
    }

   
    async function  GetByWhere ( CommentUserID,CommentProductID  )  {
        const  selectSql = 'SELECT * FROM  tbl_comment   WHERE  CommentUserID=? AND Comment_ProductID=?';
        const  resultComments = await new Promise((resolve, reject) => {
                    dbMysql.query(selectSql, [CommentUserID,CommentProductID], function (err, result, fields){
                            if (err) throw err;
   
                            resolve(result);
                    });
                });
       return  resultComments;
    }

    
    module.exports ={
           GetByWhere,
           Insert
         
    }

 