package com.shoppingcoins

import android.os.Bundle // 👈 Importe Bundle para usar no onCreate
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

    /**
     * Define o tema do aplicativo de volta para o tema principal
     * (AppTheme) assim que o React Native estiver pronto para carregar.
     * Isso "fecha" a tela de splash que foi carregada com o SplashTheme.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        // 🎨 Define o tema de volta para o tema principal do seu app (AppTheme)
        setTheme(R.style.AppTheme) 
        super.onCreate(null)
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String = "shoppingcoins"

    /**
     * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
     * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}