/**
 * nsMemoController.js
 */

// todoListShowFlg
var todoListShowFlg = true;

// doneFlg
var doneListShowFlg = true;

// cancleFlg
var cancleListShowFlg = true;

var obsAryTodo = h5.core.data.createObservableArray();

var obsAryDone = h5.core.data.createObservableArray();

var obsAryCancle = h5.core.data.createObservableArray();

var todoCnt = 0;

var doneCnt = 0;

var cancleCnt = 0;

var maxId = 0;

var nsMemoLogic = {

    __name: "nsMemoLogic",

    getnsMemoInfo: function() {

        this.__getnsMemoInfo().done(function(data) {
            // get film info
            //data.forEach((item) => {
            for (var i = 0; i < data.length; i++) {
                item = data[i];
                if (item.status === 0) {

                    obsAryTodo.push({
                        id: item.id,
                        status: item.status,
                        content: item.content,
                    });

                    todoCnt++;
                } else if (item.status === 1) {

                    obsAryDone.push({
                        id: item.id,
                        status: item.status,
                        content: item.content
                    });

                    doneCnt++;
                } else if (item.status === 2) {

                    obsAryCancle.push({
                        id: item.id,
                        status: item.status,
                        content: item.content
                    });

                    cancleCnt++;
                }

                if (item.id > maxId) {

                    maxId = item.id;
                }

                //});
            }
        }).fail(function(error) {
            alert("get memo info failed" + error);
        });
    },

    __getnsMemoInfo: function() {

        var promise = h5.ajax("../json/data.json", {
            type: 'GET',
            dataType: 'json',
        });

        return promise;
    },

    __remove: function(id, obserArr) {

        for (var i = 0; i < obserArr.length; i++) {

            var item = obserArr.get(i);
            var itemId = item.id;

            if (itemId === parseInt(id, 10)) {
                obserArr.splice(i, 1);
                break;
            }
        }
    },

    addNewMemo: function(memo) {

        maxId++;

        obsAryTodo.push({
            id: maxId,
            status: 0,
            content: memo
        }); 
    },

    chkTodoItem: function(obj) {

        var tempId = obj.prev().val();

        obsAryDone.push({
            id: parseInt(tempId, 10),
            status: 1,
            content: obj.next().val()
        });

        this.__remove(tempId, obsAryTodo);
    },

    cancleItem: function(obj) {

        var tempId = obj.parent().prev().prev().children().val();

        obsAryCancle.push({
            id: parseInt(tempId, 10),
            status: 2,
            content: obj.parent().prev().prev().children().eq(2).val()
        });

        this.__remove(tempId, obsAryTodo);
    },

    chkDoneItem: function(obj) {

        var tempId = obj.prev().val();

        obsAryTodo.push({
            id: parseInt(tempId, 10),
            status: 0,
            content: obj.next().val()
        });

        this.__remove(tempId, obsAryDone);
    },

    restoreItem: function(obj) {

        var tempId = obj.prev().val();

        obsAryTodo.push({
            id: parseInt(tempId, 10),
            status: 0,
            content: obj.next().val()
        });

        this.__remove(tempId, obsAryCancle);
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
            this.view.append("#nsMemoTodoInfoList", "nsMemoTodoListEjs");
            this.view.append("#nsMemoDoneInfoList", "nsMemoDoneListEjs");
            this.view.append("#nsMemoDeleteInfoList", "nsMemoCancleListEjs");

            // data bind
            h5.core.view.bind($("#nsMemoTodoInfoList"), {
                nsMemoTodoList: obsAryTodo
            });

            h5.core.view.bind($("#todoCntSpan"), {
                todoCntVal: todoCnt
            });

            h5.core.view.bind($("#nsMemoDoneInfoList"), {
                nsMemoDoneList: obsAryDone
            });

            h5.core.view.bind($("#doneCntSpan"), {
                doneCntVal: todoCnt
            });

            h5.core.view.bind($("#nsMemoDeleteInfoList"), {
                nsMemoCancelList: obsAryCancle
            });

            h5.core.view.bind($("#cancelCntSpan"), {
                cancleCntVal: todoCnt
            });
        },
        __init: function() {

            this.nsMemoLogic.getnsMemoInfo();
        },
        "#memoSubmitBtn click": function() {
         
            if ($("#memoInput").val() !== "") {
                this.nsMemoLogic.addNewMemo($("#memoInput").val());
            }
        },
        "input[name='todoChkBox'] click": function(context, $el) {
            
            this.nsMemoLogic.chkTodoItem($el);
        },
        "input[name='todoBtn'] click": function(context, $el) {
            
            this.nsMemoLogic.cancleItem($el);
        },
        "input[name='doneChkBox'] click": function(context, $el) {
            
            this.nsMemoLogic.chkDoneItem($el);
        },
        "input[name='restoreBtn'] click": function(context, $el) {
            
            this.nsMemoLogic.restoreItem($el);
        },
        "#todoArrow click": function() {

            if (todoListShowFlg) {

                todoListShowFlg = false;
                $("#nsMemoTodoInfoList").css("display", "none");
                $("#todoArrow").css("transform", "rotate(45deg)");
            } else {

                todoListShowFlg = true;
                $("#nsMemoTodoInfoList").css("display", "block");
                $("#todoArrow").css("transform", "rotate(225deg)");
            }
            
        },
        "#doneArrow click": function() {

            if (doneListShowFlg) {

                doneListShowFlg = false;
                $("#nsMemoDoneInfoList").css("display", "none");
                $("#doneArrow").css("transform", "rotate(45deg)");
            } else {

                doneListShowFlg = true;
                $("#nsMemoDoneInfoList").css("display", "block");
                $("#doneArrow").css("transform", "rotate(225deg)");
            }
            
        },
        "#cancleArrow click": function() {

            if (cancleListShowFlg) {

                cancleListShowFlg = false;
                $("#nsMemoDeleteInfoList").css("display", "none");
                $("#cancleArrow").css("transform", "rotate(45deg)");
            } else {

                cancleListShowFlg = true;
                $("#nsMemoDeleteInfoList").css("display", "block");
                $("#cancleArrow").css("transform", "rotate(225deg)");
            }
            
        },
        "#memoSaveBtn click": function() {

            alert("保存成功");
        }
    };

    h5.core.controller("#nsMemoInfoContainer", nsMemoController);
});