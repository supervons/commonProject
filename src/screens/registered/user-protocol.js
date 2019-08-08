/**
 * Created by supervons on 2018/12/20.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    WebView,
    View
} from 'react-native';


export default class UserProtocol extends Component {

    static propTypes = {
        form: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'RNWheel用户协议',
        headerTransparent: true,
        gesturesEnabled: true,
        headerStyle: {},
    };


    render() {
        return (
            <View style={{marginTop:80,flex:1}}>
                <WebView
                    style={{height:300}}
                    source={{uri: 'http://47.93.31.98/test/yinsi.html'}}
                />
            </View>
        );
    }
}
