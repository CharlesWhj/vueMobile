<template>
      <input type="text" class="ipt" :value="value" @input="handleNumber"
      :class="{green:bbcolor,red:!bbcolor}" @blur="handleblur">
</template>

<script>
export default {
  props: ['value', 'rules', 'err_msg'],
  data () {
    return {
      bbcolor: false
    }
  },
  // mounted () {
  //   this.bbcolor = !!this.value
  // },
  methods: {
    handleNumber (event) {
      this.$emit('input', event.target.value)
      // console.log(this.rules.test(this.value))
      let tf = this.rules.test(event.target.value)
      // 如果是正则表达式的话
      if (this.rules) {
        if (tf === true) {
          this.bbcolor = true
        } else {
          this.bbcolor = false
        }
      } else {
        this.bbcolor = false
      }
    },
    handleblur (event) {
      // 如果是正则表达式
      let tf = this.rules.test(event.target.value)
      if (this.rules && tf === false) {
        this.$toast.fail(this.err_msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ipt{
    outline: none;
    border: none;
    border-bottom: gold solid 2px;
    width: 314*100vw/360;
    line-height: 40*100vw/360;
    background-color: rgb(242, 242, 242);
    font-size: 18*100vw/360;
}
.green{
  border-bottom-color: green
}
.red{
  border-bottom-color: red
}
</style>
