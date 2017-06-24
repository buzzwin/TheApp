# TheApp - Platform


## Built with
 - [React Native](https://facebook.github.io/react-native/) : One language, JavaScript, one source code.
  - [Firebase](https://firebase.google.com/) : Cloud based database and storage service

## How to install the app?
### Prerequisites
To create your own copy of this application, here are the prerequisites:

  - [React Native](https://facebook.github.io/react-native/) installed on your system.
 - [Android SDK](https://developer.android.com/studio/index.html) installed to run the app on android devices.
 - [Xcode](https://developer.apple.com/xcode/) installed to test the app on iOS devices or simulator.

### Build your own copy
Clone the repository:

```
git clone https://github.com/buzzwin/TheApp NewApp
cd NewApp
```

Let's install all the dependencies:

```
npm install
```

**Optional step Make sure all the packages are linked to React Native:**
```
react-native link
```

###We are now ready to lunch the app on an android device.
```
react-native run-android
```

To see the logs:
```
react-native log-android
```

###To run the app on an iOS simulator:
```
react-native run-ios
```

To see the logs:
```
react-native log-ios
```

###How to Keep your new app updated from the original TheApp Repo
...
# Assign the original repo to a remote called "upstream"
Clone your new repository
git clone <new repository>.git
...

Navigate to the repository root
cd <new repository>
...
Add a reference to your original repository
git remote add upstream https://github.com/buzzwin/TheApp
...
Pull all code from the original repository
git pull upstream master
...
Push all code to the new repository
git push origin master
...
You should now be able to take changes in the TheApp repository and then pull in the new app to merge in all those changes.
git pull upstream master
...
