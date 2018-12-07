import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from "react-native";

import { Camera, Permissions } from "expo";

// set flex to 1 w/100% width to fill the screen top to bottom, side to side, Type.back -- selects the 'better' camera from the back of the phone
class Autoshoot extends React.Component {
  state = {
    photo: null
  };

  takePicture = () => {
    this.camera
      .takePictureAsync({
        quality: 0.1,
        base64: true,
        exif: false
      })
      .then(photo => {
        this.setState({ photo });
      });
  };

  render() {
    const { photo } = this.state;

    return (
      <View style={{ flex: 1, width: "100%" }}>
        {photo ? (
          <ImageBackground style={{ flex: 1 }} source={{ uri: photo.uri }} />
        ) : (
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.back}
            ref={cam => (this.camera = cam)}
          >
            <TouchableOpacity style={{ flex: 1 }} onPress={this.takePicture} />
          </Camera>
        )}
      </View>
    );
  }
}

export default class App extends React.Component {
  // initialize state
  state = {
    cameraPermission: null
  };

  componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA).then(({ status }) =>
      this.setState({
        cameraPermission: status === "granted"
      })
    );
  }

  render() {
    const { cameraPermission } = this.state;

    // render one of three things depending on permissions
    return (
      <View style={styles.container}>
        {cameraPermission === null ? (
          <Text> Waiting for permission...</Text>
        ) : cameraPermission === false ? (
          <Text>Permission Denied</Text>
        ) : (
          <Autoshoot />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
