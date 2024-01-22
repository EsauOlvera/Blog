import React, { useState } from 'react'
import { View, Modal, Text, TouchableOpacity, FlatList } from 'react-native'

const FilterModal = ({
  visible,
  onClose,
  allPostsObtained,
  onAuthorSelected,
  onDateSelected,
}) => {
  const [authorsFilter, setAuthorsFilter] = useState(false)

  const [datesFilter, setDatesFilter] = useState(false)
  const [uniqueDates, setUniqueDates] = useState([])
  const [selectedAuthor, setSelectedAuthor] = useState(null)

  const showAuthors = () => {
    setAuthorsFilter(!authorsFilter)
    setDatesFilter(false)
  }

  const showDates = () => {
    setDatesFilter(!datesFilter)
    setAuthorsFilter(false)
    if (!uniqueDates.length) {
      const uniqueDatesSet = new Set(
        allPostsObtained.map((post) =>
          post.timestamp
            .toDate()
            .toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
        )
      )
      const uniqueDatesArray = Array.from(uniqueDatesSet)
      setUniqueDates(uniqueDatesArray)
    }
  }

  const handleDateSelection = (date) => {
    setSelectedAuthor(author)
    onDateSelected(date)
    onClose()
  }

  const handleAuthorSelection = (author) => {
    onAuthorSelected(author)
    onClose()
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View className="bg-slate-300 m-50 h-1/3 w-2/3 justify-between items-center rounded-3xl shadow-sm">
          <Text className="font-bold text-lg">
            Selecciona el tipo de filtro:
          </Text>
          <TouchableOpacity onPress={showAuthors}>
            <Text className="font-bold text-lg">Autores</Text>
          </TouchableOpacity>
          {authorsFilter && (
            <FlatList
              data={Array.from(
                new Set(allPostsObtained.map((post) => post.author))
              )}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="items-center"
                  onPress={() => handleAuthorSelection(item)}
                >
                  <Text className="font-bold text-lg">{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          )}
          <TouchableOpacity onPress={showDates}>
            <Text className="font-bold text-lg">Fecha</Text>
          </TouchableOpacity>
          {datesFilter && (
            <FlatList
              data={uniqueDates}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleDateSelection(item)}>
                  <Text className="font-bold text-lg">{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          )}
          <TouchableOpacity onPress={onClose}>
            <Text className="font-bold text-lg">Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default FilterModal
