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
