class Master {
    constructor({
        status,
        branch,
        anthor,
        callBack,
    }) {
        this.status = status || 0
        this.branch = branch || "master"
        this.anthor = anthor || "Stephen Curry"
        this.callBack = callBack
        // 
        this._init()
    }
    _init() {
        this.status = !this.status
        this.callBack(this.status)
    }
}

module.exports = Master