import React, { useEffect, useMemo, useReducer } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./src/pages/home/HomeAbon";
import Agenda from "./src/pages/agenda/AgendaAbon";

import RiwayatAbsen from "./src/pages/absen/RiwayatAbsen";
import Profile from "./src/pages/profil/ProfileAbon";
import AmbilAbsen from "./src/pages/absen/AmbilAbsen";
import RiwayatAgenda from "./src/pages/agenda/RiwayatAgenda";

import AjukanIzin from "./src/pages/izin/AjukanIzin";
import RiwayatIzin from "./src/pages/izin/RiwayatIzin";
import PdfViewer from "./src/PdfViewer";
import SuccessAbsen from "./src/pages/SuccessAbsen";
import TakePhoto from "./src/pages/absen/TakePhoto";
import LoginActivity from "./src/pages/login/LoginActivity";

import Icon from "react-native-vector-icons/Feather";
import IconB from "react-native-vector-icons/FontAwesome5";
import IconC from "react-native-vector-icons/FontAwesome";
import COLORS from "./src/const/colors";

import { stateConditionString } from "./src/utils/helpers";
import { AuthContext } from "./src/utils/authContext";
import { initialState, reducer } from "./src/reducers/reducer";
import { startapp } from "./src/services/startapp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setClientToken } from "./src/services";
import { biodata } from "./src/services/biodata";
import { riwayathariini } from "./src/services/riwayathariini";
import {
  AnimatedTabBarNavigator,
  DotSize, // optional
  TabElementDisplayOptions, // optional
  TabButtonLayout, // optional
  IAppearanceOptions, // optional
} from "react-native-animated-nav-tab-bar";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Tabs = AnimatedTabBarNavigator();

//Home Screen
const StackHome = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="AmbilAbsen"
      component={AmbilAbsen}
      options={{
        title: "Ambil Absen",
        headerStyle: {
          backgroundColor: "white",
        },
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="TakePhoto"
      component={TakePhoto}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);
const StackAgenda = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Agenda"
      component={Agenda}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="AjukanIzin"
      component={AjukanIzin}
      options={{
        title: "Pengajuan Izin",
        headerStyle: {
          backgroundColor: "white",
        },
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="RiwayatAgenda"
      component={RiwayatAgenda}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);
const StackRiwayat = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Riwayat"
      component={RiwayatAbsen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);
const StackProfile = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="PdfViewer"
      component={PdfViewer}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getJwt = async () => {
    const dataForm = new FormData();
    dataForm.append("jwt_u", "admin");
    dataForm.append("jwt_p", "admin");
    const response = await startapp(dataForm);
    setClientToken(response.data.response);
    AsyncStorage.setItem("token", response.data.response);

    // const username = await AsyncStorage.getItem("username");
    // const dataBio = await biodata(username);
    // const riwayat = await riwayathariini(username);
    // const dataPegawai = dataBio.data.biodata;
    // AsyncStorage.setItem("nama_lengkap", dataPegawai[0].nama_lengkap);
    // AsyncStorage.setItem("nm_opd", dataPegawai[0].nm_opd);
    // AsyncStorage.setItem("jabatan", dataPegawai[0].jabatan);
    // AsyncStorage.setItem(
    //   "waktu_kerja",
    //   JSON.stringify(dataBio.data.waktu_kerja[0])
    // );

    // AsyncStorage.setItem("biodata", JSON.stringify(dataBio.data.biodata[0]));
    // AsyncStorage.setItem("pesan", JSON.stringify(dataBio.data.pesan));

    // AsyncStorage.setItem(
    //   "jadwal_presensi",
    //   JSON.stringify(dataBio.data.jadwal_presensi[0])
    // );
    // console.log(dataBio.data);
  };

  useEffect(() => {
    getJwt();
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("username");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.

      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };
    bootstrapAsync();
  }, []);

  // In a production app, we need to send some data (usually username, password) to server and get a token
  // We will also need to handle errors if sign in failed
  // After getting token, we need to persist the token using `AsyncStorage`
  const authContextValue = useMemo(
    () => ({
      signIn: async (data) => {
        if (data.masuk === true) {
          dispatch({ type: "SIGN_IN", token: data.token });
        } else {
          dispatch({ type: "TO_SIGNIN_PAGE" });
        }
      },
      signOut: async (data) => {
        AsyncStorage.clear();
        dispatch({ type: "SIGN_OUT" });
      },

      signUp: async (data) => {
        if (
          data &&
          data.emailAddress !== undefined &&
          data.password !== undefined
        ) {
          dispatch({ type: "SIGNED_UP", token: "dummy-auth-token" });
        } else {
          dispatch({ type: "TO_SIGNUP_PAGE" });
        }
      },
    }),
    []
  );

  const chooseScreen = (state) => {
    let navigateTo = stateConditionString(state);
    let arr = [];

    switch (navigateTo) {
      case "LOAD_SIGNIN":
        arr.push(
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Auth"
            component={Auth}
          />
        );
        break;

      case "LOAD_HOME":
        arr.push(
          <Stack.Screen
            name="Home"
            component={HomeScreenStack}
            options={{
              headerShown: false,
            }}
          />
        );
        break;
      default:
        arr.push(
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Auth"
            component={Auth}
          />
        );
        break;
    }
    return arr[0];
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        <Stack.Navigator>{chooseScreen(state)}</Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

function HomeScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="BottomTabStack"
        component={BottomTabStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SuccessAbsen"
        component={SuccessAbsen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function Auth({}) {
  return (
    <Stack.Navigator initialRouteName="LoginActivity">
      <Stack.Screen
        name="LoginActivity"
        component={LoginActivity}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function BottomTabStack() {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 15,
        },
        tabStyle: {
          paddingBottom: 25,
          height: 80,
          borderTopWidth: 0,
          // elevation: 10,
          // shadowColor: "#000",
          // shadowOffset: { width: 0, height: 2 },
          // shadowOpacity: 0.5,
          // shadowRadius: 2,

          zIndex: 2,

          dotCornerRadius: 10,
          dotSize: "small",
          whenActiveShow: "label-only",
        },
        // showLabel: false,
        activeBackgroundColor: COLORS.primary,
        inactiveTintColor: COLORS.primary,
        activeTintColor: COLORS.white,
      }}
    >
      <Tabs.Screen
        name="Home"
        color={"#00AEEF"}
        component={StackHome}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name={"compass"} color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="Agenda"
        color={"#00AEEF"}
        component={StackAgenda}
        options={{
          tabBarLabel: "Agenda",
          tabBarIcon: ({ color, size }) => (
            <IconB name={"calendar-alt"} color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="Riwayat"
        color={"#00AEEF"}
        component={StackRiwayat}
        options={{
          tabBarLabel: "Riwayat",
          tabBarIcon: ({ color, size }) => (
            <IconC name={"history"} color={color} size={20} />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        color={"#00AEEF"}
        component={StackProfile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Icon name={"user"} color={color} size={20} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
