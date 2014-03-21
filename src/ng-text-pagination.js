var module;

module = angular.module('text-pagination', []);

module

.factory('myContentService', function($rootScope) {
    var contentService = {};

    contentService.content = '';

    contentService.prepForBroadcast = function(content) {
        this.content = content;
        this.broadcastItem();
    };

    contentService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

    return contentService;
})


.directive('textPagination', function(){
        return {
            restrict: 'A',
            controller: ['$scope', 'myContentService', '$timeout', function ($scope, myContentService, $timeout) {

                $scope.paragraphs = [];

                var firstParagraph = 0,
                    lastParagraph,

                    paragraphs,
                    paragraphsStyle,
                    paragraphsHeightCurrent,
                    paragraphHeightFirst,
                    paragraphHeightLast,
                    paragraphsHeight,

                    marginTopCurrent = 0,
                    marginBottomCurrent,
                    marginTopNext,
                    marginBottomPrevious = 0,

                    sample,
                    sampleStyle,
                    sampleFontSize,
                    sampleLineHeight,
                    sampleRows,
                    sampleClass = "paragraph",

                    textContainerClass = 'text-container',

                    rowsParagraphs,
                    rowsLastParagraph,
                    rowsFirstParagraph,
                    rowsNonDisplayFirst,
                    rowsNonDisplayLast,

                    rowsDisplayNext,
                    rowsDisplayPrevious,

                    page = {},
                    pageNext = {},
                    pagePrevious = {},

                    i= 0,
                    content = {},

                    pageHeight,
                    lineHeightScale = 1.5,
                    pageHeightDefault = 316;


                var readPage = function () {

                    setPage();

                    definePage();

                    pushContent();

                    defineMargins();

                    setMargins();

                    definePageNext();

                    definePagePrevious();

                    setScopePages();

                };

                this.readPageNext = function(){

                    setPageNext();

                    definePage();

                    pushContent();

                    defineMargins();

                    setMargins();

                    definePageNext();

                    definePagePrevious();

                    setScopePages();

                };

                this.readPagePrevious = function(){

                    setPagePrevious();

                    definePage();

                    pushContentReverse();

                    defineMargins();

                    reverse();

                    setMargins();

                    definePageNext();

                    definePagePrevious();

                    setScopePages();

                    if (marginTopCurrent < 0){
                        marginTopCurrent = 0;
                        readPage();
                    }

                };

                var setPage = function(){
                    pageHeight = pageHeightDefault + marginTopCurrent;
                };

                var definePage = function () {

                    sample = document.getElementsByClassName(sampleClass)[0];
                    sampleStyle = document.defaultView.getComputedStyle(sample, "");
                    sampleFontSize = sampleStyle.getPropertyValue("font-size");
                    sampleLineHeight = parseInt(sampleFontSize) * lineHeightScale;
                    sampleRows = Math.round(pageHeight / sampleLineHeight);

                    pageHeight = sampleRows * sampleLineHeight;

                    return  page = {
                        rows: sampleRows,
                        lineHeight: sampleLineHeight,
                        height: pageHeight

                    };

                };

                var definePageNext = function () {

                    rowsLastParagraph = parseInt(paragraphHeightLast / page.lineHeight);
                    rowsDisplayNext = rowsLastParagraph - rowsNonDisplayLast;

                    if (marginBottomCurrent <= 0) {
                        rowsDisplayNext = 0;
                        lastParagraph = lastParagraph + 1;
                    }

                    marginTopNext = rowsDisplayNext * page.lineHeight;

                    return  pageNext = {

                        firstParagraph: lastParagraph,
                        pageHeight: page.height,
                        margin: marginTopNext

                    };

                };

                var definePagePrevious = function () {

                    rowsFirstParagraph = parseInt(paragraphHeightFirst / page.lineHeight);
                    rowsDisplayPrevious = rowsFirstParagraph - rowsNonDisplayFirst;

                    if (marginTopCurrent == 0) {

                        firstParagraph = firstParagraph - 1;
                        rowsDisplayPrevious = 0;

                    }

                    marginBottomPrevious = rowsDisplayPrevious * page.lineHeight;

                    return  pagePrevious = {

                        firstParagraph: firstParagraph,
                        pageHeight: page.height,
                        margin: marginBottomPrevious

                    };

                };

                var defineMargins = function () {

                    rowsParagraphs = parseInt(paragraphsHeightCurrent / page.lineHeight);
                    rowsNonDisplayLast = rowsParagraphs - page.rows;
                    rowsNonDisplayFirst = marginTopCurrent / page.lineHeight;
                    marginBottomCurrent = rowsNonDisplayLast * page.lineHeight;

                };

                var setMargins = function () {

                    $('.'+ textContainerClass).css('margin-top', -marginTopCurrent);

                    $('.'+ textContainerClass).css('margin-bottom', -marginBottomCurrent);

                };

                var defineParagraphsHeight = function () {

                    paragraphs = document.getElementsByClassName(textContainerClass)[0];
                    paragraphsStyle = document.defaultView.getComputedStyle(paragraphs, "");
                    paragraphsHeightCurrent = paragraphsStyle.getPropertyValue("height");
                    paragraphsHeightCurrent = parseInt(paragraphsHeightCurrent);

                };

                var setPageNext = function() {

                    firstParagraph = $scope.pageNext.firstParagraph;
                    marginTopCurrent = $scope.pageNext.margin;

                    i = $scope.pageNext.firstParagraph;
                    pageHeight = pageHeightDefault + marginTopCurrent;

                };

                var setPagePrevious = function() {

                    firstParagraph = $scope.pagePrevious.firstParagraph;
                    marginTopCurrent = $scope.pagePrevious.margin;
                    i = $scope.pagePrevious.firstParagraph;

                    pageHeight = pageHeightDefault + marginTopCurrent;

                };

                var pushContent = function () {

                    content = myContentService.content;
                    $scope.paragraphs = [];

                    lastParagraph = firstParagraph;

                    for (i; i < content.length; i++) {

                        pushParagraphs();

                    }

                };

                var pushContentReverse = function () {

                    content = myContentService.content;
                    $scope.paragraphs = [];

                    lastParagraph = firstParagraph;

                    for (i; i > 0; i--) {

                        pushParagraphs();

                    }

                };

                var pushParagraphs = function() {

                    $scope.$apply();
                    defineParagraphsHeight();

                    if ((paragraphsHeightCurrent + sampleLineHeight / 2) > page.height) {
                        return
                    }

                    paragraphsHeight = paragraphsHeightCurrent;

                    $scope.paragraphs.push(content[i]);

                    $scope.$apply();

                    defineParagraphsHeight();

                    lastParagraph = i;

                    paragraphHeightLast = paragraphsHeightCurrent - paragraphsHeight;

                    if ($scope.paragraphs.length === 1) {
                        paragraphHeightFirst = paragraphsHeightCurrent
                    }


                };

                var reverse = function (){

                    lastParagraph = [firstParagraph, firstParagraph = lastParagraph][0];

                    paragraphHeightFirst = [paragraphHeightLast, paragraphHeightLast = paragraphHeightFirst][0];

                    rowsNonDisplayLast = [rowsNonDisplayFirst, rowsNonDisplayFirst = rowsNonDisplayLast][0];

                    marginBottomCurrent = [marginTopCurrent, marginTopCurrent = marginBottomCurrent][0];

                    $scope.paragraphs.reverse();
                    $scope.$apply();

                }

                var setScopePages = function() {
                    $scope.page = page;
                    $scope.pageNext = pageNext;
                    $scope.pagePrevious = pagePrevious;
                    $scope.$apply;
                };


                $timeout(readPage, 1000);


            }],

            compile: function compile(){
                return {
                    pre: function (scope, iElement, iAttrs) {
                        scope.$eval(iAttrs.getContent);
                    }
                }
            }


        }
    })


.directive('textPaginationNext', ['myContentService', function(myContentService) {
    return {

        require: '^textPagination',

        link: function(scope, elem, attrs, pageCtrl){
            elem.bind('click', function(){

                if (scope.pageNext.firstParagraph < myContentService.content.length) {
                    pageCtrl.readPageNext();
                }

            })
        }
    }
}])


.directive('textPaginationPrevious', function() {
    return {

        require: '^textPagination',

        link: function(scope, elem, attrs, pageCtrl){
            elem.bind('click', function(){

                if (scope.pagePrevious.firstParagraph > 0) {
                    pageCtrl.readPagePrevious();
                }

            })
        }
    }
});
