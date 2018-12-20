/**
 * Created by supervons on 2018/12/20.
 * 通用常量方值
 */
import {
    Dimensions
} from 'react-native';

const CommonValue = {
    //dxNum设置为4000时，滑动禁止，40则开启
    dxNum: 4000,
    dyNum: 40,
    x0Num: 100,
    deviceWidth:Dimensions.get('window').width,
    deviceHeight:Dimensions.get('window').height,
};
export default CommonValue;