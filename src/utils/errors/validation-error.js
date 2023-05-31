const { StatusCodes }=require('http-status-codes')

class ValidationError extends Error{
    constructor(error){
        super();
        let explanation=[];
        error.errors.forEach((err) => {
            explanation.push(err)
        });
        this.name="ValidationError"
        this.message="Not able to Validate the data sent in the request"
        this.explanation=explanation
        this.statusCode=StatusCodes.BAD_REQUEST
    }
}

module.exports=ValidationError;