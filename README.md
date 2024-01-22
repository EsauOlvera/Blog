[**Guía rápida de instalación React Native**]

Este proyecto es una prueba para desarrollador de aplicaciones en react native, se trata de una aplicación conectada a Firebase que permite al usuario tener una cuenta propia, loguearse en el sistema y hacer publicaciones

# Iniciando

```bash
# using npm
npm start

# OR using Yarn
yarn start

para iniciar la intalación de repositorios, yo prefiero usar yarn
```

## Step 2: Build de iOS

```bash
cd ios
bundle install
bundle exec pod install
```

### Problemas comunes
IMPORTANTE 
en la version 10.7.2 de firebase hay un problema con el archivo /node_modules/@firebase/util/dist/index.esm2017.js que no permite guardar posts, es necesario editar este archivo para que no rompa el código
```bash
function isSafari() {
    return (!isNode() &&
	navigator.userAgent &&
        navigator.userAgent.includes('Safari') &&
        !navigator.userAgent.includes('Chrome'));
}
```

Si todo ha salido bien debería servir a la primera

###Tareas cumplidas

- [x] Crear aplicación react native estilo blog
	- [x] Crear interfaz estilo twitter
		- [x] agregar navegación 
		- [x] Implementar redux 
		- [x] Crear perfil
		- [x] crear post
			- [x] titulo, fecha, autor, contenido
		- [x] publicar post
		- [x] time line con posts
			- [x] vista inicial del post solo debe de contar con 70 caracteres 
			- [x] al tocarlo se muestra el post completo
		- [ ] búsquedas por filtro
			- [x] autor
			- [ ] fecha
			- [ ] titulo
	- [x] Crear base de datos que guarde a los usuarios y sus posts
		- [x] Crear conexión a firebase 
		- [x] crear perfiles de usuario
	- [x] Crear modo offline
		- [x] ver entradas descargadas anteriormente
		- [x] Bloquear opción de publicar
		- [x] mostrar mensaje de no acceso a internet
	- [ ] Librerias utilizadas
		- [ ] tailwindcss@3.3.2
		- [ ] nativewind
		- [ ] @react-navigation/native
		- [ ] react-native-screens react-native-safe-area-context
		- [ ] @react-navigation/stack
		- [ ] react-native-gesture-handler
		- [ ] react-native-heroicons react-native-svg
		- [ ] @reduxjs/toolkit react-redux
		- [ ] react-native-snackbar

