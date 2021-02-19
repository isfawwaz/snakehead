import { Route, Switch } from 'react-router-dom';
import Home from './../pages/Home';
import Sidebar from './Sidebar';

export default function App() {
    return <main className="app">
        <section className="sh-main-sidebar">
            <Sidebar />
        </section>
        <section className="sh-main-content">
            <Switch>
                <Route path="/" exact component={ Home } />
            </Switch>
        </section>
        <section className="sh-main-detail"></section>
    </main>
}