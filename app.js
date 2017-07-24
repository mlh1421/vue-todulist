var store = {
    set: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get: function (key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }
}
var list = store.get('title');
// console.log(list);
// var list=[
//     {
//         title:'吃法',
//         isC:true
//     }
// ]
var filter={
    all:function(){
        return list;
    },
    finished:function(){
        return list.filter(function(item){
            return item.isChecked;
        })
    },
    unfinished:function(){
        return list.filter(function(item){
            return !item.isChecked;
        })
    }
}
var vm = new Vue({
    el: '#app',
    data: {
        list: list,
        title: '',
        todoing: '',
        visibility: 'all'
    },
    computed:{
        filteredList:function(){
            return filter[this.visibility]?filter[this.visibility]():list;      //函数必须要执行
        }
    },
    methods: {
        greet: function () {
            if (this.title == '') {
                alert('请输入内容');
            } else {
                this.list.push({
                    title: this.title,
                    isChecked: false
                })
                this.title = ''
            }
        },
        deleteTodo: function (item) {       //delete是一个js操作符
            var index = this.list.indexOf(item);
            this.list.splice(index, 1);
        },
        edit: function (item) {
            this.todoing = item;
        },
        edited: function () {
            this.todoing = ''     //失去焦点
        }
    },
    watch: {
        list: {
            handler: function () {
                store.set('title', list);
            },
            deep: true
        }
    },
    directives: {
        focus: function (el) {
            el.focus();     //自定义事件
        },
        blur: function (el) {
            el.blur();
        }
    }
})
function hashChange(){
    var hash=window.location.hash.slice(1);
    vm.visibility=hash;     利用hash控制显示

}
addEventListener('hashchange',hashChange);