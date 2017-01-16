import {View, Text, TabBarIOS} from 'react-native';
import React, {Component} from 'react';

import styles from './styles';
import Feed from '../Feed';

import {connect} from 'react-redux';
import {actions as navigationActions} from 'react-native-navigation-redux-helpers';

const {jumpTo} = navigationActions;

class ApplicationTabs extends Component {

    _renderTabContent = (tab) => {

        console.log('tabKey:', tab.key);

        if (tab.key === 'feed') {
            return (<Feed/>);
        }

        if (tab.key === 'notifications') {
            return (<View style={[styles.tabContent,{backgroundColor:'green'}]}/> );
        }

        if (tab.key === 'settings') {
            return (<View style={[styles.tabContent,{backgroundColor:'pink'}]}/> );
        }

        return <Text>Hello there</Text>;
    }

    render() {
        const {dispatch, navigation} = this.props;

        //navigation props from tabs reducer
        //key:feed,notification,settings
        //title:Items,Notifications,Settings

        //console.log('applicationTabs',navigation)

        const children = navigation.routes.map((tab, i) => {

            console.log('navigation.index', navigation.index);
            //set Tab 'key','icon','title','onPress','selected=0'

            return (
                <TabBarIOS.Item key={tab.key}
                                icon={tab.icon}
                                selectedIcon={tab.selectedIcon}
                                title={tab.title}
                                onPress={()=>dispatch(jumpTo(i,navigation.key))}
                                selected={navigation.index === i}>
                    {this._renderTabContent(tab)}
                </TabBarIOS.Item>
            );
        });
        return (
            <TabBarIOS tintColor='black'>
                {children}
            </TabBarIOS>
        )
    }
}

const mapStateToProps = (state) => {
    return {navigation: state.get('tabs')};
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(ApplicationTabs);
