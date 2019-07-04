/**
 * Created by supervons on 2019/5/8.
 * 日期选择组件：
 * 1，react-native-calendars 日历组件选择
 * 2，结合 react-native-picker，传入日期数据进行联动选择
 */
import React, {Component} from 'react';
import {
    Content,
    Container,
    Button,
    Card,
    CardItem,
    Body,
    Toast
} from 'native-base';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import CommonStyles from '../../common/CommonProperties/CommonStyle';
import {View, Text} from 'react-native';

import Picker from 'react-native-picker';
let data = [];
for (var i = 0; i < 100; i++) {
    data.push(i);
}
export default class EchartsView extends Component {
    constructor(props) {
        super(props);
        this._showDatePicker = this._showDatePicker.bind(this);
        this._getCurrentDate = this._getCurrentDate.bind(this);
        this._createDateData = this._createDateData.bind(this);
        this.state = ({
            current: '',
            currentDate: this._getCurrentDate(),
        });
    }

    static navigationOptions = {
        title: '日期选择器',
        gesturesEnabled: true,
        headerStyle: {                                 //导航栏样式设置
            backgroundColor: '#8bc9ff',
        },
    };
    //获取当前日期  格式如 2018-12-15
    _getCurrentDate() {
        var currDate = new Date()
        var year = currDate.getFullYear()
        var month = (currDate.getMonth() + 1).toString()
        var dateDay = currDate.getDate().toString()
        let time = year + '-' + month + '-' + dateDay
        return time;
    }

    //组装日期数据
    _createDateData() {
        let date = [];
        var currDate = new Date()
        var year = currDate.getFullYear()
        var month = currDate.getMonth() + 1
        for (let i = 1970; i <= year; i++) {
            let month = [];
            for (let j = 1; j < 13; j++) {
                let day = [];
                if (j === 2) {
                    for (let k = 1; k < 29; k++) {
                        day.push(k + '日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if (i % 4 === 0) {
                        day.push(29 + '日');
                    }
                }
                else if (j in {1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1}) {
                    for (let k = 1; k < 32; k++) {
                        day.push(k + '日');
                    }
                }
                else {
                    for (let k = 1; k < 31; k++) {
                        day.push(k + '日');
                    }
                }
                let _month = {};
                _month[j + '月'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i + '年'] = month;
            date.push(_date);
        }
        return date;
    }

    //打开日期选择 视图
    _showDatePicker() {
        var year = ''
        var month = ''
        var day = ''
        var dateStr = this.state.currentDate
        year = dateStr.substring(0, 4)
        month = parseInt(dateStr.substring(5, 7))
        day = parseInt(dateStr.substring(8, 10))
        Picker.init({
            pickerTitleText: '日期选择',
            pickerCancelBtnText: '取消',
            pickerConfirmBtnText: '确定',
            selectedValue: [year + '年', month + '月', day + '日'],
            pickerBg: [255, 255, 255, 1],
            pickerData: this._createDateData(),
            pickerFontColor: [33, 33, 33, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                var year = pickedValue[0].substring(0, pickedValue[0].length - 1)
                var month = pickedValue[1].substring(0, pickedValue[1].length - 1) || ""
                var day = pickedValue[2].substring(0, pickedValue[2].length - 1) || ""
                let str = year + '-' + month + '-' + day
                Toast.show({text: str, type: 'success'});
                this.setState({
                    currentDate: str,
                })
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                Toast.show({text: 'date' + ' - ' + pickedValue + ' - ' + pickedIndex, type: 'success'});
                console.log('date', pickedValue, pickedIndex);
            }
        });
        Picker.show();
    }

    render() {
        return (
            <Content>
                <Container>
                    <Card>
                        <CardItem>
                            <Body>
                            <Text>这里提供两种日期选择</Text>
                            </Body>
                        </CardItem>
                        <Calendar
                            current={this.state.current}
                            // Handler which gets executed on day press. Default = undefined
                            onDayPress={(day) => {
                                this.state.current = day.dateString;
                                Toast.show({text: day.dateString, type: 'success'});
                            }}
                            // Handler which gets executed on day long press. Default = undefined
                            onDayLongPress={(day) => {
                                console.log('selected day', day)
                            }}
                            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                            monthFormat={'yyyy MM dd'}
                            // Handler which gets executed when visible month changes in calendar. Default = undefined
                            onMonthChange={(month) => {
                                console.log('month changed', month)
                            }}
                            // Hide month navigation arrows. Default = false
                            hideArrows={false}
                            // Do not show days of other months in month page. Default = false
                            hideExtraDays={false}
                            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                            // day from another month that is visible in calendar page. Default = false
                            disableMonthChange={true}
                            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                            firstDay={1}
                            // Hide day names. Default = false
                            hideDayNames={false}
                            // Show week numbers to the left. Default = false
                            showWeekNumbers={false}
                            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                            onPressArrowLeft={substractMonth => substractMonth()}
                            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                            onPressArrowRight={addMonth => addMonth()}
                        />
                        <View style={CommonStyles.centerViewStyle}>
                            <Button style={CommonStyles.buttonStyle} onPress={this._showDatePicker}><Text
                                style={{color: '#ffffff'}}>日期选择器2</Text></Button>
                        </View>
                    </Card>
                </Container>
            </Content>
        )
            ;
    }
}