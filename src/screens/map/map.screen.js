import React, { useContext, useEffect, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { theme } from "../../infrastructure/theme";
import { Marker, Callout } from "react-native-maps";
import { LocationContext } from "../../services/location/location.context";
import { UserImageContext } from "../../services/user-image/user-image.context";
import { RestaurantsContext } from "../../services/restaurants/restaurants.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { Search } from "../../components/search/search.component";
import { SearchContainerMap } from "../../components/search/search.styles";
import { AvatarImage } from "../../components/user-avatar/user-avatar.component";
import * as Style from "./map.styles";

const isAndroid = Platform.OS === "android";
const Image = isAndroid ? Style.CompactWebView : Style.CompactImage;

const RestaurantMap = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { restaurants } = useContext(RestaurantsContext);
  const { useLoadImage } = useContext(UserImageContext);
  const { uid } = useContext(AuthenticationContext);
  const { viewport, lat, lng } = location;
  const [latDelta, setLatDelta] = useState(0);

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    const newLatDelta = northeastLat - southwestLat;
    setLatDelta(newLatDelta);
  }, [location, viewport]);

  useLoadImage(uid);

  return (
    <Style.MapContainer>
      <SearchContainerMap>
        <Search icon="map" />
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <AvatarImage size={55} />
        </TouchableOpacity>
      </SearchContainerMap>
      <Style.Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {restaurants.map((restaurant) => {
          return (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              pinColor={theme.colors.ui.brand}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              <Callout
                onPress={() =>
                  navigation.navigate("RestaurantDetail", {
                    restaurant: restaurant,
                  })
                }
              >
                <Style.Item>
                  <Image source={{ uri: restaurant.photo }} />
                  <Style.Name center variant="caption" numberOfLines={3}>
                    {restaurant.name}
                  </Style.Name>
                </Style.Item>
              </Callout>
            </Marker>
          );
        })}
      </Style.Map>
    </Style.MapContainer>
  );
};

export const MapScreen = ({ navigation }) => {
  const { error } = useContext(LocationContext);
  if (error) {
    return (
      <Style.MapContainer>
        <SearchContainerMap>
          <Search icon="map" />
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <AvatarImage size={55} />
          </TouchableOpacity>
        </SearchContainerMap>
        <Style.Map
          region={{
            latitude: 0,
            longitude: 0,
          }}
        />
      </Style.MapContainer>
    );
  } else {
    return <RestaurantMap navigation={navigation} />;
  }
};
