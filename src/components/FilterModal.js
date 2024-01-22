import React, { useState } from 'react'
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native'

const windowHeight = Dimensions.get('window').height

const FilterModal = ({
  visible,
  onClose,
  allPostsObtained,
  onAuthorSelected,
}) => {
  const [authorsFilter, setAuthorsFilter] = useState(false)
  const [selectedAuthor, setSelectedAuthor] = useState(null)

  const showAuthors = () => {
    setAuthorsFilter(!authorsFilter)
  }

  const handleAuthorSelection = (author) => {
    setSelectedAuthor(author)
    onAuthorSelected(author)
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            elevation: 5,
            maxHeight: windowHeight * 0.5,
          }}
        >
          <Text>Selecciona el tipo de filtro:</Text>
          <TouchableOpacity onPress={showAuthors}>
            <Text>Authors</Text>
          </TouchableOpacity>
          {authorsFilter && (
            <FlatList
              data={Array.from(
                new Set(allPostsObtained.map((post) => post.author))
              )}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleAuthorSelection(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          )}
          <TouchableOpacity onPress={onClose}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default FilterModal
