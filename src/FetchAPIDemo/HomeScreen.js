import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Images} from '../assets';
import {useDispatch, useSelector} from 'react-redux';
import {setProducts} from '../Store/Reducer';
import ReactNativeModal from 'react-native-modal';

const baseUrl = 'https://dummyjson.com/products';

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [selectedFilter, setselectedFilter] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedStock, setSelectedStock] = useState('');

  const [filterData, setFilterData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [search, setSearch] = useState('');
  const [filterModel, setFilterModel] = useState(false);

  const dispatch = useDispatch();
  const stateData = useSelector(state => state.Products);

  const GotoProductDetails = item => {
    navigation.navigate('ProductDetails', {item});
  };

  const renderFetchAPiData = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.renderFetchAPiData}
        onPress={() => GotoProductDetails({item})}>
        <View style={styles.renderImageContainor}>
          <Image
            source={{uri: item?.images[0]}}
            style={styles.renderImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.titlePriceView}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>{item.price}/-</Text>
        </View>
        <View style={styles.titlePriceView}>
          <Text style={styles.title}>Rt: {item.rating}</Text>
          <Text style={styles.price}>St: {item.stock}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFilterSection = ({item}) => {
    console.log('99999-----------', item.category);
    return (
      // <View style={styles.renderFilterSection}>
      <Text
        onPress={() => FilterSelection(item.category)}
        style={
          selectedFilter.match(item.category)
            ? styles.FilterText
            : styles.NonFilterText
        }>
        {item.category}
      </Text>
      // </View>
    );
  };
  const renderFiveStar = ({item}) => {
    // console.log('99999-----------', item.category);
    return (
      // <View style={styles.renderFilterSection}>
      <Text
        onPress={() => RatingSelection(item)}
        style={selectedRating >= item ? styles.FiveStar : styles.NonFiveStar}>
        {item}⭐
      </Text>
      // </View>
    );
  };

  const renderStock = ({item}) => {
    // console.log('99999-----------', item.category);
    return (
      // <View style={styles.renderFilterSection}>
      <Text
        onPress={() => StockSelection(item)}
        style={
          selectedStock.toString().match(item)
            ? styles.FiveStar
            : styles.NonFiveStar
        }>
        {item}
      </Text>
      // </View>
    );
  };

  const StockSelection = text => {
    console.log('pppp', text);
    setSelectedStock(text);

    // if (text == 'View All') {
    //   setCategoryData(data);
    // } else {
    //   const tempData = data.filter(item => {
    //     return item.category == text ? item : null;
    //   });
    //   setCategoryData(tempData);
    // }
  };

  const RatingSelection = text => {
    console.log('pppp', text);
    setSelectedRating(text);

    // if (text == 'View All') {
    //   setCategoryData(data);
    // } else {
    //   const tempData = data.filter(item => {
    //     return item.category == text ? item : null;
    //   });
    //   setCategoryData(tempData);
    // }
  };

  const FilterSelection = text => {
    console.log('pppp', text);
    setselectedFilter(text);

    if (text == 'View All') {
      setCategoryData(data);
    } else {
      const tempData = data.filter(item => {
        return item.category == text ? item : null;
      });
      setCategoryData(tempData);
    }
  };

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = data.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setCategoryData(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setCategoryData(data);
      setSearch(text);
    }
  };
  const ModalApplyButton = () => {
    setFilterModel(!filterModel);
    const tempData = data.filter(item => {
      return item.rating >= selectedRating && item.rating < selectedRating + 1
        ? item.stock >= parseInt(selectedStock) &&
          item.stock <= parseInt(selectedStock) + 49
          ? item
          : null
        : null;
    });
    console.log('-----------------tempData', tempData);
    if (tempData.length > 0) setCategoryData(tempData);
    else setCategoryData([]);
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: baseUrl,
    }).then(response => {
      console.log(response.data.products);
    });

    axios.get(baseUrl).then(response => {
      console.log(
        ' ---------------------------------- Response.Data-----\n ',
        response.data.products,
      );
      dispatch(setProducts(response.data));
      setData(response.data.products);
      setCategoryData(response.data.products);
      const ids = response.data.products.map(({category}) => category);
      const tempData = response.data.products.filter(({category}, index) => {
        return !ids.includes(category, index + 1);
      });

      console.log('--------------------tempData', tempData);

      setFilterData([{category: 'View All'}, ...tempData]);

      // const ids = books.map(({ title }) => title);
      //     const filtered = books.filter(({ title }, index) =>
      // !ids.includes(title, index + 1));
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.containor}>
        <Text style={styles.welcomeText}>Welcome 👋</Text>
        <Text style={{color: 'black'}}>
          Let’s order and enjoy your order now.
        </Text>
        <View style={styles.searchBox}>
          <Image source={Images.Search} style={styles.searchIcon} />
          <TextInput
            placeholder="Type Something..."
            onChangeText={text => searchFilterFunction(text)}
            style={styles.SearchTextInput}
          />
          <TouchableOpacity
            onPress={() => {
              console.log('Filter Image Clicked');
              setFilterModel(!filterModel);
            }}>
            <Image
              source={Images.Filter}
              style={styles.FilterIcon}
              tintColor={'grey'}
            />
          </TouchableOpacity>
        </View>

        {/* <View style={styles.FilterViewContainor}>
        <View style={{alignItems: 'center', height: 25}}>
          <Text
            onPress={() => FilterSelection('View All')}
            style={
              selectedFilter.match('View All')
                ? styles.FilterText
                : styles.NonFilterText
            }>
            View All
          </Text>
        </View> */}

        <View style={styles.filterDataView}>
          <FlatList
            horizontal
            data={filterData}
            renderItem={renderFilterSection}
            contentContainerStyle={styles.FilterView}
          />
        </View>
        {/* </View> */}

        {/* <TouchableOpacity style={styles.TouchableBtn} onPress={FetchAPiData}>
        <Text style={styles.TouchableBtnTxt}>Fetch API Data</Text>
      </TouchableOpacity> */}

        <View style={{flexDirection: 'row'}}>
          {selectedRating && (
            <View style={styles.selectedRatingView}>
              <Text style={{color: 'white'}}>❌ {selectedRating} ⭐</Text>
            </View>
          )}

          {selectedStock && (
            <View style={styles.selectedStockView}>
              <Text style={{color: 'white'}}>❌ {selectedStock} </Text>
            </View>
          )}
        </View>

        {categoryData.length > 0 ? (
          <FlatList
            data={categoryData}
            numColumns={2}
            key={(item, index) => index.toString()}
            renderItem={renderFetchAPiData}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        ) : (
          <Text style={{alignSelf: 'center'}}>No Data</Text>
        )}

        {filterModel && (
          <ReactNativeModal
            isVisible={filterModel}
            swipeDirection={'down'}
            onSwipeComplete={() => setFilterModel(!filterModel)}
            style={{
              margin: 0,
              backgroundColor: 'transparent',
              // height: 50,
              // width: '100%',
              // alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            <View style={styles.FilterModalView}>
              <Text style={styles.FilterByText}>Filter by</Text>
              <Text style={styles.RatingText}>rating</Text>
              <FlatList
                horizontal
                data={[1, 2, 3, 4, 5]}
                renderItem={renderFiveStar}
                contentContainerStyle={styles.RatingView}
              />
              <Text style={styles.StockText}>Stock</Text>
              <FlatList
                horizontal
                data={['out of stock', '0 - 49', '50 - 99', '100 More']}
                renderItem={renderStock}
                contentContainerStyle={styles.RatingView}
              />
              <TouchableOpacity onPress={ModalApplyButton}>
                <Text style={styles.ApplyText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </ReactNativeModal>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  containor: {
    flex: 1,
    padding: 20,
  },
  TouchableBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    height: 30,
    width: '100%',
  },
  TouchableBtnTxt: {
    fontWeight: 'bold',
    color: 'white',
  },
  renderFetchAPiData: {
    borderWidth: 1,
    height: 204,
    width: 170,
    margin: 10,
  },
  searchIcon: {
    height: 18,
    width: 18,
    marginRight: 17,
  },
  FilterIcon: {
    height: 25,
    width: 25,
  },
  searchBox: {
    height: 49,
    borderWidth: 1,
    marginTop: 19,
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 23,
    flexDirection: 'row',
  },
  FilterView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    // borderWidth: 1,
    marginVertical: 37,
    height: 25,
  },
  RatingView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    // borderWidth: 1,
    marginVertical: 5,
    height: 25,
  },
  FilterViewContainor: {
    flexDirection: 'row',
  },
  FilterText: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'white',
    backgroundColor: 'green',
  },
  NonFilterText: {
    // borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'black',
    // backgroundColor: 'green',
  },
  renderImage: {
    height: 100,
    width: 100,
  },
  renderImageContainor: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
  },
  titlePriceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 137,
    alignSelf: 'center',
    // height: 200,
    // borderWidth: 1,
  },
  title: {
    height: 50,
    // borderWidth: 1,
    width: 70,
  },
  price: {
    // height: 50,
    // borderWidth: 1,
    //   width: 70,
  },
  SearchTextInput: {
    width: '80%',
  },
  FilterModalView: {
    height: 300,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  FilterByText: {
    color: 'black',
    // fontWeight: 'bold',
    fontSize: 25,
    marginTop: 30,
    alignSelf: 'center',
  },
  ApplyText: {
    color: 'black',
    // fontWeight: 'bold',
    fontSize: 15,
    marginTop: 30,
    alignSelf: 'center',
    padding: 5,
    paddingHorizontal: 20,
    backgroundColor: 'green',
    bottom: 10,
    color: 'white',
    borderRadius: 10,
  },
  RatingText: {
    marginTop: 15,
    color: 'black',
    fontSize: 18,
    // marginLeft: 10,
  },
  StockText: {
    // marginTop: -70,
    color: 'black',
    fontSize: 18,
    // marginLeft: 10,
  },
  FiveStar: {
    borderWidth: 1,
    paddingHorizontal: 5,
    borderRadius: 5,
    color: 'white',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  NonFiveStar: {
    borderWidth: 1,
    paddingHorizontal: 5,
    borderRadius: 5,
    color: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  selectedRatingView: {
    backgroundColor: 'green',
    padding: 5,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  selectedStockView: {
    backgroundColor: 'green',
    padding: 5,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 7,
  },
  MainFilerView: {
    // borderWidth: 1,
    // height: 300,
  },
  filterDataView: {
    height: 70,
  },
});
