# cordova-plugin-oic-demo

This demo app requires the cordova-plugin-oic packages, available at https://github.com/siovene/cordova-plugin-oic/.

It show-cases the **OIC Cordova Plugin for Android**, but discoverying and listing properties of available resources on the current network.

Currently, the **OIC Cordova Plugin for Android** ships with a pre-built Iotivity 1.0.1 for ARM with a custom patch on top.

# Dependencies

You will need the Android SDK, version 21 or above. You will also need an ARM Android device (multicasting doesn't work on the Android emulator.)

# How to build

```sh
sudo npm install -g cordova grunt-cli # global npm packages
npm install # local npm packages
bower install # client js repositories
grunt platform:add:android # inits the platform and install plugins
grunt run:android # builds, installs and runs on the connected device
```
