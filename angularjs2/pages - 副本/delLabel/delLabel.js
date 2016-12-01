import uirouter from 'angular-ui-router';
import routing from './delLabel.route';
import './delLabel.less';

import delLabelService from './delLabel.service';

export default angular.module('delLabel', [uirouter, delLabelService])
    .config(routing)
    .factory('delLabelData', [function() {
        return {
            tagList: []
        }
    }])
    .controller('delLabel', ['delLabelServiceApi', 'delLabelData', '$scope', '$state', function(delLabelServiceApi, delLabelData, $scope, $state) {
        $scope.tagNameList = delLabelData;
        $scope.hideDelIcon = false;
        $scope.editLabel = function() {
            $scope.hideDelIcon = !$scope.hideDelIcon;
        }
        delLabelServiceApi.relationType = 100;

        delLabelServiceApi.getTagList(delLabelServiceApi).then(({ data }) => {
            console.log(data)
            delLabelData.tagList = data.tagList
        }).then(() => {
            $scope.tagList = delLabelData.tagList.map(item => ({
                count: item.count,
                tagName: item.tagName,
                disable: true
            }))
            console.log($scope.tagList)
        })


        $scope.delLabelTag = function(e, index, tagName) {
            e.preventDefault();
            alert(tagName)
            $scope.tagList[index].disable = !$scope.tagList[index].disable;
            delLabelServiceApi.removeDocTag({ tag: tagName }).then(({ code }) => {
                if (code === '0') {}
            });
        }

        $scope.gotoTagDetails = function(tagname) {
            if (!$scope.hideDelIcon) {
                $state.go('tagDetails', { 'tagname': tagname });
            }
        }

        $scope.goBack = function() {
            window.history.back();
        }
    }])

.name