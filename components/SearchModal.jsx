import { View, Text, StyleSheet, Platform, SafeAreaView, ScrollView, TouchableOpacity, BackHandler, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../styles/styles'
import { StatusBar } from 'expo-status-bar'
import { Headline, Searchbar } from 'react-native-paper'
import { useEffect } from 'react'

const SearchModal = ({searchQuery, setSearchQuery, setActiveSearch, products}) => {
  const navigate = useNavigation();

  // Back To Home Screen Handler
  const backAction = () => {
    setSearchQuery("");
    setActiveSearch(false);
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction)
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction)
    }
  }, [])
  

  return (
    <View style={styles.searchModalOuterView}>
      <SafeAreaView>

      {/* SearchBar */}

        <Searchbar 
        placeholder='Search...'
        onChangeText={ (query) => (setSearchQuery(query))}
        value={searchQuery}  
        style={styles.searchBar}
        />

      {/* Product List */}

      <ScrollView>
        <View style={styles.searchItemBox}>
        {
          products.map((item) => (
            <SearchItem 
            key={item._id}
            imgSrc={item.images[0].url}
            name={item.name}
            price={item.price}
            handler={()=>navigate.navigate("productdetails", {id:item._id, })}  
            />
          ))
        }
        </View>
      </ScrollView>

      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  searchModalOuterView:{
    width: "100%",
    height: "100%",
    position: "absolute",
    top:0,
    zIndex:100,
    backgroundColor:colors.color2,
    padding:35,
    paddingTop:Platform.OS==="android"? StatusBar.currentHeight: 0, 
  }, 
  searchBar:{
    marginTop:20,
    borderRadius:15
  },
  searchItemBox:{
    paddingVertical:40,
    paddingHorizontal:10
  }
})


const SearchItem = ({key, imgSrc, name, price, handler}) => {
  return (
    <TouchableOpacity onPress={handler} key={key}>
      <View style={styles1.searchItemView}>
        <Image source={{uri:imgSrc}} style={styles1.searchItemImage}/>
        <View style={styles1.searchItemInnerView}>
          <Text numberOfLines={1}>{name}</Text>
          <Headline numberOfLines={1} style={{fontWeight:900}}>₹ {price}</Headline>

        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles1 = StyleSheet.create({
  searchItemView:{
    padding:20,
    borderRadius:10, 
    backgroundColor:colors.color2,
    elevation:5,
    width:"100%",
    flexDirection:'row',
    alignItems:"center",
    justifyContent:"flex-end",
    marginVertical:30
  },
  searchItemImage:{
    width:100,
    height:100,
    position:"absolute",
    resizeMode:"contain",
    top:-35,
    left:-10,
  },
  searchItemInnerView:{
    width:"80%",
    paddingHorizontal:30
  }
})

export default SearchModal