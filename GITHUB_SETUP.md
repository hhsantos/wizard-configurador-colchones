# 🚀 Instrucciones para Subir a GitHub

El repositorio Git local está listo con el commit inicial. Para subirlo a GitHub, sigue estos pasos:

## 📋 Pasos para crear repositorio en GitHub

### 1. Crear repositorio en GitHub.com
1. Ve a [github.com](https://github.com) e inicia sesión
2. Click en el botón "+" en la esquina superior derecha
3. Selecciona "New repository"
4. Configura el repositorio:
   - **Repository name**: `wizard-configurador-colchones` (o el nombre que prefieras)
   - **Description**: `Wizard interactivo de 8 pasos para configuración de colchones con React + accesibilidad completa`
   - **Visibility**: Public o Private (según tu preferencia)
   - **NO marques** "Add a README file" (ya tenemos uno)
   - **NO marques** "Add .gitignore" (ya tenemos uno)
   - **NO marques** "Choose a license" (puedes agregarlo después)

### 2. Conectar repositorio local con GitHub

Después de crear el repositorio en GitHub, ejecuta estos comandos en la terminal:

```bash
# Agregar el remoto (reemplaza YOUR_USERNAME con tu usuario de GitHub)
git remote add origin https://github.com/hhsantos/wizard-configurador-colchones.git

# Subir el código a GitHub
git push -u origin master
```

### 3. Comandos alternativos si prefieres SSH

Si tienes configurado SSH en GitHub:

```bash
# Agregar el remoto con SSH
git remote add origin git@github.com:YOUR_USERNAME/wizard-configurador-colchones.git

# Subir el código
git push -u origin master
```

## 📊 Estado actual del repositorio

- ✅ **Commit inicial**: Realizado (hash: 173b73a)
- ✅ **36 archivos**: Commitados correctamente
- ✅ **9,556 líneas**: De código y documentación
- ✅ **Documentación completa**: README, COMPONENTS, DEVELOPMENT, etc.
- ✅ **.gitignore**: Configurado para pnpm y React

## 📁 Archivos incluidos en el commit

### Documentación
- `README.md` - Documentación principal
- `COMPONENTS.md` - Guía de componentes
- `DEVELOPMENT.md` - Guía de desarrollo
- `CONTRIBUTING.md` - Guía de contribución
- `CHANGELOG.md` - Historial de cambios
- `AGENTS.md` - Reglas de UI/UX
- `.github/AGENT.md` - Instrucciones para agentes IA

### Código fuente
- `src/components/wizard/` - Componentes core del wizard
- `src/components/steps/` - 8 pantallas del wizard
- `src/components/ui/` - Componentes reutilizables
- `src/contexts/` - Estado global con React Context
- `src/components/wizard/wizard.css` - Estilos completos

### Configuración
- `package.json` - Configuración del proyecto con pnpm
- `vite.config.js` - Configuración de Vite
- `eslint.config.js` - Configuración de ESLint
- `.npmrc` - Configuración de pnpm
- `.gitignore` - Archivos a ignorar

## 🔄 Próximos pasos después de subir a GitHub

1. **Configurar GitHub Pages** (opcional) para demo en vivo
2. **Configurar GitHub Actions** para CI/CD
3. **Crear Issues templates** para bugs y features
4. **Configurar branch protection** en main/master
5. **Agregar badges** al README (build status, etc.)

## 🏷️ Crear releases y tags

Después de subir a GitHub, puedes crear releases:

```bash
# Crear un tag para la versión 1.0.0
git tag -a v1.0.0 -m "Release v1.0.0: Wizard completo con 8 pasos y accesibilidad"

# Subir el tag a GitHub
git push origin v1.0.0
```

## 🤝 Colaboración

Una vez en GitHub, otros desarrolladores pueden:

```bash
# Clonar el repositorio
git clone https://github.com/YOUR_USERNAME/wizard-configurador-colchones.git

# Instalar dependencias
cd wizard-configurador-colchones
pnpm install

# Ejecutar en desarrollo
pnpm dev
```

---

**¡El proyecto está listo para GitHub!** 🎉

Una vez que hayas creado el repositorio en GitHub y ejecutado los comandos de conexión, el wizard estará disponible públicamente con toda su documentación y código fuente.