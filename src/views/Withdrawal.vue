<template>
  <div>
    <van-nav-bar title="提现" left-arrow @click-left="onClickLeft" />
    <div class="zichan">
      <span>账户环保金余额(元)</span>
      <span><span>￥</span>{{ money | xiaoshudian }}</span>
    </div>
    <div>
      <van-cell-group>
        <van-field
          v-model="tixianjine"
          label="提现金额"
          placeholder="请输入提现的金额"
          @input="onChange"
          :error-message="msg"
        >
          <template #button>
            <van-button size="small" round type="primary" @click="quanbutixian"
              >全部提现</van-button
            >
          </template>
        </van-field>
      </van-cell-group>
    </div>
    <div>
      <van-cell
        is-link
        title="提现方式"
        :value="fangshi"
        @click="show = true"
      />
      <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        close-on-click-action
        @select="onSelect"
      />
    </div>
    <van-button type="primary" block @click="tixian">提现</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      money: "",
      tixianjine: "",
      msg: "",
      show: false,
      actions: [{ name: "微信零钱" }, { name: "银行卡" }],
      fangshi: "微信零钱",
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    getmoney() {
      this.money = this.$route.query.money
    },
    // 只能输入汉字 并且在合理范围之内
    onChange(val) {
      if (!/^\d+(\.\d{0,2})?$/.test(val)) {
        this.msg = "只能输入正数，小数点后保留两位"
        if (!val) {
          this.msg = "不能为空"
        }
      } else {
        if (val * 1 > this.money * 1) {
          this.msg = "提现金额不能大于总金额"
        } else if (val * 1 < 0.5) {
          this.msg = "提现金额必须大于0.5"
        } else {
          this.msg = ""
        }
      }
    },
    quanbutixian() {
      this.tixianjine = this.money
      this.msg = ""
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false
      this.fangshi = item.name
      // this.$toast(item.name)
    },
    tixian() {
      if (this.tixianjine * 1 < 0.5) {
        this.$toast.fail("提现失败 金额不能小于0.5")
        return
      } else if (this.tixianjine * 1 > this.money * 1) {
        this.$toast.fail("提现失败 金额不能大于已有金额")
        return
      } else {
        let clientId = sessionStorage.getItem("id")
        let url = `/tixian/${this.fangshi}提现/${this.tixianjine}/${clientId}`
        // console.log(url)
        this.axios
          .get(url)
          .then((res) => {
            // console.log(res)
            this.money = this.money * 1 - this.tixianjine * 1
            this.$toast.success("提现成功")
          })
          .catch((err) => {
            this.$toast.fail("提现失败")
          })
      }
    },
  },
  mounted() {
    this.getmoney()
  },
  filters: {
    // 保留两位小数点
    xiaoshudian(value) {
      var toFixedNum = Number(value).toFixed(3)
      var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1)
      return realVal
    },
  },
}
</script>

<style lang="scss" scoped>
// 头部背景样式
::v-deep .van-nav-bar {
  background-color: #25c89b;
}
//标题样式
::v-deep .van-nav-bar__title {
  color: #fff;
}
// 头部返回按钮旁边的文字
::v-deep .van-nav-bar__text {
  color: #fff;
}
//头部的返回按钮样式
::v-deep .van-nav-bar__arrow {
  color: #fff;
}
.zichan {
  background-color: #25c89b;
  color: #fff;
  padding: 1rem;
  span {
    display: block;
  }
  :nth-child(1) {
    font-size: 1.1rem;
  }
  :nth-child(2) {
    font-size: 2.3rem;
    padding: 1.9rem 0;
    span {
      display: inline;
    }
  }
}
// 按钮底部定位
.van-button--block {
  position: fixed;
  bottom: 0;
}
</style>
