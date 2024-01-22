[**Guía rápida de instalación React Native**]

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
