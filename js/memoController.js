/**
 * nsMemoController.js
 */

// todoListShowFlg
var todoListShowFlg = false;

// doneFlg
var doneListShowFlg = false;

// cancleFlg
var cancleListShowFlg = false;

var obsAryTodo = h5.core.data.createObservableArray();

var obsAryDone = h5.core.data.createObservableArray();

var obsAryCancle = h5.core.data.createObservableArray();

var nsMemoLogic = {

    __name: "nsMemoLogic",

    getnsMemoInfo: function(doubanApiNo, paramStart, paramCount) {

        this.__getnsMemoInfo().done(function(data) {
            // get film info
            data.subjects.forEach((item) => {

                if (item.status === 0) {

                    obsAryTodo.push({
                        id: item.id,
                        status: item.status,
                        content: item.content
                    });
                } else if (item.status === 1) {

                    obsAryDone.push({
                        id: item.id,
                        status: item.status,
                        content: item.content
                    });
                } else if (item.status === 2) {

                    obsAryCancle.push({
                        id: item.id,
                        status: item.status,
                        content: item.content
                    });
                }

            });
        }).fail(function(error) {
            alert("get memo info failed" + errMsg);
        });
    },

    __getnsMemoInfo: function() {

        var promise = h5.ajax("../json/data.json", {
            type: 'POST',
            dataType: 'jsonp',
        });

        return promise;
    },

    deleteObservableArray: function(observableArray) {

        var obsArylen = observableArray.length;
        for (var i = 0; i < obsArylen; i++) {
            observableArray.pop();
        }
    }
}

$(function() {

    var nsMemoController = {

        __name: "nsMemoController",

        __templates: "../ejs/nsMemo.ejs",
        __formController: h5.ui.FormController,
        nsMemoLogic: nsMemoLogic,

        __ready: function() {

            // view bind
            this.view.append("#nsMemoInfoListDiv", "nsMemoInfoListEjs");

            // data bind
            h5.core.view.bind($("#nsMemoInfoListDiv"), {
                nsMemoInfoList: obsAry
            });
        },
        __init: function() {
            todoListShowFlg = true;
            this.nsMemoLogic.getnsMemoInfo(nsMemoApiNo, 0, 20);
            nsMemoSize = 20;
        },
        "#loadMore click": function() {

            if (!todoListShowFlg) {
                todoListShowFlg = true;
                $("#nomalLoadDiv").css("display", "none");
                $("#loadingDiv").css("display", "inline-block");
                this.nsMemoLogic.getnsMemoInfo(nsMemoApiNo, nsMemoSize + 1, nsMemoSize + 21);
                nsMemoSize = nsMemoSize + 20;
            }
        },
        "#nsMemoHot click": function() {

            if (!todoListShowFlg) {
                todoListShowFlg = true;
                $("#nomalLoadDiv").css("display", "none");
                $("#loadingDiv").css("display", "inline-block");
                this.nsMemoLogic.deleteObservableArray(obsAry);
                nsMemoApiNo = 0;
                this.nsMemoLogic.getnsMemoInfo(nsMemoApiNo, 0, 20);
                nsMemoSize = 20;
            }
        },
        "#nsMemoLatest click": function() {

            if (!todoListShowFlg) {
                todoListShowFlg = true;
                $("#nomalLoadDiv").css("display", "none");
                $("#loadingDiv").css("display", "inline-block");
                this.nsMemoLogic.deleteObservableArray(obsAry);
                nsMemoApiNo = 1;
                this.nsMemoLogic.getnsMemoInfo(nsMemoApiNo, 0, 20);
                nsMemoSize = 20;
            }
        },
        "#nsMemoTop click": function() {

            if (!todoListShowFlg) {
                todoListShowFlg = true;
                $("#nomalLoadDiv").css("display", "none");
                $("#loadingDiv").css("display", "inline-block");
                this.nsMemoLogic.deleteObservableArray(obsAry);
                nsMemoApiNo = 2;
                this.nsMemoLogic.getnsMemoInfo(nsMemoApiNo, 0, 20);
                nsMemoSize = 20;
            }
        },
        "#backTop click": function backToTop() {
            $('html,body').animate({
                scrollTop: 0
            }, 600);
        }
    };

    h5.core.controller("#nsMemoInfoContainer", nsMemoController);
});

// HTML5/hifive 编程技术能力水平考试（编程题）

// 记事本 js文件 

// 请输入你的姓名：            
// 请输入考试日期：            

// 1. 这里创建了一个不完整的记事本数据模型，补充完成数据模型的创建。
// 2. 根据该数据模型，使用hifive框架的数据绑定等功能完成题目要求。
// 3. 根据自己的编程习惯以及hifive代码规范书写代码。（可新建新的js文件）


(function() {

    // dataManager
    var notePadManager = h5.core.data.createManager('NotePadManager');

    // dataModel
    var notePadModel = notePadManager.createModel({
        name: 'NodePadModel',
        schema: {
            // ID
            id: {
                id: true,
                type: 'integer'
            },
            // 状态（0：未完成，1：已完成，2：已取消）
            status: {
                type: 'integer'
            },
            // 内容
            content: {
                type: 'string'
            }

            // 添加属性，完成适当的数据模型，实现题目要求。



        }
    });

    // 公开
    h5.u.obj.expose('test.model', {
        NodePadModel: notePadModel
    });

})();