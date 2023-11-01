import React, {useState, useEffect} from 'react'
import { ImageBackground, TouchableOpacity, StyleSheet, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../../constants'
import {selectedImagesList, } from '../redux/reducers'
import { useDispatch, useSelector } from 'react-redux'

const LibraryImageCard = ({ image }) => {
    const {selectedImages} = useSelector(state => state.P2P)

    // console.log(image.node)
    const [chooseImage, setChooseImage] = useState(false)
    const [chose, setChose] = useState([])
    const dispatch = useDispatch()

    const handleChooseImage = () => {
        setChooseImage(!chooseImage)

        dispatch(selectedImagesList(image))
    }
    // console.log(selectedImages)
        return (
        <TouchableOpacity style={styles.imageContainer} onPress={handleChooseImage}>
            <ImageBackground source={{ uri: image.node.image.uri }} style={styles.image} blurRadius={chooseImage ? 5 : 0}>
                {chooseImage && <View style={styles.imageChose}>
                    <AntDesign name='checkcircle' size={40} color={COLORS.primary}/>
                </View>}
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default LibraryImageCard

const styles = StyleSheet.create({
    imageContainer: {
        width: '24.5%',
        margin: '0.25%'
    },

    image: {
        aspectRatio: 1,
    },

    imageChose: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
    
})