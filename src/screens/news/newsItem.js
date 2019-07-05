/**
 * Created by supervons on 2019/2/25.
 */
/**
 * Created by supervons on 2019/2/25.\
 * 新闻列表页面，Card Image 列表展示形式
 */
import React, {Component} from 'react';
import {Image} from 'react-native';
import {
    Card,
    CardItem,
    Thumbnail,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right,
} from 'native-base';
export default class NewsItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../../resource/image/titleImage/title.jpg')}/>
                        <Body>
                        <Text>{this.props.newsTitle}</Text>
                        <Text note>{this.props.newsIntroduction}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={require('../../resource/image/titleImage/alita.jpeg')}
                           style={{height: 200, width: null, flex: 1,
                               resizeMode: 'contain'}}/>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent>
                            <Icon active name="thumbs-up"/>
                            <Text>{this.props.newsFavoriteId} 喜欢</Text>
                        </Button>
                    </Left>
                    <Body>
                    <Button transparent>
                        <Icon active name="chatbubbles"/>
                        <Text>{this.props.commentsCount} 评论</Text>
                    </Button>
                    </Body>
                    <Right>
                        <Text>{this.props.newsTime}</Text>
                    </Right>
                </CardItem>
            </Card>
        );
    }
}