/**
 * Created by supervons on 2019/3/3.
 * Redux组件，外层组件需使用 <Provider store={store}> 嵌套
 */
import {View} from 'react-native';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addText, subtractText, resetText} from './action/action';
import {setTestText} from './action/testTextAction';
import {
    Input,
    Text,
    Button,
    Item,
    Label,
} from 'native-base';
let texta = 'ops';
class ReduxTest extends Component {
    constructor(props) {
        super(props);
        this.state={
            text:'',
        }
    }

    static navigationOptions = {
        title: 'Redux测试界面',
        gesturesEnabled: true,
        headerStyle: {                                 //导航栏样式设置
            backgroundColor: '#8bc9ff',
        },
    }

    render() {
        const {onAddText, onSubtractText, onResetText, SetTestText } = this.props;
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

                <Item floatingLabel>
                    <Label>赋予 Redux 中 text 新值（可在主页中查看更新）</Label>
                    <Input onChangeText={(text) => {this.setState({text: text});texta=text}}
                           autoCorrect={false}
                           autoCapitalize="none"
                           value={this.state.text}/>
                </Item>
                <View style={{flex: 1,flexDirection: 'row', justifyContent: 'center',}}>
                    <Text style={{fontSize: 50}}>{this.props.text}</Text>
                    <Button info onPress={SetTestText}>
                        <Text style={{fontSize: 40}}>改变字体</Text>
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
        value: state.mainReducer.text,
        text: state.testReducer.text,
    }
};

// 发送行为
const mapDispatchToProps = (dispatch) => {
    return {
        // 发送行为
        onAddText: () => dispatch(addText(1)),
        onSubtractText: () => dispatch(subtractText(1)),
        onResetText: () => dispatch(resetText(0)),
        SetTestText: () => dispatch(setTestText(texta)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTest);