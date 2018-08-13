var app = angular.module('myApp',['ngRoute']);

app.controller('appLevel',function($rootScope){
    if (localStorage.islogedin){
        $rootScope.status = true;

    }
    else {
        $rootScope.status = false;
    }

})

app.config(function($routeProvider){
    $routeProvider.when('/',{

    })
    .when('/login',{
templateUrl:'/login.html',
controller:'login'

    })
    
    .when('/home',{
        templateUrl:'/home.html',
        
        
    })
    .when('/users',{
templateUrl:'/users.html',
controller:'userscontrol'
        
    })
    .when('/userslist',{
templateUrl:'/userslist.html',
controller:'userslistControler'
        
    })
    
    .when('/logout',{
        template:"",
controller:'logoutControl'
        
    });
});

app.controller('login',function($scope,$location,$rootScope){

    $scope.login= function(){
if($scope.ngusername == "admin" && $scope.ngpassword == "admin"){
localStorage.islogedin = true;
$location.path('/home');
$rootScope.status=true;
}
else{
    alert("invalid credentails");
}
    }

})

app.controller('logoutControl',function($rootScope,$location){
$rootScope.status=false;
localStorage.removeItem('islogedin');
$location.path('/login');



})

app.controller('userscontrol',function($scope){
$scope.submit =function(){
    $scope.arr = [];
    if(localStorage.usersdata){
        $scope.arr = (JSON.parse(localStorage.usersdata))
    }
    $scope.arr.push($scope.user);
    localStorage.usersdata = JSON.stringify($scope.arr);

    
}

})

app.controller('userslistControler',function($scope){
    $scope.userListArr = JSON.parse(localStorage.usersdata);

$scope.delete = function(index){
    $scope.userListArr.splice(index,1);
    localStorage.usersdata= JSON.stringify($scope.userListArr);
 
}



});

app.filter('myfilter',function(){
    return function(data,keyword){
return(keyword)?data.filter((item,index)=> {
    if(item.username.indexOf(keyword)!= -1)
{
    return  true;
}

}): data;
    }
})
