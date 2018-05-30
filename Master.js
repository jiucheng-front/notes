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
        this.status = this.status == 0 ? 1 : 0
        this.callBack(this.status)
    }
    _resetStatus(state) {
        var a = 0

    }
}

module.exports = Master