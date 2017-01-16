import React, {Component} from 'react';
import {View, TouchableHighlight, Text} from 'react-native';

import styles from './styles';

const NewItem = (props) => (

    <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={props.onClose}>
                <Text style={styles.button}>X</Text>
            </TouchableHighlight>
        </View>
    </View>
);

NewItem.propTypes = {
    onClose: React.PropTypes.func.isRequired
};

export default NewItem;

