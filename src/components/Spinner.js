import React from 'react';
import { View, ActivityIndicator } from 'react-native';


const Spinner = (props) => {
return (
<View style={[styles.SpinnerStyle, props.style]}>
   <ActivityIndicator size={'large'} color={"#fff"} />
</View>
);
};

const styles = {
  SpinnerStyle: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   marginTop: 20

  }
};
export  default Spinner;
