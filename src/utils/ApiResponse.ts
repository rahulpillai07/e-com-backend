class ApiResponse {
    statusCode:any;
    data:any;
    message:any;
    

    constructor(statusCode:any, data:any, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
    }
}

export { ApiResponse }