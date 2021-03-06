import React, {Component} from 'react';
import {
    View,
    Platform,
    NavigationExperimental,
    TouchableHighlight,
    Text
} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';

import Items from '../Items';
import ItemDetails from '../ItemDetails';

import {actions} from 'react-native-navigation-redux-helpers';

const {
    popRoute,
    pushRoute,
} = actions;

const {
    Header:NavigationHeader,
    CardStack:NavigationCardStack,
} = NavigationExperimental;

const NavigationHeaderBackButton = require('NavigationHeaderBackButton');

class Feed extends Component {

    constructor(props) {
        super(props);
    }

    _renderHeader = props => {
        const showHeader = props.scene.route.title &&
            (Platform.OS === 'ios' || props.scene.route.key === 'details');

        if (showHeader) {
            return (
                <NavigationHeader
                    {...props}
                    renderTitleComponent={this._renderTitleComponent}
                    renderLeftComponent={this._renderLeftComponent}
                    renderRightComponent={this._renderRightComponent}
                />
            );
        }

        return null;
    }

    _renderTitleComponent = props => {
        return (
            <NavigationHeader.Title>
                {props.scene.route.title}
            </NavigationHeader.Title>
        )
    }

    _renderLeftComponent = props => {
        const {dispatch, navigation} = this.props;

        if (props.scene.route.showBackButton) {
            return (
                <NavigationHeaderBackButton onPress={()=>dispatch(popRoute(navigation.key))}/>
            );

        }
        return null;
    }

    _renderRightComponent = props => {
        if (props.scene.route.key === 'list') {
            return (
                <TouchableHighlight onPress={this._onAddItem}>
                    <Text style={styles.button}>+</Text>
                </TouchableHighlight>
            );
        }

        return null;
    }

    _renderScene = props => {
        if (props.scene.route.key === 'list') {
            return (
                <View>
                    <Items onSelectItem={this._onSelectItem}/>
                </View>
            );
        }

        if (props.scene.route.key === 'details') {
            return (
                <View style={{marginTop:NavigationHeader.HEIGHT}}>
                    <ItemDetails/>
                </View>
            );
        }
    }

    _onAddItem = () => {
        const {dispatch} = this.props;

        dispatch(pushRoute({
            key: 'new',
            title: 'Main Screen',
            showBackButton: true
        }, 'global'));
    }

    _onSelectItem = () => {
        const {dispatch, navigation} = this.props;

        dispatch(pushRoute({
            key: 'details',
            title: 'Item details',
            showBackButton: true
        }, navigation.key));
    }

    render() {
        return (
            <NavigationCardStack
                onNavigate={()=>{}}
                direction={'horizontal'}
                navigationState={this.props.navigation}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                style={styles.main}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {navigation: state.get('feed')};
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Feed);