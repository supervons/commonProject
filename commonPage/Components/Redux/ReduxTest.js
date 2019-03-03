/**
 * Created by supervons on 2019/3/3.
 * Redux组件，外层组件需使用 <Provider store={store}> 嵌套
 */
import {View} from 'react-native';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addText, subtractText, resetText} from '../Redux/action/action';
import {
    Container,
    Content,
    Text,
    Button,
} from 'native-base';
class ReduxTest extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {onAddText, onSubtractText, onResetText } = this.props;
        return (
            <View
                style={{flex: 1,}}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
                    <View>
                        <Button transparent onPress={onAddText}>
                            <Text style={{fontSize: 40}}>+</Text>
                        </Button>
                    </View>
                    <Text style={{fontSize: 50}}>{this.props.value}</Text>
                    <View>
                        <Button transparent onPress={onSubtractText}>
                            <Text style={{fontSize: 40}}>-</Text>
                        </Button>
                    </View>
                </View>
                <View style={{flex: 1,flexDirection: 'row', justifyContent: 'center',}}>
                    <Button info onPress={onResetText}>
                        <Text style={{fontSize: 40}}>重置</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

// 获取 state 变化
const mapStateToProps = (state) => {
    return {
        // 获取 state 变化
        value: state.text,
    }
};

// 发送行为
const mapDispatchToProps = (dispatch) => {
    return {
        // 发送行为
        onAddText: () => dispatch(addText(1)),
        onSubtractText: () => dispatch(subtractText(1)),
        onResetText: () => dispatch(resetText(0)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTest);