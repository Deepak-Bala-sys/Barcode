import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
// Create a navigation reference using React Navigation
export const navigationRef = createNavigationContainerRef();
// Function to navigate to a specific screen with optional parameters
export const navigate = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};
// Function to navigate back to the previous screen
export const navigateBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
};
// Function to reset navigation to a specific screen with optional parameters and index
export const navigateAndSimpleReset = (name, params, index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{name, params}],
      }),
    );
  }
};
