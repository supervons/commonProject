/**
 * Created by supervons on 2018/12/20.
 * 入口界面，控制路由
 * app entrance interface page
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {
    Text,
    View
} from 'react-native';
import {Modal, Progress} from '@ant-design/react-native'
import configureStore from './src/screens/redux/store/store'
import RootStack from './src/routers/index'
import {Root} from "native-base";
import Loading from './src/components/loading/Loading'
import CodePush from "react-native-code-push"

import {Sentry} from 'react-native-sentry';

Sentry.config('').install();

const store = configureStore();

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {syncMessage: true};
    }

    componentDidMount() {
        // 热更新检测
        CodePush.sync(
            {
                updateDialog: {
                    optionalIgnoreButtonLabel: '下次再说',
                    optionalInstallButtonLabel: '马上体验',
                    optionalUpdateMessage: '新版本来袭，是否更新',
                    title: '更新提示',
                    mandatoryUpdateMessage: '噢，版本中有一些大改动，不得不更新',
                    mandatoryContinueButtonLabel: '立即更新'
                },
                installMode: CodePush.InstallMode.IMMEDIATE
            },
            this.codePushStatusDidChange.bind(this),
            this.codePushDownloadDidProgress.bind(this)
        );
    }


    codePushDownloadDidProgress(progress) {
        this.setState({progress});
    }

    codePushStatusDidChange(syncStatus) {
        switch (syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                this.setState({syncMessage: "Checking for update."});
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                this.setState({syncMessage: "Downloading package."});
                break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
                this.setState({syncMessage: "Awaiting user action."});
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                this.setState({syncMessage: "Installing update."});
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                this.setState({syncMessage: "App up to date.", progress: false});
                break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
                this.setState({syncMessage: "Update cancelled by user.", progress: false});
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                this.setState({syncMessage: "Update installed and will be applied on restart.", progress: false});
                break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
                this.setState({syncMessage: "An unknown error occurred.", progress: false});
                break;
        }
    }

    render() {
        const showUpdateModal = this.state.progress && this.state.progress.receivedBytes && this.state.progress.receivedBytes!==this.state.progress.totalBytes;
        return (
            <Provider store={store}>
                <Root>
                    <Modal
                        visible={showUpdateModal}
                        transparent
                        maskClosable={false}
                        title="更新中"
                    >
                        {
                            showUpdateModal ?
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Progress percent={parseFloat(this.state.progress.receivedBytes) * 100/parseFloat(this.state.progress.totalBytes)} position="normal" />
                                    <Text>{(parseFloat(this.state.progress.receivedBytes) * 100/parseFloat(this.state.progress.totalBytes)).toFixed(2)}%</Text>
                                </View>
                                : null
                        }
                        <View><Text>更新完毕将自动重启</Text></View>
                    </Modal>
                    <RootStack/>
                    <Loading/>
                </Root>
            </Provider>
        )
    }
}
