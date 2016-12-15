<div view-title="卡列表" ng-controller="queryActivationCtrl">
    <ion-content>
        <form name="form" class="queryActivation">
            <div class="list">
                <div class="form-list">
                    <label class="item item-input">
                        <span class="input-label spacing2">卡号</span>
                        <input type="text" required test="isCard" is-card="true" show-error="卡号" maxlength="12" placeholder="请输入卡号" ng-model="option.CardNum">
                    </label>
                    <q>*请输入12位正确的卡号</q>
                </div>
                <div class="form-list">
                    <label class="item item-input">
                        <span class="input-label">密码</span>
                        <input type="password" required test="isPassNum" is-pass-num="true" show-error="密码" maxlength="6" placeholder="请输入密码" ng-model="option.cardPassWord">
                    </label>
                    <q>*请输入6位数字密码</q>
                </div>
            </div>
            <button ng-disabled="form.$invalid" class="button button-block button-positive margin-horizontal" ng-click="confirm()">激活</button>
        </form>
    </ion-content>
</>