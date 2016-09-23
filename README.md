# cordova-plugin-ocf-demo

This demo app requires the cordova-plugin-ocf packages, available at https://github.com/siovene/cordova-plugin-ocf/.

It show-cases the **OCF Cordova Plugin for Android**, but discoverying and listing properties of available resources on the current network.

Currently, the **OCF Cordova Plugin for Android** ships with a pre-built Iotivity 1.0.1 with a custom patch on top.

# Dependencies

 - nodejs v5 or above (https://nodejs.org/en/download/package-manager/)
 - the Android SDK, version 21 or above
 - an ARM or x86 Android device (multicasting doesn't work on the Android emulator)

# How to build

```sh
sudo npm install -g cordova grunt-cli bower # global npm packages
npm install # local npm packages
bower install # client js repositories
grunt platform:add:android # inits the platform and install plugins
grunt run:android # builds, installs and runs on the connected device
```

# How to discover resources

This demo shows "Discovery devices..." after run it on Android device, it needs an OCF server which leverages [OCF] and [IoTivity]. They need to access the same network, so that this app could explore some resources and tranfer information between OCF server and OCF client. We recommend you to use it to create your own resource. [Here] is a guide about how to create a resource using Node.js on [Ostro OS]. There is a ready [demo] can be used to setup the OCF server.

## Dependencies
- [Intel Edison Kit for Ardunio]
- [Grove starter kit plus]
- [Ostro image for Edison]
- [SmartHome Demo]

## Create resources on Edison

1. [Flash Edison device]
2. [Boot up the Edison device], the image will auto-login as `root` now.
3. [Remote ssh Access]
4. [Connect to a WiFi network]
5. Download the latest release version sensor code at Host, such as [1.1.0-5], copy it to Edison, follow this [file] to connect the sensor to Edison, then start the sensor server(e.g. `temperature sensor`):

```sh
  wget https://github.com/01org/SmartHome-Demo/archive/1.1.0-5.tar.gz
  scp -r 1.1.0-5.tar.gz root@[device-ip]:~/
  ssh root@[device-ip]
  tar -xvf 1.1.0-5.tar.gz
  cd SmartHome-Demo-1.1.0-5/ocf-servers/js-servers
  export NODE_DEBUG=temperature
  node temperature.js
```
Then you should see the following message on your console:
```
temperature: register OK
...
```

## Discovery resource on Android device
1. After running command `grunt run`, this demo will automatically launch and show **Please enable discovery in the settings**.
2. Press menu icon in the top of left, show **OCF Demo**, **Devices**, **Resources** and **Settings**, then press **Settings** and enable "Continuous discovery".
3. Switch to **Resources**, show the temperature sensor's resource information, such as `Device ID` and `Path`, press the resource, will show detail information, for example `Device ID`, `Path` and `Types`. The `value` field of `Properties` can be edit.
4. Switch to **Devices**, show the temperature sensor's device information(e.g. `UUID`, `URL` and `Name`).

## Tips:
* The documentation for these resource servers in SmartHome-Demo is availabe in the [`doc/`] folder


[Ostro OS]: https://ostroproject.org
[Intel Edison Kit for Ardunio]: http://www.intel.com/content/www/us/en/do-it-yourself/edison.html
[Grove starter kit plus]: http://www.seeedstudio.com/depot/Grove-Starter-Kit-Plus-p-1294.html
[Ostro image for edison]: https://download.ostroproject.org/builds/ostro-os/latest/images/edison/ostro-image-swupd-dev-edison-2016-09-07_08-11-14-build-497.toflash.tar.bz2
[SmartHome Demo]: https://github.com/01org/SmartHome-Demo/tree/master/ocf-servers/js-servers
[Flash Edison device]: https://ostroproject.org/documentation/howtos/booting-and-installation.html#intel-edison
[Boot up the Edison device]: https://software.intel.com/en-us/setting-up-serial-terminal-on-system-with-linux
[Remote ssh Access]: https://ostroproject.org/documentation/howtos/authorized-keys.html
[Connect to a WiFi network]: https://ostroproject.org/documentation/howtos/ip-address-config.html
[file]: https://github.com/01org/SmartHome-Demo/blob/master/ocf-servers/js-servers/README.md#setting-up-the-hw-devicessensors
[Here]: https://01.org/zh/ostro%E2%84%A2-os-application-development-using-node.js
[`doc/`]: https://github.com/01org/SmartHome-Demo/tree/master/ocf-servers/doc
[1.1.0-5]: https://github.com/01org/SmartHome-Demo/archive/1.1.0-5.tar.gz
[OCF]: http://openconnectivity.org/
[Iotivity]: https://www.iotivity.org/
[demo]: https://github.com/01org/SmartHome-Demo/tree/master/ocf-servers/js-servers
