import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SupplierDataResponseClass, {
  SupplierResponse,
} from '../../data/models/SupplierResponse.ts';
import ApiService from '../../data/datasources/ApiService.ts';
import SupplierRepositoryImpl from '../../data/datasources/repositories/SupplierRepositoryImpl.ts';

const service = new ApiService(
  'https://mobile.dev.quadrant-si.id/developertest',
);
const repo = new SupplierRepositoryImpl(service);

const SupplierFormPage = ({route, navigation}) => {
  const supplier = route.params?.supplier || null;

  // Form fields and contacts state
  const [name, setName] = useState(supplier ? supplier.name : '');
  const [address, setAddress] = useState(supplier ? supplier.address : '');
  const [city, setCity] = useState(supplier ? supplier.city : '');
  const [postCode, setPostCode] = useState(supplier ? supplier.postCode : '');
  const [actor, setActor] = useState(supplier ? supplier.actor : '');
  const [contacts, setContacts] = useState(supplier ? supplier.contacts : []);

  const [contactName, setContactName] = useState('');
  const [contactType, setContactType] = useState('');
  const [contactValue, setContactValue] = useState('');

  useEffect(() => {
    navigation.setOptions({
      title: supplier ? 'Edit Supplier' : 'Add Supplier',
    });
  }, [navigation, supplier]);

  const handleAddContact = () => {
    if (contactName && contactType && contactValue) {
      const newContact = {name: contactName, contactType, value: contactValue};
      setContacts([...contacts, newContact]);
      setContactName('');
      setContactType('');
      setContactValue('');
    } else {
      Alert.alert('Error', 'Please fill out all contact fields');
    }
  };

  const handleRemoveContact = index => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    // Collecting data from the form
    const supplierData = {
      name,
      address,
      city,
      postCode,
      actor,
      contacts,
    };

    // Creating SupplierDataResponse from the collected data
    const data: SupplierResponse = new SupplierDataResponseClass(
      null,
      supplierData.name,
      supplierData.address,
      supplierData.city,
      supplierData.postCode,
      supplierData.contacts,
      null,
      null, // Timestamp set to current time
    );

    try {
      if (supplier) {
        // If it's an existing supplier, update it
        const success = await repo.update(data);
        Alert.alert(
          success ? 'Success' : 'Failure',
          success ? 'Supplier updated successfully' : 'Failure update data',
        );
      } else {
        // If it's a new supplier, create it
        const success = await repo.create(data);
        Alert.alert(
          success ? 'Success' : 'Failure',
          success ? 'Supplier added successfully' : 'Failure create data',
        );
      }

      // Go back to the previous screen
      navigation.goBack();
    } catch (error) {
      // Handle any errors that might occur during the update/create
      Alert.alert('Error', 'An error occurred while saving the supplier data');
    }
  };

  const formData = [
    {label: 'Name', value: name, onChangeText: setName},
    {label: 'Address', value: address, onChangeText: setAddress},
    {label: 'City', value: city, onChangeText: setCity},
    {
      label: 'Post Code',
      value: postCode,
      onChangeText: setPostCode,
      keyboardType: 'numeric',
    },
    {
      label: 'Actor',
      value: actor,
      editable: false,
      onChangeText: setActor,
    },
  ];

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View style={styles.header}>
          {formData.map((field, index) => (
            <View key={index} style={styles.inputContainer}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                value={field.value}
                onChangeText={field.onChangeText}
                keyboardType={field.keyboardType || 'default'}
              />
            </View>
          ))}
          <Text style={styles.sectionTitle}>Add Contact</Text>
          <TextInput
            style={styles.input}
            placeholder="Contact Name"
            value={contactName}
            onChangeText={setContactName}
          />
          <TextInput
            style={styles.input}
            placeholder="Contact Type (e.g., mobilePhone)"
            value={contactType}
            onChangeText={setContactType}
          />
          <TextInput
            style={styles.input}
            placeholder="Contact Value"
            value={contactValue}
            onChangeText={setContactValue}
          />
          <Button title="Add Contact" onPress={handleAddContact} />
          <Text style={styles.sectionTitle}>Contacts</Text>
        </View>
      )}
      data={contacts}
      keyExtractor={item => `${item.name}-${item.contactType}-${item.value}`} // Unique key based on contact fields
      renderItem={({item, index}) => (
        <View style={styles.contactContainer}>
          <Text
            style={
              styles.contactText
            }>{`Name: ${item.name}, Type: ${item.contactType}, Value: ${item.value}`}</Text>
          <TouchableOpacity onPress={() => handleRemoveContact(index)}>
            <Text style={styles.removeButton}>Remove Contact</Text>
          </TouchableOpacity>
        </View>
      )}
      ListFooterComponent={() => (
        <Button
          title={supplier ? 'Update Supplier' : 'Add Supplier'}
          onPress={handleSubmit}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  contactContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactText: {
    fontSize: 16,
  },
  removeButton: {
    color: 'red',
    marginTop: 5,
  },
});

export default SupplierFormPage;
