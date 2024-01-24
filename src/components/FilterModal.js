import React, { useState } from 'react'
import { View, Modal, Text, TouchableOpacity, FlatList } from 'react-native'

const FilterModal = ({
  visible,
  onClose,
  allPostsObtained,
  onAuthorSelected,
  onDateSelected,
  onTitleSelected,
}) => {
  const [authorsFilter, setAuthorsFilter] = useState(false)

  const [datesFilter, setDatesFilter] = useState(false)
  const [uniqueDates, setUniqueDates] = useState([])
  const [titleFilter, setTitleFilter] = useState(false)

  const showAuthors = () => {
    setAuthorsFilter(!authorsFilter)
    setDatesFilter(false)
    setTitleFilter(false)
  }

  const showDates = () => {
    setDatesFilter(!datesFilter)
    setAuthorsFilter(false)
    setTitleFilter(false)
    if (!uniqueDates.length) {
      const uniqueDatesSet = new Set(
        allPostsObtained.map((post) =>
          post.timestamp.toDate().toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        )
      )
      const uniqueDatesArray = Array.from(uniqueDatesSet)
      setUniqueDates(uniqueDatesArray)
    }
  }

  const showTitles = () => {
    setTitleFilter(!titleFilter)
    setDatesFilter(false)
    setAuthorsFilter(false)
  }

  const handleDateSelection = (date) => {
    onDateSelected(date)
    onClose()
  }

  const handleAuthorSelection = (author) => {
    onAuthorSelected(author)
    onClose()
  }

  const handleTitleSelection = (title) => {
    onTitleSelected(title)
    console.log(title)
    onClose()
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View className="justify-center items-center flex-1 ">
        <View className="bg-slate-300 m-50 h-1/3 w-2/3 justify-between items-center rounded-3xl shadow-sm p-2">
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
          <TouchableOpacity onPress={showTitles}>
            <Text className="font-bold text-lg">Titulares</Text>
          </TouchableOpacity>
          {titleFilter && (
            <FlatList
              data={Array.from(
                new Set(allPostsObtained.map((post) => post.title))
              )}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="items-center"
                  onPress={() => handleTitleSelection(item)}
                >
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
