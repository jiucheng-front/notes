class Car {
    constructor({
        status,
        color,
        price,
        callBack,
    }) {
        this.status = status || 0
        this.color = color
        this.price = price
        // status 改變調用callBack(status)
        this.callBack = callBack
        // 
        this._init()
    }
    _init() {
        if (!this.status) {
            this.status = 1
        }
        this.status = !this.status
        this.callBack(this.status)
    }
}
module.exports = Car