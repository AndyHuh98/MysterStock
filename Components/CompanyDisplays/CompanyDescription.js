import React, {useState, useMemo, useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppSecondaryColor} from '../Utils/Constants';
import IEXContext from '../../Contexts/IEXContext';

export default function CompanyDescription(props) {
  const iexContext = useContext(IEXContext);
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
          {iexContext.companyInfo.description === '0'
            ? 'Company description not supported.'
            : iexContext.companyInfo.description}
        </Text>
        <Text onPress={toggleShowMore} style={styles.showMoreText}>
          {showMore ? 'Show less...' : 'Show more...'}
        </Text>
      </View>
    );
  }, [iexContext.companyInfo.description, showMore]);
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
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  descriptionText: {
    lineHeight: 21,
    color: 'white',
  },
  showMoreText: {
    lineHeight: 21,
    marginTop: 10,
    color: 'green',
    fontWeight: 'bold',
  },
});
