import React, {FC} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
// Define the type for the props that BottomSheet component accepts
type Params = {
  visible: boolean;
  children: JSX.Element;
  backgroundColor: string;
  setVisible: (value: boolean) => void;
};
const BottomSheet: FC<Params> = ({
  visible,
  children,
  backgroundColor,
  setVisible,
}) => {
  return (
    <Modal
      isVisible={visible}
      backdropColor={'#00000040'}
      backdropOpacity={0.5}
      style={styles.view}>
      <Pressable
        style={styles.modalLayout}
        onPress={event => {
          if (event.target == event.currentTarget) {
            setVisible(false);
            Keyboard.dismiss();
          }
        }}>
        <View
          style={[
            {flex: 0.48},
            styles.overlay,
            {backgroundColor: backgroundColor},
            {borderTopRightRadius: 20, borderTopLeftRadius: 20},
          ]}>
          {children}
          <SafeAreaView />
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 0,
  },
  modalLayout: {
    flex: 1,
    justifyContent: 'flex-end',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  overlay: {
    paddingTop: 10,
  },
});

export default BottomSheet;
