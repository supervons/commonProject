/**
 * Created by supervons on 2018/12/20.
 * 通用样式
 * CommonStyle
 */

import {
    StyleSheet,
    Dimensions
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const CommonStyle = StyleSheet.create({
    buttonStyle: {
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20
    },
    textStyle: {
        marginTop: 15,
        textAlign: 'right',
        marginRight: 25,
    },
    //居中
    centerStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap:'wrap',
    },
    //主页面功能展示button
    mainPageButtonStyle: {
        marginRight: 10,
        marginBottom:10,
        width: 150,
        justifyContent: 'center'
    },
    /*热更新功能按钮样式*/
    codePushBtnStyle: {
        marginTop:40,
        marginLeft:10,
        marginRight:10,
        justifyContent:'center',
    },

});

module.exports = CommonStyle;
