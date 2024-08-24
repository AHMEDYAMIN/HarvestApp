import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const FundCard = ({ fund }) => (




    <View style={styles.card}>
        <View style={styles.fundInfo}>
            <Image source={fund.icon} style={styles.fundIcon} resizeMode="contain" />
            <Text style={styles.fundName}>{fund.name}</Text>
            <View style={styles.returnContainer}>
                <Text style={styles.annualReturn}>Annual Return</Text>
                <View style={[styles.returnBox, { backgroundColor: fund.returnColor === 'green' ? '#E6F4EA' : '#FDE8E8' }]}>
                    <Text style={[styles.returnText, { color: fund.returnColor }]}>
                        {fund.return}
                    </Text>
                </View>
            </View>
        </View>
        <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    fundInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    fundIcon: {
        width: 40,
        height: 40,
        marginRight: 16,
    },
    fundName: {
        fontSize: 14,
        fontWeight: '500',

        flex: 1,
        color: '#070A13',
    },
    returnContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',

    },
    annualReturn: {
        fontSize: 12,
        color: '#667085',
        marginBottom: 4,

    },
    returnBox: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 5,
    },
    returnText: {
        fontSize: 14,
        fontWeight: '600',
    },
    detailsButton: {
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        backgroundColor: '#F9FAFB',
        width: '100%',
    },
    detailsButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#667085',
        textAlign: 'center',
    },
});

export default FundCard;
