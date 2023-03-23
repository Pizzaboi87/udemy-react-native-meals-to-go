import React, { useContext } from "react";
import { List } from "react-native-paper";
import { StyledText } from "../../helpers/typography/text.helper";
import { SettingsItem, AvatarContainer, UserAvatar } from "./settings.styles";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";

export const SettingsScreen = ({ navigation }) => {
  const { onSignOut, currentUser } = useContext(AuthenticationContext);

  return (
    <SafeArea>
      <AvatarContainer>
        <UserAvatar />
        <StyledText variant="title">{currentUser.displayName}</StyledText>
      </AvatarContainer>
      <List.Section>
        <SettingsItem
          title="Favourites"
          description="Check your favourites"
          left={(props) => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => navigation.navigate("Favourites")}
        />
        <SettingsItem
          title="Logout"
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
          onPress={onSignOut}
        />
      </List.Section>
    </SafeArea>
  );
};
