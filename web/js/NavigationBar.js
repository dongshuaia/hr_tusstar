var NavigationBar = Vue.component('NavigationBar', {
    template: `
    <header id="topnav" class="defaultscroll scroll-active">
        <!-- 顶部栏 -->
        <div class="tagline">
            <div class="container">
                <div class="float-left">
                    <div class="phone">
                        启迪之星公司-在线人才招聘
                    </div>
                </div>
                <div class="float-right">
                    <ul class="navigation-menu topbar-list list-unstyled d-flex" style="margin: 11px 0px;">
                        <li class="has-submenu">
                            <a href="javascript:void(0);" style="font-size: 15px;"><i class="mdi mdi-account mr-2"></i>{{name}}</a><span
                                class="menu-arrow"></span>
                            <ul class="submenu" v-if="name === '未登录'">
                                <li><a href="../login.html" style="font-size: 15px;">登录</a></li>
                                <li><a href="../signup.html" style="font-size: 15px;">注册</a></li>
                            </ul>
                            <ul class="submenu" v-else>
                                <li><a href="javascript:logOut();" style="font-size: 15px;">注销</a></li>
                            </ul>
                        </li>
                        <li class="list-inline-item">
                            <a :href="newlin" style="font-size: 15px;"><i class="mdi mdi-account-box mr-2"></i>个人中心</a>
                        </li>
                    </ul>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
        <!-- 顶部栏结束 -->
        
        <!-- 主页导航栏区域 -->
        <div class="container">
            <!-- logo图标 -->
            <div>
                <a href="../index.html" class="logo">
                    <img src="../images/logo-light.png" alt="" class="logo-light" height="18"/>
                    <img src="../images/logo-dark.png" alt="" class="logo-dark" height="18"/>
                </a>
            </div>
            <div class="buy-button" v-if="hideButton==false && showtype!=''">
                <a :href="turntype" class="btn btn-primary"><i class="mdi mdi-cloud-upload"></i>{{showtype}}</a>
            </div>
            <!-- logo图标结束 -->

            <div class="menu-extras">
                <div class="menu-item">
                    <a class="navbar-toggle">
                        <div class="lines">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </a>
                </div>
            </div>

            <!-- 导航栏 -->
            <div id="navigation">
                <ul class="navigation-menu">
                    <li><a href="../index.html">主页</a></li>
                    <li><a href="../job-list.html">岗位列表</a></li>
                    <li><a href="../employers-list.html">企业列表</a></li>
                    <li class="has-submenu" v-if="isadmin === '' || isadmin === 0">
                        <a href="javascript:void(0)">求职者相关</a><span class="menu-arrow"></span>
                        <ul class="submenu">
                            <li><a href="../signup.html">用户注册</a></li>
                            <li><a href="../login.html">用户登录</a></li>
                            <li><a :href="turntype" v-if="showtype !== ''">{{showtype}}</a></li>
                        </ul>
                    </li>
                    <li class="has-submenu" v-if="isadmin === '' || isadmin === 2">
                        <a href="javascript:void(0)">企业相关</a><span class="menu-arrow"></span>
                        <ul class="submenu">
                            <li><a href="../companysignup.html">企业注册</a></li>
                            <li><a href="../login.html">企业登录</a></li>
                            <li><a href="../post-a-job.html" v-if="showtype !== ''">{{showtype}}</a></li>
                        </ul>
                    </li>

                    <li class="has-submenu">
                        <a href="javascript:void(0)">关于系统</a><span class="menu-arrow"></span>
                        <ul class="submenu">
                            <li><a href="../faq.html">常见问题</a></li>
                            <li><a href="#">意见反馈</a></li>
                        </ul>
                    </li>

                    <li class="has-submenu">
                        <a href="javascript:void(0)">关于我们</a><span class="menu-arrow"></span>
                        <ul class="submenu">
                            <li><a href="#">实习基地</a></li>
                            <li><a href="http://www.tusstar.com/">启迪之星</a></li>
                            <li><a href="../contact.html">联系我们</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!--导航栏结束-->
        </div>
        <!--主页导航栏区域结束-->
    </header>
    `,
    data: function () {
        return {
            name: "",
            isadmin: "",
            phone: "",
            newlin: "",
            showtype: "",
            turntype: ""
        }
    },
    props: {
      hideButton: {type: Boolean, required: false, default: false}
    },
    mounted() {
        axios
            .post('/users', {
                code: "1005",
            })
            .then(response => {
                if (response.data == "nouser") {
                    this.name = "未登录"
                } else {
                    this.name = response.data.username
                    this.isadmin = response.data.studentisadmin
                    this.phone = response.data.phone
                    if (this.isadmin == "2") {
                        this.newlin = "/enterpriseCenter.html?phone=" + "'" + self.phone + "'"
                        this.showtype = "发布一个岗位"
                        this.turntype = "/post-a-job.html"
                    } else if (this.isadmin == "0") {
                        this.newlin = "/userCenter.html?phone=" + "'" + self.phone + "'"
                        if (response.data.haveResume) {
                            this.showtype = "完善简历"
                            this.turntype = "update-resume.html"
                        } else {
                            this.showtype = "新建简历"
                            this.turntype = "create-resume.html"
                        }
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
})