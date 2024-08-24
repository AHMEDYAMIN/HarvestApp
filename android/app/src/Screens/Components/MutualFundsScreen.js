import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FundCard from './FundCard';

const fundsData = [
    {
        id: '1',
        name: 'Alfalah Islamic Money Market Fund',
        return: '+20.20%',
        icon: require('../../Images/alfa.png'),
        returnColor: 'green',
    },
    {
        id: '2',
        name: 'Meezan Cash Fund',
        return: '+19.81%',
        icon: require('../../Images/meezan.png'),
        returnColor: 'green',
    },
    {
        id: '3',
        name: 'Al Meezan Mutual Fund',
        return: '-67.48%',
        icon: require('../../Images/meezan.png'),
        returnColor: 'red',
    },
    {
        id: '4',
        name: 'Al Meezan Mutual Fund',
        return: '-67.48%',
        icon: require('../../Images/meezan.png'),
        returnColor: 'red',
    },
    {
        id: '5',
        name: 'Alfalah Islamic Money Market Fund',
        return: '+20.20%',
        icon: require('../../Images/alfa.png'),
        returnColor: 'green',
    },
    {
        id: '6',
        name: 'Alfalah Islamic Money Market Fund',
        return: '+20.20%',
        icon: require('../../Images/alfa.png'),
        returnColor: 'green',
    },
    {
        id: '7',
        name: 'Al Meezan Mutual Fund',
        return: '-67.48%',
        icon: require('../../Images/meezan.png'),
        returnColor: 'red',
    },
];

const MutualFundsScreen = () => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFunds, setFilteredFunds] = useState(fundsData);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const handleSearch = (text) => {
        setSearchQuery(text);
        const filteredData = fundsData.filter(item =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredFunds(filteredData);
    };

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Ionicons name="chevron-back-outline" size={24} color="#6E7191" />
                        <Text style={styles.headerTitle}>Mutual Funds</Text>
                    </View>
                    <View style={styles.searchContainer}>
                        <View style={styles.searchBar}>
                            <Ionicons name="search" size={20} color="#9a9a9a" />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search Funds"
                                placeholderTextColor="#9a9a9a"
                                value={searchQuery}
                                onChangeText={handleSearch}
                            />
                        </View>
                        <TouchableOpacity style={styles.filterButton}>
                            <Ionicons name="options-outline" size={20} color="#6E7191" />
                            <Ionicons name="chevron-down-outline" size={16} color="#6E7191" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.totalFundsText}>Total Funds ({filteredFunds.length})</Text>
                    <FlatList
                        data={filteredFunds}
                        renderItem={({ item }) => <FundCard fund={item} />}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.fundsList}
                    />
                </View>
            </KeyboardAvoidingView>

            {!isKeyboardVisible && (
                <>
                    {/* Floating Action Button */}
                    <TouchableOpacity style={styles.fab}>
                        <Ionicons name="add" size={28} color="white" />
                    </TouchableOpacity>

                    {/* Bottom Navigation with Curved Cutout */}
                    <View style={styles.bottomNavigation}>
                        <TouchableOpacity style={styles.navItem}>
                            <Ionicons name="home-outline" size={28} color="#B0B0B0" />
                            <Text style={styles.navText}>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem}>
                            <Image
                                source={require('../../Images/search.png')}
                                style={styles.navIconActive}
                            />
                            <Text style={styles.navTextActive}>Funds</Text>
                        </TouchableOpacity>
                        <View style={styles.spacer} />
                        <TouchableOpacity style={styles.navItem}>
                            <Image
                                source={require('../../Images/down.png')}
                                style={styles.navIcon}
                            />
                            <Text style={styles.navText}>History</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem}>
                            <Image
                                source={require('../../Images/updown.png')}
                                style={styles.navIcon}
                            />
                            <Text style={styles.navText}>Withdraw</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.curveContainer}>
                        <View style={styles.curve} />
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#000',
        marginLeft: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 12,
        backgroundColor: '#F9FAFB',
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 8,
        color: '#000',
        marginLeft: 8,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9FAFB',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    totalFundsText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
        color: '#000',
        fontFamily: 'PublicSnas-Medium',
    },
    fundsList: {
        paddingBottom: 80, 
    },
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4.65,
        elevation: 8,
        overflow: 'hidden',
        zIndex: 1,
    },
    navItem: {
        alignItems: 'center',
        flex: 1,
    },
    navIcon: {
        width: 28, // Increase the size to make the icon larger
        height: 28, // Increase the size to make the icon larger
        resizeMode: 'contain', // Ensure the image scales correctly within the bounds
    },
    navIconActive: {
        width: 30, // Slightly larger for the active icon
        height: 30,
        resizeMode: 'contain',
    },
    navText: {
        fontSize: 12,
        color: '#B0B0B0',
        marginTop: 2,
    },
    navTextActive: {
        fontSize: 12,
        color: '#7081FF',
        fontWeight: 'bold',
        marginTop: 2,
    },
    fab: {
        position: 'absolute',
        bottom: 40, // Ensures FAB is above the bottom navigation
        alignSelf: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#7081FF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        zIndex: 10, // Ensure the FAB is above other elements
    },
    curveContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 0, // Place this below the FAB
    },
    curve: {
        width: 100,
        height: 40,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginBottom: 0,
        transform: [{ translateY: 20 }], // Move the curve upwards to align with the FAB
    },
    spacer: {
        width: 80, // Spacer width to create a gap for the FAB
    },
});

export default MutualFundsScreen;
