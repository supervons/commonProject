/**
 * Created by supervons on 2019/3/21.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Dimensions,
    View,
} from 'react-native';
import {Item, Input, Label, Text} from 'native-base';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 50,
        justifyContent: 'center',
    },
    inputView: {
        width: width - 100,
        paddingLeft: 10,
    },
    input: {
        height: 42,
        fontSize: 16,
    },
    errorinfo: {
        marginTop: 10,
    },
    errorinfoText: {
        color: 'red',
    },
});

export default class FormItem extends React.PureComponent {
    static propTypes = {
        label: PropTypes.string,
        onChange: PropTypes.func,
        value: PropTypes.string,
        error: PropTypes.array,
    };
    getError = error => {
        if (error) {
            return error.map(info => {
                return (
                    <Text style={styles.errorinfoText} key={info}>
                        {info}
                    </Text>
                );
            });
        }
        return null;
    };

    render() {
        const {label, onChange, value, error} = this.props;
        return (
            <View>
                <Item floatingLabel>
                    <Label>{this.props.label}</Label>
                    <Input secureTextEntry={this.props.secureTextEntry}
                           style={styles.input}
                           value={value || ''}
                           label={`${label}：`}
                           duration={150}
                           onChangeText={onChange}
                           highlightColor="#40a9ff"
                           underlineColorAndroid="#40a9ff"/>
                </Item>
                <View style={styles.errorinfo}>{this.getError(error)}</View>
            </View>
        );
    }
}
