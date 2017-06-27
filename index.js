var  list =[{
    title:"吃饭",
    checked:false
},{
    title:"喝水",
    checked:true
}];
var setLocal = {
    save(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    get(key){
        return JSON.parse(localStorage.getItem(key));
    }
}
var list = setLocal.get("todos") || [];
var vm = new Vue({
    el:".main",
    data:{
        list:list,
        todo:"",
        editingTodo:"",
        before:"",
        visbility:"all"
    },
    wacth:{
        list:function(){
            setLocal.save("todos",this.list);
        }
    },
    computed:{//计算属性有缓存  当他的依赖发生改变的时候才会从新计算
        getChecked:function(){
            return list.filter(function(todo){ return !todo.checked}).length;
        },
        filterList:function(){
            var filter = {
                all:function(list){
                    return list;
                },
                unfinish:function(list){
                    return list.filter(function(item){
                        return !item.checked;
                    })
                },
                finish:function(list){
                    return list.filter(function(item){
                        return item.checked;
                    })
                }
            }
            return filter[this.visbility] ? filter[this.visbility](this.list) : filter["all"](this.list)
        }
    },
    methods:{
        addTodo: function(e){
            // var value = e.target.value;//操作dom
            console.log(this)
            this.list.push({
                title:this.todo,//数据驱动
                checked:false
            })
            this.todo = "";
        },
        deleteTodo:function(todo,e){//第二个参数 事件对象
            var index = this.list.indexOf(todo);
            this.list.splice(index,1);
        },
        editTodo:function(todo){
            console.log(this)
            this.editingTodo = todo;
            this.before = todo.title;
        },
        editedTodo:function(){
            this.editingTodo = "";
        },
        cancelTodo:function(todo){
            todo.title = this.before;
            this.before = "";
            this.editingTodo = "";
        }
    },
    directives:{
        focus:{
            update(el,binding){
                console.log(el,binding)
                if(binding.value){
                    el.focus();
                }
            }
        }
    }
});

function changeHash(){
    var hash = window.location.hash.slice(1);
    vm.visbility = hash;
}
changeHash();
window.addEventListener('hashchange',changeHash);
