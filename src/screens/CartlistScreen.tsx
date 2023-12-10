import {
  Alert,
  BackHandler,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {updateCartList} from '../redux/slices/CartSlice';
import {navigate} from '../navigation/NavigationRoutes';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const CartlistScreen = () => {
  const cartList = useSelector((state: any) => state.cart.cartList); //reading the redux state
  const dispatch = useDispatch();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleDeviceBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleDeviceBack);
    };
  }, []);

  const handleDeviceBack = () => {
    navigate('barcodescreen');
    return true;
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (cartList && cartList.length) {
      cartList?.forEach((item: any) => {
        const price = parseFloat(item.cartPrice); // Convert cartPrice to a number
        const gst = parseFloat(item.cartGST); // Convert cartGST to a number
        if (!isNaN(price && gst)) {
          totalPrice += price + gst; // Add the price to the total if it's a valid number
        }
      });
      return totalPrice.toFixed(2); // Return total price with 2 decimal places
    }
  };
  //   Flatlist render function
  const renderItem = ({item}: any) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{`Name: ${item.cartName}`}</Text>
      <Text style={styles.itemText}>{`Price: ${item.cartPrice}`}</Text>
      <Text style={styles.itemText}>{`GST: ${item.cartGST}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigate('barcodescreen');
        }}
        style={styles.header}>
        <MaterialIcons name="arrow-back" color={'white'} size={25} />
        <Text style={styles.headerText}>Go Back</Text>
      </Pressable>
      <View style={{marginTop: 20, flex: 1}}>
        {cartList?.length ? (
          <FlatList
            data={cartList}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.cartName}_${index}`}
          />
        ) : (
          <Text style={styles.noDataFound}>No Data Found</Text>
        )}
      </View>
      <View style={styles.totalContainer}>
        <TouchableOpacity
          onPress={() => {
            if (cartList?.length) {
              Alert.alert('Alert', 'Are you sure want to clear cart?', [
                {
                  text: 'OK',
                  onPress: () => {
                    dispatch(updateCartList([]));
                  },
                },
                {text: 'Cancel', onPress: () => {}},
              ]);
            }
          }}
          style={styles.clearCart}>
          <MaterialIcons
            name="shopping-cart-checkout"
            color={'white'}
            size={25}
          />
          <Text style={styles.buttonText}>Clear Cart</Text>
        </TouchableOpacity>
        <Text style={styles.totalPrice}>Total: ${calculateTotalPrice()}</Text>
      </View>
    </View>
  );
};

export default CartlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 10,
  },
  itemText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  clearCart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderColor: '#007bff',
    backgroundColor: '#007bff',
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonText: {
    paddingHorizontal: 10,
    color: 'white',
    fontSize: 18,
  },
  noDataFound: {
    alignSelf: 'center',
    color: 'black',
    marginTop: screenHeight / 2.5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});
