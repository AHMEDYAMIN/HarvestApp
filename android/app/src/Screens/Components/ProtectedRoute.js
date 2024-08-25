import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';

const ProtectedRoute = ({ children, navigation }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            navigation.navigate('Login');
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return children;
};

export default ProtectedRoute;
