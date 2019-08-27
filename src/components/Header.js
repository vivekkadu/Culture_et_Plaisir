import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import HeaderBgImg from "../Img/main_titile_bg.png";
import SettingIcon from "../Img/icon_setting.png";
import InfoIcon from "../Img/icon_info.png";
import HomeIcon from "../Img/icon_home.png";
import SideMenuImg from "../Img/icon_arrow.png";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import Share from "react-native-share";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
  }

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  render() {
    return (
      <ImageBackground source={HeaderBgImg} style={styles.headerStyle}>
        <View
          style={{
            flex: 1,
            padding: 15,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: width / 1.8
            }}
          >
            {this.props.showHome ? (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Image source={HomeIcon} style={{ height: 40, width: 40 }} />
              </TouchableOpacity>
            ) : null}

            {this.props.showSetting ? (
              <TouchableOpacity onPress={() => this.props.navigateToSettings()}>
                <Image source={SettingIcon} style={{ height: 40, width: 40 }} />
              </TouchableOpacity>
            ) : null}

            <Text
              numberOfLines={1}
              style={[styles.headerTextStyle, this.props.headingStyle]}
            >
              {this.props.headerText}
            </Text>
          </View>

          {this.props.showInfo ? (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("About")}
            >
              <Image source={InfoIcon} style={{ height: 40, width: 40 }} />
            </TouchableOpacity>
          ) : null}

          {this.props.showSideMenu ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => this.props.ShowAll()}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Text
                  style={{ color: "#fff", marginRight: 9, fontWeight: "bold" }}
                >
                  Tout
                </Text>
              </TouchableOpacity>
              <Menu
                ref={this.setMenuRef}
                style={{ backgroundColor: "#3362CA", marginTop: 17 }}
                button={
                  <TouchableOpacity onPress={() => this.showMenu()}>
                    <Image
                      source={SideMenuImg}
                      style={{ height: 14, width: 14 }}
                    />
                  </TouchableOpacity>
                }
              >
                <MenuItem
                  textStyle={{ color: "#fff" }}
                  onPress={() => this.props.showAllCorrect()}
                >
                  Bonnes Réponses
                </MenuItem>
                <MenuDivider color={"#fff"} />
                <MenuItem
                  textStyle={{ color: "#fff" }}
                  onPress={() => this.props.showAllWrong()}
                >
                  Mauvaises Réponses
                </MenuItem>
                <MenuDivider color={"#fff"} />
                <MenuItem
                  textStyle={{ color: "#fff" }}
                  onPress={() => this.props.openShare()}
                >
                  Partager avec
                </MenuItem>
                <MenuDivider color={"#fff"} />
              </Menu>
            </View>
          ) : null}
        </View>
      </ImageBackground>
    );
  }
}

const styles = {
  headerStyle: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.0,
    elevation: 3
  },
  headerTextStyle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginLeft: 5
    //width: 200
  }
};
