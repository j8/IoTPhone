/**
 * IoT Phone
 * https://github.com/j8/iotphone
 * https://github.com/j8/iotdashboard/iotphone
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  ScrollView,
  Text,
  View,
  DeviceEventEmitter
} from 'react-native';

var Button = require('react-native-button');

var {
    Accelerometer,
    Gyroscope,
    Magnetometer
} = require('NativeModules');

Accelerometer.setAccelerometerUpdateInterval(0.1); // in seconds
Gyroscope.setGyroUpdateInterval(0.1);
Magnetometer.setMagnetometerUpdateInterval(0.1);

var AccelerometerManager = React.createClass({
  getInitialState: function () {
    return {
      x: 0,
      y: 0,
      z: 0,
      gyro: false
    }
  },
  componentDidMount: function () {
    DeviceEventEmitter.addListener('AccelerationData', function (data) {
      console.log('data:::::::', data);
      this.setState({
        x: data.acceleration.x.toFixed(5),
        y: data.acceleration.y.toFixed(5),
        z: data.acceleration.z.toFixed(5)
      });
    }.bind(this));
  },
  componentWillUnmount: function () {
    Accelerometer.stopAccelerometerUpdates();
  },
  handleStart: function () {
    Accelerometer.startAccelerometerUpdates();
    this.setState({
      gyro: true
    });
  },
  handleStop: function () {
    Accelerometer.stopAccelerometerUpdates();
    this.setState({
      x: 0,
      y: 0,
      z: 0,
      gyro: false
    });
  },
  render: function() {
    console.log(this.state);
    return (
      <View style={styles.widget}>
        <Text style={styles.welcome}>
          Accelerometer
        </Text>
        <Text>x: {this.state.x}</Text>
        <Text>y: {this.state.y}</Text>
        <Text>z: {this.state.z}</Text>
        {
          (this.state.gyro) ?
          <Button style={{color: 'red', margin: 20}} onPress={this.handleStop}>Stop</Button> :
          <Button style={{color: 'green', margin: 20}} onPress={this.handleStart}>Start</Button>
        }
      </View>
    );
  }
});

var GyroscopeManager = React.createClass({
  getInitialState: function () {
    return {
      x: 0,
      y: 0,
      z: 0,
      gyro: false
    }
  },
  componentDidMount: function () {
    DeviceEventEmitter.addListener('GyroData', function (data) {
      this.setState({
        x: data.rotationRate.x.toFixed(5),
        y: data.rotationRate.y.toFixed(5),
        z: data.rotationRate.z.toFixed(5)
      });
    }.bind(this));
  },
  componentWillUnmount: function () {
    Gyroscope.stopGyroUpdates();
  },
  handleStart: function () {
    Gyroscope.startGyroUpdates();
    this.setState({
      gyro: true
    });
  },
  handleStop: function () {
    Gyroscope.stopGyroUpdates();
    this.setState({
      x: 0,
      y: 0,
      z: 0,
      gyro: false
    });
  },
  render: function() {
    console.log(this.state);
    return (
      <View style={styles.widget}>
        <Text style={styles.welcome}>
          Gyroscope
        </Text>
        <Text>x: {this.state.x}</Text>
        <Text>y: {this.state.y}</Text>
        <Text>z: {this.state.z}</Text>
        {
          (this.state.gyro) ?
          <Button style={{color: 'red', margin: 20}} onPress={this.handleStop}>Stop</Button> :
          <Button style={{color: 'green', margin: 20}} onPress={this.handleStart}>Start</Button>
        }
      </View>
    );
  }
});

var MagnetometerManager = React.createClass({
  getInitialState: function () {
    return {
      x: 0,
      y: 0,
      z: 0,
      gyro: false
    }
  },
  componentDidMount: function () {
    DeviceEventEmitter.addListener('MagnetometerData', function (data) {
      this.setState({
        x: data.magneticField.x.toFixed(5),
        y: data.magneticField.y.toFixed(5),
        z: data.magneticField.z.toFixed(5)
      });
    }.bind(this));
  },
  componentWillUnmount: function () {
    Magnetometer.stopMagnetometerUpdates();
  },
  handleStart: function () {
    Magnetometer.startMagnetometerUpdates();
    this.setState({
      gyro: true
    });
  },
  handleStop: function () {
    Magnetometer.stopMagnetometerUpdates();
    this.setState({
      x: 0,
      y: 0,
      z: 0,
      gyro: false
    });
  },
  render: function() {
    console.log(this.state);
    return (
      <View style={styles.widget}>
        <Text style={styles.welcome}>
          Magnetometer
        </Text>
        <Text>x: {this.state.x}</Text>
        <Text>y: {this.state.y}</Text>
        <Text>z: {this.state.z}</Text>
        {
          (this.state.gyro) ?
          <Button style={{color: 'red', margin: 20}} onPress={this.handleStop}>Stop</Button> :
          <Button style={{color: 'green', margin: 20}} onPress={this.handleStart}>Start</Button>
        }
      </View>
    );
  }
});

class IoTPhone extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <Text style={styles.welcome}>
          IoT Phone
        </Text>
          <AccelerometerManager></AccelerometerManager>
          <GyroscopeManager></GyroscopeManager>
          <MagnetometerManager></MagnetometerManager>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
  },
  widget: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'whitesmoke',
    padding: 5,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
  },
});

console.ignoreYellowBox = ['jsSchedulingOverhead'];

AppRegistry.registerComponent('IoTPhone', () => IoTPhone);
