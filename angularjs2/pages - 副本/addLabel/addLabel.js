import uirouter from 'angular-ui-router';
import routing from './addLabel.route';

import editTag from '../../components/editTag/editTag';
import './addLabel.less';
import addLabelService from './addLabel.service';

export default angular.module('addLabel', [uirouter, addLabelService, editTag])
    .config(routing)
    .factory('addLabelData', [function() {
        return {
            tagData: "",
            customizeTag: {},
            tagOtherList: []
        }
    }])
    .controller('addLabel', ['addLabelServiceApi', 'addLabelData', '$scope', '$stateParams', '$state', function(addLabelServiceApi, addLabelData, $scope, $stateParams, $state) {
        $scope.tagListData = addLabelData;

        $scope.tagname = $stateParams.tagname;
        $scope.isShowTag = true;

        $scope.goBack = function() {
            window.history.back();
        }
        console.log(addLabelServiceApi)
            // addLabelServiceApi.relationType = 100;
        addLabelServiceApi.patientIds = ['100012'];

        addLabelServiceApi.getTagList(addLabelServiceApi).then(({ data }) => {
            console.log(data)
            addLabelData.tagData = data;
        }).then(() => {
            addLabelData.tagData.usedTags.forEach((item, index) => {
                if (index === 0) {
                    addLabelData.customizeTag = {
                        typeName: item.typeName,
                        userTagList: item.tagList.map(items => ({
                            selected: items.selected,
                            tag: items.tag,
                            type: items.type
                        }))
                    }
                } else {
                    addLabelData.tagOtherList.push({
                        typeName: item.typeName,
                        type: item.type,
                        otherList: item.tagList.map(items => ({
                            selected: items.selected,
                            tag: items.tag
                        }))
                    });
                }
            });
        });

        $scope.tagChecked = function(type, parentIndex, index) {
            if (type === 'my') {
                addLabelData.customizeTag.userTagList[index].selected = !addLabelData.customizeTag.userTagList[index].selected;
            } else {
                addLabelData.tagOtherList[parentIndex].otherList[index].selected = !addLabelData.tagOtherList[parentIndex].otherList[index].selected;
            }
        }

        $scope.isexist = function(name) {
            let isUserExist = true;
            let isSysExist = true;
            addLabelData.tagData.usedTags.forEach((item, index) => {
                item.tagList.filter(items => {
                    return items.tag === name;
                }).map((item) => {
                    if (item) {
                        isUserExist = false;
                    }
                });
            })

            addLabelData.tagData.systemTags.filter(items => {
                return items === name;
            }).map((item) => {
                if (item) {
                    isSysExist = false;
                }
            });
            return (isUserExist === false || isSysExist === false) ? false : true;
        }

        $scope.gettag = function(newtag) {
            console.log(newtag)
        }

        var selectedTag = [];
        $scope.saveCustomizeTag = function() {
            selectedTag = addLabelData.customizeTag.userTagList.filter((item) => { item.selected }).map((item) => item.tag);
            console.log(selectedTag)
        }

    }])

.name