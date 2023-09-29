import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Images} from '../assets';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const ProductDetails = ({route, navigation}) => {
  let item = route.params.item;
  item = item.item;
  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);

  console.log('item--------', item);

  const renderImages = ({item}) => {
    return (
      <View style={styles.renderPreview}>
        <View style={styles.renderPreviewMiddleCont}>
          <Image
            source={{uri: item}}
            resizeMode="contain"
            style={styles.renderPreviewImage}
          />
        </View>
      </View>
    );
  };

  const BackToHome = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.containor}>
      <View style={styles.TitleView}>
        <TouchableOpacity style={styles.BackBtnTouch} onPress={BackToHome}>
          <Image
            source={Images.Back}
            style={styles.BackBtn}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.titleContainor}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>

      <Text style={styles.ImageCount}>
        {index + 1}/{item.images.length}
      </Text>

      <View style={styles.imagesView}>
        <Carousel
          data={item.images}
          renderItem={renderImages}
          layout={'default'} // 'default', 'stack', 'tinder'
          horizontal
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          ref={isCarousel}
          onSnapToItem={index => setIndex(index)}
          firstItem={index}
        />
        <Pagination
          dotsLength={item.images.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={styles.dotStyle}
          tappableDots={true}
          inactiveDotStyle={styles.inactiveDotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          containerStyle={{
            alignSelf: 'center',
          }}
        />
        <Text style={styles.description}>Description</Text>
        <View style={styles.DescriptionView}>
          <Text style={styles.descriptionText}>{item.description}</Text>
          <Text style={styles.priceText}>${item.price}</Text>
        </View>
        <View style={styles.Line} />

        <View style={styles.Stock}>
          <Text style={styles.stockText}>stock</Text>
          <Text style={styles.stockCount}>{item.stock}</Text>
        </View>

        <View style={styles.INOutStock}>
          <View style={styles.InStock}>
            <Text style={{color: 'white'}}>In Stock</Text>
          </View>
          <View style={styles.OutStock}>
            <Text style={{color: 'white'}}>Out of Stock</Text>
          </View>
        </View>

        <View style={[styles.Stock, {marginTop: 29.5}]}>
          <Text style={styles.stockText}>rating</Text>
          <Text style={styles.stockCount}>{item.rating}</Text>
        </View>
        <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>

        <View
          style={[styles.Stock, {marginTop: 29.5, flexDirection: 'column'}]}>
          <Text style={styles.stockText}>discount Percentage</Text>
          <Text style={[styles.stockCount, {marginLeft: 0, marginTop: 5}]}>
            {item.discountPercentage}%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  containor: {
    flex: 1,
    padding: 33,
  },
  TitleView: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },

  BackBtn: {
    width: 20,
    height: 20,
    // marginLeft: 33,
  },
  BackBtnTouch: {
    width: '20%',
  },
  titleContainor: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // borderWidth: 1,
    width: '90%',
    marginLeft: '10%',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    // marginLeft: 135,
    alignSelf: 'center',
    // width: '80%',
  },
  renderPreview: {
    // borderWidth: 1,
    flex: 1,
    width: Dimensions.get('window').width - 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  renderPreviewMiddleCont: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    height: '90%',
  },
  renderPreviewImage: {
    height: 200,
    width: 200,
  },
  imagesView: {
    marginTop: 32,
    height: 600,
    width: '100%',
  },
  DescriptionView: {
    flexDirection: 'row',
  },
  descriptionText: {
    width: 265,
    fontSize: 13,
    color: 'black',
  },
  priceText: {
    marginLeft: 42,
    fontSize: 23,
    color: 'green',
  },
  description: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  Line: {
    width: '100%',
    borderWidth: 0.4,
    marginVertical: 20,
  },
  Stock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stockText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  stockCount: {
    marginLeft: 30,
    fontSize: 17,
    color: 'green',
  },
  INOutStock: {
    flexDirection: 'row',
    marginTop: 6,
  },
  InStock: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
  },
  OutStock: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
    marginLeft: 12,
  },
  stars: {
    color: 'black',
    fontSize: 22,
    marginTop: 5,
  },
  ImageCount: {
    fontSize: 16,
    alignSelf: 'flex-end',
    fontWeight: '500',
    color: 'black',
  },
});
