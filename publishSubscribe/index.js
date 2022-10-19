class PublishSubscribe {

    constructor () {

    }

    //  事件收集器
    subscribes = new Map()

    
    /**
     * 订阅函数
     * @param {*} val 事件名称
     * @param {*} cb 事件对应的回调函数
     * **/ 
    on (val,cb) {

        //  创建一个key
        const uuid = getUUID(); 

        //  取出事件 如果没有，就新建一个
        const subscribe = this.subscribes.get(val)|| new Map();
        subscribe.set(uuid,cb);
        this.subscribes.set(val,subscribe)

        // 返回一个回执方便查找
        return [val,uuid];
    }

    /**
     * 发布函数
     * @param {*} val 事件名称
     * @param {*} agrs 事件对应的参数
     * **/ 

    emit (val,...agrs) {
            if(!this.subscribes.has(val)) return console.error('emit: 该事件不存在:',val);

            for(let [_,item] of this.subscribes.get(val)) {
                item(agrs);
            }

    }

    /**
     * 取消时间函数
     * @param {*} val 事件名称
     * @param {*} cb 事件对应的回调函数
     * **/ 

    remove ([key,val]) {
        if(this.subscribes.has(key) && this.subscribes.get(key).has(val)) {
            this.subscribes.get(key).delete(val);
        }else {
            return console.error('remove: 该事件不存在:',key,val);
        }
    }
}

const getUUID = () => {
    const time = new Date().toLocaleTimeString();
    const number = Math.random() * 1000000000;
    return `${time}:${Math.round(number)}`;

}

const publishSubscribe = new PublishSubscribe();

const pubA = publishSubscribe.on('订阅事件1', (e) => console.log('订阅事件1',e));

const pubB = publishSubscribe.on('订阅事件2', (e) => console.log('订阅事件2',e));

publishSubscribe.remove(pubB);

setTimeout(() => {
    publishSubscribe.emit('订阅事件1','订阅事件1:emit')
    publishSubscribe.emit('订阅事件2','订阅事件2:emit')

    console.log(publishSubscribe.subscribes);
},1000);

