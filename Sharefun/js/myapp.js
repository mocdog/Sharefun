angular.module('sharefun', ['ng', 'ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/main', {
                templateUrl: 'tpl/main.html',
                controller: "mainCtrl"
            })
            .when('/community', {
                templateUrl: 'tpl/community.html',
                controller: "communityCtrl"
            })
            .when('/detail', {
                templateUrl: 'tpl/detail.html',
                controller: "detailCtrl"
            })
            .when('/start', {
                templateUrl: 'tpl/start.html',
                controller: "startCtrl"
            })
            .when('/me',{
                templateUrl: 'tpl/me.html',
                controller: "meCtrl"
            })
            .when('/mymessage',{
                templateUrl: 'tpl/mymessage.html',
                controller: "mymessageCtrl"
            })
            .otherwise({
                redirectTo: '/start'
            })
    })
    .controller("startCtrl", function ($scope, $interval, $location, $http) {
        ////测试文本区域宽度
        //$(document).scroll(function () {
        //    console.log(scrollY);
        //})
        //var canvas = $("#start_star").get(0);
        //var ctx = canvas.getContext("2d");
        //var WIDTH = canvas.width;
        //var HEIGHT = canvas.height;
        //var rects = [];
        //
        //function create() {
        //    var width = Math.floor(Math.random() * 10);
        //    var x, y, r = 3, addx, addy;
        //    addx = Math.floor(Math.random() * 10) + 1;
        //    addy = Math.floor(Math.random() * 10) + 1;
        //    var number1 = Math.floor(Math.random() * 2);
        //    var number2 = Math.floor(Math.random() * 2);
        //    x = number1 == 1 ? (Math.random() * 2 + 1) : -(Math.random() * 2 + 1);
        //    y = number2 == 1 ? Math.sqrt(Math.pow(r, 2) - Math.pow(x, 2)) : -Math.sqrt(Math.pow(r, 2) - Math.pow(x, 2));
        //    return {x: WIDTH / 2 + x, y: HEIGHT / 2 + y, width: width, addx: addx, addy: addy};
        //}
        //
        //function paintAll() {
        //    rects.push(create());
        //    for (var i = 0; i < rects.length; i++) {
        //        ctx.beginPath();
        //        ctx.fillStyle = "#fff";
        //        ctx.rect(rects[i].x, rects[i].y, rects[i].width, rects[i].width);
        //        ctx.fill();
        //    }
        //}
        //
        //function stepAll() {
        //    for (var i = 0; i < rects.length; i++) {
        //        var r = rects[i];
        //        if (r.x > WIDTH / 2 && r.y > HEIGHT / 2) {
        //            r.x += r.addx;
        //            r.y += r.addy;
        //        } else if (r.x > WIDTH / 2 && r.y < HEIGHT / 2) {
        //            r.x += r.addx;
        //            r.y -= r.addy;
        //        } else if (r.x < WIDTH / 2 && r.y > HEIGHT / 2) {
        //            r.x -= r.addx;
        //            r.y += r.addy;
        //        } else {
        //            r.x -= r.addx;
        //            r.y -= r.addy;
        //        }
        //    }
        //}
        //
        //function clear() {
        //    for (var i = 0; i < rects.length; i++) {
        //        var r = rects[i];
        //        if (r.x >= WIDTH - 200 || r.x <= 200 || r.y >= HEIGHT || r.y <= 0) {
        //            rects.splice(i, 1);
        //            i--;
        //        }
        //    }
        //}
        //
        //var stopPaint = $interval(function () {
        //    //清除画布
        //    ctx.clearRect(0, 0, WIDTH, HEIGHT);
        //    //绘制一针的所有小方块
        //    paintAll();
        //    //移动所有小方块
        //    stepAll();
        //    //删除超出边界的小方块
        //    clear();
        //}, 100);
        //$(".start_bg").click(function () {
        //    $interval.cancel(stopPaint);
        //    ctx.clearRect(0, 0, WIDTH, HEIGHT);
        //    $this = $(this);
        //    var filter = 8;
        //    var timer = setInterval(function () {
        //        $this.css("-webkit-filter", "blur(" + (--filter) + "px)");
        //        if (filter == 0) {
        //            clearInterval(timer);
        //            $(".start_text").animate({left: 530}, 1000).animate({left: 490}, 500)
        //        }
        //    }, 100);
        //})
        $("#uname").change(function () {
            $scope.showError = false;
        })
        $("#upwd").change(function () {
            $scope.showError = false;
        })
        $("#rname").change(function () {
            $scope.canShow = false;
            $scope.isRepeat = false;
            $scope.isOk = false;
            $scope.isFalse = false;
        })
        $scope.slidetoLog = function () {
            event.preventDefault();
            $(".lv_body").show();
            $(".lv_body_register").hide();
        }
        $scope.slidetoReg = function () {
            event.preventDefault();
            $(".lv_body").hide();
            $(".lv_body_register").show();
        }
        $(".lv_header div a").click(function () {
            $this = $(this);
            $(".lv_header .start_active").removeClass("start_active");
            $this.parent().addClass("start_active");
        })
        var start_imgs = ['bg_2.jpg', 'bg_1.jpg', 'bg_3.jpg'];
        $scope.slideBgLeft = function () {
            event.preventDefault();
            start_imgs.push(start_imgs.shift());
            $(".start_bg_2").css("background", "url('./img/" + start_imgs[0] + "')");
        }
        $scope.slideBgRight = function () {
            event.preventDefault();
            start_imgs.unshift(start_imgs.pop());
            $(".start_bg_2").css("background", "url('./img/" + start_imgs[0] + "')");
        }
        var logMsg = {}
        $scope.$watch('uname', function () {
            logMsg["uname"] = $scope.uname;
        });
        $scope.$watch('upwd', function () {
            logMsg["upwd"] = $scope.upwd;
        });
        var transform = function (data) {
            return $.param(data);
        }
        $scope.showError = false;
        $scope.logSharefun = function () {
            $http.post("data/login.php", {
                uname: logMsg['uname'],
                upwd: logMsg['upwd']
            }, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'},
                transformRequest: transform
            }).success(function (data) {
                if (!data["error"]) {
                    localStorage.uname = data[0].uname;
                    localStorage.uid = data[0].uid;
                    $location.url("/main");
                }
                else {
                    $scope.errorMsg = "用户名或者密码错误"
                    $scope.showError = true;
                }
            })
        }
        //注册信息
        $scope.canShow = false;
        $scope.isOk = false;
        $scope.isFalse = false;
        $scope.isRepeat = false;
        var regMsg = {};
        $scope.$watch('rname', function () {
            regMsg["rname"] = $scope.rname;
            $http.post("data/isRepeat.php", {
                uname: $scope.rname
            }, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'},
                transformRequest: transform
            }).success(function (result) {
                if (result[0].uname) {//如果有记录 =》重复
                    //显示提示信息
                    $scope.canShow = true;
                    $scope.reg__msg = "该账号已被注册"
                    $scope.isRepeat = true;
                }
            })
        })
        $scope.$watch('rpwd', function () {
            regMsg["rpwd"] = $scope.rpwd;
        })
        $scope.regSharefun = function () {
            if (!$scope.isRepeat) {
                $http.post("data/register.php", {
                    uname: regMsg['rname'],
                    upwd: regMsg['rpwd']
                }, {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'},
                    transformRequest: transform
                }).success(function (data) {
                    if (data == 1) {
                        //注册成功
                        $scope.canShow = true;
                        $scope.isOk = true;
                        $scope.reg__msg = "注册成功";
                    }
                })
            } else {
                $scope.canShow = true;
                $scope.isFalse = true;
                $scope.reg__msg = "注册失败";
            }
        }
    })
    .controller("mainCtrl", function ($scope, $http, $interval, $location) {
        $scope.uname = localStorage.uname;
        var timer1;
        var timer2;
        var timer3;

        function canvasTpl(elem) {
            var myargument = {
                ctx: elem.getContext("2d"),
                WIDTH: elem.width,
                HEIGHT: elem.height
            }
            return myargument
        }

        function paintMyrecord(elem) {
            var myargument = canvasTpl(elem);
            var lineLong = 1000;
            var left = 180;
            myargument['ctx'].strokeStyle = "#ccc";
            myargument['ctx'].fillStyle = "#46b8da";
            myargument['ctx'].beginPath();
            myargument['ctx'].moveTo(left - 50, myargument['HEIGHT'] / 2);
            myargument['ctx'].lineTo(left, myargument['HEIGHT'] / 2);
            myargument['ctx'].stroke();
            myargument['ctx'].beginPath();
            myargument['ctx'].moveTo(left, myargument['HEIGHT'] / 2);
            myargument['ctx'].lineTo(left + lineLong, myargument['HEIGHT'] / 2);
            myargument['ctx'].stroke();
            myargument['ctx'].beginPath();
            myargument['ctx'].moveTo(left + lineLong, myargument['HEIGHT'] / 2);
            myargument['ctx'].lineTo(left + lineLong + 50, myargument['HEIGHT'] / 2);
            myargument['ctx'].stroke();
            for (var i = 0; i < 6; i++) {
                myargument['ctx'].beginPath();
                myargument['ctx'].arc(left + (lineLong / 5) * i, myargument['HEIGHT'] / 2, 5, 0, Math.PI * 2);
                myargument['ctx'].fill();
            }
            var text = ['分享', '收获', '纯真', '美好', '快乐', '喜悦'];
            for (var i = 0; i < 6; i++) {
                myargument['ctx'].beginPath();
                myargument['ctx'].fillStyle = "#000";
                myargument['ctx'].font = "20px Simhei"
                myargument['ctx'].textAlign = "center"
                myargument['ctx'].fillText(text[i], left + (lineLong / 5) * i, myargument['HEIGHT'] / 2 - 10);
            }
        }

        paintMyrecord($("#record").get(0));
        var imgs = ['flow01.jpg', 'flow02.jpg', 'flow03.jpg'];

        function addImg() {
            var len = imgs.length;
            for (var i = 0; i < len; i++) {
                $(".mycarousel .slide").append("<img class='img" + (i + 1) + "' src='img/" + imgs[i] + "'>");
                $(".mycarousel .cloneSilde").append("<img class='img" + (i + 1) + "' src='img/" + imgs[i] + "'>");
            }
            $(".mycarousel .slide,.cloneSilde img").click(function (e) {
                if (e.target.nodeName == "IMG") {
                    clearTimeout(timer3);
                    var reg = /\d$/;
                    showMask("flow0" + e.target.className.match(reg) + "_l.jpg");
                }
            })
        }

        function showMask(img_l_number) {
            $(".mask img").remove();
            $(".mask .myclose").after("<img src='img/" + img_l_number + "' />");
            $(".mask").show();
        }

        function slide() {
            var distance = 400;
            var steps = 20;
            var step = distance / steps;
            var interval = 1000;
            var long = parseFloat($(".slide").css("width"));
            var stop = setInterval(function () {
                var left = parseFloat($(".slide").css("left"));
                var cloneLeft = parseFloat($(".cloneSilde").css("left"));
                $(".slide").css("left", left -= step);
                $(".cloneSilde").css("left", cloneLeft -= step);
                if (left % 400 == 0) {
                    clearInterval(stop);
                }
                if (left == -long) {
                    $(".slide").css("left", 1200);
                }
                if (cloneLeft == -long) {
                    $(".cloneSilde").css("left", 1200);
                }
            }, interval / steps);
        }

        function carousel() {
            timer3 = setTimeout(function () {
                slide();
                carousel();
            }, 2000)
        }

        addImg();
        carousel();
        $scope.jumpCommunity = function(){
            event.preventDefault();
            clearInterval(timer3);
            $location.url("/community");
        }
        $(".myclose").click(function (e) {
            carousel();
            e.preventDefault();
            $(".mask").hide();
        })
        $(document).scroll(function (e) {
            if (scrollY >= 850) {
                $(".backtop").show();
            }
            if (scrollY == 0) {
                $(".backtop").hide();
            }
        })
        $(".backtop a").click(function (e) {
            e.preventDefault();
            var fixLong = $(document).scrollTop();
            var timer = setInterval(function () {
                $(document).scrollTop(fixLong -= 20);
                if ($(document).scrollTop() == 0) {
                    $(".backtop").hide();
                    clearInterval(timer);
                }
            }, 10)
        })
        $scope.logout = function () {
            event.preventDefault();
            localStorage.clear();
            $location.url("/start");
            clearInterval(timer3);
        }
        var imgMsg = {};
        $scope.$watch('imgdescribe', function () {
            imgMsg['imgdescribe'] = $scope.imgdescribe;
        })
        var uploadfile;
        var fd = new FormData();
        $("#uimg").get(0).onchange = function () {
            $(".viewport img").remove();
            uploadfile = this.files[0];
            if (!/image\/(jpeg|jpg|png)/.test(uploadfile.type)) {
                alert(".jpeg,.jpg,.png类型文件方能上传");
            }
            else {
                var fr = new FileReader();
                fr.onload = function () {
                    if (this.result != null) {
                        $(".viewport").append("<img class='img-responsive ' src='" + this.result + "'>")
                    }
                    else {
                        alert("加载失败");
                    }
                }
                fr.readAsDataURL(uploadfile);
            }
        }
        $scope.upload = function () {
            event.preventDefault();
            var uname = localStorage.uname;
            var fd = new FormData(),
                xhr = new XMLHttpRequest();
            fd.append("files", uploadfile);
            fd.append("imgdescribe", imgMsg['imgdescribe']);
            fd.append("uname", uname);
            xhr.open("post", "data/upload.php");
            xhr.send(fd);
            //xhr.setRequestHeader("Content-Type: multipart/form-data");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var result = xhr.responseText;
                    if (result == 1) {
                        //关闭上传框
                        $(".uploadmask").hide(function () {
                            var timer = 0;
                            var stop = $interval(function () {
                                timer++
                                //显示账号退出成功信息
                                $(".alertMsg").animate({top: 70}, 500).animate({top: 0}, 1000);
                                //设置 .alertMsg 的弹出提示信息
                                $scope.alertMsg = "上传成功";
                                if (timer == 1) {
                                    $interval.cancel(stop);
                                }
                            }, 100)
                        });
                    } else {
                        var timer = 0;
                        var stop = $interval(function () {
                            timer++
                            //显示账号退出成功信息
                            $(".alertMsg").animate({top: 70}, 500).animate({top: 0}, 1000);
                            //设置 .alertMsg 的弹出提示信息
                            $scope.alertMsg = "上传失败";
                            if (timer == 1) {
                                $interval.cancel(stop);
                            }
                        }, 100)
                    }
                }
            }
        }
    })
    .controller("communityCtrl", function ($scope, $http, $location, $interval) {
        $scope.isNew = true;//是否属于"最新"专栏
        $scope.isHot = false;//是否属于"最热"专栏
        var transform = function (data) {
            return $.param(data);
        }
        $scope.logout = function () {
            event.preventDefault();
            localStorage.clear();
            $location.url("/start");
        }
        if (localStorage.uname) {
            $scope.uname = localStorage.uname;
        }
        $scope.maskdown = function (imgpid) {
            $(".img" + imgpid).animate({top: 0}, 100);
        }
        $scope.maskup = function (imgpid) {
            $(".img" + imgpid).animate({top: -130}, 100);
        }
        ////监视页面是否加载出来数据
        //$interval(function(){
        //    if($scope.newImg){
        //        const IN = 1;
        //        const OUT = 0
        //        var status = OUT;//防止其他事件触发
        //        var lock = false;//防止重复进入
        //        $(".date").mouseover(function () {
        //            if (status == OUT && !lock) {
        //                lock = true;//上锁
        //                console.log("im in")
        //                $(this).animate({top: 0}, 1000, function () {
        //                    lock = false; // 解锁
        //                    status = IN;
        //                });
        //            }
        //        }).mouseout(function () {
        //            if (status == IN && !lock) {
        //                lock = true;
        //                $(this).animate({top: -130}, 1000, function () {
        //                    lock = false; // 解锁
        //                    status = OUT;
        //                });
        //            }
        //        })
        //    }
        //},1000);
        //加载最新照片
        $http.get("data/newImg.php").success(function (data) {
            $scope.imglist = data;
        })
        //获取活跃用户
        $http.get("data/activeUser.php").success(function (data) {
            if (!data["error"]) {
                $scope.userList = data;
            } else {
                alert("该社区暂时没有活跃用户");
            }
        })
        //鼠标移到活跃用户列表显示框
        $scope.showAuthorMsg = function (uname) {
            $(".user" + uname).show();
        }
        //鼠标移开活跃用户列表显示框
        $scope.hideAuthorMsg = function (uname) {
            $(".user" + uname).hide();
        }
        //上传照片
        var imgMsg = {};
        $scope.$watch('imgdescribe', function () {
            imgMsg['imgdescribe'] = $scope.imgdescribe;
        })
        var uploadfile;
        $("#uimg").get(0).onchange = function () {
            $(".viewport img").remove();
            uploadfile = this.files[0];
            if (!/image\/(jpeg|jpg|png)/.test(uploadfile.type)) {
                alert(".jpeg,.jpg,.png类型文件方能上传");
            }
            else {
                var fr = new FileReader();
                fr.onload = function () {
                    if (this.result != null) {
                        $(".viewport").append("<img class='img-responsive ' src='" + this.result + "'>")
                    }
                    else {
                        alert("加载失败");
                    }
                }
                fr.readAsDataURL(uploadfile);
            }
        }
        $scope.upload = function () {
            event.preventDefault();
            var uname = localStorage.uname;
            var fd = new FormData(),
                xhr = new XMLHttpRequest();
            fd.append("files", uploadfile);
            fd.append("imgdescribe", imgMsg['imgdescribe']);
            fd.append("uname", uname);
            xhr.open("post", "data/upload.php");
            xhr.send(fd);
            //xhr.setRequestHeader("Content-Type: multipart/form-data");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var result = xhr.responseText;
                    if (result == 1) {
                        $(".uploadmask").hide(function () {
                            var timer = 0;
                            var stop = $interval(function () {
                                timer++
                                $(".alertMsg").animate({top: 70}, 500).animate({top: 0}, 1000);
                                $scope.alertMsg = "上传成功";
                                if (timer == 1) {
                                    $interval.cancel(stop);
                                }
                            }, 100)
                        });
                        //更新最新界面
                        $http.get("data/newImg.php").success(function (data) {
                            $scope.imglist = data;
                        })
                        //更新热门页面
                        $http.get("data/hotImg.php").success(function (data) {
                            $scope.imglist = data;
                        })
                        //更新精选页面
                        $http.post("data/selectedImg.php", {
                            condition: "美女"
                        }, {
                            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'},
                            transformRequest: transform
                        }).success(function (data) {
                            $scope.imglist = data;
                        })
                        //更新自己的相册
                        $http.post("data/meImg.php", {
                            uname: localStorage.uname
                        }, {
                            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'},
                            transformRequest: transform
                        }).success(function (data) {
                            $scope.imglist = data;
                        })
                    } else {
                        $(".uploadmask").hide(function () {
                            var timer = 0;
                            var stop = $interval(function () {
                                timer++
                                $(".alertMsg").animate({top: 70}, 500).animate({top: 0}, 1000);
                                $scope.alertMsg = "上传失败";
                                if (timer == 1) {
                                    $interval.cancel(stop);
                                }
                            }, 100)
                        });
                    }
                }
            }
        }
        //上传头像
        var uploadfile1;
        $("#uhimg").get(0).onchange = function () {
            $(".h_viewport img").remove();
            uploadfile1 = this.files[0];
            if (!/image\/(jpeg|jpg|png)/.test(uploadfile1.type)) {
                alert(".jpeg,.jpg,.png类型文件方能上传");
            }
            else {
                var fr = new FileReader();
                fr.onload = function () {
                    if (this.result != null) {
                        $(".h_viewport").append("<img class='img-responsive ' src='" + this.result + "'>")
                    }
                    else {
                        alert("加载失败");
                    }
                }
                fr.readAsDataURL(uploadfile1);
            }
        }
        $scope.uploadhi = function () {
            event.preventDefault();
            var uname = localStorage.uname;
            var fd = new FormData(),
                xhr = new XMLHttpRequest();
            fd.append("files", uploadfile1);
            fd.append("uname", uname);
            xhr.open("post", "data/uploadhi.php");
            xhr.send(fd);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var result = xhr.responseText;
                    if (result == 1) {
                        //上传头像成功
                        $(".ul_hi_mask").hide(function () {
                            var timer = 0;
                            var stop = $interval(function () {
                                timer++
                                //显示提示信息
                                $(".alertMsg").animate({top: 70}, 500).animate({top: 0}, 1000);
                                $scope.alertMsg = "上传成功";
                                if (timer == 1) {
                                    $interval.cancel(stop);
                                }
                            }, 100)
                        });
                        $(".h_viewport").val("");
                        //更新活跃用户列表
                        $http.get("data/activeUser.php").success(function (data) {
                            if (!data["error"]) {
                                $scope.userList = data;
                            } else {
                                console.log(data["error"]);
                            }
                        })
                        //隐藏上传头像
                        $scope.hasHi = true;
                    }
                    else {
                        $(".ul_hi_mask").hide(function () {
                            var timer = 0;
                            var stop = $interval(function () {
                                timer++
                                //显示提示信息
                                $(".alertMsg").animate({top: 70}, 500).animate({top: 0}, 1000);
                                $scope.alertMsg = "上传失败";
                                if (timer == 1) {
                                    $interval.cancel(stop);
                                }
                            }, 100)
                        });
                    }
                }
            }
        }
        $scope.loadNew = function () {
            event.preventDefault();
            $http.get("data/newImg.php").success(function (data) {
                $scope.imglist = data;
                $scope.isNew = true;
                $scope.isHot = false;
            })
        }
        $scope.loadhot = function () {
            event.preventDefault();
            $http.get("data/hotImg.php").success(function (data) {
                $scope.imglist = data;
                $scope.isNew = false;
                $scope.isHot = true;
            })
        }
        $scope.loadselected = function () {
            event.preventDefault();
            $http.post("data/selectedImg.php", {
                condition: "美女"
            }, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'},
                transformRequest: transform
            }).success(function (data) {
                $scope.imglist = data;
                $scope.isNew = false;
                $scope.isHot = false;
            })
        }
        $scope.loadme = function () {
            event.preventDefault();
            $http.post("data/meImg.php", {
                uname: localStorage.uname
            }, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'},
                transformRequest: transform
            }).success(function (data) {
                $scope.imglist = data;
                $scope.isNew = false;
                $scope.isHot = false;
            })
        }
        //切换专栏激活状态
        $(".mynav li a").click(function () {
            $this = $(this);
            $(".mynav li.hactive").removeClass("hactive");
            $this.parent().addClass("hactive");
        })
        $http.post("data/hasHi.php", {
            uname: localStorage.uname
        }, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'},
            transformRequest: transform
        }).success(function (data) {
            if (data[0].hipath) {
                //如果已经上传过头像 为true
                $scope.hasHi = true;
            }
            else {
                //如果已经上传过头像 为false
                $scope.hasHi = false;
            }
        })
        $scope.jumpDetail = function (pid) {
            localStorage.pid = pid;
            $location.url("/detail");
        }
        //显示好友列表
        var flisShow =  false;
        $scope.showFriend = function(){
            event.preventDefault();
            flisShow = flisShow ? false : true;
            if(flisShow){
                $(".friendList").animate({left:0},500);
                $("#move_icon").html("&laquo;");
            }else{
                $(".friendList").animate({left:-160},500);
                $("#move_icon").html("&raquo;");
            }
        }
        //绑定消息图标鼠标进入事件
        $scope.msgAnimate = function(){
            $(".smalltalk").animate({bottom:10},100).animate({bottom:0},100).animate({bottom:10},100).animate({bottom:0},100)
        }
        //点击消息图片 进入留言界面
        $scope.jumpMsg = function(){
            event.preventDefault();
            $location.url("/mymessage");
        }
        $scope.jumpMe = function(){
            event.preventDefault();
            $location.url("/me");
        }
    })
    .controller("detailCtrl", function ($scope, $http, $location) {
        $scope.logout = function () {
            event.preventDefault();
            localStorage.clear();
            $location.url("/start");
        }
        var transform = function (data) {
            return $.param(data);
        }
        $scope.uname = localStorage.uname;
        //获取活跃用户
        $http.get("data/activeUser.php").success(function (data) {
            if (!data["error"]) {
                $scope.userList = data;
            } else {
                $(".detaile_alertMsg").animate({top: 70}, 500).animate({top: 0}, 1000);
                //设置 .alertMsg 的弹出提示信息
                $scope.alertMsg = "加载失败";
            }
        })
        //根据pid获取特定的照片信息
        $http.post("data/detailImg.php", {
            pid: localStorage.pid
        }, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'},
            transformRequest: transform
        }).success(function (data) {
            $scope.detailMsg = data[0];
            $scope.zan = $scope.detailMsg.zan;
        })
        var myComment;
        $scope.$watch('mycomment', function () {
            myComment = $scope.mycomment;
        })
        //点击发布 进行发布评论
        $scope.publish = function () {
            event.preventDefault();
            $http.post("data/mycomment.php", {
                uname: localStorage.uname,
                userComment: myComment,
                pid: localStorage.pid
            }, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'},
                transformRequest: transform
            }).success(function (data) {
                if (data == 1) {
                    $(".detaile_alertMsg").animate({top: 70}, 500).animate({top: 0}, 1000);
                    $scope.alertMsg = "评论成功,继续评论吧";
                    $("#youComment").val("");
                    $http.post("data/getComment.php", {
                        pid: localStorage.pid
                    }, {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'},
                        transformRequest: transform
                    }).success(function (data) {
                        //console.log(data);
                        $scope.commentList = data;
                    })
                } else {
                    $(".detaile_alertMsg").animate({top: 70}, 500).animate({top: 0}, 1000);
                    $scope.alertMsg = "评论失败";
                }
            })
        }
        //页面加载进行评论加载
        $http.post("data/getComment.php", {
            pid: localStorage.pid
        }, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'},
            transformRequest: transform
        }).success(function (data) {
            //console.log(data);
            $scope.commentList = data;
        })
        //给喜欢的照片点赞
        $scope.cangiveZan = true;
        $(".hasZan").removeClass("hasZan");
        $scope.givezan = function () {
            event.preventDefault();
            if (!$scope.cangiveZan) {
                $(".detaile_alertMsg").animate({top: 70}, 500).animate({top: 0}, 1000);
                $scope.alertMsg = "您已经点过赞了";
            } else {
                $http.post("data/giveZan.php", {
                    pid: localStorage.pid,
                    zan: ++$scope.zan
                }, {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'},
                    transformRequest: transform
                }).success(function (data) {
                    //更新页面数据
                    $http.post("data/detailImg.php", {
                        pid: localStorage.pid
                    }, {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'},
                        transformRequest: transform
                    }).success(function (data) {
                        $scope.detailMsg = data[0];
                        $scope.zan = $scope.detailMsg.zan;
                    })
                    //将红心点亮 设置权限
                    $("#heart").addClass("hasZan");
                    $scope.cangiveZan = false;
                    //设置点赞后的提示信息
                    $(".detaile_alertMsg").animate({top: 70}, 500).animate({top: 0}, 1000);
                    $scope.alertMsg = "点赞成功";
                })
            }
        }
    })
    .controller("meCtrl",function($scope){
        //个人主页
        $scope.uname = localStorage.uname;
        $scope.logout = function(){
            event.preventDefault();
            localStorage.clear();
            $location.url("/start");
        }
    })
    .controller("mymessageCtrl",function($scope,$location){
        //好友留言界面
        $scope.uname = localStorage.uname;
        $scope.logout = function(){
            event.preventDefault();
            localStorage.clear();
            $location.url("/start");
        }
    })

