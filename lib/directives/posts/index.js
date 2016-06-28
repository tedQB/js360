export default function() {
    return {
        bindToController: true,
        transclude: true,
        replace: false,
        controller: Controller,
        controllerAs: 'postsCtrl',
        restrict: 'E',
        scope: {
            posts: "="
        },
        template: `
            <div ng-include="'directive/posts.html'"></div>
        `
    };

    function Controller($log, $scope, $WPHCPost, $attrs) {
        'ngInject';

        var vm = this;
        vm.featureImages = [];
        vm.showAuthor = typeof $attrs.showAuthor !== 'undefined';
        var imgReg = /<img.*?(?:>|\/>)/gi;
        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;  
        var image = new Array(36); 

        image [0] = 'http://www.jiese360.cn/images/app/1.jpg';
        image [1] = 'http://www.jiese360.cn/images/app/2.jpg';   
        image [2] = 'http://www.jiese360.cn/images/app/3.jpg';   
        image [3] = 'http://www.jiese360.cn/images/app/4.jpg';   
        image [4] = 'http://www.jiese360.cn/images/app/5.jpg';                         
        image [5] = 'http://www.jiese360.cn/images/app/6.jpg';
        image [6] = 'http://www.jiese360.cn/images/app/7.jpg';
        image [7] = 'http://www.jiese360.cn/images/app/8.jpg';
        image [8] = 'http://www.jiese360.cn/images/app/9.jpg';
        image [9] = 'http://www.jiese360.cn/images/app/10.jpg';
        image [10] = 'http://www.jiese360.cn/images/app/11.jpg';
        image [11] = 'http://www.jiese360.cn/images/app/12.jpg';
        image [12] = 'http://www.jiese360.cn/images/app/13.jpg';
        image [13] = 'http://www.jiese360.cn/images/app/14.jpg';
        image [14] = 'http://www.jiese360.cn/images/app/15.jpg';
        image [15] = 'http://www.jiese360.cn/images/app/16.jpg';
        image [16] = 'http://www.jiese360.cn/images/app/17.jpg';
        image [17] = 'http://www.jiese360.cn/images/app/18.jpg';
        image [18] = 'http://www.jiese360.cn/images/app/19.jpg';
        image [19] = 'http://www.jiese360.cn/images/app/20.jpg';
        image [20] = 'http://www.jiese360.cn/images/app/21.jpg';
        image [21] = 'http://www.jiese360.cn/images/app/22.jpg';
        image [22] = 'http://www.jiese360.cn/images/app/23.jpg';
        image [23] = 'http://www.jiese360.cn/images/app/24.jpg';
        image [24] = 'http://www.jiese360.cn/images/app/25.jpg';
        image [25] = 'http://www.jiese360.cn/images/app/26.jpg';
        image [26] = 'http://www.jiese360.cn/images/app/27.jpg';
        image [27] = 'http://www.jiese360.cn/images/app/28.jpg';
        image [28] = 'http://www.jiese360.cn/images/app/29.jpg';
        image [29] = 'http://www.jiese360.cn/images/app/30.jpg';
        image [30] = 'http://www.jiese360.cn/images/app/31.jpg';
        image [31] = 'http://www.jiese360.cn/images/app/32.jpg';
        image [32] = 'http://www.jiese360.cn/images/app/33.jpg';
        image [33] = 'http://www.jiese360.cn/images/app/34.jpg';
        image [34] = 'http://www.jiese360.cn/images/app/35.jpg';
        image [35] = 'http://www.jiese360.cn/images/app/36.jpg';
        image [36] = 'http://www.jiese360.cn/images/app/37.jpg';   


        $scope.$watchCollection('postsCtrl.posts', function(newValue, oldValue) {
            /*
            if (!newValue) {
                return;
            }
            if (newValue.length && newValue[0].better_featured_image){
                          
                _.each(newValue, function(post) {
                    var arr = post.content.rendered.match(imgReg);
                    if(arr){ 
                        var src = arr[0].match(srcReg);
                          if(src[1]){
                            console.log('已匹配的图片地址'+(0+1)+'：'+src[1]);
                            vm.featureImages[post.id] =  src[1];
                        }  
                    }
                    //vm.featureImages[post.id] = _.get(post, 'better_featured_image.media_details.sizes.medium.source_url');
                   /*
                    if(vm.featureImages[post.id]){ 
                        vm.featureImages[post.id] = vm.featureImages[post.id].replace('cn','com');
                    }
                   
                });
                return; 
            }
            */
            return _.each(newValue, function(post) {
                if (vm.featureImages[post.id]) {
                    return;
                }
                return $WPHCPost.getFeatureImage(post.featured_media).then(function(images) {


                    /*
                    if (!image) {
                        return;
                    }
                    */
                    var arr = post.content.rendered.match(imgReg);
                    //console.log(post.title);
                    if(arr){ 
                        var src = arr[0].match(srcReg);
                          if(src[1]){
                            //console.log('已匹配的图片地址'+(0+1)+'：'+src[1]);
                            vm.featureImages[post.id] =  src[1];
                            return vm.featureImages[post.id];
                        }  
                    }else{
                                    //文章不存在首图的情况，               
                        var number = Math.floor(Math.random() * image.length);  
                        vm.featureImages[post.id] =  image[number];
                      //  console.log('rrrrrrrrrr');
                        return vm.featureImages[post.id];
                       // return;
                    }               


                    //return vm.featureImages[post.id] = _.get(image, 'media_details.sizes.medium.source_url');
                });
            });
        });
    }
}
