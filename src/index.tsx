import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)
