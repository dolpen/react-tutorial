import React from "react";
import ReactDOM from "react-dom";
import {EventEmitter} from "events";
import weapons from "./weapons.json";

console.log(JSON.stringify(weapons.map((w,i)=>{w.id = i+1;return w;})));

class Weapon extends React.Component {
    render() {
        return (
            <li>
                {this.props.data.name} ( {this.props.data.sub} / {this.props.data.special} )
            </li>
        );
    }
}

class AppContainer extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            filterQuery: ""
        };
        this.emitter = new EventEmitter();
        this.emitter.on("change-filter-query", (filterQuery) => {
            this.setState({filterQuery});
        });
    }

    render() {
        const filteredWeapons = weapons.filter(weapon => {
            return weapon.name.indexOf(this.state.filterQuery) > -1
                || weapon.sub.indexOf(this.state.filterQuery) > -1
                || weapon.special.indexOf(this.state.filterQuery) > -1;
        });
        return <App weapons={filteredWeapons} dispatch={this.emitter.emit.bind(this.emitter)}/>
    }
}

class App extends React.Component {
    onChangeFilterQuery(ev) {
        this.props.dispatch("change-filter-query", ev.target.value)
    }
    render() {
        return (
            <div className="weapons">
                <input onChange={this.onChangeFilterQuery.bind(this)}/>
                <ul>
                    {
                        this.props.weapons.map(weapon => {
                            return <Weapon key={weapon.name} data={weapon}/>
                        })
                    }
                </ul>
            </div>
        );
    }
}

ReactDOM.render(
    <AppContainer />,
    document.querySelector(".mainContainer")
);
