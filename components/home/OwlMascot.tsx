import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Sizes } from '../../constants/Sizes';
import owlImage from '../../assets/images/owlimage.png';

export default function OwlMascot() {
    return (
        <View style={styles.container}>
            <Image
                source={owlImage}
                style={styles.owlImage}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: Sizes.lg,
    },
    owlImage: {
        width: 150,
        height: 150,
    },
});