import React, {Component} from 'react';

import parseCSV from '../util/csvparser';


export default class ParserContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            error: null
        };
    }

    onTextareaChange(e) {

        try {
            this.setState({
                data: parseCSV(e.target.value),
                error: null
            });
        } catch (e) {
            this.setState({
                data: null,
                error: e.message
            })
        }
    }

    render() {

        const {data, error} = this.state;

        return (
            <div className="parser-container">
                <textarea placeholder="CSV goes here..." onChange={this.onTextareaChange.bind(this)}/>
                {data && data.length && (
                    <table>
                        <thead>
                            <tr>
                                { data[0].map(token => <th>{token}</th>)}
                            </tr>
                        </thead>
                        {   data.length > 1 && (
                                <tbody>
                                    {data.slice(1).map(line => {
                                        return (
                                            <tr>
                                                {line.map(token => <td>{token}</td>)}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            )
                        }
                    </table>
                )}
                {error && <div className="error">{error}</div>}
            </div>
        );
    }
}