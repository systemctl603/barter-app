import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Barters from "../screens/Barters"
import ExchangeRequest from "../screens/ExchangeRequest";

const Tab = createBottomTabNavigator();

export default function HomeStack() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Start Exchanges" component={ExchangeRequest} />
            <Tab.Screen name="Check Exchanges" component={Barters} />
        </Tab.Navigator>
    )
}
