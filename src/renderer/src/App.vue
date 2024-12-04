<template>
  <div
    v-if="dev"
    class="dev-bar">
    {{ 'Stapxs QQ Lite Development Mode' }}
    {{ ' / fps: ' + fps.value }}
  </div>
  <div
    v-if="runtimeData.sysConfig.opt_no_window"
    class="top-bar"
    name="appbar">
    <div
      class="bar-button"
      @click="barMainClick()" />
    <div class="space" />
    <div class="controller">
      <div
        class="min"
        @click="controllWin('minimize')">
        <font-awesome-icon :icon="['fas', 'minus']" />
      </div>
      <div
        class="close"
        @click="controllWin('close')">
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </div>
    </div>
  </div>
  <div
    v-if="runtimeData.tags.platform == 'darwin'"
    class="controller mac-controller" />
  <div id="base-app">
    <div class="main-body">
      <ul
        :style="
          get('fs_adaptation') > 0
            ? `padding-bottom: ${get('fs_adaptation')}px;`
            : ''
        ">
        <li
          id="bar-home"
          :class="
            (tags.page == 'Home' ? 'active' : '') +
              (loginInfo.status ? ' hiden-home' : '')
          "
          @click="changeTab('主页', 'Home', false)">
          <font-awesome-icon :icon="['fas', 'home']" />
          <span>{{ $t('主页') }}</span>
        </li>
        <li
          id="bar-msg"
          :class="tags.page == 'Messages' ? 'active' : ''"
          @click="changeTab('信息', 'Messages', true)">
          <font-awesome-icon :icon="['fas', 'envelope']" />
          <span>{{ $t('信息') }}</span>
        </li>
        <li
          id="bar-friends"
          :class="tags.page == 'Friends' ? 'active' : ''"
          @click="changeTab('列表', 'Friends', true)">
          <font-awesome-icon :icon="['fas', 'user']" />
          <span>{{ $t('列表') }}</span>
        </li>
        <div class="side-bar-space" />
        <li
          :class="tags.page == 'Options' ? 'active' : ''"
          @click="changeTab('设置', 'Options', false)">
          <font-awesome-icon :icon="['fas', 'gear']" />
          <span>{{ $t('设置') }}</span>
        </li>
      </ul>
      <div
        :style="
          get('fs_adaptation') > 0
            ? `height: calc(100% - ${75 + Number(get('fs_adaptation'))}px);`
            : ''
        ">
        <div
          v-if="tags.page == 'Home'"
          :name="$t('主页')">
          <div class="home-body">
            <div class="login-pan-card ss-card">
              <font-awesome-icon
                :icon="['fas', 'circle-nodes']" />
              <p>{{ $t('连接到 OneBot') }}</p>
              <form
                @submit.prevent
                @submit="connect">
                <label>
                  <font-awesome-icon
                    :icon="['fas', 'link']" />
                  <input
                    id="sev_address"
                    v-model="loginInfo.address"
                    :placeholder="$t('连接地址')"
                    class="ss-input"
                    autocomplete="off">
                </label>
                <label>
                  <font-awesome-icon
                    :icon="['fas', 'lock']" />
                  <input
                    id="access_token"
                    v-model="loginInfo.token"
                    :placeholder="$t('连接密钥')"
                    class="ss-input"
                    type="password"
                    autocomplete="off">
                </label>
                <div style="display: flex">
                  <label class="default">
                    <input
                      id="in_"
                      v-model="tags.savePassword"
                      type="checkbox"
                      name="save_password"
                      @click="savePassword">
                    <a>{{ $t('记住密码') }}</a>
                  </label>
                  <div style="flex: 1" />
                  <label
                    class="default"
                    style="justify-content: flex-end">
                    <input
                      v-model="
                        runtimeData.sysConfig
                          .auto_connect
                      "
                      type="checkbox"
                      name="auto_connect"
                      @click="saveAutoConnect">
                    <a>{{ $t('自动连接') }}</a>
                  </label>
                </div>
                <button
                  id="connect_btn"
                  class="ss-button"
                  type="submit"
                  @mousemove="afd">
                  {{ $t('连接') }}
                </button>
              </form>
              <a
                href="https://github.com/Stapxs/Stapxs-QQ-Lite-2.0#%E5%BF%AB%E9%80%9F%E4%BD%BF%E7%94%A8"
                target="_blank"
                style="margin-bottom: -20px">{{ $t('如何连接') }}</a>
              <div
                class="wave-pan"
                style="margin-left: -30px">
                <svg
                  id="login-wave"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 24 170 70"
                  preserveAspectRatio="none"
                  shape-rendering="auto">
                  <defs>
                    <path
                      id="gentle-wave"
                      d="M -160 44 c 30 0 58 -18 88 -18 s 58 18 88
                       18 s 58 -18 88 -18 s 58 18 88 18 v 44 h -352 Z" />
                  </defs>
                  <g class="parallax">
                    <use
                      xlink:href="#gentle-wave"
                      x="83"
                      y="0" />
                    <use
                      xlink:href="#gentle-wave"
                      x="135"
                      y="3" />
                    <use
                      xlink:href="#gentle-wave"
                      x="185"
                      y="5" />
                    <use
                      xlink:href="#gentle-wave"
                      x="54"
                      y="7" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="tags.page == 'Messages'"
          id="messageTab">
          <Messages
            :chat="runtimeData.chatInfo"
            @user-click="changeChat"
            @load-history="loadHistory" />
        </div>
        <div v-if="tags.page == 'Friends'">
          <Friends
            :list="runtimeData.userList"
            @load-history="loadHistory"
            @user-click="changeChat" />
        </div>
        <div class="opt-main-tab">
          <Options
            :show="tags.page == 'Options'"
            :class="tags.page == 'Options' ? 'active' : ''"
            :config="runtimeData.sysConfig" />
        </div>
      </div>
    </div>
    <component
      :is="runtimeData.pageView.chatView"
      v-if="
        loginInfo.status &&
          runtimeData.chatInfo &&
          runtimeData.chatInfo.show.id != 0
      "
      v-show="tags.showChat"
      ref="chat"
      :mumber-info="
        runtimeData.chatInfo.info.now_member_info == undefined
          ? {}
          : runtimeData.chatInfo.info.now_member_info
      "
      :merge-list="runtimeData.mergeMessageList"
      :list="runtimeData.messageList"
      :chat="runtimeData.chatInfo"
      @user-click="changeChat" />
    <TransitionGroup
      class="app-msg"
      name="appmsg"
      tag="div">
      <div
        v-for="msg in appMsgs"
        :key="'appmsg-' + msg.id">
        <div><font-awesome-icon :icon="['fas', msg.svg]" /></div>
        <a>{{ msg.text }}</a>
        <div
          v-if="!msg.autoClose"
          @click="popInfo.remove(msg.id)">
          <font-awesome-icon :icon="['fas', 'xmark']" />
        </div>
      </div>
    </TransitionGroup>
    <Transition>
      <div
        v-if="runtimeData.popBoxList.length > 0"
        class="pop-box">
        <div
          :class="
            'pop-box-body ss-card' +
              (runtimeData.popBoxList[0].full ? ' full' : '') +
              (get('option_view_no_window') == true ? '' : ' window')
          "
          :style="
            'transform: translate(-50%, calc(-50% - ' +
              (runtimeData.popBoxList.length > 3
                ? 3
                : runtimeData.popBoxList.length) *
              10 +
              'px));' +
              (get('fs_adaptation') > 0
                ? ` margin-bottom: ${40 + Number(get('fs_adaptation'))}px;`
                : '')
          ">
          <header
            v-show="runtimeData.popBoxList[0].title != undefined">
            <div v-if="runtimeData.popBoxList[0].svg != undefined">
              <font-awesome-icon
                :icon="['fas', runtimeData.popBoxList[0].svg]" />
            </div>
            <a>{{ runtimeData.popBoxList[0].title }}</a>
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              @click="removePopBox" />
          </header>
          <div
            v-if="runtimeData.popBoxList[0].html"
            v-html="runtimeData.popBoxList[0].html" />
          <component
            :is="runtimeData.popBoxList[0].template"
            v-else
            :data="runtimeData.popBoxList[0].data"
            v-bind="runtimeData.popBoxList[0].templateValue" />
          <div
            v-show="runtimeData.popBoxList[0].button"
            class="button">
            <button
              v-for="(button, index) in runtimeData.popBoxList[0]
                .button"
              :key="'pop-box-btn' + index"
              :class="
                'ss-button' +
                  (button.master == true ? ' master' : '')
              "
              @click="button.fun">
              {{ button.text }}
            </button>
          </div>
          <div class="pop-box-more">
            <div
              v-for="index in runtimeData.popBoxList.length"
              :key="'pop-more-' + index"
              :data-id="index"
              :class="
                index > runtimeData.popBoxList.length - 1
                  ? 'hid'
                  : ''
              "
              :style="
                'margin:-' +
                  2 * (index - 1) +
                  'px ' +
                  (20 * index - 1 - 2 * (index - 1)) +
                  'px 0 ' +
                  (20 * index - 1 - 2 * (index - 1)) +
                  'px;'
              " />
          </div>
        </div>
        <div
          @click="
            popQuickClose(runtimeData.popBoxList[0].allowQuickClose)
          " />
      </div>
    </Transition>
    <viewer
      v-show="runtimeData.tags.viewer.show"
      ref="viewer"
      class="viewer"
      :options="viewerOpt"
      :images="runtimeData.chatInfo.info.image_list"
      @inited="viewerInited"
      @hide="viewerHide"
      @show="viewerShow">
      <template #default="scope">
        <img
          v-for="info in scope.images"
          :key="'imgView-' + info.index"
          :src="info.img_url">
      </template>
    </viewer>
  </div>
</template>

<script lang="ts">
    import Spacing from 'spacingjs/src/spacing'
    import app from '@renderer/main'
    import Option from '@renderer/function/option'
    import Umami from '@stapxs/umami-logger-typescript'

    import { defineComponent, defineAsyncComponent } from 'vue'
    import { Connector, login as loginInfo } from '@renderer/function/connect'
    import { Logger, popList, PopInfo, LogType } from '@renderer/function/base'
    import { runtimeData } from '@renderer/function/msg'
    import { BaseChatInfoElem } from '@renderer/function/elements/information'
    import {
        LocalNotificationsPlugin,
        LocalNotificationSchema,
        ActionType
    } from '@capacitor/local-notifications'
    import * as App from './function/utils/appUtil'

    import Options from '@renderer/pages/Options.vue'
    import Friends from '@renderer/pages/Friends.vue'
    import Messages from '@renderer/pages/Messages.vue'
    import Chat from '@renderer/pages/Chat.vue'
    import { Notify } from './function/notify'
    import { sendMsgRaw } from './function/utils/msgUtil'
    import { parseMsg } from './function/sender'

    export default defineComponent({
        name: 'App',
        components: {
            Options,
            Friends,
            Messages,
            Chat,
        },
        data() {
            return {
                dev: import.meta.env.DEV,
                Connector: Connector,
                defineAsyncComponent: defineAsyncComponent,
                save: Option.runASWEvent,
                get: Option.get,
                popInfo: new PopInfo(),
                appMsgs: popList,
                loadHistory: App.loadHistory,
                loginInfo: loginInfo,
                runtimeData: runtimeData,
                tags: {
                    page: 'Home',
                    showChat: false,
                    isSavePwdClick: false,
                    savePassword: false,
                },
                viewerOpt: {
                    inline: false,
                    button: false,
                    title: false,
                    navbar: false,
                    toolbar: {
                        prev: true,
                        rotateLeft: true,
                        reset: true,
                        rotateRight: true,
                        next: true,
                    },
                },
                viewerBody: undefined as HTMLDivElement | undefined,
                fps: {
                    last: Date.now(),
                    ticks: 0,
                    value: 0,
                },
            }
        },
        mounted() {
            const logger = new Logger()
            window.moYu = () => {
                return 'undefined'
            }
            // 页面加载完成后
            window.onload = async () => {
                // 初始化全局参数
                runtimeData.tags.isCapacitor = window.Capacitor != undefined
                         && window.Capacitor.isNativePlatform()
                runtimeData.tags.isElectron = window.electron != undefined
                runtimeData.plantform.reader = window.electron?.ipcRenderer
                if (runtimeData.plantform.reader) {
                    runtimeData.tags.platform =
                        await runtimeData.plantform.reader.invoke('sys:getPlatform')
                    runtimeData.tags.release =
                        await runtimeData.plantform.reader.invoke('sys:getRelease')
                }
                if(runtimeData.tags.isCapacitor) {
                    runtimeData.tags.platform = window.Capacitor.getPlatform()
                    runtimeData.plantform.capacitor = window.Capacitor
                    runtimeData.plantform.pulgins = window.Capacitor.Plugins
                }
                app.config.globalProperties.$viewer = this.viewerBody
                // 初始化波浪动画
                runtimeData.tags.loginWaveTimer = this.waveAnimation(
                    document.getElementById('login-wave'),
                )
                // AMAP：初始化高德地图
                window._AMapSecurityConfig = import.meta.env.VITE_AMAP_SECRET
                // =============================================================
                // 初始化功能
                App.createMenu() // Electron：创建菜单
                App.createIpc() // Electron：创建 IPC 通信
                // 加载开发者相关功能
                if (this.dev) {
                    document.title = 'Stapxs QQ Lite (Dev)'
                    // 布局检查工具
                    Spacing.start()
                    // FPS 检查
                    this.rafLoop()
                }
                // 加载设置项
                runtimeData.sysConfig = Option.load()
                // PS：重新再应用部分需要加载完成后才能应用的设置
                Option.run('opt_dark', Option.get('opt_dark'))
                Option.run('opt_auto_dark', Option.get('opt_auto_dark'))
                Option.run('theme_color', Option.get('theme_color'))
                Option.run(
                    'opt_auto_win_color',
                    Option.get('opt_auto_win_color'),
                )
                if (Option.get('opt_no_window') == true) {
                    const app = document.getElementById('base-app')
                    if (app) app.classList.add('withBar')
                }
                Option.runAS('opt_auto_gtk', Option.get('opt_auto_gtk'))
                // 基础初始化完成
                logger.debug('欢迎使用 Stapxs QQ Lite！')
                logger.debug('当前启动模式为: ' + this.dev ? 'development' : 'production')
                logger.add(LogType.DEBUG, 'Electron 环境: '
                    + runtimeData.tags.isElectron, window.electron)
                logger.add(LogType.DEBUG, 'Capacitor 环境: '
                    + runtimeData.tags.isCapacitor, window.Capacitor)
                // 加载额外样式
                App.loadAppendStyle()
                const baseApp = document.getElementById('base-app')
                if(baseApp) {
                    baseApp.style.setProperty('--safe-area-bottom',
                        (Option.get('fs_adaptation') > 0 ? Option.get('fs_adaptation') : 0) + 'px')
                    baseApp.style.setProperty('--safe-area-top', '0')
                    baseApp.style.setProperty('--safe-area-left', '0')
                    baseApp.style.setProperty('--safe-area-right', '0')
                    // Capacitor：移动端初始化安全区域
                    if(runtimeData.tags.isCapacitor) {
                        const safeArea = await runtimeData.plantform.
                            pulgins.SafeArea?.getSafeArea()
                        if(safeArea) {
                            baseApp.style.setProperty('--safe-area-top', safeArea.top + 'px')
                            baseApp.style.setProperty('--safe-area-bottom', safeArea.bottom + 'px')
                            baseApp.style.setProperty('--safe-area-left', safeArea.left + 'px')
                            baseApp.style.setProperty('--safe-area-right', safeArea.right + 'px')
                        }
                    }
                }
                // Capacitor：通知相关初始化
                if(runtimeData.tags.isCapacitor) {
                    const Notice = runtimeData.plantform.capacitor.Plugins
                        .LocalNotifications as LocalNotificationsPlugin
                    const permission = await Notice.checkPermissions()
                    if(permission.display.indexOf('prompt') != -1) {
                        await Notice.requestPermissions()
                    } else if(permission.display.indexOf('denied') != -1) {
                        logger.error(null, '通知权限已被拒绝')
                    } else {
                        logger.debug('通知权限已开启')
                        // 注册通知类型
                        Notice.registerActionTypes({
                            types:[{
                                id: 'msgQuickReply',
                                actions: [{
                                    id: 'REPLY_ACTION',
                                    title: '快速回复',
                                    requiresAuthentication: true,
                                    input: true,
                                    inputButtonTitle: '发送',
                                    inputPlaceholder: '输入回复内容……'
                                }]
                            }] as ActionType[]
                        })
                        // 注册相关事件
                        Notice.addListener('localNotificationActionPerformed', (info) => {
                            const notification =
                                info.notification as LocalNotificationSchema
                            if(info.actionId == 'tap') {
                                // PS：通知被点击后会自动被关闭，所以这里不需要处理
                                App.jumpToChat(notification.extra.userId,
                                    notification.extra.msgId)
                            } else if(info.actionId == 'REPLY_ACTION') {
                                // 快速回复
                                sendMsgRaw(
                                    notification.extra.userId,
                                    notification.extra.chatType,
                                    parseMsg(
                                        info.inputValue ?? '',
                                        [{ type: 'reply', id: String(notification.extra.msgId) }],
                                        [],
                                    ),
                                    true
                                )
                                // 去消息列表内寻找，去除新消息标记
                                for (let i = 0; i <
                                    runtimeData.onMsgList.length; i++) {
                                    if (
                                        runtimeData.onMsgList[i].group_id
                                            == notification.extra.userId ||
                                        runtimeData.onMsgList[i].user_id
                                            == notification.extra.userId
                                    ) {
                                        runtimeData.onMsgList[i].new_msg = false
                                        break
                                    }
                                }
                            }
                        })
                    }
                }
                // 加载密码保存和自动连接
                loginInfo.address = runtimeData.sysConfig.address
                if (
                    runtimeData.sysConfig.save_password &&
                    runtimeData.sysConfig.save_password != true
                ) {
                    loginInfo.token = runtimeData.sysConfig.save_password
                    this.tags.savePassword = true
                }
                if (runtimeData.sysConfig.auto_connect == true) {
                    this.connect()
                }
                // =============================================================
                // 初始化完成
                // UM：加载 Umami 统计功能
                if (!Option.get('close_ga') && this.dev) {
                    // 给页面添加一个来源域名方便在 electron 中获取
                    const config = {
                        baseUrl: import.meta.env.VITE_UMAMI_URL,
                        websiteId: import.meta.env.VITE_UMAMI_ID,
                    } as any
                    if (runtimeData.tags.isElectron) {
                        config.hostName = 'electron.stapxs.cn'
                    }
                    Umami.initialize(config)
                } else if (this.dev) {
                    logger.debug('由于运行在调试模式下，分析组件并未初始化 ……')
                } else if (Option.get('close_ga')) {
                    logger.debug('统计功能已被关闭，分析组件并未初始化 ……')
                }
                App.checkUpdate() // 检查更新
                App.checkOpenTimes() // 检查打开次数
                App.checkNotice() // 检查公告
                // 加载愚人节附加
                if (new Date().getMonth() == 3 && new Date().getDate() == 1) {
                    document.getElementById('connect_btn')?.classList.add('afd')
                }
                // 其他状态监听
                if(runtimeData.tags.isElectron && runtimeData.reader) {
                    this.$watch(() => runtimeData.onMsgList.length, () => {
                        const list = [] as
                            { id: number, name: string, image?: string }[]
                        runtimeData.onMsgList.forEach((item) => {
                            list.push({
                                id: item.user_id ? item.user_id : item.group_id,
                                name: item.group_name ? item.group_name : item.remark === item.nickname ? item.nickname : item.remark + '（' + item.nickname + '）',
                                image: item.user_id ? 'https://q1.qlogo.cn/g?b=qq&s=0&nk=' + item.user_id : 'https://p.qlogo.cn/gh/' + item.group_id + '/' + item.group_id + '/0'
                            })
                        })
                        runtimeData.reader?.send('sys:flushOnMessage', list)
                    })
                }
            }
            // 页面关闭前
            window.onbeforeunload = () => {
                new Notify().clear()
            }
        },
        methods: {
            /**
             * electron 窗口操作
             */
            controllWin(name: string) {
                if (runtimeData.plantform.reader) {
                    runtimeData.plantform.reader.send('win:' + name)
                }
            },

            /**
             * 发起连接
             */
            connect() {
                Connector.create(this.loginInfo.address, this.loginInfo.token)
            },

            /**
             * 切换主标签卡判定
             * @param name 页面名称
             * @param view 虚拟路径名称
             * @param show 是否显示聊天面板
             */
            changeTab(_: string, view: string, show: boolean) {
                // UM：发送页面路由分析
                if (
                    !Option.get('close_ga') &&
                    this.dev
                ) {
                    Umami.trackPageView('/' + view)
                }
                this.tags.showChat = show
                this.tags.page = view
                // 附加操作
                switch (view) {
                    case 'Options': {
                        Connector.send('get_version_info', {}, 'getVersionInfo')
                        break
                    }
                }
            },
            barMainClick() {
                if (loginInfo.status) {
                    this.changeTab('信息', 'Messages', true)
                } else {
                    this.changeTab('主页', 'Home', false)
                }
            },

            /**
             * 水波动画启动器
             * @param wave HTML 对象
             * @returns 动画循环器对象
             */
            waveAnimation(wave: HTMLElement | null) {
                if (wave) {
                    const waves = wave.children[1].children
                    const min = 20
                    const max = 195
                    const add = 1
                    const timer = setInterval(() => {
                        // 遍历波浪体
                        for (let i = 0; i < waves.length; i++) {
                            const now = waves[i].getAttribute('x')
                            if (Number(now) + add > max) {
                                waves[i].setAttribute('x', min.toString())
                            } else {
                                waves[i].setAttribute(
                                    'x',
                                    (Number(now) + add).toString(),
                                )
                            }
                        }
                    }, 50)
                    return timer
                }
                return -1
            },

            /**
             * 刷新页面 fps 数据
             * @param timestamp 时间戳
             */
            rafLoop() {
                this.fps.ticks += 1
                //每30帧统计一次帧率
                if (this.fps.ticks >= 30) {
                    const now = Date.now()
                    const diff = now - this.fps.last
                    const fps = Math.round(1000 / (diff / this.fps.ticks))
                    this.fps.last = now
                    this.fps.ticks = 0
                    this.fps.value = fps
                }
                requestAnimationFrame(this.rafLoop)
            },

            /**
             * 切换聊天对象状态
             * @param data 切换信息
             */
            changeChat(data: BaseChatInfoElem) {
                // 设置聊天信息
                this.runtimeData.chatInfo = {
                    show: data,
                    info: {
                        group_info: {},
                        user_info: {},
                        me_info: {},
                        group_members: [],
                        group_files: {},
                        group_sub_files: {},
                        jin_info: {
                            list: [] as { [key: string]: any }[],
                            pages: 0,
                        },
                    },
                }
                runtimeData.mergeMessageList = undefined // 清空合并转发缓存
                runtimeData.tags.canLoadHistory = true // 重置终止加载标志
                if (data.type == 'group') {
                    // 获取自己在群内的资料
                    Connector.send(
                        'get_group_member_info',
                        {
                            group_id: data.id,
                            user_id: this.runtimeData.loginInfo.uin,
                        },
                        'getUserInfoInGroup',
                    )
                    // 获取群成员列表
                    // PS：部分功能不返回用户名需要进来查找所以提前获取
                    Connector.send(
                        'get_group_member_list',
                        { group_id: data.id },
                        'getGroupMemberList',
                    )
                }
                // 刷新系统消息
                Connector.send('get_system_msg', {}, 'getSystemMsg')

                // 清理通知
                if (runtimeData.plantform.reader) {
                    runtimeData.plantform.reader.send('sys:closeAllNotice', data.id)
                }
            },

            /**
             * 图片查看器初始化
             * @param viewer viewer 对象
             */
            viewerInited(viewer: HTMLDivElement) {
                this.viewerBody = viewer
            },

            /**
             * 图片查看器事件
             */
            viewerHide() {
                runtimeData.tags.viewer.show = false
            },
            viewerShow() {
                runtimeData.tags.viewer.show = true
            },

            /**
             * 移除当前的全局弹窗
             */
            removePopBox() {
                runtimeData.popBoxList.shift()
            },

            /**
             * 保存密码
             * @param event 事件
             */
            savePassword(event: Event) {
                const sender = event.target as HTMLInputElement
                const value = sender.checked
                if (value) {
                    Option.save('save_password', true)
                    // 创建提示弹窗
                    const popInfo = {
                        title: this.$t('提醒'),
                        html: `<span>${this.$t('连接密钥将以明文存储在浏览器 Cookie 中，请确保设备安全以防止密钥泄漏。')}</span>`,
                        button: [
                            {
                                text: app.config.globalProperties.$t('知道了'),
                                master: true,
                                fun: () => {
                                    runtimeData.popBoxList.shift()
                                },
                            },
                        ],
                    }
                    runtimeData.popBoxList.push(popInfo)
                } else {
                    Option.remove('save_password')
                }
            },

            /**
             * 保存自动连接
             * @param event 事件
             */
            saveAutoConnect(event: Event) {
                Option.runASWEvent(event)
                // 如果自动保存密码没开，那也需要开
                if (!runtimeData.sysConfig.save_password) {
                    this.savePassword(event)
                }
            },

            /**
             * 快速关闭弹窗（点击空白处关闭）
             * @param allow 是否允许快速关闭
             */
            popQuickClose(allow: boolean | undefined) {
                if (allow != false) {
                    runtimeData.popBoxList.shift()
                }
            },

            afd(event: MouseEvent) {
                // 只在愚人节时生效
                if (new Date().getMonth() == 3 && new Date().getDate() == 1) {
                    const sender = event.target as HTMLButtonElement
                    // 获取文档整体宽高
                    const docWidth = document.documentElement.clientWidth
                    const docHeight = document.documentElement.clientHeight
                    // 获取按钮宽高
                    const senderWidth = sender.offsetWidth
                    const senderHeight = sender.offsetHeight
                    // 获取鼠标位置
                    const mouseX = event.clientX
                    const mouseY = event.clientY
                    // 在宽高里随机抽一个位置，不能超出文档，不能让按钮在鼠标下
                    let x, y
                    do {
                        x = Math.floor(Math.random() * docWidth)
                        y = Math.floor(Math.random() * docHeight)
                    } while (
                        x + senderWidth > docWidth ||
                        y + senderHeight > docHeight ||
                        (x < mouseX &&
                            x + senderWidth > mouseX &&
                            y < mouseY &&
                            y + senderHeight > mouseY)
                    )
                    // 设置按钮位置
                    sender.style.left = x + 'px'
                    sender.style.top = y + 'px'
                }
            },
        },
    })
</script>

<style scoped>
    /* 应用通知动画 */
    .appmsg-move,
    .appmsg-enter-active,
    .appmsg-leave-active {
        transition: all 0.2s;
    }

    .appmsg-leave-active {
        position: absolute;
    }

    .appmsg-enter-from,
    .appmsg-leave-to {
        transform: translateX(-20px);
        opacity: 0;
    }

    /* 标题栏变更动画 */
    .appbar-enter-active,
    .appbar-leave-active {
        transition: all 0.2s;
    }

    .appbar-enter-from,
    .appbar-leave-to {
        transform: translateY(-60px);
    }
</style>
