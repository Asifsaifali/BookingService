const { StatusCodes }=require('http-status-codes')

class ValidationError extends Error{
    constructor(errror){
        super();
        let explanation=[];
        errror.errror.forEach((err) => {
            explanation.push(err)
        });
        this.name="ValidationError"
        this.message="Not ab le to Validate the data sent in the request"
        this.explanation=explanation
        this.statusCode=StatusCodes.BAD_REQUEST
    }
}

module.exports=ValidationError;