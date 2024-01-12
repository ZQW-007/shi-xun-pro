<template>
  <div class="Order">
    <!-- 顶部导航栏 -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="订单" />
    </van-sticky>
    <!-- tab -->
    <div class="tab">
      <van-tabs
        @click="finishedHandler"
        v-model="active"
        sticky
        background="bg.jpg"
        title-active-color="#ea591d"
      >
        <van-tab title="全部订单">
          <div v-if="orderList.length == 0">
            <van-empty description="您没有订单" />
          </div>
          <div v-else>
            <div style="padding: 10px 0em">
              <van-list finished-text="没有更多了">
                <div class="order">
                  <div
                    class="order_details"
                    v-for="item in orderList"
                    :key="item.id"
                  >
                    <div class="order_item" @click="toDetail(item)">
                      <div class="flex_item1">
                        <div v-if="item.orderLines[0].product == null"></div>
                        <img
                          v-else
                          width="100%"
                          height="100%"
                          :src="item.orderLines[0].product.photo"
                          alt=""
                        />
                      </div>
                      <div class="flex_item2">
                        <span class="name"
                          >{{ item.orderLines[0].name }}等</span
                        >
                        <span class="status">{{ item.status }}</span>
                        <p class="address">
                          {{
                            item.address.province +
                            item.address.city +
                            item.address.area +
                            item.address.address
                          }}
                        </p>
                        <div class="date_pirce">
                          <div class="date">
                            {{ item.orderTime | dateFormat }}
                          </div>
                          <div class="pirce">¥{{ item.total }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </van-list>
            </div>
          </div>
          <div style="height: 15px"></div>
        </van-tab>
        <van-tab title="待支付">
          <div v-if="orderList.length == 0">
            <van-empty description="您没有待支付订单" />
          </div>
          <div v-else>
            <div style="padding: 10px 0em">
              <van-list finished-text="没有更多了">
                <div class="order">
                  <div
                    class="order_details"
                    v-for="item in orderList"
                    :key="item.id"
                  >
                    <div class="order_item" @click="toDetail(item)">
                      <div class="flex_item1">
                        <div v-if="item.orderLines[0].product == null"></div>
                        <img
                          v-else
                          width="100%"
                          height="100%"
                          :src="item.orderLines[0].product.photo"
                          alt=""
                        />
                      </div>
                      <div class="flex_item2">
                        <span class="name"
                          >{{ item.orderLines[0].name }}等</span
                        >
                        <span class="status">{{ item.status }}</span>
                        <p class="address">
                          {{
                            item.address.province +
                            item.address.city +
                            item.address.area +
                            item.address.address
                          }}
                        </p>
                        <div class="date_pirce">
                          <div class="date">
                            {{ item.orderTime | dateFormat }}
                          </div>
                          <div class="pirce">¥{{ item.total }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </van-list>
            </div>
          </div>
          <div style="height: 15px"></div>
        </van-tab>
        <van-tab title="待派送">
          <div v-if="orderList.length == 0">
            <van-empty description="您没有待派送订单" />
          </div>
          <div v-else>
            <div style="padding: 10px 0em">
              <van-list finished-text="没有更多了">
                <div class="order">
                  <div
                    class="order_details"
                    v-for="item in orderList"
                    :key="item.id"
                  >
                    <div class="order_item" @click="toDetail(item)">
                      <div class="flex_item1">
                        <div v-if="item.orderLines[0].product == null"></div>
                        <img
                          v-else
                          width="100%"
                          height="100%"
                          :src="item.orderLines[0].product.photo"
                          alt=""
                        />
                      </div>
                      <div class="flex_item2">
                        <span class="name"
                          >{{ item.orderLines[0].name }}等</span
                        >
                        <span class="status">{{ item.status }}</span>
                        <p class="address">
                          {{
                            item.address.province +
                            item.address.city +
                            item.address.area +
                            item.address.address
                          }}
                        </p>
                        <div class="date_pirce">
                          <div class="date">
                            {{ item.orderTime | dateFormat }}
                          </div>
                          <div class="pirce">¥{{ item.total }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </van-list>
            </div>
          </div>
          <div style="height: 15px"></div>
        </van-tab>
        <van-tab title="已完成">
          <div v-if="orderList.length == 0">
            <van-empty description="您没有已完成订单" />
          </div>
          <div v-else>
            <div style="padding: 10px 0em">
              <van-list finished-text="没有更多了">
                <div class="order">
                  <div
                    class="order_details"
                    v-for="item in orderList"
                    :key="item.id"
                  >
                    <div class="order_item" @click="toDetail(item)">
                      <div class="flex_item1">
                        <div v-if="item.orderLines[0].product == null"></div>
                        <img
                          v-else
                          width="100%"
                          height="100%"
                          :src="item.orderLines[0].product.photo"
                          alt=""
                        />
                      </div>
                      <div class="flex_item2">
                        <span class="name"
                          >{{ item.orderLines[0].name }}等</span
                        >
                        <span class="status">{{ item.status }}</span>
                        <p class="address">
                          {{
                            item.address.province +
                            item.address.city +
                            item.address.area +
                            item.address.address
                          }}
                        </p>
                        <div class="date_pirce">
                          <div class="date">
                            {{ item.orderTime | dateFormat }}
                          </div>
                          <div class="pirce">¥{{ item.total }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </van-list>
            </div>
          </div>
          <div style="height: 15px"></div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      active: 0,
      list: {
        page: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    // 获取用户id
    this.getUserInfo().then((r) => {
      this.list.customerId = this.userInfo.id;
      // 获取订单数据
      this.findAllOrderList(this.list);
    });
  },
  computed: {
    ...mapState("user", ["userInfo"]),
    ...mapState("order", ["orderList"]),
  },
  methods: {
    ...mapActions("user", ["getUserInfo"]),
    ...mapActions("order", ["findAllOrderData"]),
    // 获取所有订单数据
    findAllOrderList(list) {
      this.findAllOrderData(list);
    },
    // 点击切换时 切换相应的参数
    finishedHandler(title) {
      if (title === 0) {
        this.list = {
          page: 1,
          pageSize: 10,
          customerId: this.userInfo.id,
        };
        this.findAllOrderList(this.list);
      } else if (title === 1) {
        this.list = {
          page: 1,
          pageSize: 10,
          customerId: this.userInfo.id,
          status: "待支付",
        };
        this.findAllOrderList(this.list);
      } else if (title === 2) {
        this.list = {
          page: 1,
          pageSize: 10,
          customerId: this.userInfo.id,
          status: "待派送",
        };
        this.findAllOrderList(this.list);
      } else if (title === 3) {
        this.list = {
          page: 1,
          pageSize: 10,
          customerId: this.userInfo.id,
          status: "已完成",
        };
        this.findAllOrderList(this.list);
      }
    },
    // 跳转到详情页
    toDetail(item) {
      this.$router.push({
        path: "/OrderDetail",
        query: { item }
      });
    },
  },
};
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #ee0a24;

  ::v-deep .van-nav-bar__title {
    color: white;
  }

  ::v-deep .van-icon {
    color: #fff;
  }
}
.order_main .title {
  height: 58px;
  background-image: linear-gradient(to right, #ea591d, #ee0a24);
  text-align: center;
  line-height: 58px;
  color: #fff;
  letter-spacing: 0.4em;
}

.order {
  margin-top: 1em;
  padding: 0 2em;
}
.order .order_item {
  width: 93%;
  height: 87px;
  margin: 0 0 20px 0;
  box-shadow: 0 0 6px 0 #ccc;
  display: flex;
  padding: 1em 1em;
}
.order .order_details:last-child {
  margin-bottom: 40px;
}
.order .order_item .flex_item1 {
  width: 80px;
  height: 80px;
  background-color: #ea591d;
  border-radius: 50%;
}
.order .order_item .flex_item1 img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.order .order_item .flex_item2 {
  margin-left: 1em;
  flex: 2;
  height: 80px;
}
.order .order_item .flex_item2 .status {
  float: right;
  font-size: 11px;
  color: #f8825d;
}
.order .order_item .flex_item2 .address {
  font-size: 12px;
  margin-top: 1em;
  color: #666;
}
.date_pirce {
  margin-top: 0.5em;
  font-size: 12px;
}
.date {
  float: left;
}
.pirce {
  float: right;
  text-align: right;
}
</style>