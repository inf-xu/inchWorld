<template>
  <div class="mui-card">
    <div class="mui-card-content">
      <div class="mui-card-content-inner strong-info">
        <div class="mui-input-row mui-search">
          <div class="input-group">
            <input
              :type="type"
              class="form-control"
              v-model="newTodoItem"
              @keyup.enter="getText()"
              :placeholder="info"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodoItem: ""
    }
  },
  methods: {
    getText() {
        this.$emit('getText', this.newTodoItem)
        this.newTodoItem = ''
    }
  },
  props: ['info', 'type']
};
</script>

<style lang="scss" scoped>
// .card-radius {
//     border-radius: 5px; 
// }
</style>