class PublishSubscribe {

    constructor () {

    }

    //  事件收集器
    subscribes = {} 

    
    /**
     * 订阅函数
     * @param {*} val 事件名称
     * @param {*} cb 事件对应的回调函数
     * **/ 
    on (val,cb) {
        //  取出事件 如果没有，就新建一个数组
        const subscribe = this.subscribes[val] || [];

        //  把事件放入收集器，不管有或者没有事件数组，我们都给该事件key添加新的事件。
        this.subscribes[val] = [...subscribe,cb];

    }

    /**
     * 发布函数
     * @param {*} val 事件名称
     * @param {*} agrs 事件对应的参数
     * **/ 

    emit (val,...agrs) {

        if(!this.subscribes[val]) return console.error('没有此事件');

        this.subscribes[val].forEach(cb => cb(agrs));

        console.log(this.subscribes);
    }
}

const pub = new PublishSubscribe();

pub.on('订阅事件', (e) => console.log('订阅事件',e))

pub.on('订阅事件1', (e) => console.log('订阅事件',e))

setTimeout(() => {
    pub.emit('订阅事件1','订阅事件1:emit')
},1000);

