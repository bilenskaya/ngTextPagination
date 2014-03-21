ngTextPagination is a directive for [AngularJS](http://angularjs.org/) to display an array of strings in pages.

Demos
-----

Check out the running demos [at the ngTextPagination demopage](http://bilenskaya.com/#!/projects/demoreader).


Getting Started
---------------

 * Download ngTextPagination from [the download page on the ngTextPagination demopage](http://bilenskaya.com/uploads/ngTextPagination.zip)

 * Include the script tag on your page after the AngularJS and jQuery script tags (ngTextPagination requires jQuery to run)

        <script type='text/javascript' src='path/to/jquery.min.js'></script>
        <script type='text/javascript' src='path/to/angular.min.js'></script>
        <script type='text/javascript' src='path/to/ng-text-pagination.js'></script>

  * Include the stylesheet tag on your page

        <link rel="stylesheet" href="path/to/ng-text-pagination.css">

 * Add `text-pagination` as a dependency:

        angular.module('myApplication', ['text-pagination']);

 * Use the directive by specifying an `text-pagination`, `text-pagination-next` and `text-pagination-previous` attribute.

        
``` html
<div ng-controller="TextPaginationController" >

      <div text-pagination get-content='getContent()'>

          <button text-pagination-previous >Previous Page</button>
          <button text-pagination-next >Next Page</button>

          <div  class="container">
              <div class="text-container">
                  <p class= "paragraph" ng-hide="1">ABC</p>
                  <p class= "paragraph" ng-repeat="paragraph in paragraphs">{{paragraph}}</p>
              </div>
          </div>

      </div>

</div>
```

 * Pass your array of strings to the factory 'myContentService' using controller

Loading remote data 

``` js
var TextPaginationController = ['$scope',
     '$http',  'myContentService', function($scope, $http, myContentService) {

        $scope.getContent = function () {

            return $http.get('path/to/content')

                .then(function(content) {

                    myContentService.prepForBroadcast(content.data);

                })
        };
    }]
```

or static data

``` js
var TextPaginationController = ['$scope',
     'myContentService', function($scope, myContentService) {

        var text = [

            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel enim sit amet odio lacinia dignissim. Curabitur posuere dui dui, vel luctus massa mollis venenatis. Sed dignissim est at rutrum sodales. Etiam eget pulvinar dui. Maecenas nec eros eget arcu convallis aliquam aliquam at turpis. Mauris mattis est sit amet nunc cursus rutrum. Cras mattis porttitor purus, id eleifend neque facilisis aliquam. Maecenas molestie dui eu varius ultrices. Quisque id arcu ligula. Donec vitae ligula neque.",

            "Mauris dolor orci, vestibulum at leo non, dignissim adipiscing risus. Sed massa nunc, consectetur quis tincidunt a, iaculis eget ligula. Aliquam eu fringilla massa. In consequat purus nulla, vitae facilisis felis ultrices ut. Donec eleifend, justo vitae ullamcorper ornare, tortor libero vehicula diam, a commodo magna metus quis arcu. Nam in magna hendrerit, pulvinar velit non, sollicitudin nibh. Praesent massa massa, interdum at odio eget, aliquet sollicitudin lectus. In semper nulla nec turpis dictum, a dapibus metus ultrices. Cras consectetur at odio sed porttitor. Nulla luctus massa a tortor ullamcorper, a iaculis sapien vestibulum. Nulla gravida elit urna, ac euismod tortor lobortis vitae. Suspendisse potenti.",

            "Nullam a nisl varius, sollicitudin nunc sed, hendrerit lorem. Cras quis quam sed turpis luctus rhoncus. Fusce in urna nunc. Ut lobortis magna enim, sed tempor erat molestie ut. Vestibulum a ante interdum, ultricies neque hendrerit, ultricies mi. Nam ac elit in nulla porttitor malesuada nec id dui. Vestibulum at rutrum lorem, nec sollicitudin ipsum. Vestibulum rhoncus nisi leo, quis elementum nisl convallis vel. Vivamus vulputate ultrices tellus, ac condimentum mauris bibendum imperdiet. Donec pretium ipsum ac felis pharetra vehicula."

        ];

        $scope.getContent = function () {

            myContentService.prepForBroadcast(text);
        };
    }]
```


License
-------

ngTextPagination is licensed under the MIT license.

Copyright (c) 2014 Alina Bilenskaya

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
