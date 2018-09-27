/**
 *
 * @authors 彩虹
 * @date    2018-09-26
 * @version 1.0.0
 */
import Vue from 'vue';

// 自定义组件
let confirmMsgVue = Vue.component('alter-component', {
    data() { // 初始化数据
        return {
            alertPopupShow: false,
            alertShowCloseBtn: false
        }
    },
    props: {
        title: {
            type: String,
            default: '温馨提示!'
        },
        message: {
            type: String,
            default: '暂无内容输入'
        },
        confirm: {
            type: Boolean,
            default: false
        },
        sureBtn: {
            type: String,
            default: '确定'
        },
        cancelBtn: {
            type: String,
            default: '取消'
        },
        showCloseBtn: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: 600 // 所有的弹层（子）宽度固定
        }
    },
    template: '\
    <div v-if="alertPopupShow" class="confirm">\
      <div slot="content" class="wrap">\
        <p class="title" v-if="title">{{title}}</p>\
        <div class="cont" v-html="message"></div>\
        <div class="btns">\
          <div class="btn-two" v-if="confirm">\
            <button class="btn-left" @click.stop="cancelFun">{{cancelBtn}}</button>\
            <button class="btn-right" @click.stop="sureFun">{{sureBtn}}</button>\
          </div>\
          <div class="btn-one" @click.stop="sureFun" v-else>\
            <button class="btn-bet">{{sureBtn}}</button>\
          </div>\
        </div>\
      </div>\
    </div>',

    // 处理方法
    methods: {
        // 打开选择器，创建 Promise 对象
        showAlert: function() {
            this.alertPopupShow = true;
            this.promise = new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
            // 返回promise对象
            return this.promise;
        },
        // 确定
        sureFun: function() {
            this.alertPopupShow = false;
            this.resolve(true);
            this.remove();
        },
        // 取消
        cancelFun: function() {
            this.alertPopupShow = false;
            this.reject(false);
            this.remove();
        },
        remove: function() {
            setTimeout(() => {
                this.destroy();
            }, 300);
        },
        destroy: function() {
            this.$destroy();
            document.body.removeChild(this.$el);
        }
    }
});

// 定义插件对象
const confirmMsg = {};

// vue 的 install 方法，用于定义 vue 插件
confirmMsg.install = function(Vue, options) {
    const confirmMsgInstance = Vue.extend(confirmMsgVue);

    let currentAlert;

    // 实例化 vue 实例
    const initInstance = () => {
        currentAlert = new confirmMsgInstance(); // 实例化模板
        let msgBoxEl = currentAlert.$mount().$el; // 编译并挂载
        document.body.appendChild(msgBoxEl); // 插入文档
    };

    // 在 Vue 的原型上添加实例方法，以全局调用
    confirmMsg.open = function(options) {
        // 实例化插件
        if (!currentAlert) {
            initInstance();
        }
        // 传入字符串
        if (typeof options === 'string') {
            currentAlert.message = options;
            // 传入对象，将可枚举的属性全部添加上来
        } else if (typeof options === 'object') {
            Object.assign(currentAlert, options);
        }
        return currentAlert.showAlert()
            .then(val => {
                currentAlert = null;
                return Promise.resolve(val);
            })
            .catch(err => {
                currentAlert = null;
                return Promise.reject(err);
            });
    }
};

export default confirmMsg;