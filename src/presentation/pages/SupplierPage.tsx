import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import ApiService from '../../data/datasources/ApiService.ts';
import SupplierRepositoryImpl from '../../data/datasources/repositories/SupplierRepositoryImpl.ts';
import {SupplierResponse} from '../../data/models/SupplierResponse.ts';
import {RootListResponse} from '../../data/models/RootListResponse.ts';

const service = new ApiService(
  'https://mobile.dev.quadrant-si.id/developertest',
);
const repo = new SupplierRepositoryImpl(service);

const SupplierPage = ({navigation}) => {
  const [suppliers, setSuppliers] = useState<SupplierResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response: RootListResponse<SupplierResponse> = await repo.data(page, size);
        if (page === 1) {
          setSuppliers(response.data);
        } else {
          setSuppliers(prevSuppliers => [...prevSuppliers, ...response.data]);
        }
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching supplier data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, size]);

  // Handle loading state
  if (loading && page === 1) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Handle load more trigger when user scrolls near the end
  const loadMoreData = () => {
    if (page < totalPages && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const onFloatingButtonPress = () => {
    navigation.navigate('SupplierFormPage');
  };

  const editItem = (item: SupplierResponse) => {
    navigation.navigate('SupplierFormPage', {supplier: item});
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={suppliers}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => editItem(item)}>
            <View style={{padding: 10, borderBottomWidth: 1}}>
              <Text>Name: {item.name}</Text>
              <Text>Address: {item.address}</Text>
              <Text>City: {item.city}</Text>
              <Text>PostCode: {item.postCode}</Text>
              <Text>Actor: {item.actor}</Text>
              <Text>Timestamp: {item.timestamp}</Text>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
      />

      {/* Floating Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
          backgroundColor: '#ff4081',
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5, // Shadow for Android
        }}
        onPress={onFloatingButtonPress}>
        <Text style={{color: 'white', fontSize: 30}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SupplierPage;
