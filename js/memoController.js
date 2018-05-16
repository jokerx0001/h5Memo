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

var maxId = 0;

var nsMemoLogic = {

    __name: "nsMemoLogic",

    getnsMemoInfo: function() {

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

                if (item.id > maxId) {

                    maxId = item.id;
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

    __remove: function(id, obserArr) {

        for (var i = 0; i < obserArr.length; i++) {

            var item = obserArr[i];
            var itemId = item.get('id');

            if (itemId === parseInt(id, 10)) {
                obserArr.splice(i, 1);
                break;
            }
        }
    },

    addNewMemo: function(memo) {

        obsAryTodo.push({
            id: maxId,
            status: 0,
            content: memo
        });

        maxId++;
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

        var tempId = obj.prev().val();

        obsAryCancle.push({
            id: parseInt(tempId, 10),
            status: 2,
            content: obj.next().val()
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

    RestoreItem: function(obj) {

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

            // data bind
            h5.core.view.bind($("#nsMemoTodoListEjs"), {
                nsMemoTodoList: obsAryTodo
            });
        }
    };

    h5.core.controller("#nsMemoInfoContainer", nsMemoController);
});