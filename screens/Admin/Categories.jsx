import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { colors, defaultStyle, inputStyling} from '../../styles/styles'
import Header from '../../components/Header'
import CategoryCard from '../../components/CategoryCard'
import { Button, TextInput } from 'react-native-paper'
import { useMessageAndErrorOther, useSetCategories } from '../../utils/hooks'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { addCategory, deleteCategory } from '../../redux/actions/otherAction'

const Categories = ({navigation}) => {

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  useSetCategories(setCategories, isFocused)

  const deleteHandler = (id)=>{
    dispatch(deleteCategory(id))
  }  

  const inputOptions = {
    style:inputStyling,
    mode:"outlined",
    activeOutlineColor:colors.color1
  }

  const [category, setCategory] = useState("");

  const submitHandler = () => {
    dispatch(addCategory(category))
  }
  const loading = useMessageAndErrorOther(navigation, dispatch, "adminpanel");
  return (
    <View style={{...defaultStyle, backgroundColor:colors.color5}}>
      {/* Header*/}
      <Header back={true}/>

      {/*Categories Heading */}
      <View style={{marginBottom:20,paddingTop:70}}>
        <Text style={styles.heading}>Categories</Text>
      </View>

      {/* Category ScrollView */}
      <ScrollView style={styles.firstScrollView}>
        <View style={styles.viewInScroll}>
            {/* Mapping To Categories Array */}
            {
                categories.map((item)=>(
                    <CategoryCard 
                    name={item.name}
                    key={item._id}
                    id={item._id}
                    deleteHandler={deleteHandler}
                    />
                ))
            }
        </View>
      </ScrollView>

      {/* Category Bottom View */}
      <View style={styles.container}>
        {/* Name */}
        <TextInput 
        {...inputOptions} 
        placeholder='Category' 
        value={category} 
        onChangeText={setCategory}
        />

        <Button 
        textColor={colors.color2}
        style={styles.addCategoryBtn}
        disabled={!category}
        onPress={submitHandler}
        loading={loading}
        >
            Add
        </Button>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
    heading:{
        fontSize:25,
        textAlign:"center",
        fontWeight:"500",
        backgroundColor:colors.color3,
        color:colors.color2,
        padding:5,
        borderRadius:5,
        marginTop:20 
    },
    firstScrollView:{
        marginBottom:20
    },
    viewInScroll:{
        backgroundColor:colors.color2,
        padding:20,
        minHeight:400
    },
    container:{
        backgroundColor:colors.color3,
        padding:20,
        elevation:5,
        borderRadius:10
    },
    addCategoryBtn:{
        backgroundColor:colors.color1,
        margin:5,
        padding:5
    }
})

export default Categories