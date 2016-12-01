import uirouter from 'angular-ui-router';
import routing from './editLabel.route';
import './editLabel.less';

import editLabelService from './editLabel.service';

export default angular.module('editLabel', [uirouter, editLabelService])
    .config(routing)
    .factory('editLabelData', [function() {
        return {
            tagList: []
        }
    }])
    .controller('editLabel', ['editLabelServiceApi', '$scope', '$stateParams', '$state', function(editLabelServiceApi, $scope, $stateParams, $state) {

        $scope.tagname = $stateParams.tagname;
        editLabelServiceApi.oldTag = $stateParams.tagname;

        $scope.goBack = function() {
            window.history.back();
        }

        $scope.tagChange = function(control) {
            var hanzi = control.replace(/[^\u4e00-\u9fa5]/gi, "").length;
            var len = hanzi * 2 + (control.length - hanzi);
            if (control == '' || $scope.tagname == control || len >= 10) {
                console.log(control)
            } else {
                alert('大于10===' + len)
            }
            editLabelServiceApi.newTag = control;
        }

        $scope.saveDocTag = function() {
            editLabelServiceApi.saveDocTag(editLabelServiceApi).then(({ data }) => {
                console.log(data)
                if (data.isSuccess) {
                    $state.go('delLabel');
                }
            })
        }
    }])

.name