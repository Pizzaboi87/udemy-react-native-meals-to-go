import React from "react";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MapScreen } from "../../screens/map/map.screen";
import { Settings } from "../../screens/settings/settings.screen";
import { RestaurantsNavigator } from "./restaurants.navigator";
import Ionicons from "@expo/vector-icons/Ionicons";
import { theme } from "../theme";

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    headerShown: false,
    tabBarActiveTintColor: theme.colors.ui.brand,
    tabBarInactiveTintColor: theme.colors.ui.secondary,
  };
};

export const AppNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <FavouritesContextProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavouritesContextProvider>
  );
};
