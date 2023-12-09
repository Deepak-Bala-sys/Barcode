import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import BottomSheet from '../components/BottomSheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {updateCartList} from '../redux/slices/CartSlice';
import {navigateAndSimpleReset} from '../navigation/NavigationRoutes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const BarcodeScreen = () => {
  const cartList = useSelector((state: any) => state.cart.cartList); //reading the redux state
  const scannerRef = useRef(null);
  const dispatch = useDispatch();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [gst, setGST] = useState('');
  const [QRRawData, setQRRawData] = useState('');
  const [scannerDeactivate, setScannerDeactivate] = useState(false);
  const [dataSubmitted, setDataSubmitted] = useState(false);
  let getIndex: number;

  useEffect(() => {
    if (!showBottomSheet && !scannerDeactivate) {
      resetScanner();
    }
    return () => {
      setScannerDeactivate(false);
    };
  }, [showBottomSheet, scannerDeactivate]);
  //  For QR Code onRead Success
  const onSuccess = (data: any) => {
    if (cartList && cartList.length) {
      getIndex = cartList?.findIndex(
        (item: any) => item.QRRawdata === data.rawData,
      );
    }
    if (getIndex === -1 || cartList.length === 0) {
      setShowBottomSheet(true);
      setQRRawData(data.rawData);
      setDataSubmitted(false);
    } else {
      Alert.alert('Alert', 'Item Already Added', [
        {
          text: 'OK',
          onPress: () => {
            setName(cartList[getIndex].cartName);
            setPrice(cartList[getIndex].cartPrice);
            setGST(cartList[getIndex].cartGST);
            setQRRawData(cartList[getIndex].QRRawdata);
            setShowBottomSheet(true);
            setDataSubmitted(false);
          },
        },
        {
          text: 'Cancel',
          onPress: () => {
            setScannerDeactivate(true);
          },
        },
      ]);
    }
  };
  // For reset the scanner
  const resetScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.reactivate();
    }
  };
  // For submit and dispatch the data to redux
  const submitData = () => {
    if (name.trim() === '') {
      Alert.alert('Please enter name');
    } else if (price.trim() === '') {
      Alert.alert('Please enter price');
    } else if (gst.trim() === '') {
      Alert.alert('Please enter GST');
    } else {
      let cartData = {
        cartName: name,
        cartPrice: price,
        cartGST: gst,
        QRRawdata: QRRawData,
      };
      let tempCartList = [...cartList];
      tempCartList.push(cartData);
      dispatch(updateCartList(tempCartList));
      setDataSubmitted(true);
      setName('');
      setPrice('');
      setGST('');
      setQRRawData('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="qr-code-scanner" color={'white'} size={25} />
        <Text style={styles.headerText}>QR Code Scanner</Text>
        {cartList?.length ? (
          <View style={styles.topBadgeCountView}>
            <Pressable
              onPress={() => {
                navigateAndSimpleReset('cartlistscreen');
              }}
              style={[styles.floatingButton, {height: 40, width: 40}]}>
              <MaterialIcons
                name="shopping-cart-checkout"
                color={'#007bff'}
                size={25}
              />
              <View
                style={[
                  styles.badgeCount,
                  {minWidth: 25, minHeight: 25, bottom: 26, left: 26},
                ]}>
                <Text style={styles.badgeText}>{cartList?.length}</Text>
              </View>
            </Pressable>
          </View>
        ) : null}
      </View>
      {/* QR Code Scanner */}
      <QRCodeScanner
        ref={scannerRef}
        onRead={onSuccess}
        reactivate={scannerDeactivate && false}
        flashMode={RNCamera.Constants.FlashMode.off}
        topContent={<Text style={styles.centerText}>Scan any QR</Text>}
      />
      {/* Bottom Sheet  */}
      {showBottomSheet && (
        <BottomSheet
          visible={showBottomSheet}
          backgroundColor={'white'}
          setVisible={() => {
            setShowBottomSheet(false);
          }}
          children={
            <KeyboardAwareScrollView
              style={{marginVertical: screenHeight / 40}}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <TextInput
                defaultValue={name}
                onChangeText={name => {
                  setName(name);
                }}
                placeholder="Name"
                placeholderTextColor={'#808080'}
                style={styles.input}
                autoCapitalize={'none'}
                returnKeyType={'next'}
              />
              <TextInput
                defaultValue={price}
                onChangeText={price => {
                  setPrice(price);
                }}
                keyboardType="number-pad"
                placeholder="Price"
                placeholderTextColor={'#808080'}
                style={styles.input}
              />
              <TextInput
                defaultValue={gst}
                onChangeText={gst => {
                  setGST(gst);
                }}
                placeholder="GST"
                placeholderTextColor={'#808080'}
                style={styles.input}
                autoCapitalize={'none'}
                returnKeyType={'next'}
              />
              <View style={styles.rowButtons}>
                <View style={{flex: 1, paddingRight: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowBottomSheet(false);
                    }}
                    style={[
                      styles.buttonStyle,
                      {backgroundColor: dataSubmitted ? '#007bff' : 'white'},
                    ]}>
                    <Text
                      style={[
                        styles.textInputOnpress,
                        {color: dataSubmitted ? 'white' : 'black'},
                      ]}>
                      {'Cancel'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {!dataSubmitted && (
                  <View style={{flex: 1, paddingLeft: 10}}>
                    <TouchableOpacity
                      onPress={() => {
                        submitData();
                      }}
                      style={styles.buttonStyle}>
                      <Text style={styles.textInputOnpress}>{'Submit'}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {/* Floating Icon with Batch Count */}
              {cartList.length > 0 && (
                <View style={{marginVertical: screenHeight / 12.5}}>
                  <View style={styles.floatingView}>
                    <TouchableOpacity
                      style={[
                        styles.floatingButton,
                        {backgroundColor: '#007bff'},
                      ]}
                      onPress={() => {
                        navigateAndSimpleReset('cartlistscreen');
                        setShowBottomSheet(false);
                        setScannerDeactivate(true);
                      }}>
                      <MaterialIcons
                        name="shopping-cart-checkout"
                        color={'white'}
                        size={25}
                      />
                      <View style={styles.badgeCount}>
                        <Text style={styles.badgeText}>{cartList?.length}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </KeyboardAwareScrollView>
          }
        />
      )}
    </View>
  );
};

export default BarcodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centerText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderRadius: 30,
    marginHorizontal: 20,
    paddingLeft: 20,
    marginVertical: 10,
    borderColor: '#007bff',
    color: 'black',
  },
  buttonStyle: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#007bff',
    backgroundColor: '#007bff',
  },
  textInputOnpress: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  floatingView: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  floatingButton: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeCount: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 15,
    left: 30,
    bottom: 35,
    minWidth: 25,
    minHeight: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 5,
  },
  topBadgeCountView: {
    paddingHorizontal: 20,
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
  },
  rowButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  header: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    paddingVertical: 25,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});
