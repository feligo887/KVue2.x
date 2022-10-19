//  观察目标
class Subject {
    constructor () {
        this.name = '观察目标';
        this.state = '初始化';

        //  存放观察者
        this.observerArr = [];
    }
    attrObserver (wacth) {
        //  收集观察者
        this.observerArr.push(wacth);

    }
    setState (state) {
        this.state = state;
        this.observerArr.forEach( item => {

            // console.log(this);

            //  返回整个观察目标个观察者
            item.update(this);
        })

    }

}
//  观察者
class Observer {
    constructor (name) {
        this.name = name;
    }
    update (subject) {
        console.log(`${this.name}，已经观察到“${subject.name}”的内容发生了改变`);
    }
}

const subject = new Subject();

const observer1 = new Observer('观察者1');
const observer2 = new Observer('观察者2');


subject.attrObserver(observer1);
subject.attrObserver(observer2);


subject.setState('被观察');