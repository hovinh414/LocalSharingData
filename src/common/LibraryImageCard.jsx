import React, {useState, useEffect} from 'react'
import { ImageBackground, TouchableOpacity, StyleSheet, View, Text, Dimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../../constants'
import {selectedImagesList, } from '../redux/reducers'
import { useDispatch, useSelector } from 'react-redux'

const {width, height} = Dimensions.get('window')

const LibraryImageCard = ({ image }) => {
    // const selectedImages = useSelector(state => state.P2P.selectedImages)

    // console.log(image.node)
    const [chooseImage, setChooseImage] = useState(false)
    const dispatch = useDispatch()

    const handleChooseImage = () => {
        setChooseImage(!chooseImage)

        dispatch(selectedImagesList(image))
    }

    const handleDuration = (duration) => {
        // console.log(duration)

        const minute = Math.floor(duration / 60)
        const second = duration % 60

        return minute.toString().padStart(2, '0') + ":" + second.toString().padStart(2, '0')
    }


    // let sogiay = 10

    // const sophut = Math.floor(sogiay / 60)
    // const sogiaydu = sogiay % 60

    // console.log(sophut.toString().padStart(2, '0') + ":" + sogiaydu.toString().padStart(2, '0'))
    
        return (
        <TouchableOpacity style={styles.imageContainer} onPress={handleChooseImage}>
            <ImageBackground source={{ uri: image.node.image.uri }} style={styles.image} blurRadius={chooseImage ? 5 : 0}>
                {chooseImage && <View style={styles.imageChose}>
                    <AntDesign name='checkcircle' size={height * 0.035} color={COLORS.primary}/>
                </View>}

                {image.node.type === 'video/mp4' 
                 && <View style={styles.durationContainer}>
                    <Text style={styles.duration}>{handleDuration(image.node.image.playableDuration)}</Text>
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
    },

    durationContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        bottom: 3,
        right: 3,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 12
    },
    
    duration: {
        color: '#fff',
        fontWeight: '500',
        fontSize: height * 0.015
    }
})