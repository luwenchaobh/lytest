var testApp = angular.module("testApp",[]);


testApp.config(function($routeProvider){
    $routeProvider
        .when("/", {
            redirectTo: "/"
        })
        .when("/:message", {
            templateUrl:"test.html",
            controller:"routCtrl"
        })

});

//功能一：访问短网址时，重定向用户到原网址
testApp.controller("routCtrl", function($scope, $http, $routeParams, $location) {

    var shortURL = $routeParams.message;

    $http.get("/findShortURL", {params: {shortURL: shortURL}}).then(function (urls) {
        console.log("urls");
        if (urls.data.length != 0) {
            window.location = urls.data[0].longURL;
        } else {
            $location.path("/");
        }
    });
});






//功能二：将任意原网址转化为路径部分只包含5位数字+字母的短网址
testApp.controller("AppCtrl", function($http, $scope){
    $scope.transfer = function(longURL){
        if(ValidURL(longURL)) {
            //用输入窗口的长地址查找对应 JSON element
            $http.get("/findLongURL", {params: {longURL: longURL}}).then(function (elment) {
                //如果找到 JSON element，将此元素中 shortURL 赋值给输出窗口
                if (elment.data.length != 0) {
                    $scope.data.shortURL = "http://wenchao.mybluemix.net/#/" + elment.data[0].shortURL;
                } else {
                //如果没有找到 JSON element，利用长地址longURL生成短地址shortURL,并用长短地址生成JSON element 存入mongodb，并返回此元素
                    $http.get("/save", {params: {longURL: longURL}}).then(function (newElement) {
                        $scope.data.shortURL = "http://wenchao.mybluemix.net/#/" + newElement.data.shortURL;
                    });
                }
            });
        }
    };

});

//判断输入是否为有效地址格式
function ValidURL(string) {
    var regExp =/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
    if (!regExp.test(string)){
        alert("Please Input an Valid URL!");
        return false;
    }else{
        return true;
    }
}