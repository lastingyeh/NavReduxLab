import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableHighlight,
} from 'react-native';
import DrawerLayoutAndroid from 'DrawerLayoutAndroid';
import ToolbarAndroid from 'ToolbarAndroid';

import styles from './styles';
import Feed from '../Feed';

import {connect} from 'react-redux';
import {actions as navigationActions} from 'react-native-navigation-redux-helpers';

const {jumpTo, pushRoute} = navigationActions;

class ApplicationTabs extends Component {

    //Content View
    _renderTabContent = (tab) => {
        if (tab.key === 'feed') {
            return (
                <Feed />
            );
        }

        if (tab.key === 'notifications') {
            return (
                <View style={[styles.tabContent, {backgroundColor: 'green'}]}/>
            );
        }

        if (tab.key === 'settings') {
            return (
                <View style={[styles.tabContent, {backgroundColor: 'pink'}]}/>
            );
        }
    }

    //region Drawer Toolbar View
    _renderApp = () => {
        const selectedTab = this.props.navigation.routes[this.props.navigation.index];

        const actions = [{
            title: 'New Item',
            icon: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
            show: 'always',
            showWithText: false
        }];

        return (
            <View style={{flex:1}}>
                <ToolbarAndroid
                    navIcon={require('./img/hamburger.png')}
                    actions={actions}
                    onIconClicked={()=>this.drawer.openDrawer()}
                    style={styles.toolbar}
                    title={selectedTab.title}
                    onActionSelected={this._onActionSelected}/>
                {this._renderTabContent(selectedTab)}
            </View>
        )
    }
    //endregion

    //Drawer Item event
    _onActionSelected = (position) => {

        const {dispatch} = this.props;

        if (position === 0) {
            dispatch(pushRoute({
                key: 'new',
                title: 'Main Screen',
                showBackButton: true,
            }, 'global'));
        }
    }

    //Render View
    render() {

        const {dispatch, navigation} = this.props;

        const onNavigate = (action) => {
            this.drawer.closeDrawer();
            dispatch(action);
        }

        //region drawer layout design
        const navigationView = (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                {navigation.routes.map((t, i) => {
                    return (
                        <TouchableHighlight onPress={()=>onNavigate(jumpTo(i,navigation.key))}
                                            key={t.key}
                        style={{borderBottomWidth:2,borderBottomColor:'gray'}}>
                            <Text style={{fontWeight:'500',fontSize:25,color:'red',padding:10}}>{i}.{t.title}</Text>
                        </TouchableHighlight>
                    );
                })}
            </View>
        );
        //endregion

        //DrawerLayout View (composite of _renderApp and navigationView)
        return (
            <DrawerLayoutAndroid
                ref={(drawer)=>{this.drawer = drawer;}}
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={()=>navigationView}>
                {this._renderApp()}
            </DrawerLayoutAndroid>
        );
    }
}

const mapStateToProps = (state) => {
    return {navigation: state.get('tabs')};
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(ApplicationTabs);
