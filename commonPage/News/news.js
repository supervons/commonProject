/**
 * Created by supervons on 2019/2/25.\
 * 新闻列表页面，Card Image 列表展示形式
 */
import React, {Component} from 'react';
import NewsItem from './newsItem';
import { FlatList, RefreshControl, Image} from 'react-native';
import NewsAction from '../Components/newsAction';
import Spinner from '../Spinner/spinner';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right,
    Footer,
    FooterTab,
} from 'native-base';
export default class News extends Component {

    constructor(props) {
        super(props);
        this.toPersonalCenter = this.toPersonalCenter.bind(this);
        this.toMainPage = this.toMainPage.bind(this);
        this.toSpinnerShows = this.toSpinnerShows.bind(this);
        this.returnRender = this.returnRender.bind(this);
        this.state = ({
            newsList: [],
            newsSpinner: true,
            refreshing:true,
        });
    }

    static navigationOptions = {
        title: '新鲜事儿',
        gesturesEnabled: false,
        headerStyle: {                                 //导航栏样式设置
            backgroundColor: '#8bc9ff',
        },
    }

    componentWillMount(){
        NewsAction.getNewsList({
        }, (response) => {
            console.log(JSON.stringify(response))
            this.setState({
                newsList: response,
                newsSpinner: false,
                refreshing:false,
            });
        }, (error) => {
            this.setState({
                newsSpinner: false,
                refreshing:false,
            });
        });
    }

    toMainPage() {
        this.props.navigation.replace('MainPage');
    }

    toPersonalCenter() {
        this.props.navigation.replace('PersonalCenter');
    }

    toSpinnerShows() {
        this.props.navigation.push('SpinnerShows');
    }

    returnRender(item){
        return(
            <NewsItem
                newsTitle={item.newsTitle}
                newsIntroduction={item.newsIntroduction}
                newsFavoriteId={item.newsFavoriteId}
                commentsCount={item.commentsCount}
                newsTime={item.newsTime}/>
        );
    }

    _onRefresh(){
        this.setState({
            refreshing:true,
        });
    }

    render() {
        return (
            <Container>
                <Content>
                    <Spinner
                        showSpinner={this.state.newsSpinner}
                        spinkerSize={50}
                        spinkerType='Wave'
                        spinkerColor='#3B77FF'/>
                    <FlatList
                        refreshing={this.state.refreshing}
                        onRefresh={() => this._onRefresh()}
                        data={this.state.newsList
                            /*[
                            {
                                key:'1',
                                newsItem: '阿丽塔上映',
                                newsIntroduction: '《阿丽塔：战斗天使》是由二十世纪福克斯电影公司...',
                                likeCount: '58',
                                commentsCount: '9',
                                timeStamp: '2015/03/12'
                            },
                            {   key:'2',
                                newsItem: '阿丽塔上映',
                                newsIntroduction: '《阿丽塔：战斗天使》是由二十世纪福克斯电影公司...',
                                likeCount: '58',
                                commentsCount: '9',
                                timeStamp: '2015/03/12'
                            },
                            {   key:'3',
                                newsItem: '阿丽塔上映',
                                newsIntroduction: '《阿丽塔：战斗天使》是由二十世纪福克斯电影公司...',
                                likeCount: '58',
                                commentsCount: '9',
                                timeStamp: '2015/03/12'
                            },
                            {   key:'4',
                                newsItem: '阿丽塔上映',
                                newsIntroduction: '《阿丽塔：战斗天使》是由二十世纪福克斯电影公司...',
                                likeCount: '58',
                                commentsCount: '9',
                                timeStamp: '2015/03/12'
                            },
                        ]*/
                        }
                        renderItem={({item}) => this.returnRender(item)}
                    />
                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical
                                onPress={this.toMainPage}>
                            <Icon name="apps"/>
                            <Text>应用</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="camera"/>
                            <Text>相机</Text>
                        </Button>
                        <Button vertical active>
                            <Icon active name="radio"/>
                            <Text>新闻</Text>
                        </Button>
                        <Button vertical
                                onPress={this.toPersonalCenter}>
                            <Icon name="person"/>
                            <Text>我的</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}