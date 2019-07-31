/**
 * Created by supervons on 2019/2/25.\
 * 新闻列表页面，Card Image 列表展示形式
 */
import React, {Component} from 'react';
import NewsItem from './newsItem';
import {
    FlatList,
    Text,
    RefreshControl,
    InteractionManager,
    StyleSheet,
    Image,
    View,
    ActivityIndicator
} from 'react-native';
import NewsAction from '../../common/actions/newsAction';

export default class News extends Component {

    static navigationOptions = {
        title: '新闻',
        headerStyle: {                                 //导航栏样式设置
            backgroundColor: '#8bc9ff',
        },
    }

    constructor(props) {
        super(props);
        this.returnRender = this.returnRender.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.renderSeparator = this.renderSeparator.bind(this);
        this.keyId = 0;
        this.state = ({
            // 当前页码
            pageNo: 0,
            // 步长
            itemNo: 5,
            isLoading: true,
            dataArray: [],
            showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            isRefreshing: false,//下拉控制
            totalPageCount: 0,
        });
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.fetchData();
        });
    }

    fetchData() {
        let pageNo = this.state.pageNo;
        let itemNo = this.state.itemNo;
        /**
         * 请求接口
         * pageNo 当前页面
         * itemNo 步长
         */
        NewsAction.getNewsList({
            pageNo: pageNo,
            itemNo: itemNo,
        }, (response) => {
            let data = response.data;
            let dataBlob = [];
            let i = this.keyId;
            data.map(function (item) {
                dataBlob.push({
                    key: i + '',
                    ...item,
                })
                i++;
            });
            let foot = 0;
            this.keyId = i;
            this.setState({
                dataArray: this.state.dataArray.concat(dataBlob),
                newsSpinner: false,
                isRefreshing: false,
                showFoot: foot,
                totalPageCount: response.auxiliaryData.countNum,
            });
            data = null;
            dataBlob = null;
        }, (error) => {
            this.setState({
                newsSpinner: false,
                refreshing: false,
            });
        });
    }

    handleRefresh = () => {
        this.setState({
            pageNo: 0,
            isRefreshing: true,//tag,下拉刷新中，加载完全，就设置成flase
            dataArray: []
        });
        this.fetchData()
    }

    returnRender(item) {
        return (
            <NewsItem
                newsTitle={item.newsTitle}
                newsIntroduction={item.newsIntroduction}
                newsFavoriteId={item.newsFavoriteId}
                commentsCount={item.commentsCount}
                newsTime={item.newsTime}/>
        );
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: "#CED0CE",
                }}
            />
        );
    };

    _onEndReached() {
        let pageNo = this.state.pageNo;
        let itemNO = this.state.itemNo;
        let totalPage = Math.ceil(this.state.totalPageCount / itemNO);
        //如果是正在加载中或没有更多数据了，则返回
        if (this.state.showFoot != 0) {
            return;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if ((pageNo != 0) && (pageNo >= totalPage)) {
            this.setState({showFoot: 1});
            return;
        } else {
            pageNo++;
        }
        //底部显示正在加载更多数据
        this.setState({showFoot: 2, pageNo: pageNo},
            this.fetchData);
    }

    _renderFooter() {
        if (this.state.showFoot === 1) {
            return (
                <View style={{height: 30, alignItems: 'center', justifyContent: 'flex-start',}}>
                    <Text style={{color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5,}}>
                        - 我也是有底线的 -
                    </Text>
                </View>
            );
        } else if (this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if (this.state.showFoot === 0) {
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    }

    _separator() {
        return <View style={{height: 1, backgroundColor: '#999999'}}/>;
    }

    renderData() {
        return (
            <FlatList
                data={this.state.dataArray}
                renderItem={({item}) => this.returnRender(item)}
                ListFooterComponent={this._renderFooter.bind(this)}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={0.01}
                ItemSeparatorComponent={this._separator}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.handleRefresh.bind(this)}//因为涉及到this.state
                        title="努力加载中..."
                        colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                        progressBackgroundColor="#ffffff"
                    />
                }
            />

        );
    }

    render() {
        //加载数据
        return this.renderData();
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8,
        fontSize: 15,
        color: '#ffa700',
    },
    footer: {
        flexDirection: 'row',
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    content: {
        marginBottom: 8,
        marginLeft: 8,
        marginRight: 8,
        fontSize: 14,
        color: 'black',
    }
});
