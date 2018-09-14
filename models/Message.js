function error(code, message) {
    return {
        message: message,
        code: code
    };
};

function success(data,message){
    return {
        message: message,
        result: data
    };
}

module.exports = {
    error:error,
    success:success
};
