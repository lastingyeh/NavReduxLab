import React, {Component} from 'react';
import {View, NavigationExperimental} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import ApplicationTabs from '../ApplicationTabs';
import NewItem from '../NewItem';
import {actions} from 'react-native-navigation-redux-helpers';

const {
    popRoute
} = actions;

const {
    CardStack:NavigationCardStack
} = NavigationExperimental;

class GlobalNavigation extends Component {

    constructor(props) {
        super(props);
    }

    _renderScene = (props) => {

        //console.log('GlobalNavigation',props);

        if (props.scene.route.key === 'applicationTabs') {
            return (
                <View style={{flex:1}}>
                    <ApplicationTabs/>
                </View>
            );
        }

        if (props.scene.route.key === 'new') {
            return (
                <View style={{flex:1}}>
                    <NewItem onClose={this._onCloseNewItem}/>
                </View>
            );
        }
    }

    _renderHeader = (props) => {
        return null;
    }

    _onCloseNewItem = () => {

        const {dispatch, navigation} = this.props;

        //console.log('_onCloseNewItem',navigation.key);

        dispatch(popRoute(navigation.key));
    }

    render() {
        //console.log('navigationState',this.props.navigation)

        return (
            <NavigationCardStack
                onNavigate={()=>{}}
                style={styles.main}
                navigationState={this.props.navigation}
                renderHeader={this._renderHeader}
                renderScene={this._renderScene}
            />
        );
    }

}

const mapStateToProps = (state) => {
    //console.log('state',state)
    //state is Map object
    //props.navigation->state.get('globalNavigation')
    return {
        navigation: state.get('globalNavigation')
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        onNavigate(){
            console.log('@@ onNavigate', arguments);
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(GlobalNavigation);