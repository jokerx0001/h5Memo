/**
 * nsMovieController.js
 */

// refreshFlg
var refreshFlg = false;

var nsMovieSize = 0;

var nsMovieApiNo = 1;

var obsAry = h5.core.data.createObservableArray();

var doubanApiArr = ["https://api.douban.com/v2/movie/in_theaters", "https://api.douban.com/v2/movie/coming_soon", "https://api.douban.com/v2/movie/top250"];

var nsMovieLogic = {

    __name: "NsMovieLogic",

    getNsMovieInfo: function(doubanApiNo, paramStart, paramCount) {

        this.__getNsMovieInfo(doubanApiNo, paramStart, paramCount).done(function(data) {
            // get film info
            data.subjects.forEach((item) => {
                obsAry.push({
                    title: item.title,
                    original_title: item.original_title,
                    year: item.year,
                    rating: item.rating.average,
                    src: item.images.large,
                });
            });

            refreshFlg = false;
            $("#loadingDiv").css("display", "none");
            $("#nomalLoadDiv").css("display", "inline-block");
        }).fail(function(error) {
            alert("get movie info failed" + errMsg);
        });
    },

    __getNsMovieInfo: function(doubanApiNo, paramStart, paramCount) {

        var promise = h5.ajax(doubanApiArr[doubanApiNo], {
            type: 'POST',
            dataType: 'jsonp',
            data: {
                start: paramStart,
                count: paramCount
            }
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

    var nsMovieController = {

        __name: "nsMovieController",

        __templates: "../ejs/nsMovie.ejs",
        __formController: h5.ui.FormController,
        nsMovieLogic: nsMovieLogic,

        __ready: function() {

            // view bind
            this.view.append("#nsMovieInfoListDiv", "nsMovieInfoListEjs");

            // data bind
            h5.core.view.bind($("#nsMovieInfoListDiv"), {
                nsMovieInfoList: obsAry
            });
        },
        __init: function() {
            refreshFlg = true;
            this.nsMovieLogic.getNsMovieInfo(nsMovieApiNo, 0, 20);
            nsMovieSize = 20;
        },
        "#loadMore click": function() {

        	if (!refreshFlg) {
        		refreshFlg = true;
                $("#nomalLoadDiv").css("display", "none");
                $("#loadingDiv").css("display", "inline-block");
        		this.nsMovieLogic.getNsMovieInfo(nsMovieApiNo, nsMovieSize + 1, nsMovieSize + 21);
                nsMovieSize = nsMovieSize + 20;
        	}        
        },
        "#nsMovieHot click": function() {

            if (!refreshFlg) {
                refreshFlg = true;
                $("#nomalLoadDiv").css("display", "none");
                $("#loadingDiv").css("display", "inline-block");
                this.nsMovieLogic.deleteObservableArray(obsAry);
                nsMovieApiNo = 0;
                this.nsMovieLogic.getNsMovieInfo(nsMovieApiNo, 0, 20);
                nsMovieSize = 20;
            }        
        },
        "#nsMovieLatest click": function() {

            if (!refreshFlg) {
                refreshFlg = true;
                $("#nomalLoadDiv").css("display", "none");
                $("#loadingDiv").css("display", "inline-block");
                this.nsMovieLogic.deleteObservableArray(obsAry);
                nsMovieApiNo = 1;
                this.nsMovieLogic.getNsMovieInfo(nsMovieApiNo, 0, 20);
                nsMovieSize = 20;
            }        
        },
        "#nsMovieTop click": function() {

            if (!refreshFlg) {
                refreshFlg = true;
                $("#nomalLoadDiv").css("display", "none");
                $("#loadingDiv").css("display", "inline-block");
                this.nsMovieLogic.deleteObservableArray(obsAry);
                nsMovieApiNo = 2;
                this.nsMovieLogic.getNsMovieInfo(nsMovieApiNo, 0, 20);
                nsMovieSize = 20;
            }        
        },
        "#backTop click": function backToTop() {  
            $('html,body').animate({  
                scrollTop: 0  
            }, 600);  
        }
    };

    h5.core.controller("#nsMovieInfoContainer", nsMovieController);
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