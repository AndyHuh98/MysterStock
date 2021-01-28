import React, {useState, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppSecondaryColor} from '../Utils/Constants';

// props passed in: companyInfo
export default function CompanyDescriptionFromSearch(props) {
  const [showMore, setShowMore] = useState(undefined);

  return useMemo(() => {
    const toggleShowMore = () => {
      setShowMore(!showMore);
    };

    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Description</Text>
        <Text
          numberOfLines={showMore ? undefined : 4}
          style={styles.descriptionText}>
          {props.companyInfo.description === '0'
            ? 'Company description not supported.'
            : props.companyInfo.description}
        </Text>
        <Text onPress={toggleShowMore} style={styles.showMoreText}>
          {showMore ? 'Show less...' : 'Show more...'}
        </Text>
      </View>
    );
  }, [props.companyInfo.description, showMore]);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${AppSecondaryColor}`,
    borderRadius: 10,
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: 'Dosis-Bold',
  },
  descriptionText: {
    lineHeight: 21,
    color: 'white',
    fontFamily: 'Dosis-Medium',
  },
  showMoreText: {
    lineHeight: 21,
    marginTop: 10,
    color: '#0067da',
    fontFamily: 'Dosis-Bold',
  },
});
