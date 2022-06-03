import React from 'react';
import { Button, View, ActionSheetIOS, Platform, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { Ionicons } from '@expo/vector-icons'

export default class PickerDropDown extends React.Component {
    onIOSButton = () => {
        const options = this.props.children.map((item, i) => {
            return item && item.props.label;
        });
        options.push("Cancel");
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex: options.length - 1,
            },
            this.onIOSButtonPick
        );
    }

    onIOSButtonPick = (buttonIndex) => {
        if (buttonIndex < this.props.children.length && buttonIndex != this.props.selectedValue) {
            if (typeof this.props.selectedValue === 'undefined' || (typeof this.props.selectedValue !== 'undefined' && buttonIndex != this.findIndexForValue(this.props.selectedValue))) {
                this.props.onValueChange(this.props.children[buttonIndex] && this.props.children[buttonIndex].props.value, buttonIndex);
            }
        }
    }

    findLabelForValue = (searchValue) => {
        for (let i = 0; i < this.props.children.length; i++) {
            if (this.props.children[i] && this.props.children[i].props.value == searchValue) {
                return this.props.children[i].props.label;
            }
        }
        return null;
    }

    findIndexForValue = (searchValue) => {
        for (let i = 0; i < this.props.children.length; i++) {
            if (this.props.children[i] && this.props.children[i].props.value == searchValue) {
                return i;
            }
        }
        return -1;
    }

    render() {
        if (Platform.OS === "ios") {
            let title = "";
            if (this.props.children && this.props.children.length > 0) {
                if (typeof this.props.selectedValue !== 'undefined') {
                    title = this.findLabelForValue(this.props.selectedValue);
                } else {
                    title =  this.props.children[0] && this.props.children[0].props.label;
                }
            }
            return (
                <View style={ styles.dropdownContainer }>
                    <View style={ styles.dropdownButtonContainer }>
                        <Button
                            textStyle={{ color: 'black' }}
                            title={title}
                            onPress={this.onIOSButton}
                            type="clear"
                            fontSize={15}
                            transparent
                        />
                    </View>
                    <View style={ styles.dropdownIconContainer }>
                    <Ionicons name="arrow-down-sharp" size={20} color="black" style={styles.dropdownIcon} />
                    </View>
                </View>
            );
        } else {
            return (
                <Picker {...this.props} />
            );
        }
    }
}

const styles = StyleSheet.create({
    dropdownContainer: {
        flexDirection: 'row',
        width: '100%',
        flex: 1,
        alignSelf: 'stretch'
    },
    dropdownButtonContainer: {
        width: '100%',
        justifyContent: 'center',
        marginRight: 0
    },
    dropdownIconContainer: {
        justifyContent: 'center'
    },
    dropdownIcon: {
        marginLeft: -30
    }
});