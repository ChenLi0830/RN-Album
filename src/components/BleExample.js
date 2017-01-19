import React, {Component} from 'react';
import {ScrollView, View, NativeAppEventEmitter, Platform, PermissionsAndroid} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {List, Toast, Button} from 'antd-mobile';


const Item = List.Item;
const Brief = Item.Brief;

class BleExample extends Component {
  
  constructor() {
    super();
    
    this.state = {
      ble: null,
      scanning: false,
      devices: [],
    }
  }
  
  componentDidMount() {
    BleManager.start({showAlert: false});
    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    
    NativeAppEventEmitter
        .addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
    
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.checkPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
          .then((result) => {
            if (result) {
              console.log("Permission is OK");
            } else {
              PermissionsAndroid.requestPermission(
                  PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                  console.log("User accept");
                } else {
                  console.log("User refuse");
                }
              });
            }
          });
    }
  }
  
  handleScan() {
    this.setState({devices: []});
    Toast.loading('扫描中...', 2, () => {
      console.log('加载完成!!!');
    });
    setTimeout(() => {
      BleManager.scan([], 2, true)
          .then((results) => {
            // console.warn('Scanning...');
            // this.getDevices()
          });
    }, 300);
  }
  
  toggleScanning() {
    this.handleScan();
  }
  
  handleDiscoverPeripheral(data) {
    console.log('Got ble data', data);
    
    let newDeviceArray = new Array(...this.state.devices);
    let newDeviceExist = false;
    newDeviceArray.forEach(device => {
      if (device.id === data.id) newDeviceExist = true
    });
    if (!newDeviceExist) {
      newDeviceArray.push(data);
      this.setState({ble: data, devices: newDeviceArray});
      console.log('发现的蓝牙设备: ' + JSON.stringify(data));
    }
  }
  
  getDevices() {
    BleManager.getDiscoveredPeripherals([])
        .then((peripheralsArray) => {
          // Success code
          // console.log('Discovered peripherals: ' + peripheralsArray.length);
          // console.log(JSON.stringify(peripheralsArray));
          this.setState({devices: peripheralsArray});
        });
  }
  
  render() {
    const {app, button} = styles;
    
    const bleScan = this.state.ble
        ? "Device found:" + this.state.ble.id
        : "扫描结果";
    
    const bleList = this.state.devices.map(device => {
      return <Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                   key={device.id}>
        {device.name ? device.name : device.id}
      </Item>
    });
    
    return (
        <View style={app}>
          {/*<Button onClick={() => this.toggleScanning(!this.state.scanning) }>*/}
          {/*<Text>Scan Bluetooth ({this.state.scanning ? 'on' : 'off'})</Text>*/}
          {/*</Button>*/}
          {/*<Button onClick={() => this.getDevices() }>*/}
          {/*<Text>Get Discovered Devices</Text>*/}
          {/*</Button>*/}
          
          <Button style={button} type="primary"
                  onClick={() => this.toggleScanning() }>
            {"蓝牙扫描"}
          </Button>
          
          {/*<Button style={button} type="primary"*/}
          {/*onClick={() => this.getDevices() }>*/}
          {/*获取设备信息*/}
          {/*</Button>*/}
          <ScrollView>
            <List renderHeader={() => {"扫描结果"/*bleScan*/}}>
              <Item
                  thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png">{`周围共有${this.state.devices.length}个蓝牙设备`}</Item>
              {bleList}
            </List>
          </ScrollView>
        </View>
    );
  }
}

const styles = {
  app: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#f5f5f5',
    // height: 500,
    // width: 500
    marginVertical: 10
  },
  button: {
    margin: 10
  }
};

export default BleExample;