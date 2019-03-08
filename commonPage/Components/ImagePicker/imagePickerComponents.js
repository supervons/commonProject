/**
 * Created by supervons on 2019/3/3.
 * 图片选择器
 */
import React, {Component} from 'react';
import {Image, Dimensions, ScrollView} from 'react-native';
import {
    Container,
    View,
    DeckSwiper,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Left,
    Body,
    Icon
} from 'native-base';
import {
    Button,
} from 'native-base';
import SyanImagePicker from 'react-native-syan-image-picker';

const deviceWidth = Dimensions.get('window').width;
export default class ImagePickerComponents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [{
                "size": '默认图片阿丽塔',
                "height": 152,
                "width": 328,
                "uri": null
            }],
        };
        this.toImagePicker = this.toImagePicker.bind(this);
    }

    static navigationOptions = {
        title: '图片选择器',
        gesturesEnabled: true,
        headerStyle: {                                 //导航栏样式设置
            backgroundColor: '#8bc9ff',
        },
    }

    toImagePicker() {
        const options = {
            imageCount: 6,
        }
        SyanImagePicker.showImagePicker(options, (err, selectedPhotos) => {
            if (err) {
                // 取消选择
                return;
            }
            // 选择成功，渲染图片
            this.setState({
                images: selectedPhotos,
            });
        })
    }

    render() {
        return (
            <Container>
                <ScrollView>
                    <View style={{paddingVertical: 20,height:800}}>
                        <DeckSwiper
                            style={{
                                flex: 1,
                            }}
                            ref={(c) => this._deckSwiper = c}
                            dataSource={this.state.images}
                            renderItem={item =>
                                <Card style={{elevation: 3}}>
                                    <CardItem>
                                        <Left>
                                            <Thumbnail
                                                source={item.uri == null ? require('../../image/titleImage/alita.jpeg') : {uri: item.uri}}/>
                                            <Body>
                                            <Text>大小：{item.size}</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem cardBody>
                                        {/*等比缩放*/}
                                        <Image style={{height: deviceWidth * item.height / item.width, flex: 1}}
                                               source={item.uri == null ? require('../../image/titleImage/alita.jpeg') : {uri: item.uri}}/>
                                    </CardItem>
                                    <CardItem>
                                        <Text>宽：{item.width}/</Text>
                                        <Text>高：{item.height}</Text>
                                    </CardItem>
                                </Card>
                            }
                        />
                    </View>
                </ScrollView>
                <View style={{
                    flexDirection: "row",
                    flex: 1,
                    position: "absolute",
                    bottom: 10,
                    left: 0,
                    right: 0,
                    justifyContent: 'space-between',
                    padding: 15
                }}>
                    <Button iconLeft onPress={() => this._deckSwiper._root.swipeRight()}>
                        <Icon name="arrow-back"/>
                        <Text>上一张</Text>
                    </Button>
                    <Button onPress={() => this.toImagePicker()}>
                        <Text>选择图片</Text>
                    </Button>
                    <Button iconRight onPress={() => this._deckSwiper._root.swipeLeft()}>
                        <Text>下一张</Text>
                        <Icon name="arrow-forward"/>
                    </Button>
                </View>
            </Container>
        );
    }
}