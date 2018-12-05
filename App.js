import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Camera, Permissions } from "expo";

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
          <Text>Hooray Camera!</Text>
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
