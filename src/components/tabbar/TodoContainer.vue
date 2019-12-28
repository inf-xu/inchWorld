<template>
  <div class="todo-container">
    <todoSearch @getText="submitTodo" :info="'create a todo'" :type="'text'"></todoSearch>

    <div class="mui-card">
      <div class="mui-card-header">
        <h4>ToDo</h4>
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <ul id="OA_task_1" class="mui-table-view">
            <li class="mui-table-view-cell" v-for="(item, index) in todoList" :key="index">
              <div class="mui-slider-right mui-disabled">
                <a class="mui-btn mui-btn-red" @click.prevent="deleteTodoItem(index)">删除</a>
              </div>
              <div :class="{'mui-slider-handle': 'true', 'div-bar': item.done}">
                <div>
                  <mt-badge type="primary" class="right-pad">{{index + 1}}</mt-badge>
                  {{ item.name }}
                </div>
                <span @click="updateTodoItem(index)">
                  <mt-spinner type="double-bounce"></mt-spinner>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
import { Toast } from "mint-ui";
import todoSearch from "../subcomponents/HandleSearch.vue"

export default {
  data() {
    return {
      todoList: [
        {
          id: 0,
          name: "创建我的第一个 Todo",
          time: "2019-11-8 17:37",
          done: false
        },{
          id: 0,
          name: "完成我的第一个 Todo",
          time: "2019-12-26 11:37",
          done: true
        }
      ],
    };
  },
  created() {
    this.getTodoList();
  },
  methods: {
    getTodoList() {
      if (localStorage.getItem("todos") != undefined)
      this.todoList = JSON.parse(
        localStorage.getItem("todos")
      );
    },
    submitTodo(nemTodo) {
      this.newTodoItem = nemTodo
      
      if (this.newTodoItem.trim() == "") return ;
      const o = {
        id: this.todoList.length || 0,
        name: this.newTodoItem,
        time: new Date(),
        done: false
      };
      this.todoList.push(o);
      localStorage.setItem("todos", JSON.stringify(this.todoList));
    },
    deleteTodoItem(index) {
      this.todoList.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(this.todoList));
    },
    updateTodoItem(index) {
      this.todoList[index].done = !this.todoList[index].done
      localStorage.setItem("todos", JSON.stringify(this.todoList));
    }
  },
  components: {
    todoSearch
  }
};
</script>

<style lang="scss" scoped>
.todo-container {
  .mui-card {
    .mui-slider-handle {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      .right-pad {
        margin-right: 5px;
      }
    }
    .div-bar {
      text-decoration: line-through;
      color: gray;
    }
  }
}
</style>